import React from 'react'
import { useGlobalContext } from '../context'
import { RiDeleteBack2Line } from 'react-icons/ri'

const PickedRegion = () => {
  const { pickedRegion, removeRegion } = useGlobalContext()
  return (
    <div className='option'>
      <p>{`${pickedRegion}`}</p>
      <button onClick={removeRegion}>
        <RiDeleteBack2Line />
      </button>
    </div>
  )
}

export default PickedRegion
