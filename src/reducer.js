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
        pickedRegion: {
          name: action.payload.region,
          id: action.payload.id,
        },
      }

    case SHOW_LANGUAGES:
      return {
        ...state,
        showLanguages: !state.showLanguages,
        showCategories: false,
        showRegions: false,
        pickedLanguage: {
          name: action.payload.language,
          id: action.payload.id,
        },
      }

    case REMOVE_CATEGORY:
      return {
        ...state,
        pickedCategory: '',
        query: state.query.replace(`&category=${state.pickedCategory}`, ''),
      }
    case REMOVE_REGION:
      return {
        ...state,
        pickedRegion: {
          name: '',
          id: '',
        },
        query: state.query.replace(`&country=${state.pickedRegion.id}`, ''),
      }
    case REMOVE_LANGUAGE:
      return {
        ...state,
        pickedLanguage: {
          name: '',
          id: '',
        },
        query: state.query.replace(`&language=${state.pickedLanguage.id}`, ''),
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
      let payloadValue = payload.split('=')[1]

      let currentQuery = querys.reduce((result, query) => {
        query = '&' + query
        let queryKey = query.split('=')[0]
        let queryValue = query.split('=')[1]

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
