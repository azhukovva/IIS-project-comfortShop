import React from 'react'
import classes from './Page.module.css'
import Header from '../Header/Header'

type PropsType = {
    children: React.ReactNode
    title: string
    subtitle?: string
    isWelcomePage?: boolean
    isHeader?: boolean
}

const Page = ({children, title, subtitle, isWelcomePage, isHeader}: PropsType) => {
  return (
    <section className={classes.container}>
        {isHeader && <Header />}
    <div className={isWelcomePage ? classes.titleContainerWelcome : classes.titleContainer}>
        <h2 className={isWelcomePage ? classes.titleWelcome : classes.title}>
            {title}
        </h2>
        {subtitle && <p className={classes.subtitle}>{subtitle}</p>}
    </div>
    {children}
</section>
  )
}

export default Page