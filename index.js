const express= require('express');
const path= require('path');

const port=8000;

const app=express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname, 'assets')));



 
//middlewares 
// app.use(express.urlencoded());
app.use(express.urlencoded({ extended: true }))

app.use(express.static('assets'));


//

var contact_list=[{
    name:"Rajesh",
    phone:'0122212514'
},
{
    name:"anyname",
    phone:'115533223'

}
]

//Created route and controller (function)
app.get('/',function(req,res){
    return res.render('home', 
        {title:"My contacts list",
            contact_list:contact_list
        });
        
});

app.get('/practice',function(req,res){
    return res.render('practice', {
        title:"This is fire"});
});

//used post for form
app.post('/contactlist', function(req,res){
    //contact_list.push({
        // name:req.body.name,
        // phone:req.body.phone,

       

    //})
    contact_list.push(req.body);
return res.redirect('/')
});

app.get('/delete-contact/',function(req,res){
    console.log(req.query);
    let phone= req.query.phone;

    let contactindex = contact_list.findIndex(contact => contact.phone == phone);

    if(contactindex != -1){
        contact_list.splice(contactindex, 1);
    }

    return res.redirect('/');
})


//app is listening on specific port 
app.listen(port,function(err){
    if(err){
        console.log('error',err);
    }
    console.log("express server is running on port", port)
});