const data = require('./data');

const appRouter = (app, fs) => {
    app.get('/', (req, res) => {
        res.send('Current working routes: /abs')
    })
    data(app, fs);
}

module.exports = appRouter;