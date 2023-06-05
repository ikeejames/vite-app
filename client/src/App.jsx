import { useState } from 'react'
import Header from './components/Header'
import TodoForm from './components/TodoForm'
import './App.css'
import './sass/main.scss'
import Footer from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='container'>
        <Header />
        <TodoForm />
        <Footer />
      </div>
    </>
  )
}

export default App
