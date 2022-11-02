import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import style from './Detail.module.css'

const CountriesDetail = () => {

  let { cod } = useParams()
  let countrie = useSelector(state => state.countries).find(e => e.cca3 === cod)

  let { flags, name, cca3, continents, capital, subregion, area, population, activity } = countrie;


  return (
    <div className={style.detailContainer} >
      <div>
        <Link to="/home">
          <button>{`<-Back`}</button>
        </Link>
      </div>
      <div className={style.detailCard} >
        <div className={style.detailTitle}>
          <h3>{name.common} ({cca3})</h3>
          <img src={flags[1]} alt={name.common} />
        </div>
        <div className={style.detailInfo}>
          <ul>
            <li>Continents: {continents[0]}</li>
            <li>Capital: {capital[0]}</li>
            <li>Subregion: {subregion}</li>
            <li>Area: {area} km2</li>
            <li>Population: {population}</li>
            {activity !== undefined ?
              <><li>Tourist Activity: {activity.touristActivity}</li>
              <li>In season: {activity.season}</li>
              <li>Difficulty: {activity.difficulty}</li>
              <li>Activity duration: {activity.duration}min</li>
              </>
              :
              null}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default CountriesDetail
