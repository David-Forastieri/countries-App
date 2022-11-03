const { Router } = require('express');
const axios = require("axios");
const { Country, TouristActivity} = require('../db');
const {op, json} = require("sequelize");
const { get } = require('../app');
const server = require('../app');
const router = Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// url--> 'https://restcountries.com/v3/all'

router.get('/',async (req, res)=>{
  //http://localhost:3001/
  let getDB = await Country.findAll()

  if(!getDB.length){
    const data = await axios.get('https://restcountries.com/v3/all') 
    
      const dataSaveDB = await data.data.map(e=>{
        return {
          codeId : e.cca3,
          name : e.name.common,
          continents : e.continents[0],
          flag : e.flags[1],
          capital : e.capital,
          area : e.area,
          subRegion : e.subregion,
          population : e.population
        }
      })
      await Country.bulkCreate(dataSaveDB)
      
      res.status(200).json(await Country.findAll())
    
  }else res.status(200).json(getDB)
    
})

router.get('/countries/:codeId', async (req, res)=>{
  //http://localhost:3001/countries/MYS
  const {codeId} = req.params;
  const country = await Country.findOne({
    where: {codeId : codeId},
      include: TouristActivity
  });
  res.status(200).json(country)
})

router.get('/countries', async (req, res)=>{
  //http://localhost:3001/countries?name=Peru
  const {name} = req.query;
  const getCountries = await Country.findAll({
    where: {
      name: name
    }
  })
  if(getCountries.length) res.status(200).json(getCountries)
  else res.json({error: "No country with that name"})
})

router.post('/activities', async (req, res)=>{
  //http://localhost:3001/activities

  let algo = req.body
  const newActivity = await TouristActivity.create({
    touristActivity: algo.data.touristActivity,
    duration: algo.data.duration,
    season: algo.data.season,
    difficulty: algo.data.difficulty
  })

  try {
    /* const {data, ct} = req.body;
    const {touristActivity, duration, season, difficulty} = data; */
    /* const newActivity = await TouristActivity.create({
      touristActivity: data.touristActivity,
      duration: data.duration,
      season: data.season,
      difficulty: data.difficulty
    }) */

    console.log(newActivity)

    await newActivity.setCountries(algo.ct)
    res.send(cagada)
  } catch (error) {
    res.send('algo salio mal')
  }
})

module.exports = router;
