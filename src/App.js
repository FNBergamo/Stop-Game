import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import './App.css'

const DEFAULT_LETTERS_ARRAY = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'I',
  'J',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
]
export default function App() {
  const initialTime = 120
  const [elapsedTime, setElapsedTime] = useState(0)
  const [letters, setLetters] = useState(DEFAULT_LETTERS_ARRAY)
  const [letter, setLetter] = useState('')

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setElapsedTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0))
    }, 1000)

    return () => {
      clearInterval(timerInterval)
    }
  }, [])

  const getRandomIndex = () => Math.floor(Math.random() * letters.length)

  const getRandomLetter = () => {
    const luckyNumber = getRandomIndex()
    const randomLetter = letters[luckyNumber]
    setLetters((prevLetters) => prevLetters.filter((l) => l !== randomLetter))
    setLetter(randomLetter)
  }

  const resetTimer = () => setElapsedTime(initialTime)

  const newRound = () => {
    getRandomLetter()
    resetTimer()
  }

  const formattedTime = dayjs().startOf('day').second(elapsedTime).format('mm:ss')

  return (
    <div className='App'>
      <p className='timer'>{formattedTime}</p>
      <p className='letter'>{letter}</p>
      <button className='button' onClick={newRound}>
        Sortear
      </button>
    </div>
  )
}

