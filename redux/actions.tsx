import * as types from './types'

// INITIALIZES CLOCK ON SERVER
export const serverRenderClock = () => (dispatch) =>
  dispatch({
    type: types.TICK,
    payload: { light: false, ts: Date.now() },
  })

//  PAGE | ACTION CREATORS
const onPageChange = (page) => {
  return {
    type: types.PAGE_CHANGE,
    page,
  }
}

export const pageChange = (page) => {
  return (dispatch) => {
    dispatch(onPageChange(page))
    return dispatch(fetchPageIfNeeded(page))
  }
}

const receivePage = (page, json) => {
  return {
    type: types.RECEIVE_PAGE,
    page,
    characters: json.results,
    info: json.info,
    receivedAt: Date.now(),
  }
}

const requestPage = (page) => {
  return {
    type: types.REQUEST_PAGE,
    page,
  }
}

export const fetchPage = (page) => {
  return (dispatch) => {
    dispatch(requestPage(page))
    return fetch(`https://rickandmortyapi.com/api/character?page=${page || 1}`)
      .then((response) => response.json())
      .then((json) => dispatch(receivePage(page, json)))
  }
}

export const fetchPageIfNeeded = (page) => {
  return (dispatch, getState) => {
    if (shouldFetchPage(getState(), page)) {
      return dispatch(fetchPage(page))
    }
  }
}

export function shouldFetchPage(state, page) {
  const characters = state.pages[page - 1]
  if (!characters) {
    return true
  } else if (characters.isFetching) {
    return false
  } else {
    return characters.didInvalidate
  }
}

// DIALOG DATA | ACTION CREATORS
export const dialogInfo = (info) => {
  return {
    type: types.DIALOG_INFO,
    payload: info,
  }
}

export const dialogLocations = (locations) => {
  return {
    type: types.DIALOG_LOCATIONS,
    payload: locations,
  }
}

export const dialogEpisodes = (episodes) => {
  return {
    type: types.DIALOG_EPISODES,
    payload: episodes,
  }
}

// LOCATIONS | ACTION CREATORS
const receiveLocations = (locationsId, json) => {
  return {
    type: types.RECEIVE_LOCATIONS,
    payload: json,
    receivedAt: Date.now(),
  }
}

const requestLocations = (locationIds) => {
  return {
    type: types.REQUEST_LOCATIONS,
    locationIds,
  }
}

export const fetchLocations = (locationIds, episodeIds) => {
  return (dispatch) => {
    dispatch(requestLocations(locationIds))
    fetch(
      `https://rickandmortyapi.com/api/location/${locationIds.join(',') || 1}`
    )
      .then((response) => response.json())
      .then((json) => {
        dispatch(receiveLocations(locationIds, json))
        dispatch(dialogLocations(json))
      })
    return fetch(
      `https://rickandmortyapi.com/api/episode/${episodeIds.join(',') || 1}`
    )
      .then((response) => response.json())
      .then((json) => {
        dispatch(receiveLocations(locationIds, json))
        dispatch(dialogEpisodes(json))
      })
  }
}

// EPISODES | ACTION CREATORS
const receiveEpisodes = (episodeIds, json) => {
  return {
    type: types.RECEIVE_EPISODES,
    payload: json,
    receivedAt: Date.now(),
  }
}

const requestEpisodes = (episodeIds) => {
  return {
    type: types.REQUEST_EPISODES,
    episodeIds,
  }
}

export const fetchEpisodes = (episodeIds) => {
  return (dispatch) => {
    dispatch(requestEpisodes(episodeIds))
    return fetch(
      `https://rickandmortyapi.com/api/location/${episodeIds.join(',') || 1}`
    )
      .then((response) => response.json())
      .then((json) => {
        dispatch(receiveEpisodes(episodeIds, json))
        dispatch(dialogEpisodes(json))
      })
  }
}

// DIALOG STATE | ACTION CREATORS
export const openDialog = () => {
  return {
    type: types.OPEN_DIALOG,
  }
}

export const closeDialog = () => {
  return {
    type: types.CLOSE_DIALOG,
  }
}

export const openDialogIfNeeded = (characterInfo, locationsId, episodeIds) => {
  return (dispatch, getState) => {
    if (!getState().isDialogOpen) {
      dispatch(dialogInfo(characterInfo))
      dispatch(fetchLocations(locationsId, episodeIds))
      return dispatch(openDialog())
    }
  }
}

export const closeDialogIfNeeded = () => {
  return (dispatch, getState) => {
    if (getState().isDialogOpen) {
      return dispatch(closeDialog())
    }
  }
}