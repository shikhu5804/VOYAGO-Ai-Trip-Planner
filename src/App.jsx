import React from 'react'
import { Button } from './components/ui/button'
import { Routes, Route } from 'react-router-dom'
import  Home  from './page/Home'
import CreateTrip from './page/CreateTrip'
import ViewTrip from './page/ViewTrip'
import MyTrips from './page/MyTrip'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/create-trip" element={<CreateTrip/>} />
        <Route path="/view-trip/:tripId" element={<ViewTrip/>} />
        <Route path="/my-trips" element={<MyTrips/>} />
      </Routes>
    </div>
  )
}

export default App
