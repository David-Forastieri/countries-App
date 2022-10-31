import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { addTouristActivity } from '../../actions'
import style from './Form.module.css'

const Form = () => {

  const [allCountries, setAllCountries] = useState([])
  const [selecCountrie, setSelecCountrie] = useState([])
  const [data, setData] = useState({
    touristActivity: "",
    difficulty: "",
    duration: "",
    season: ""
  })

  const history = useNavigate()
  const dispatch = useDispatch()
  const Countries = useSelector(state => state.countries)



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

  const handleChange = (e) => {
    let countriesSearch = Countries.filter(ch => ch.name.common.toLowerCase().indexOf(e.target.value) !== -1)
    setAllCountries(countriesSearch)
  }

  const submitForm = (e) => {
    e.preventDefault()
    dispatch(addTouristActivity(data, selecCountrie))
    setData({
      touristActivity: "",
      difficulty: "",
      duration: "",
      season: ""
    })
    history("/home")
  }

  const deleteCountrie = (name) => {
    setSelecCountrie(selecCountrie.filter(e => e !== name))
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
            <input type="radio" name="difficulty" id='Easy' onChange={handlerCheck} />Easy
            <input type="radio" name="difficulty" id='Normal' onChange={handlerCheck} />Normal
            <input type="radio" name="difficulty" id='Hard' onChange={handlerCheck} />Hard
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
          {selecCountrie.length > 0 &&
            selecCountrie.map(e => {
              return <div key={e} className={style.btnCountrie}>
                <p>{e}</p>
                <button className={style.btnDelete} onClick={() => { deleteCountrie(e) }} >X</button>
              </div>
            })
          }
        </div>
        <div>
          <input type="text" onChange={handleChange} />
          <button>Search</button>
        </div>
        {allCountries &&
          allCountries.map(e => {
            return <button
              key={e.name.common}
              onClick={() => { setSelecCountrie([...selecCountrie, e.name.common]) }}
              className={style.btnSelectCountrie}
            >{e.name.common}</button>
          })
        }
      </div>
      <button type='submit' onClick={submitForm} className={style.btnSubmit} >Create</button>
      </div>
      
    </div>
  )
}

export default Form
