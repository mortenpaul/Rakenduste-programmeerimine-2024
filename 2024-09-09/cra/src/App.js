import React, { useState } from "react"
import "./App.css"
import Name from "./components/Name"
import Counter from "./components/Counter"
import PropDrilling from "./components/PropDrilling"
import Show from "./components/Show"
import Context from "./components/Context"
import Me from './components/Me';

function App() {
  const [show, setShow] = useState(true)

  const toggleShow = () => setShow(prevShow => !prevShow)

  return (
    <>
      <Me name="Morten" />
    </>
  )
}

export default App