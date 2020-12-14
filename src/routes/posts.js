const Post = require('../models/Post')

const posts = (app) => {
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
};

module.exports = posts;