import React, { useRef, useEffect } from 'react'
import { useGlobalContext } from '../context'
import { languages } from '../data'

const Languages = () => {
  // global states
  const { showLanguages } = useGlobalContext()
  // global functions
  const { toggleLanguages, handleFilter } = useGlobalContext()
  // references
  const languagesRef = useRef(null)

  useEffect(() => {
    if (showLanguages) {
      languagesRef.current.style.height = '11rem'
    } else {
      languagesRef.current.style.height = '0px'
    }
  }, [showLanguages])

  return (
    <ul className='options languages' ref={languagesRef}>
      <li>
        {Object.keys(languages[0]).map((key) => (
          <button
            id={languages[0][key]}
            key={key}
            onClick={(e) => {
              toggleLanguages(e.target.innerHTML, e.target.id)
              return handleFilter(`&language=${languages[0][key]}`)
            }}
          >
            {key}
          </button>
        ))}
      </li>
      <li>
        {Object.keys(languages[1]).map((key) => (
          <button
            key={key}
            onClick={(e) => {
              toggleLanguages(e.target.innerHTML)
              return handleFilter(`&language=${languages[1][key]}`)
            }}
          >
            {key}
          </button>
        ))}
      </li>
    </ul>
  )
}

export default Languages
