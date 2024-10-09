import React from 'react'

import classes from './Hobby.module.css'

import CategoryCard from '../../components/CategoryCard/CategoryCard'
import Page from '../../components/Page/Page'
import images from '../../utils/images'

const Sweets = () => {
  return (
    <Page title="Hobby&Leisure" isHeader isNavigation>
    <div className={classes.categoriesContainer}>
      <CategoryCard
        title="Painting"
        image={images.painting}
        link="/categories/painting"
      />
      <CategoryCard
        title="Beading"
        image={images.beading}
        link="/categories/beading"
      />
    </div>
  </Page>
  )
}

export default Sweets