import React from 'react'

import classes from './Sweets.module.css'

import CategoryCard from '../../components/CategoryCard/CategoryCard'
import Page from '../../components/Page/Page'
import images from '../../utils/images'

const Sweets = () => {
  return (
    <Page title="Sweets" isHeader isNavigation>
    <div className={classes.categoriesContainer}>
      <CategoryCard
        title="Cakes"
        image={images.cheesecake}
        link="/categories/home/cakes"
      />
      <CategoryCard
        title="Bakery"
        image={images.bakery}
        link="/categories/home/cookies"
      />
    </div>
  </Page>
  )
}

export default Sweets