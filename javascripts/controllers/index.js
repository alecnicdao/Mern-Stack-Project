export const homePage = (req, res, next) => {
    res.render('layout', {content: 'home', title: 'The NBA'}) // name to title or title to name?
}

export const indexPage = (req, res, next) => {
    res.render('layout', {content: 'index', title: 'Top 5 NBA Players'}) // name to title or title to name?
}

export const aboutPage = (req, res, next) => {
    res.render('layout', {content: 'about', title: 'The National Basketball Association'})
}

export const contactPage = (req, res, next) => {
    res.render('layout', {content: 'contact', title: 'Contact us'})
}

export const signInPage = (req, res, next) => {
    res.render('layout', {content: 'signin', title: 'Sign in'})
}

export const signUpPage = (req, res, next) => {
    res.render('layout', {content: 'signup', title: 'Sign up'})
}

export const seemorePage = (req, res, next) => {
    res.render('layout', {content: 'seemore', title: 'The World\'s Top Players'})
}