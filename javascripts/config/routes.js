import express from 'express'
import {seemorePage, homePage, contactPage, aboutPage, indexPage, signInPage, signUpPage} from '../controllers/index'
import { contactAPI } from '../controllers/contacts'
import {allPlayersAPI, onePlayerAPI, createPlayerAPI, updatePlayerAPI, deletePlayerAPI} from '../controllers/players'
import {registerUserAPI, signUserInAPI} from '../controllers/users'
import jwt from 'jsonwebtoken'
import { APP_SECRET } from './vars'
let router = express.Router()

function isSignedIn(req){
    try{
        jwt.verify(req.cookies.token, APP_SECRET)
        return true
    }catch(err){
        return false
    }
}

function requireSignIn(req, res, next){
    if(isSignedIn(req)){
        next()
    }else{
        res.status(401)
        res.end()
    }
}

export function configureRoutes(app){
    app.all('*', (req, res, next) => {
        app.locals.signedIn = isSignedIn(req)
        next()
    })
    router.get('/', homePage)
    router.get('/', indexPage)
    router.get('/about', aboutPage)
    router.get('/contact', contactPage)
    router.get('/signin', signInPage)
    router.get('/signup', signUpPage)

    router.get('/seemore', seemorePage)


    router.get('/players*', indexPage)
    router.get('/register', indexPage)
    router.get('/signin', indexPage)

    // Player API Endpoints
    router.get('/api/players', allPlayersAPI)
    router.get('/api/players/:id', onePlayerAPI)
    router.post('/api/players', requireSignIn, createPlayerAPI)
    router.put('/api/players/:id', requireSignIn, updatePlayerAPI)
    router.delete('/api/players/:id', requireSignIn, deletePlayerAPI)

    // Users
    router.post('/api/users/register', registerUserAPI)
    router.post('/api/users/signin', signUserInAPI)
    router.post('/api/contact', contactAPI)

    app.use('/', router)
}