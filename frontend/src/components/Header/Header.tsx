import React, { useState } from 'react'

import classes from './Header.module.css'

import Button from '../Button/Button'

const Header = () => {
    const [activeAction, setActiveAction] = useState('buy')
const [activeCategory, setActiveCategory] = useState('home')

  return (
    <header className={classes.header}>
        <div className={classes.actionsContainer}>
            <Button onClick={() => setActiveAction("buy")} isActive={activeAction === "buy"}>Buy</Button>
            <Button onClick={() => setActiveAction("sell")} isActive={activeAction === "sell"}>Sell</Button>
        </div>
        <div className={classes.categoriesContainer}>
            <Button onClick={() => setActiveCategory("home")} isActive={activeCategory === "home"}>Home&Cozyness</Button>
            <Button onClick={() => setActiveCategory("hobby")} isActive={activeCategory === "hobby"}>Hobby</Button>
            <Button onClick={() => setActiveCategory("sweets")} isActive={activeCategory === "sweets"}>Sweets&Pastries</Button>
            <Button onClick={() => setActiveCategory("beauty")} isActive={activeCategory === "beauty"}>Beauty&Care</Button>
        </div>
    </header>
  )
}

export default Header

