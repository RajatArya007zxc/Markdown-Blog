const express=require('express');
const mongoose=require('mongoose');
const app=express();
const router=require('./routes/article.js')
const bodyParser=require('body-parser');
const Article =require('./models/article');


app.use(bodyParser.json({limit:"30mb",extended:true})); //sending images
app.use(bodyParser.urlencoded({limit:"30mb",extended:true})) //send request

// mongoose.connect('mongodb://localhost/blog',{useNewUrlParser:true,useUnifiedTopology:true})
mongoose.connect('mongodb+srv://rajatarya:123456789zxc@cluster0.p49iz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology:true})

app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))
mongoose.set('useFindAndModify',false);




app.get('/',async (req,res) => {
 
   const articles=await Article.find().sort({createdAt:'desc'});
   res.render('articles/index',{articles:articles});
})
app.use('/articles',router);
app.listen(5000,console.log("working"))