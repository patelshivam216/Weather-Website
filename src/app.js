const path = require('path');
const express = require('express');
const app=express();
const hbs = require('hbs');
const geocode = require('./utiles/geocode');
const forecast=require('./utiles/forecast');

const port = process.env.PORT || 3000


// setup path for express congi.
const publicDirectoryPath = path.join(__dirname,'../public');
const viewpath = path.join(__dirname,'../templates/views');
const partialsPath=path.join(__dirname,'../templates/partials')

// setup handlerbar engines and views location
app.set('view engine','hbs');
app.set('views',viewpath);
hbs.registerPartials(partialsPath);

// setup public directory to serve 
app.use(express.static(publicDirectoryPath))


app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Shivam Patel'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Shivam Patel'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Shivam Patel'
    });
})

app.get('/weather',(req,res)=>{

    if(!req.query.search){
        return res.send({
            error:'you must provide search term!'
        })
    }

    
    geocode(req.query.search,(error,data)=>{
        if(error){
            res.send({error});
        }else{
           
            forecast(data,(error,info)=>{
                if(error){
                    res.send({error});
                }else{
                   res.send({

                    forecast:info,
                    location:data.location,
                    address:req.query.search

                   });
                }
            })

        }
    })



})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        msg:'help is artical is not found!',
        name:'Shivam Patel'
    })
})

app.get('/*',(req,res)=>{
    res.render('404',{
        msg:'My page 404',
        name: "Shivam Patel"
    })
})


app.listen(port,()=>{
    console.log("Running on port " + port);
})