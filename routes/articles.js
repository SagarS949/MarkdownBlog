const express = require('express')
const Article = require('./../models/article')
const router = express.Router()

router.get('/new', (req,res)=>{
    // sends a new article to be rendered(will be empty for all fields)
    res.render("articles/new", {article: new Article()})
})

router.get('/edit/:id', async (req,res)=>{
    const article = await Article.findById(req.params.id)
    res.render("articles/edit", {article: article})
})

router.post('/editArticle/:id',async(req,res,next)=>{
    req.article = await Article.findById(req.params.id)
    next()
},saveArticleAndRedirect('edit'))

router.get('/:slug',async (req,res)=>{
    const article = await Article.findOne({slug: req.params.slug})
    if(article == null){
        res.redirect('/')
    }
    //goes to show.ejs to display article
    res.render('articles/show',{article: article})
})

//called when form is submitted to create new article from new.ejs
router.post('/',async (req,res,next)=>{
    req.article = new Article()
    next()//calls below middleware
},saveArticleAndRedirect('new'))

router.post('/delete/:id', async (req,res)=>{
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

//middleware
function saveArticleAndRedirect(path){
    return async(req,res) => {
        let article = req.article
        article.title = req.body.title
        article.description = req.body.description
        article.markdown = req.body.markdown
    
        try{
            article = await article.save()
            console.log(article.id)
            //redirect to display article that was just created
            res.redirect(`articles/${article.slug}`)
        }catch (err){
            console.log(err)
            //done to prefill fields with already prev entered data
            res.render(`articles/${path}`,{article: article})
        }
    }
}

module.exports = router