import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCountries } from '../../actions'
import CountriesCard from '../cards/CountriesCard'
import InitialPage from '../Landing/InitialPage'
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

  }, [Countries.length, dispatch])

  const handleChange = (e) => {
    setControlSearch(e.target.value)
    let countriesSearch = Countries.filter(ch => ch.name.common.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1)
    setAllCountries(countriesSearch)
  }

  const continentsFilter = (continents) => {
    let continentsSelected = Countries.filter(ch => ch.continents[0] === continents)
    setAllCountries([...continentsSelected].splice(0, itemPerPage))
  }

  const handlerNextPage = () => {
    const countriesTotal = Countries.length;
    const nextPage = currentPage + 1;
    const firstIndex = nextPage * itemPerPage;
    if (firstIndex >= countriesTotal) return;

    setAllCountries([...Countries].splice(firstIndex, itemPerPage))
    setCurrentPage(nextPage)
  }

  const handlerPrevPage = () => {
    const prevPage = currentPage - 1;
    if (prevPage < 0) return;
    const firstIndex = prevPage * itemPerPage

    setAllCountries([...Countries].splice(firstIndex, itemPerPage))
    setCurrentPage(prevPage)
  }

  const handlerOrderAlpha = (param) => {
    if (param === 'az') {
      let order = Countries.sort((a, b) => {
        if (a.name.common < b.name.common) return -1
        if (a.name.common > b.name.common) return 1
        return 0
      })
      setAllCountries([...order].splice(0, itemPerPage))
    } else {
      let order = Countries.sort((a, b) => {
        if (a.name.common > b.name.common) return -1
        if (a.name.common < b.name.common) return 1
        return 0
      })
      setAllCountries([...order].splice(0, itemPerPage))
    }
  }

  const handlerOrderNum = (param) => {
    if (param === 'az') {
      let order = Countries.sort((a, b) => {
        if (a.population < b.population) return -1
        if (a.population > b.population) return 1
        return 0
      })
      setAllCountries([...order].splice(0, itemPerPage))
    } else {
      let order = Countries.sort((a, b) => {
        if (a.population > b.population) return -1
        if (a.population < b.population) return 1
        return 0
      })
      setAllCountries([...order].splice(0, itemPerPage))
    }
  }

  return (
    <div className={style.container} >
      <div className={style.searchMain} >
        <input type="text" onChange={handleChange} placeholder='Search for a country' />
        <button onClick={() => {
          !controlSearch &&
            alert("Enter a country to search")
        }} >Search</button>
      </div>

      <div className={style.controlNav}>
        <button onClick={() => { handlerPrevPage() }} >Prev</button>
        <p>{currentPage + 1}</p>
        {allCountries.length >= itemPerPage &&
          <button onClick={() => { handlerNextPage() }} >Next</button>
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
              <li onClick={() => { handlerOrderAlpha('az') }}>A - Z</li>
              <li onClick={() => { handlerOrderAlpha('za') }}>Z - A</li>
              <li onClick={() => { handlerOrderNum('za') }}>high population</li>
              <li onClick={() => { handlerOrderNum('az') }}>minor population</li>
            </ul>}
        </div>
        <div className={style.selec} >
          <button onClick={() => { setSelecFilterView(!selecFilterView) }} >Filter by continent</button>
          {!selecFilterView &&
            <ul>
              <li onClick={() => { setAllCountries([...Countries].splice(0, itemPerPage)) }}>All</li>
              <li onClick={() => { continentsFilter('North America') }}>North America</li>
              <li onClick={() => { continentsFilter('South America') }}>South America</li>
              <li onClick={() => { continentsFilter('Europe') }}>Europe</li>
              <li onClick={() => { continentsFilter('Asia') }}>Asia</li>
              <li onClick={() => { continentsFilter('Africa') }}>Africa</li>
              <li onClick={() => { continentsFilter('Oceania') }}>Oceania</li>
            </ul>}
        </div>
      </div>

      <div>{!Countries.length && <p>Loading...</p>}</div>
      {allCountries.length || Countries.length ?
        <div className={style.countries} >
          {allCountries.map((c, i) => {
            return <Link key={i} to={`detail/${c.fifa}`} >
              <CountriesCard
                flag={c.flags[1]}
                name={c.name.common}
                continents={c.continents[0]}
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
