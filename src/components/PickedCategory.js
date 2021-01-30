import React from 'react'
import { useGlobalContext } from '../context'
import { RiDeleteBack2Line } from 'react-icons/ri'

const PickedCategory = () => {
  const { pickedCategory, removeCategory } = useGlobalContext()
  return (
    <div className='option'>
      <p>{`${pickedCategory}`}</p>
      <button onClick={removeCategory}>
        <RiDeleteBack2Line />
      </button>
    </div>
  )
}

export default PickedCategory
