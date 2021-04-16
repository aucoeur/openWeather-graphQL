import { useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import { client } from '../index'

import './Weather.css'
import WeatherDescription from './WeatherDescription'

// const GET_TEMP = gql`
//   query Temperaure($zip: Int!, $unit: Int) {
//     getWeather(zip: $zip, unit: $unit) {
//       temperature
//       description
//       }
//     }
//   `;

function Weather() {
  const [zip, setZip] = useState('')
  const [unit, setUnit] = useState('imperial')
  const [weather, setWeather ] = useState(null)

  async function getWeather() {
    try {
      const json = await client.query({
        query: gql`
          query {
            getWeather(zip: ${zip}, unit: ${unit}) {
              location
              temperature
              description
              feelsLike
              tempMin
              tempMax
              status
            }
          }`
      })
      setWeather(json)
    } catch(err) {
      console.log(err.message)
    }
  }

  return (
    <>
    <div className="Weather">
      <form onSubmit={(e) => {
        e.preventDefault()
        getWeather()
      }}>
        <input className="textField"
          type="text"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          pattern="(\d{5}([\-]\d{4})?)"
          placeholder="Enter Zip"
        />

        <button type="submit">Submit</button>

        <div className="radio">
          <input
            type="radio"
            name="Celsius"
            value="metric"
            checked={ unit === "metric" ? true : false }
            onChange={e => setUnit(e.target.value)} />
          <label htmlFor="C">Celcius
          </label>

          <input
            type="radio"
            name="Kelvin"
            value="default"
            checked={ unit === "default" ? true : false }
            onChange={e => setUnit(e.target.value)} />
          <label htmlFor="K">Kelvin</label>

          <input
            type="radio"
            name="Fahrenheit"
            value="imperial"
            checked={ unit === "imperial" ? true : false }
            onChange={e => setUnit(e.target.value)} />
          <label htmlFor="F">Fahrenheit</label>
        </div>
      </form>
    </div>
    { weather ?
      (<WeatherDescription data={weather.data.getWeather} unit={unit} />) : null }
    </>
  )
}

export default Weather
