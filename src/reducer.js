import {
  SET_LOADING,
  SET_STORIES,
  SHOW_LINKS,
  SHOW_SEARCH,
  SHOW_CATEGORIES,
  SHOW_REGIONS,
  SHOW_LANGUAGES,
  HANDLE_SEARCH,
  HANDLE_FILTER,
  REMOVE_CATEGORY,
  REMOVE_REGION,
  REMOVE_LANGUAGE,
} from './constants/actions'

const reducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, isLoading: true }

    case SET_STORIES:
      // console.log('SET_STORIES query: ' + state.query)
      // console.log('SET_STORIES search: ' + state.searchUrl)
      return {
        ...state,
        isLoading: false,
        stories: action.payload.stories,
      }

    case SHOW_LINKS:
      return { ...state, showLinks: !state.showLinks }

    case SHOW_SEARCH:
      return { ...state, showSearch: !state.showSearch }

    case SHOW_CATEGORIES:
      return {
        ...state,
        showCategories: !state.showCategories,
        showLanguages: false,
        showRegions: false,
        pickedCategory: action.payload.category,
      }

    case SHOW_REGIONS:
      return {
        ...state,
        showRegions: !state.showRegions,
        showCategories: false,
        showLanguages: false,
        pickedRegion: action.payload.region,
      }

    case SHOW_LANGUAGES:
      return {
        ...state,
        showLanguages: !state.showLanguages,
        showCategories: false,
        showRegions: false,
        pickedLanguage: action.payload.language,
      }

    case REMOVE_CATEGORY:
      console.log('REMOVE_CATEGORY: ' + state.query)
      return {
        ...state,
        pickedCategory: '',
        query: state.query.replace(`&category=${state.pickedCategory}`, ''),
      }
    case REMOVE_REGION:
      console.log('REMOVE_REGION: ' + state.query)
      return {
        ...state,
        pickedRegion: '',
        query: state.query.replace(`&country=${state.pickedRegion}`, ''),
      }
    case REMOVE_LANGUAGE:
      console.log('REMOVE_LANGUAGE: ' + state.query)
      return {
        ...state,
        pickedLanguage: '',
        query: state.query.replace(`&language=${state.pickedLanguage}`, ''),
      }

    case HANDLE_FILTER:
      let oldQuery = state.query
      console.log('OLD QUERY: ' + oldQuery)

      let querys =
        oldQuery == '' ? oldQuery.split('&') : oldQuery.split('&').slice(1)
      console.log('QUERYS: ' + querys)

      let payload = action.payload.query //ej. &category=sports
      console.log('PAYLOAD:   ' + payload)

      let payloadKey = payload.split('=')[0]
      console.log('PAYLOAD KEY:   ' + payloadKey)

      let payloadValue = payload.split('=')[1]
      console.log('PAYLOAD VALUE:   ' + payloadValue)

      let currentQuery = querys.reduce((result, query) => {
        query = '&' + query
        let queryKey = query.split('=')[0]
        console.log('QUERY KEY:   ' + queryKey)

        let queryValue = query.split('=')[1]
        console.log('QUERY VALUE:   ' + queryValue)

        if (query.includes(payloadKey) && queryKey == payloadKey) {
          return result + query.replace(queryValue, payloadValue)
        } else {
          if (query == '&') {
            return result + payload
          }
          return result + query + payload

          // return query == '&' ? result + payload : result + query + payload
        }
      }, '')

      //  console.log("'" + query + "'" + ' includes ' + payloadKey)
      // console.log("'" + query + "'" + ' not includes ' + payloadKey)
      // console.log('PAYLOAD:   ' + payload)
      // console.log('PAYLOAD KEY:   ' + payloadKey)
      // console.log('OLD QUERY: ' + oldQuery)
      // console.log('\n')
      console.log('CURRENT QUERY: ' + currentQuery)
      console.log('\n')

      return {
        ...state,
        query: currentQuery,
      }

    case HANDLE_SEARCH:
      let finalQuery = state.query
      console.log('FINAL QUERY: ' + finalQuery)
      return { ...state, searchUrl: finalQuery }

    default:
      throw new Error(`no matching "${action.type}" action type`)
  }
}
export default reducer
