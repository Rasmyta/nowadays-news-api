import React from 'react'

export const Story = ({ story }) => {
  const { url, image, title, description, author, published } = story
  // 'image' contains an url of image
  const isImage = image && image !== 'None'

  return story && url ? (
    <article className='story'>
      <a href={url} target='_blank'>
        <h4 className='title'>{title}</h4>
      </a>
      <p className='info'>
        By {author} | {published.substring(0, 11)}
      </p>

      <div className='content-wrapper'>
        {/* si imagen existe, crea el tag de imagen */}
        {isImage && <img className='image' src={image} alt={title} />}
        <div>
          <p>{description}</p>
        </div>
      </div>
    </article>
  ) : null
}
