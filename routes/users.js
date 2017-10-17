const
    express = require('express')
    passport = require('passport')
    usersRouter = new express.Router()
    usersCntr = require('../controllers/users.js')

usersRouter.route('/login')
    .get((req, res)=>{
        res.render('login')
    })
    .post(passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/login'
    }))

usersRouter.route('/signup')
    .get((req, res)=>{
        res.render('signup')
    })
    .post(passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup'
    }))


usersRouter.get('/profile', isLoggedIn, (req, res)=>{
    res.render('profile', {user: req.user})
})

usersRouter.get('/logout', (req, res)=>{
    req.logout()
    res.redirect('/')
})

usersRouter.get('/edit', isLoggedIn, (req, res)=>{
    res.render('edit', {user: req.user, message: req.flash('editProfileMessage')})
})

usersRouter.patch('/users/:id/edit', isLoggedIn, usersCntr.update)
usersRouter.delete('/users/:id', isLoggedIn, usersCntr.destroy)

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()) return next()
    res.redirect('/')
}

module.exports = usersRouter