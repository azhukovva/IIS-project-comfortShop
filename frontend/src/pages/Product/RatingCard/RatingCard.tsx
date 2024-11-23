import React from 'react'

import classes from './RatingCard.module.css'
import { PostType } from '../../../utils/axios'

type RatingCardProps = {
    post: PostType
}

const RatingCard = ({post}: RatingCardProps) => {
  return (
    <div className={classes.ratingCard}>
    <h2>{post.header || 'Untitled Post'}</h2>
    
    <p>{post.text}</p>

    <p>Average Rating: {post.average_rating}</p>

    <div className={classes.ratings}>
      <h3>Ratings:</h3>
      {post.ratings.length > 0 ? (
        post.ratings.map((rating, index) => (
          <div key={index} className={classes.ratingItem}>
            <p>User {rating.user} rated: {rating.rating}/5</p>
          </div>
        ))
      ) : (
        <p>No ratings available</p>
      )}
    </div>
  </div>
  )
}

export default RatingCard