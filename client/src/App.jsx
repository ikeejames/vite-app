import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header from './components/Header'
import ShoppingForm from './components/ShoppingForm'
import TodoForm from './components/TodoForm'
import './App.css'
import './sass/main.scss'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Header />
        <TodoForm />
      </div>
    </>
  )
}

export default App
