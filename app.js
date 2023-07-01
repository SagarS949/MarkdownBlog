const articleRouter = require('./routes/articles')
const express = require('express')

const app = express()

//views written using ejs,view engine converts ejs to html
app.set('view engine','ejs')

app.use('/articles',articleRouter)

app.get('/',(req,res)=>{
    const articles = [{
        title: "Test Article",
        date: new Date(),
        description: "Test description"
    },{
        title: "Test Article2",
        date: new Date(),
        description: "Test description2"
    }]
    res.render('index', {articles:articles})
})
app.listen(5000, ()=>{
    console.log("Server started on port 5000");
})