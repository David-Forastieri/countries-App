import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCountries } from '../../actions'
import CountriesCard from '../cards/CountriesCard'
import Load from '../Load/Load';
import {
  handleChange,
  handlerNextPage,
  handlerPrevPage,
  handlerOrderAlpha,
  handlerOrderNum,
  continentsFilter
} from '../../utils.js/utilsHome';

import style from './Home.module.css'

const Home = () => {

  let dispatch = useDispatch()
  const Countries = useSelector(state => state.countries)
  const itemPerPage = 9

  const [selecOrderView, setSelecOrderView] = useState(true)
  const [selecFilterView, setSelecFilterView] = useState(true)
  const [currentPage, setCurrentPage] = useState(0)
  const [allCountries, setAllCountries] = useState([])
  const [controlSearch, setControlSearch] = useState('')

  useEffect(() => {
    if (!Countries.length) {
      dispatch(getCountries())
    }
    setAllCountries([...Countries].splice(0, itemPerPage))

  }, [Countries.length, dispatch]);

  return (
    <div className={style.container} >
      <div className={style.searchMain} >
        <input type="text" onChange={(ev) => { handleChange(ev, setControlSearch, Countries, setAllCountries) }} placeholder='Search for a country' />
        <button onClick={() => {
          !controlSearch &&
            alert("Enter a country to search")
        }} >Search</button>
      </div>

      <div className={style.controlNav}>
        <button onClick={() => { handlerPrevPage(currentPage, itemPerPage, Countries, setAllCountries, setCurrentPage) }} >Prev</button>
        <p>{currentPage + 1}</p>
        {allCountries.length >= itemPerPage &&
          <button onClick={() => { handlerNextPage(Countries, itemPerPage, currentPage, setAllCountries, setCurrentPage) }} >Next</button>
        }
      </div>

      <div className={style.buttonsMain}>
        <div>
          <Link to="/form">
            <button>Create new tourist activities</button>
          </Link>
        </div>
        <div className={style.selec} >
          <button onClick={() => { setSelecOrderView(!selecOrderView) }} >Order</button>
          {!selecOrderView &&
            <ul>
              <li onClick={() => { handlerOrderAlpha('az', allCountries, itemPerPage, setAllCountries) }}>A - Z</li>
              <li onClick={() => { handlerOrderAlpha('za', allCountries, itemPerPage, setAllCountries) }}>Z - A</li>
              <li onClick={() => { handlerOrderNum('za', allCountries, itemPerPage, setAllCountries) }}>high population</li>
              <li onClick={() => { handlerOrderNum('az', allCountries, itemPerPage, setAllCountries) }}>minor population</li>
            </ul>}
        </div>
        <div className={style.selec} >
          <button onClick={() => { setSelecFilterView(!selecFilterView) }} >Filter by continent</button>
          {!selecFilterView &&
            <ul>
              <li onClick={() => { setAllCountries([...Countries].splice(0, itemPerPage)) }}>All</li>
              <li onClick={() => { continentsFilter('North America', Countries, setAllCountries, itemPerPage) }}>North America</li>
              <li onClick={() => { continentsFilter('South America', Countries, setAllCountries, itemPerPage) }}>South America</li>
              <li onClick={() => { continentsFilter('Europe', Countries, setAllCountries, itemPerPage) }}>Europe</li>
              <li onClick={() => { continentsFilter('Asia', Countries, setAllCountries, itemPerPage) }}>Asia</li>
              <li onClick={() => { continentsFilter('Africa', Countries, setAllCountries, itemPerPage) }}>Africa</li>
              <li onClick={() => { continentsFilter('Oceania', Countries, setAllCountries, itemPerPage) }}>Oceania</li>
              <li onClick={() => { continentsFilter('Antarctica', Countries, setAllCountries, itemPerPage) }}>Antartica</li>
            </ul>}
        </div>
      </div>

      <div>{!Countries.length && <Load />}</div>
      {allCountries.length || Countries.length ?
        <div className={style.countries} >
          {allCountries.map((c) => {
            return <Link key={c.codeId} to={`detail/${c.codeId}`} >
              <CountriesCard
                flag={c.flag}
                name={c.name}
                continents={c.continents}
              />
            </Link>
          })}
        </div>
        :
        <p>No country with that name was found</p>
      }
    </div>
  )
}

export default Home
