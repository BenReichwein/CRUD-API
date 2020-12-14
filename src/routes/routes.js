const data = require('./data');
const posts = require('./posts');
const user = require('./user');

const appRouter = (app, fs) => {
    app.get('/', (req, res) => {
        res.send(`<h1>Current working routes:</h1><br/>
        <p>GET: /image (data from json)</p><br/>
        <p>POST: /user/signup (create user)</p><br/>
        <p>POST: /user/login (logs in user)</p><br/>
        <p>PATCH: /user/:id (update user info)</p><br/>
        <p>GET: /user/:userID (get user info)</p><br/>
        <p>POST: /user/logout (logs out user, and expires token)</p><br/>
        <p>GET: /posts (get all posts)</p><br/>
        <p>POST: /posts (post in json with "title":"", "description":"")</p><br/>
        <p>GET: /posts/:postId (get specific post)</p><br/>
        <p>DELETE: /posts/:postId (delete post)</p><br/>
        <p>PATCH: /posts/:postId (update post)</p><br/>`);
        res.end();
    })
    // Routes
    data(app, fs);
    posts(app);
    user(app);
}

module.exports = appRouter;