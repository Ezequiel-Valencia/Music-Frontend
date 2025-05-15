import { Suspense } from 'react'
import './App.scss'
import TopBar from './TopBar'

function App() {
  return (
    <>
      <section id='front-page'>
        <TopBar></TopBar>
        <Suspense fallback={<div>Grabbing songs...</div>}>

        </Suspense>
      </section>
    </>
  )
}

export default App
