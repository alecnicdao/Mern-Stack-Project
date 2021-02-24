import React from 'react'
import PlayerList from './PlayerList'
import { BrowserRouter as Router } from 'react-router-dom'

export default function Main() {
    return (
        <Router>
            <PlayerList/>
        </Router>
    )
  }