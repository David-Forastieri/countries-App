import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getCountry } from '../../actions'
import Load from '../Load/Load'
import style from './Detail.module.css'

const CountriesDetail = () => {
  let { cod } = useParams();
  let dispatch = useDispatch();
  const country = useSelector(state => state.countryDetail)

  useEffect(() => {
    dispatch(getCountry(cod))
    return ()=>{dispatch(getCountry(''))}
  }, []);

  return (
    <div className={style.detailContainer} >
      <div className={style.buttonBack}>
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
            <h4>General information</h4>
            <ul>
              <li>Continents: {country.continents}</li>
              <li>Capital: {country.capital}</li>
              <li>Subregion: {country.subRegion}</li>
              <li>Area: {country.area} km2</li>
              <li>Population: {country.population}</li>
            </ul>
            <h4>Tourist Activities</h4>
            {country.touristActivities !== undefined &&
              country.touristActivities.length > 0 ?
              <ul>
                <li>Tourist Activity: {country.touristActivities[0].touristActivity}</li>
                <li>In season: {country.touristActivities[0].season}</li>
                <li>Difficulty: {country.touristActivities[0].difficulty}</li>
                <li>Activity duration: {country.touristActivities[0].duration}min</li>
              </ul>
              :
              <Link to="/form">
                <button>Create new tourist activities</button>
              </Link>
            }
          </div>
        </div>
        :
        <Load />
      }
    </div>
  )
}

export default CountriesDetail
