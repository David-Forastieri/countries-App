import React from 'react'
import { useState } from 'react'
//import { useDispatch, useSelector } from 'react-redux'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
//import { addTouristActivity } from '../../actions'
import style from './Form.module.css'

const Form = () => {

  const [allCountries, setAllCountries] = useState([])
  //const [selecCountrie, setSelecCountrie] = useState([])
  const [countryId, setCountryId] = useState([])
  const [data, setData] = useState({
    touristActivity: "",
    difficulty: "",
    duration: "",
    season: ""
  })

  const history = useNavigate();
  const Countries = useSelector(state => state.countries);

  const saveCountryId = (e) =>{
    let selecCountry = {name: e.name, codeId: e.codeId};
    setCountryId([...countryId, selecCountry])
  //  setCountryId([...countryId, e.codeId])
  //  setSelecCountrie([...selecCountrie, e.name])
  }

  const handlerChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const handlerCheck = (e) => {
    if (e.target.checked) {
      setData({
        ...data,
        [e.target.name]: e.target.id
      })
    }
  }

  const countryChange = (e) => {
    let countriesSearch = Countries.filter(ch => ch.name.toLowerCase().indexOf(e.target.value) !== -1)
    setAllCountries(countriesSearch)
  }

  const submitForm = (e) => {
    e.preventDefault()

    const value = {data, ct: countryId}

    fetch('http://localhost:3001/activities', {
      method: 'POST',
      body: JSON.stringify(value), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(response => console.log('Success:', response))
    .catch(error => console.error('Error:', error));

    history("/home")
  }

  const deleteCountrie = (name) => {
   setCountryId(countryId.filter(e => e.name !== name.name))
  }

  return (
    <div className={style.formContainer} >
      <div>
        <Link to="/home">
          <button>{`<-Back`}</button>
        </Link>
      </div>

      <div className={style.form} >

        <div className={style.formLabel}>
          <label>Activity name:</label>
          <input type="text" name='touristActivity' value={data.touristActivity} onChange={handlerChange} />
        </div>

        <div className={style.formLabel} >
          <label>Difficulty:</label>
          <div className={style.inputcheck} >
            <input type="radio" name="difficulty" id='1' onChange={handlerCheck} />1
            <input type="radio" name="difficulty" id='2' onChange={handlerCheck} />2
            <input type="radio" name="difficulty" id='3' onChange={handlerCheck} />3
            <input type="radio" name="difficulty" id='4' onChange={handlerCheck} />4
            <input type="radio" name="difficulty" id='5' onChange={handlerCheck} />5
          </div>
        </div>

        <div className={style.formLabel} >
          <label>Duration:</label>
          <input type="number" name='duration' value={data.duration} onChange={handlerChange} placeholder="expressed in minutes" />MINUTES
        </div>

        <div className={style.formLabel}>
          <label>Season:</label>
          <div className={style.inputcheck} >
            <input type="radio" name='season' id="Summer" onChange={handlerCheck} />Summer
            <input type="radio" name='season' id="Fall" onChange={handlerCheck} />Fall
            <input type="radio" name='season' id="Winter" onChange={handlerCheck} />Winter
            <input type="radio" name='season' id="Spring" onChange={handlerCheck} />Spring
          </div>
        </div>

        <div className={style.formLabelCountrie}>
          <p>Carry out activity in:</p>
          <div className={style.btnCountrieMain}>
           {countryId.length > 0 &&
              countryId.map(e => {
                return <div key={e.codeId} className={style.btnCountrie}>
                  <p>{e.name}</p>
                  <button className={style.btnDelete} onClick={() => { deleteCountrie(e) }} >X</button>
                </div>
              })
            }
          </div>
          <div>
            <input type="text" onChange={countryChange} />
            <button>Search</button>
          </div>
          {allCountries &&
            allCountries.map(e => {
              return <button
                key={e.name}
                onClick={() => { saveCountryId(e) }}
                className={style.btnSelectCountrie}
              >{e.name}</button>
            })
          }
        </div>
        <button type='submit' onClick={submitForm} className={style.btnSubmit} >Create</button>
      </div>

    </div>
  )
}

export default Form
