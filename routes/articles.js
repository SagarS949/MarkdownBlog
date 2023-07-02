const express = require('express')
const Article = require('./../models/article')
const router = express.Router()

router.get('/new', (req,res)=>{
    // sends a new article to be rendered(will be empty for all fields)
    res.render("articles/new", {article: new Article()})
})

router.get('/:slug',async (req,res)=>{
    const article = await Article.findOne({slug: req.params.slug})
    if(article == null){
        res.redirect('/')
    }
    //goes to show.ejs to display article
    res.render('articles/show',{article: article})
})

//called when form is submitted to create new article from new.ejs
router.post('/',async (req,res)=>{
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    })
    try{
        article = await article.save()
        console.log(article.id)
        //redirect to display article that was just created
        res.redirect(`articles/${article.slug}`)
    }catch (err){
        console.log(err)
        //done to prefill fields with already prev entered data
        res.render('articles/new',{article: article})
    }

})

router.post('/delete/:id', async (req,res)=>{
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

module.exports = router