import React, { useRef, useEffect } from 'react'
import { useGlobalContext } from '../context'
import { categories } from '../data'

const Categories = () => {
  // global states
  const { showCategories } = useGlobalContext()
  // global functions
  const { toggleCategories, handleFilter } = useGlobalContext()
  // references
  const categoriesRef = useRef(null)

  useEffect(() => {
    if (showCategories) {
      categoriesRef.current.style.height = '16rem'
    } else {
      categoriesRef.current.style.height = '0px'
    }
  }, [showCategories])

  return (
    <ul className='options categories' ref={categoriesRef}>
      <li>
        {categories[0].map((category) => (
          <button
            key={category}
            onClick={(e) => {
              toggleCategories(e.target.innerHTML)
              return handleFilter(`&category=${e.target.innerHTML}`)
            }}
          >
            {category}
          </button>
        ))}
      </li>
    </ul>
  )
}

export default Categories
