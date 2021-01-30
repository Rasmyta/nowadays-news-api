import React, { useRef, useEffect } from 'react'
import { useGlobalContext } from '../context'
import { FaBars } from 'react-icons/fa'
import { social } from '../data'
import Search from './Search'
import Categories from './Categories'
import Regions from './Regions'
import Languages from './Languages'

const Navbar = () => {
  // global states
  const { showLinks } = useGlobalContext()
  // global functions
  const {
    toggleLinks,
    toggleSearch,
    handleSearch,
    handleFilter,
  } = useGlobalContext()

  // references
  const linksContainerRef = useRef(null)
  const linksRef = useRef(null)

  useEffect(() => {
    const linksHeight = linksRef.current.getBoundingClientRect().height // getting the height of total links
    // if 'showLinks' is true, we show links in full height, else - we hide it
    if (showLinks) {
      linksContainerRef.current.style.height = `${linksHeight}px`
    } else {
      linksContainerRef.current.style.height = '0px'
    }
  }, [showLinks])

  return (
    <nav>
      <div className='nav-center'>
        <div className='nav-header'>
          <h1 className='name'>Nowadays</h1>
          {/* <h3>News From Around the World</h3> */}
          <button className='nav-toggle' onClick={toggleLinks}>
            <FaBars />
          </button>
        </div>
        <div className='links-container' ref={linksContainerRef}>
          <ul className='links' ref={linksRef}>
            <li key='1'>
              <a
                href='#'
                onClick={() => {
                  handleFilter('')
                  return handleSearch()
                }}
              >
                Latest News
              </a>
            </li>
            <li key='2'>
              <a href='#' className='search-toggle' onClick={toggleSearch}>
                Search
              </a>
            </li>
          </ul>
        </div>
        <ul className='social-icons'>
          {social.map((socialIcon) => {
            const { id, url, icon } = socialIcon
            return (
              <li key={id}>
                <a href={url}>{icon}</a>
              </li>
            )
          })}
        </ul>
      </div>
      <Search />
      <Categories />
      <Regions />
      <Languages />
    </nav>
  )
}

export default Navbar
