import React, { useRef, useEffect } from 'react'
import { useGlobalContext } from '../context'
import { FaSearch } from 'react-icons/fa'
import PickedCategory from './PickedCategory'
import PickedLanguage from './PickedLanguage'
import PickedRegion from './PickedRegion'

const Search = () => {
  // global states
  const {
    showSearch,
    pickedCategory,
    pickedRegion,
    pickedLanguage,
  } = useGlobalContext()
  // global functions
  const {
    toggleCategories,
    toggleRegions,
    toggleLanguages,
    handleSearch,
  } = useGlobalContext()

  // references
  const searchRef = useRef(null)

  useEffect(() => {
    if (showSearch) {
      searchRef.current.style.height = '4rem'
    } else {
      searchRef.current.style.height = '0px'
    }
  }, [showSearch])

  return (
    <ul className='search' ref={searchRef}>
      <li>
        <a
          className='option-toggle'
          onClick={() => toggleCategories(pickedCategory)}
        >
          Category
        </a>
        {pickedCategory !== '' ? <PickedCategory /> : ''}
      </li>
      <li>
        <a
          className='option-toggle'
          onClick={() => toggleRegions(pickedRegion.name, pickedRegion.id)}
        >
          Region
        </a>
        {pickedRegion.id !== '' ? <PickedRegion /> : ''}
      </li>
      <li>
        <a
          className='option-toggle'
          onClick={() =>
            toggleLanguages(pickedLanguage.name, pickedLanguage.id)
          }
        >
          Language
        </a>
        {pickedLanguage.id !== '' ? <PickedLanguage /> : ''}
      </li>

      <button
        className='btn'
        onClick={() => {
          return handleSearch()
        }}
      >
        <FaSearch />
      </button>
    </ul>
  )
}

export default Search
