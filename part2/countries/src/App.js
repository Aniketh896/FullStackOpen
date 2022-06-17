import { useState, useEffect } from 'react'
import axios from 'axios'

const CountryView = ({ country }) => {

  const api_key = process.env.REACT_APP_API_KEY
  const [weather, setWeather] = useState({main: {temp: 0}, weather:[{icon: ''}], wind: {speed: 0}})

  useEffect(() => {
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${api_key}`)      
    .then(response => setWeather(response.data))
  }, [api_key, country.capital])

  return (
    <div>
      <h2>{country.name.common}</h2>
      capital {country.capital} <br />
      area {country.area}
      <h3>languages:</h3>
      <ul>
        {Object.entries(country.languages).map(lang => 
          <li key={lang[0]}> {lang[1]} </li>
        )}
      </ul>
      <img 
        src={country.flags.png} 
        alt={`${country.name.common} Flag`} 
        style={{maxWidth: 150}}/> <br />
      <h2>{`Weather in ${country.capital}`}</h2>
      {console.log(weather)}
      {`temperature ${weather.main.temp} Celcius`} <br />
      <img 
        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
        alt={`${country.capital} Weather Icon`} 
        style={{maxWidth: 150}}/> <br />
      {`wind ${weather.wind.speed} m/s`}

    </div>
  )
}


const Country = ({ country }) => {

  const [showView, setView] = useState(false)

  const handleShowClick = () => {
    setView(!showView)
  }

  if (showView) {
    return (
      <> 
        <CountryView country={country}/>
      </>
    )
  } else {
    return (
      <> 
        <br />{country.name.common} <button onClick={handleShowClick}> show </button>
      </>
    )
  }
  
}


const Countries = ({ countries }) => {

  if (countries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  } else if (countries.length > 1 & countries.length <= 10)  {
    // countries = filter(obj => obj.name.toLowerCase().includes(newFilter.toLowerCase()))
    return (
      <>
        {countries.map((country) => 
          <Country key={country.name.common} country={country}/>
        )}
      </>
    )
  } else if (countries.length === 1 ) {
    const country = countries[0]
    return (
      <CountryView country={country}/>
    )
  }
}


const App = () => {

  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios
    .get('https://restcountries.com/v3.1/all')      
    .then(response => setCountries(response.data))
  }, [])

  const handleFilterChange = (event) => setNewFilter(event.target.value)

  const countriesToShow = countries.filter(country =>
                            country.name.common.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      find countries <input value={newFilter} onChange={handleFilterChange} />
      <Countries countries={countriesToShow} />
    </div>
  )
}

export default App