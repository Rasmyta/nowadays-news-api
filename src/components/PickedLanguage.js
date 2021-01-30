import React from 'react'
import { useGlobalContext } from '../context'
import { RiDeleteBack2Line } from 'react-icons/ri'

const PickedLanguage = () => {
  const { pickedLanguage, removeLanguage } = useGlobalContext()
  return (
    <div className='option'>
      <p>{`${pickedLanguage}`}</p>
      <button onClick={removeLanguage}>
        <RiDeleteBack2Line />
      </button>
    </div>
  )
}

export default PickedLanguage
