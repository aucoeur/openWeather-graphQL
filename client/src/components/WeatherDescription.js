import { React } from 'react';
import './WeatherDescription.css';

function WeatherDescription(props) {
  const { location, temperature, description, feelsLike, tempMin, tempMax, status } = props.data
  console.log(props.data)

  let units;
  switch (props.unit) {
    case "imperial":
      units = "F"
      break
    case "metric":
      units = "C"
      break
    default:
      units = "K"
  }


  if (status===200) {
    return (
      <div className="WeatherDescription">
        <table>
          <tr>
            <th colSpan="2">
              <h2>{location}</h2>
            </th>
          </tr>
          <tr>
            <td>Description:</td>
            <td>{description}</td>
          </tr>
          <tr>
            <td>Feels Like:</td>
            <td>{feelsLike}° {units}</td>
          </tr>
          <tr>
            <td>Temp: </td>
            <td>{temperature}° {units}</td>
          </tr>
          <tr>
            <td>High:</td>
            <td>{tempMax}° {units}</td>
          </tr>
          <tr>
            <td>Low:</td>
            <td>{tempMin}° {units}</td>
          </tr>
        </table>
      </div>
    )
  }
  else {
    return <div className="WeatherDescription"> Error: {status} </div>
  }
}

export default WeatherDescription;
