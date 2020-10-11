import { combineReducers } from 'redux'
import * as types from './types'

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
        info: action.payload,
      }
      return newState
    }
    case types.DIALOG_LOCATIONS: {
      let newState = {
        ...state,
        locations: action.payload,
      }
      return newState
    }
    case types.DIALOG_EPISODES: {
      let newState = {
        ...state,
        episodes: action.payload,
      }
      return newState
    }
    default:
      return state
  }
}

const getArrayPayload = (action) => {
  if (Array.isArray(action.payload)) {
    return action?.payload
  }
  return [action.payload]
}

const initialLocationsState = {
  data: [],
}

function locationsReducer(state = initialLocationsState, action) {
  switch (action.type) {
    case types.INVALIDATE_LOCATIONS:
    case types.REQUEST_LOCATIONS:
      return requestHandler(state, action)
    case types.RECEIVE_LOCATIONS:
      const newState = {
        ...state,
        data: [...state.data, ...getArrayPayload(action)],
      }
      return newState
    default:
      return state
  }
}

const initialEpisodesState = {
  data: [],
}

function episodesReducer(state = initialEpisodesState, action) {
  switch (action.type) {
    case types.INVALIDATE_EPISODES:
    case types.REQUEST_EPISODES:
      return requestHandler(state, action)
    case types.RECEIVE_EPISODES:
      const newState = {
        ...state,
        data: [...state.data, ...getArrayPayload(action)],
      }
      return newState
    default:
      return state
  }
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
  pages: charactersByPage,
  currentPage: selectedPage,
  dialogData: dialogData,
  isDialogOpen: dialogState,
  locations: locationsReducer,
  episodes: episodesReducer,
}

export default combineReducers(reducers)
