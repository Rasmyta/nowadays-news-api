import React from 'react'
import { Story } from './Story'
import { useGlobalContext } from '../context'

export const StoriesContainer = () => {
  const { isLoading, stories } = useGlobalContext()

  if (isLoading) {
    return <div className='loading'></div>
  }

  return (
    <section className='stories'>
      {stories.map((story) => (
        <Story key={story.id} story={story} />
      ))}
    </section>
  )
}
