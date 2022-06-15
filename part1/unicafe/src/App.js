import { useState } from 'react'

const Button = props => <button onClick={props.handleClick}> {props.text} </button>

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  
  let all = good + neutral + bad

  if (all > 0) {
    return (
      <table>
        <StatisticLine text='good' value={good} />
        <StatisticLine text='neutral' value={neutral} />
        <StatisticLine text='bad' value={bad} />
        <StatisticLine text='all' value={all} />
        <StatisticLine text='average' value={(good - bad) / all} />
        <StatisticLine text='positive' value={(good / all) * 100 + ' %'} />
      </table>
    )
  }

  return (
    <div>
      No feedback given
    </div>
  )
  
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)

  const handleNeutral = () => setNeutral(neutral + 1)

  const handleBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGood} text='good'/>
      <Button handleClick={handleNeutral} text='neutral'/>
      <Button handleClick={handleBad} text='bad'/>
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App