import React from 'react'
import classes from './Page.module.css'

type PropsType = {
    children: React.ReactNode
    title: string
    subtitle?: string
}

const Page = ({children, title, subtitle}: PropsType) => {
  return (
    <section className={classes.container}>
    <div className={classes.titleContainer}>
        <h2 className={classes.title}>
            {title}
        </h2>
        {subtitle && <p className={classes.subtitle}>{subtitle}</p>}
    </div>
    {children}
</section>
  )
}

export default Page