import React from 'react'
import { Link } from 'react-router-dom'
import style from './InitialPage.module.css'

const InitialPage = () => {
  return (
    <div className={style.container} >
      <div className={style.cardText} >
        <h1>Hello Word!!!</h1>
        <Link to="/home" >
          <button>Enter</button>
        </Link>
      </div>
    </div>
  )
}

export default InitialPage
