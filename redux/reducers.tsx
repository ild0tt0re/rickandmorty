import { type } from 'os'
import { combineReducers } from 'redux'
import * as types from './types'

// COUNTER REDUCER
const counterReducer = (state = 0, { type }) => {
  switch (type) {
    case types.INCREMENT:
      return state + 1
    case types.DECREMENT:
      return state - 1
    case types.RESET:
      return 0
    default:
      return state
  }
}

// INITIAL TIMER STATE
const initialTimerState = {
  lastUpdate: 0,
  light: false,
}

// TIMER REDUCER
const timerReducer = (state = initialTimerState, { type, payload }) => {
  switch (type) {
    case types.TICK:
      return {
        lastUpdate: payload.ts,
        light: !!payload.light,
      }
    default:
      return state
  }
}

function selectedPage(state = 1, action) {
  switch (action.type) {
    case types.PAGE_CHANGE:
      return action.page
    default:
      return state
  }
}

const initialPageState = {
  isFetching: false,
  didInvalidate: false,
  characters: [],
}

function page(state = initialPageState, action) {
  switch (action.type) {
    case types.INVALIDATE_PAGE:
      return Object.assign({}, state, {
        didInvalidate: true,
      })
    case types.REQUEST_PAGE:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
      })
    case types.RECEIVE_PAGE:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        characters: action.characters,
        info: action.info,
        page: action.page,
        lastUpdated: action.receivedAt,
      })
    default:
      return state
  }
}

function charactersByPage(state = [], action) {
  switch (action.type) {
    case types.INVALIDATE_PAGE:
    case types.REQUEST_PAGE:
    case types.RECEIVE_PAGE:
      const newState = [...state]
      newState[action.page - 1] = page(newState[action.page - 1], action)
      return newState
    default:
      return state
  }
}

const initialDialogState = {
  info: {},
  locations: {},
  episodes: {},
}

function dialogData(state = initialDialogState, action) {
  switch (action.type) {
    case types.DIALOG_INFO: {
      let newState = { 
        ...state,
        info: action.payload 
      }
      return newState
    }
    case types.DIALOG_LOCATIONS: {
      let newState = { 
        ...state,
        locations: action.payload 
      }
      return newState
    }
    case types.DIALOG_EPISODES: {
      let newState = { 
        ...state,
        episodes: action.payload 
      }
      return newState
    }
    default:
      return state
  }
}

function locationsReducer(state = {}, action) {
  switch (action.type) {
    case types.INVALIDATE_LOCATIONS:
    case types.REQUEST_LOCATIONS:
      return requestHandler(state, action)
    case types.RECEIVE_LOCATIONS:
      const newState = {
        ...state,
        data: action.payload,
      }
      return newState
    default:
      return state
  }
}

function episodesReducer(state = [], action) {
  return state
}

function requestHandler(state, action) {
  switch (action.type) {
    case types.INVALIDATE_LOCATIONS:
      return Object.assign({}, state, {
        didInvalidate: true,
      })
    case types.REQUEST_LOCATIONS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
      })
    case types.RECEIVE_LOCATIONS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        lastUpdated: action.receivedAt,
      })
    default:
      return state
  }
}

function dialogState(state = false, action) {
  switch (action.type) {
    case types.OPEN_DIALOG:
      return true
    case types.CLOSE_DIALOG:
      return false
    default:
      return state
  }
}

// COMBINED REDUCERS
const reducers = {
  counter: counterReducer,
  timer: timerReducer,
  pages: charactersByPage,
  currentPage: selectedPage,
  dialogData: dialogData,
  isDialogOpen: dialogState,
  locations: locationsReducer,
  episodes: episodesReducer,
}

export default combineReducers(reducers)
