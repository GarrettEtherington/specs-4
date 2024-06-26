const express = require('express')
const cors = require('cors')
const { getAllPosts, getCurrentUserPosts, addPost, editPost, deletePost} = require('./controllers/posts.jsx')
const { register, login } = require(`./controllers/auth.jsx`)
const {isAuthenticated} = require(`./middleware/isAuthenticated.jsx`)
const {sequelize} = require(`./util/database.js`)
const {User} = require('./models/user')
const {Post} = require('./models/post')
const app = express()
const PORT = 3001

User.hasMany(Post)
Post.belongsTo(User)

app.use(express.json())
app.use(cors())

app.post(`/register`, register)
app.post(`/login`, login)

app.get(`/posts`, getAllPosts)

app.get(`/userposts/:userId`, getCurrentUserPosts)
app.post('/posts', isAuthenticated, addPost)
app.put('/posts/:id', isAuthenticated, editPost)
app.delete('/posts/:id', isAuthenticated, deletePost)

sequelize.sync()
.then(() => {
   app.listen(PORT, () => console.log(`db sync successful & server running on port ${PORT}`))
})
.catch(err => console.log(err))
