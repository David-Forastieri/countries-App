import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getCountry } from '../../actions'
import Load from '../Load/Load'
import style from './Detail.module.css'

const CountriesDetail = () => {
  //http://localhost:3001/countries/MYS
  let { cod } = useParams()
  let dispatch = useDispatch()
  const country = useSelector(state => state.countryDetail)

  useEffect(() => {
    dispatch(getCountry(cod))
  }, [])

  console.log(country)

  return (
    <div className={style.detailContainer} >
      <div>
        <Link to="/home">
          <button>{`<-Back`}</button>
        </Link>
      </div>
      {country ?
        <div className={style.detailCard} >
          <div className={style.detailTitle}>
            <h3>{country.name} ({country.codeId})</h3>
            <img src={country.flag} alt={country.name} />
          </div>
          <div className={style.detailInfo}>
            <ul>
              <li>Continents: {country.continents}</li>
              <li>Capital: {country.capital}</li>
              <li>Subregion: {country.subRegion}</li>
              <li>Area: {country.area} km2</li>
              <li>Population: {country.population}</li>
              {/* {!country.touristActivities &&
              <><li>Tourist Activity: {countrie.touristActivities.touristActivity}</li>
              <li>In season: {touristActivities.season}</li>
              <li>Difficulty: {touristActivities.difficulty}</li>
              <li>Activity duration: {touristActivities.duration}min</li>
              </> } */}
            </ul>
          </div>
        </div>
        :
        <Load />
      }
    </div>
  )
}

export default CountriesDetail
