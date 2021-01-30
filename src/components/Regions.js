import React, { useRef, useEffect } from 'react'
import { useGlobalContext } from '../context'
import { regions } from '../data'

const Regions = () => {
  // global states
  const { showRegions } = useGlobalContext()
  // global functions
  const { toggleRegions, handleFilter } = useGlobalContext()
  // references
  const regionsRef = useRef(null)

  useEffect(() => {
    if (showRegions) {
      regionsRef.current.style.height = '21rem'
    } else {
      regionsRef.current.style.height = '0px'
    }
  }, [showRegions])

  return (
    <ul className='options regions' ref={regionsRef}>
      <li>
        {Object.keys(regions[0]).map((key) => (
          <button
            key={key}
            onClick={(e) => {
              toggleRegions(e.target.innerHTML)
              console.log('KEY: ' + regions[0][key])
              return handleFilter(`&country=${regions[0][key]}`)
            }}
          >
            {key}
          </button>
        ))}
      </li>
    </ul>
  )
}

export default Regions
