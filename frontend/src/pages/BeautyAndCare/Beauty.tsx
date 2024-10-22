import React from 'react'

import classes from './Beauty.module.css'

import CategoryCard from '../../components/CategoryCard/CategoryCard'
import Page from '../../components/Page/Page'
import images from '../../utils/images'

const Sweets = () => {
  return (
    <Page title="Beauty&Care" isHeader isNavigation>
    <div className={classes.categoriesContainer}>
      <CategoryCard
        title="Face"
        image={images.face}
        link="/categories/beauty&Care/Face"
      />
      <CategoryCard
        title="Body"
        image={images.body}
        link="/categories/beauty&Care/Body"
      />
    </div>
  </Page>
  )
}

export default Sweets