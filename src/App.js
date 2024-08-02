import React from "react"
import './App.css';
import Die from "./Die"
import { nanoid } from 'nanoid'
import Confetti from "react-confetti"


export default function App() {
    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [totalSeconds, setTotalSeconds] = React.useState(0)
    const [isTimerRunning, setIsTimerRunning] = React.useState(false)
    const [fastestTime, setFastestTime] = React.useState(
        () => JSON.parse(localStorage.getItem("fastestTime")) || null
    )

    React.useEffect(() => {
      let timer
      if(isTimerRunning){
      timer = setInterval(() => {
        setTotalSeconds(prev => prev + 1)
      }, 1000)}

      return () => clearInterval(timer)
    }, [isTimerRunning])
    
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0")
    const seconds = String(Math.floor(totalSeconds % 60)).padStart(2, "0")

    React.useEffect(() => {
      const allHeld = dice.every(die => die.isHeld)
      const sameValue = dice.every(die => die.value === dice[0].value)
      if (allHeld && sameValue) {
        setTenzies(true)
        setIsTimerRunning(false)
        updateFastestTime()
      }
    },[dice])

    function updateFastestTime() {
      if (!fastestTime || totalSeconds < fastestTime){
        setFastestTime(totalSeconds)
        localStorage.setItem("fastestTime", JSON.stringify(totalSeconds))
    }}

    const fastestMinutes = fastestTime ? String(Math.floor(fastestTime / 60)).padStart(2, "0") : "00"
    const fastestSeconds = fastestTime ? String(Math.floor(fastestTime % 60)).padStart(2, "0") : "00"

    function generateNewDie() {
      return {
        value: (Math.ceil(Math.random() * 6)),
        id: nanoid(),
        isHeld: false
      }
    }

    function allNewDice() {
      const newDice = []
      for (let i=0; i<10; i++) {
        newDice.push(generateNewDie())
      }
      return newDice
    }

    function rollDice() {
      if (!tenzies){
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? die : generateNewDie()
      }))
      if (!isTimerRunning) {
        setIsTimerRunning(true)
      }
    } else {
        setDice(allNewDice())
        setTenzies(false)
        setTotalSeconds(0)
        setIsTimerRunning(false)
      }
    }

    function holdDice(id) {
      setDice(oldDice => oldDice.map(die => {
        return die.id === id ? 
          {...die, isHeld: !die.isHeld} :
          die
      }))
    }

    const diceElements = dice.map(die => (
      <Die 
        key={die.id}
        value={die.value}
        isHeld={die.isHeld}
        holdDice={() => holdDice(die.id)}
      />
    ))


    return (
      <main className="App">
        {tenzies && <Confetti />}
        <section className="top-section">
          <div className="timer" id="timer-display">
            Time: {minutes}:{seconds}
          </div>
          <div className="best-time" id="best-time">
            Best Time: {fastestMinutes}:{fastestSeconds}</div>
        </section>
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          {tenzies ? "You Won! 🎉" : "Roll until all dice are the same. Click each die to freeze it at its current value between rolls."}</p>
        <div className="dice-container">
          {diceElements}
        </div>
        <button className="btn" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
        </button>
      </main>
    );
  }