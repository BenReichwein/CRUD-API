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
    app.get('/posts', async (req, res) => {
        try {
            const posts = await Post.find();
            res.json(posts)
        } catch (err) {
            res.json({message:`Error: ${err}`})
        }
    });
    // Submits a post - Needs to be req.json to submit
    app.post('/posts', async (req, res) => {
        const post = new Post({
            title: req.body.title,
            description: req.body.description
        });
        try {
            const savedPost = await post.save();
            res.json(savedPost);
        } catch (err) {
            res.json({message:`Error: ${err}`})
        }
    });
    // Specific post
    app.get('/posts/:postId', async (req, res) => {
        try {
            const post = await Post.findById(req.params.postId)
        } catch (err) {
            res.json({message:`Error: ${err}`})
        }
    })
    // Delete post
    app.delete('posts/:postId', async (req, res) => {
        try {
            const removedPost = await Post.remove({_id: req.params.postId});
            res.json(removedPost)
        } catch (err) {
            res.json({message:`Error: ${err}`})
        }
    })
    // Update post
    app.patch('posts/:postId', async (req, res) => {
        try {
            const updatedPost = await Post.updateOne(
                {_id:req.params.postId},
                {$set: {title:req.body.title}}
            );
            res.json(updatedPost);
        } catch (err) {
            res.json({message:`Error: ${err}`})
        }
    })
}

module.exports = appRouter;