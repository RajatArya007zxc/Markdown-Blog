const express=require('express');
const router=express.Router();
const Article=require('../models/article')

router.get('/new',(req,res)=>{
    // res.send("this is awesome")
    // res.render('articles/new')
    res.render('articles/new',{article:new Article()})
})

router.get('/:id',async (req,res) => {
     

    let article= await Article.findById(req.params.id)

    if(article ==null) res.redirect('/'); // back to homepage
    res.render('articles/show',{article:article})
})

router.post('/',async (req,res)=>{
    
    let article=new  Article({
        title:req.body.title,
        description:req.body.description,
        markdown:req.body.markdown
    })
  try{
    article=await article.save()
    res.redirect(`/articles/${article.id}`)
  }
  catch(e){
   console.log(e);
     res.render('articles/new',{article:article})
  }
  
})
module.exports =router;