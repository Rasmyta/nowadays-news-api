import React, { useEffect, useState } from 'react'

export const Story = ({ story }) => {
  const {
    url,
    image,
    title,
    description,
    author,
    published,
    category,
    language,
  } = story
  // const [isImage, setIsImage] = useState(true)
  // 'image' contains an url of image
  const isImage = image && image !== 'None'

  return story && url ? (
    <article className='story'>
      <a href={url} target='_blank'>
        <h4 className='title'>{title}</h4>
      </a>
      <p className='info'>
        By {author} | {published.substring(0, 11)} | {category} | {language}
      </p>

      <div className='content-wrapper'>
        {isImage && <img className='image' src={image} alt={title} />}
        <div>
          <p>{description}</p>
        </div>
      </div>
    </article>
  ) : null
}
