const express = require('express')
const mongoose = require('mongoose')
const articleRouter = require('./routes/articles')
const Article = require('./models/article')

const app = express()

mongoose.connect('mongodb://localhost/blog',{
    useNewUrlparser: true, useUnifiedTopology: true
})

//views written using ejs,view engine converts ejs to html
app.set('view engine','ejs')

app.use(express.urlencoded({extended: false}))
app.use('/articles',articleRouter)

app.get('/',async (req,res)=>{
    const articles = await Article.find().sort({createdAt: 'desc'})
    res.render('articles/index', {articles:articles})
})
app.listen(5000, ()=>{
    console.log("Server started on port 5000");
})