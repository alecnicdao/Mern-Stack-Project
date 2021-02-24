// Required by Webpack - do not touch
// require.context('../', true, /\.(html|json|txt|dat)$/i)
require('../favicon.ico')
require.context('../images/', true, /\.(gif|jpg|png|svg|eot|ttf|woff|woff2)$/i)
require.context('../stylesheets/', true, /\.(css|scss)$/i)

// TODO
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import ContactForm from './components/ContactForm'
import SignInForm from './components/SignInForm'
import SignUpForm from './components/SignUpForm'
import SignOut from './components/SignOut'

if(document.getElementById('main')){
    ReactDOM.render(<App/>, document.getElementById('main'))
}else if(document.getElementById('contact')){
    ReactDOM.render(<ContactForm/>, document.getElementById('contact'))
}else if(document.getElementById('signup')){
    ReactDOM.render(<SignUpForm/>, document.getElementById('signup'))
}else if(document.getElementById('signin')){
    ReactDOM.render(<SignInForm/>, document.getElementById('signin'))
}

if(document.querySelector('#_sign_user_out')){
    document.querySelector('#_sign_user_out').onclick = (e) => {
        let el = document.createElement('div')
        document.body.appendChild(el)
        ReactDOM.render(<SignOut/>, el)
    }
}