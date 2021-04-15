import { useState } from 'react'
import { gql } from '@apollo/client'
import { client } from '../index'

import './Weather.css'
// import Sun from '../assets/sun.svg';

function Weather() {
  const [zip, setZip] = useState('')
  const [weather, setWeather ] = useState('')

  async function getWeather() {
    try {
      const json = await client.query({
        query: gql`
          query {
            getWeather(zip: $zip) {
              temperature
              description
            }
          }`
      })
      setWeather(json)
    } catch(err) {
      console.log(err.message)
    }
  }

  return (
    <div className="Weather">



      <form onSubmit={(e) => {
        e.preventDefault()
        getWeather()
      }}>
        <input className="textField"
          type="text"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      {weather ? <h1>{weather.data.getWeather.temperature}</h1> : null}
    </div>
  )
}

export default Weather
