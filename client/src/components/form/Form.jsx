import React from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {
  handlerCheck,
  handlerChange,
  countryChange,
  saveCountryId,
  deleteCountrie,
  handlerError,
  set
} from '../../utils.js/utilsForm';

import style from './Form.module.css';

const Form = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [countryId, setCountryId] = useState([])
  const [messageError, setMessageError] = useState('')
  const [requiredMessage, setRequiredMessage] = useState(false)
  const [sendForm, setSendForm] = useState(false)
  const [errorName, setErrorName] = useState(false)
  const [errorTime, setErrorTime] = useState(false)
  const [data, setData] = useState({
    touristActivity: null,
    difficulty: null,
    duration: null,
    season: null
  });

  const history = useNavigate();
  const Countries = useSelector(state => state.countries);

  const submitForm = (e) => {
    e.preventDefault()

    const dataObject = Object.values(data);
    const formComplete = dataObject.find(e => e === null)

    if (countryId.length < 1) {
      setRequiredMessage(true)
    }

    if (formComplete === null || countryId.length < 1 || !sendForm) {
      alert('Fill in the form correctly')
    } else {
      const value = { data, ct: countryId }

      fetch('http://localhost:3001/activities', {
        method: 'POST',
        body: JSON.stringify(value),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
        .then(response => alert(response.message))
        .catch(error => console.error('Error:', error));

      history("/home")
    }
  };

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
          <input type="text" name='touristActivity'
            className={errorName && style.labelInput}
            value={data.touristActivity}
            onChange={(e) => { handlerChange(e, setData, data) }}
            onFocus={(e) => { set(e, setSendForm, setErrorName, setErrorTime, setRequiredMessage) }}
            onBlur={(e) => { handlerError(e, setErrorName, setMessageError, setErrorTime, setSendForm) }}
          />
          {errorName && <span>{messageError}</span>}
        </div>

        <div className={style.formLabel} >
          <label>Difficulty:</label>
          <div className={style.inputcheck} >
            <input type="radio" name="difficulty" id='1' onChange={(e) => { handlerCheck(e, setData, data) }} />1
            <input type="radio" name="difficulty" id='2' onChange={(e) => { handlerCheck(e, setData, data) }} />2
            <input type="radio" name="difficulty" id='3' onChange={(e) => { handlerCheck(e, setData, data) }} />3
            <input type="radio" name="difficulty" id='4' onChange={(e) => { handlerCheck(e, setData, data) }} />4
            <input type="radio" name="difficulty" id='5' onChange={(e) => { handlerCheck(e, setData, data) }} />5
            <span>Required selection</span>
          </div>
        </div>

        <div className={style.formLabel} >
          <label>Duration:</label>
          <input type="number" name='duration'
            className={errorTime && style.labelInput}
            value={data.duration}
            onChange={(e) => { handlerChange(e, setData, data) }}
            onFocus={(e) => { set(e, setSendForm, setErrorName, setErrorTime, setRequiredMessage) }}
            onBlur={(e) => { handlerError(e, setErrorName, setMessageError, setErrorTime, setSendForm) }}
            placeholder="expressed in minutes" />MINUTES
          {errorTime && <span>{messageError}</span>}
        </div>

        <div className={style.formLabel}>
          <label>Season:</label>
          <div className={style.inputcheck} >
            <input type="radio" name='season' id="Summer" onChange={(e) => { handlerCheck(e, setData, data) }} onFocus={(e) => { set(e) }} />Summer
            <input type="radio" name='season' id="Fall" onChange={(e) => { handlerCheck(e, setData, data) }} />Fall
            <input type="radio" name='season' id="Winter" onChange={(e) => { handlerCheck(e, setData, data) }} />Winter
            <input type="radio" name='season' id="Spring" onChange={(e) => { handlerCheck(e, setData, data) }} />Spring
            <span>Required selection</span>
          </div>
        </div>

        <div className={style.formLabelCountrie}>
          <p>Select a country for this activity:</p>
          <div className={style.btnCountrieMain}>
            {countryId.length > 0 &&
              countryId.map(element => {
                return <div key={element.codeId} className={style.btnCountrie}>
                  <p>{element.name}</p>
                  <button className={style.btnDelete} onClick={() => { deleteCountrie(element, setCountryId, countryId) }} >X</button>
                </div>
              })
            }
          </div>
          <div>
            <input type="text" name='countrySelect' onChange={(e) => { countryChange(e, setAllCountries, Countries) }}
              onFocus={(e) => { set(e, setSendForm, setErrorName, setErrorTime, setRequiredMessage) }}
            />
            <button>Search</button>
            {requiredMessage && <span>Required selection</span>}
          </div>
          {allCountries &&
            allCountries.map(element => {
              return <button
                key={element.name}
                onClick={() => { saveCountryId(element, setCountryId, countryId) }}
                className={style.btnSelectCountrie}
              >{element.name}</button>
            })
          }
        </div>
        <button type='submit' onClick={submitForm} className={style.btnSubmit} >Create</button>
      </div>

    </div>
  )
}

export default Form
