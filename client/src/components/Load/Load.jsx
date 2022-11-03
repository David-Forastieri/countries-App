import React from 'react'
import style from './Load.module.css'

const Load = () => {
  return (
    <div className={style.loadContainer}>
      <div className={style.loadSpiner}>
      <div className={style.spiner} ></div>
      </div>
      <p>Loading...</p>
    </div>
  )
}

export default Load
