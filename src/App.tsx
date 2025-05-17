import { Suspense } from 'react'
import './App.scss'
import TopBar from './TopBar'
import MusicBody from './_music-selection/MusicBody'
import { MusicErrorBoundary } from './_music-selection/MusicErrorBoundary'
import { todaysSelectionStore } from '../utils/MusicStore'

function App() {

  const fallbackStyle = () => ({
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    height:"20vh",
    verticalAlign: "center"
  });

  const setTodaysSelection = todaysSelectionStore((state) => state.setSelection)

  return (
    <>
      <section id='front-page'>
        <TopBar></TopBar>
          <MusicErrorBoundary setTodaysSelection={setTodaysSelection}>
            <Suspense fallback={<div className='center-text' style={fallbackStyle()}>Getting Songs...</div>}>
              <MusicBody></MusicBody>
            </Suspense>
          </MusicErrorBoundary>
      </section>
    </>
  )
}

export default App
