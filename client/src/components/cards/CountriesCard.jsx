import React from 'react'
import style from './Cards.module.css'

const CountriesCard = ({flag, name, continents}) => {
  
  return (
    <div className={style.card} >
       <img src={flag} alt={name} />
       <div className={style.textMain}>
          <p className={style.text}>Name: {name}</p>
          <p className={style.text}>Continents: {continents}</p>
          <div className={style.textSmall}>
            <small>More info {'>'}</small>
          </div>
       </div>
    </div>
  )
}

export default CountriesCard
