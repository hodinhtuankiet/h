import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Board from './pages/Boards/_id'
import Profile from './pages/Profile/Profile'
import DetailProfile from './pages/Profile/DetailProfile'
function App() {
  return (
    <Router>
      <Routes>
        {/* Route for Board Detail */}
        <Route path="/" element={<Board />} />

        {/* Route for Profile */}
        <Route path="/profile" element={<Profile />} />

        <Route path="/detail-profile" element={<DetailProfile />} />

        {/* Default Route - You can customize this as needed */}
        <Route path="/" element={<h1>Home Page</h1>} />
      </Routes>
    </Router>
  )
}

export default App
