const data = require('./data');

const appRouter = (app, fs) => {
    app.get('/', (req, res) => {
        res.send(`<h1>Current working routes: /image</h1>`)
    })

    data(app, fs);
}

module.exports = appRouter;