module.exports = (app, passport) => {
    app.use('/', require('./controllers/main/index'))
    app.use('/users', require('./controllers/users/index')(passport))
}