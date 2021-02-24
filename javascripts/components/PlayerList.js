import React, { createContext, useEffect, useState } from 'react'
import Player from './Player'
import { Switch, Route, Link, Redirect, useHistory } from 'react-router-dom'
import { About, ErrorNotFound } from './Pages'
import PlayerForm from './PlayerForm'
import { useCookies } from 'react-cookie'

export const PlayerContext = createContext()
export default function PlayerList(){
    const [players, setPlayers] = useState()
    const [cookies, setCookie, removeCookie] = useCookies(['token'])
    let [authenticated, setAuthenticated] = useState(cookies.token !== undefined)
    const history = useHistory()

    useEffect(() => {
        if(!players){
            fetch('/api/players', {
                credentials: 'same-origin',
            })
            .then(response => response.text())
            .then((data) => {
                setPlayers(JSON.parse(data, (key, value) => {
                    const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:.*Z$/ // this lineee omggggg
                    if(typeof value === 'string' && dateFormat.test(value)){
                        return new Date(value)
                    }
                    return value
                }))
            })
            .catch(console.error)
        }
    })

    if(!players)
        return <p>Loading...</p>

    return (
        <PlayerContext.Provider value={{players, setPlayers, authenticated, setAuthenticated}}> 
            <div className="pull-content-right">        
                <Route exact path="/players">
                    <button className="primary" onClick={
                        () => {
                            players.sort((a, b) => a.rating - b.rating)
                            setPlayers(players.map(p => p))
                        }
                    }>Sort</button>
                    <button className="primary" onClick={() => history.push('/players/new')}>Add a new player</button>
                    <a class="buttonLM" href="/seemore" role="button">Learn more</a>
                </Route>
            </div>
            <main>
                <Switch>
                    <Route exact path="/players">
                        {players.map((p, i) => {
                            return <Player key={p.id} player={p} onLike={
                                () => {
                                    players[i].likes = players[i].likes ? players[i].likes + 1 : 1

                                    setPlayers(players.map(p => p))
                                }
                            }/>
                        })}
                    </Route>
                    <Route path="/players/new"><PlayerForm/></Route>
                    <Route path="/players/:pid/edit"><PlayerForm/></Route>
                    <Redirect from="" to ="/players"/>
                    <Route path="*"><ErrorNotFound/></Route>
                </Switch>
            </main>
        </PlayerContext.Provider>
    )
}