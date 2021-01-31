import React, { useContext, useEffect, useReducer } from 'react'
import {
  SET_LOADING,
  SET_STORIES,
  HANDLE_SEARCH,
  HANDLE_FILTER,
  SHOW_LINKS,
  SHOW_SEARCH,
  SHOW_CATEGORIES,
  SHOW_REGIONS,
  SHOW_LANGUAGES,
  REMOVE_CATEGORY,
  REMOVE_REGION,
  REMOVE_LANGUAGE,
} from './constants/actions'
import reducer from './reducer'
import data from './stories-data' //prueba

/**
 * El fichero context.js contiene todos los estados y todas las funciones de la aplicacion.
 * En otros componentes se puede importar solo lo que necesita en ese componente particular.
 */

const baseUrl = 'https://api.currentsapi.services/v1/'
const apiKey = 'apiKey=LLSJkb1LWAtNQJPloddoypYepNF2KZorIIEO42NRBfOuLWFt'

const initialState = {
  isLoading: true,
  stories: [],
  searchUrl: '',
  query: '',
  showLinks: false,
  showSearch: false,
  showCategories: false,
  showRegions: false,
  showLanguages: false,
  pickedCategory: '',
  pickedRegion: { name: '', id: '' },
  pickedLanguage: { name: '', id: '' },
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const fetchStories = async (query) => {
    dispatch({ type: SET_LOADING })

    let url
    if (query) {
      url = `${baseUrl}search?${apiKey}${query}`
    } else {
      url = `${baseUrl}latest-news?${apiKey}`
    }

    try {
      const response = await fetch(url)
      const data = await response.json()
      dispatch({
        type: SET_STORIES,
        payload: { stories: data.news },
      })
    } catch (error) {
      console.log(error)
    }
  }

  const toggleLinks = () => {
    dispatch({ type: SHOW_LINKS })
  }
  const toggleSearch = () => {
    dispatch({ type: SHOW_SEARCH })
  }
  const toggleCategories = (category) => {
    dispatch({ type: SHOW_CATEGORIES, payload: { category } })
  }
  const toggleRegions = (region, id) => {
    dispatch({ type: SHOW_REGIONS, payload: { region, id } })
  }
  const toggleLanguages = (language, id) => {
    dispatch({ type: SHOW_LANGUAGES, payload: { language, id } })
  }
  const removeCategory = () => {
    dispatch({ type: REMOVE_CATEGORY })
  }
  const removeRegion = () => {
    dispatch({ type: REMOVE_REGION })
  }
  const removeLanguage = () => {
    dispatch({ type: REMOVE_LANGUAGE })
  }

  const handleFilter = (query) => {
    dispatch({
      type: HANDLE_FILTER,
      payload: { query: query },
    })
  }

  const handleSearch = () => {
    dispatch({ type: HANDLE_SEARCH })
  }

  useEffect(() => {
    fetchStories(state.query)
  }, [state.searchUrl])

  return (
    <AppContext.Provider
      value={{
        ...state,
        toggleLinks,
        toggleSearch,
        toggleCategories,
        toggleRegions,
        toggleLanguages,
        handleSearch,
        handleFilter,
        removeCategory,
        removeRegion,
        removeLanguage,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
