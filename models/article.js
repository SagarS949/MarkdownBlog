const mongoose = require('mongoose')
const {marked} = require('marked')
const slugify = require('slugify')
//const createDomPurify = require('dompurify')//sanitize html to prevent malicious code from being entered(injection attack)
//const {JSDOM} = require('jsdom')//render html inside nodejs

//const dompurify = createDomPurify(new JSDOM().window)

const articleSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
        
    },
    description: {
        type: String
    },
    markdown: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        required: true,
        unique: true
    }
    // sanitizedHtml: {
    //     type: String,
    //     required: true
    // }
})

//run this fn right before validation is done every time we create update delete etc
articleSchema.pre('validate', function(next){
    if(this.title){
        this.slug = slugify(this.title, {lower: true, strict: true})
    }

    // if(this.markdown){
    //     this.sanitizedHtml = dompurify.sanitize(marked(this.markdown))//converts markdown to html and purifies any malicious code and escape html characters 
    // }
    next()
})

module.exports = mongoose.model('Article', articleSchema )