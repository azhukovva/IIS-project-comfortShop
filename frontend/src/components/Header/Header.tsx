import React from 'react'

import classes from './Header.module.css'

import Button from '../Button/Button'

const Header = () => {
  return (
    <header>
        <div className={classes.actionsContainer}>
            <Button>Home</Button>
            <Button>Details</Button>
        </div>
    </header>
  )
}

export default Header