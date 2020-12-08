const data = require('./data');

const appRouter = (app, fs) => {
    app.get('/', (req, res) => {
        res.send(`<h1>Current working routes: /imgs</h1>`)
    })

    data(app, fs);
}

module.exports = appRouter;