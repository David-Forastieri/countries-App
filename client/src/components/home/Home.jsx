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
  const [countriestoShow, setCountriestoShow] = useState([])

  useEffect(() => {
    if (!Countries.length) {
      dispatch(getCountries())
    }
    setAllCountries([...Countries]);
  }, [Countries.length, dispatch]);

  useEffect(() => {
    setCountriestoShow([...allCountries].splice(0, itemPerPage))
    setCurrentPage(0)
  }, [allCountries])

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
        <button onClick={() => { handlerPrevPage(currentPage, itemPerPage, allCountries, setCountriestoShow, setCurrentPage) }} >Prev</button>
        <p>{currentPage + 1}</p>
        {allCountries.length >= itemPerPage &&
          <button onClick={() => { handlerNextPage(allCountries, itemPerPage, currentPage, setCountriestoShow, setCurrentPage) }} >Next</button>
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
              <li onClick={() => { handlerOrderAlpha('az', allCountries, setAllCountries); setSelecOrderView(!selecOrderView) }}>A - Z</li>
              <li onClick={() => { handlerOrderAlpha('za', allCountries, setAllCountries); setSelecOrderView(!selecOrderView) }}>Z - A</li>
              <li onClick={() => { handlerOrderNum('hig', allCountries, setAllCountries); setSelecOrderView(!selecOrderView) }}>high population</li>
              <li onClick={() => { handlerOrderNum('min', allCountries, setAllCountries); setSelecOrderView(!selecOrderView) }}>minor population</li>
            </ul>}
        </div>
        <div className={style.selec} >
          <button onClick={() => { setSelecFilterView(!selecFilterView) }} >Filter by continent</button>
          {!selecFilterView &&
            <ul>
              <li onClick={() => { setAllCountries([...Countries]); setSelecFilterView(!selecFilterView) }}>All</li>
              <li onClick={() => { continentsFilter('North America', Countries, setAllCountries); setSelecFilterView(!selecFilterView) }}>North America</li>
              <li onClick={() => { continentsFilter('South America', Countries, setAllCountries); setSelecFilterView(!selecFilterView) }}>South America</li>
              <li onClick={() => { continentsFilter('Europe', Countries, setAllCountries); setSelecFilterView(!selecFilterView) }}>Europe</li>
              <li onClick={() => { continentsFilter('Asia', Countries, setAllCountries); setSelecFilterView(!selecFilterView) }}>Asia</li>
              <li onClick={() => { continentsFilter('Africa', Countries, setAllCountries); setSelecFilterView(!selecFilterView) }}>Africa</li>
              <li onClick={() => { continentsFilter('Oceania', Countries, setAllCountries); setSelecFilterView(!selecFilterView) }}>Oceania</li>
              <li onClick={() => { continentsFilter('Antarctica', Countries, setAllCountries); setSelecFilterView(!selecFilterView) }}>Antartica</li>
            </ul>}
        </div>
      </div>

      <div>{!Countries.length && <Load />}</div>
      {allCountries.length ?
        <div className={style.countries} >
          {countriestoShow.map((c) => {
            return <Link key={c.codeId} to={`detail/${c.codeId}`} >
              <CountriesCard
                flag={c.flag}
                name={c.name}
                continents={c.continents}
              />
            </Link>
          })}
        </div>
        : <p className={style.noCountrieMsg}>No country with that name was found</p>
      }
    </div>
  )
}

export default Home
