const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const homePage = require('./controllers/homePage')
const createPost = require('./controllers/createPost')
const getPost = require('./controllers/getPost')
const storePost = require('./controllers/storePost')
const createUser = require('./controllers/createUser')
const storeUser = require('./controllers/storeUser')
const validationPostMiddleware = require('./middleware/storePost')

const app = new express()

mongoose.connect('mongodb://localhost:27017/node-js-blog',{useNewUrlParser: true})
mongoose.set('useCreateIndex', true)

app.use(fileUpload())
app.use(require('express-edge'));
app.set('views', `${__dirname}/views`);

app.use(express.static('public'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/post/store', validationPostMiddleware)



app.get('/', homePage)

app.get('/post/:id', getPost)

app.get('/create', createPost)

app.post('/post/store', storePost)

app.get('/auth/register', createUser)

app.post('/user/register', storeUser)



app.listen(3000,()=>{
    console.log('Listening to port 3000')
})
