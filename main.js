const { json } = require('express');
const express = require('express')
const fs = require('fs');

const app = express()
const port = 3000


app.use(express.static('public'))
app.use(express.json());
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

//saving the data into db.txt
app.post('/savetodo',function(req,res){
        console.log(req.body);
        fs.readFile(__dirname+"/db.txt","utf-8",function(err,data){
            let todos;
                if(err){
                    res.send("error");
                }
                else {
                    console.log("I am here")
                    if(data.length === 0){
                        todos=[]
                    }
                    else {
                        todos=JSON.parse(data);
                    }
                    todos.push(req.body);
                    console.log(todos);
                    fs.writeFile('./db.txt',JSON.stringify(todos),function(err){
                        res.end("data send successfully");
                    })
                }
        })
})

//extracting the data from db.txt
app.post('/getdata',(req,res)=>{
       fs.readFile(__dirname+"/db.txt",(err,data)=>{
        let todos;
        if(err){
            res.send("An error occured in reading the file");
        }
        else {
                if(data.length === 0){
                    todos=[]
                   
                }
                else {
                    todos=JSON.parse(data)
                    // console.log("printing the value of todos"+todos)
                    // console.log(typeof )
                }
                res.json(todos);
        }
       })
})

//creating an endpoing for checkbox and delete functionality
app.post('/update',(req,res)=>{
    //  let element=JSON.stringify(req.body);
    let element;
     let id=req.body.id;
     console.log(id)
    console.log(req.body)
   
    
     fs.readFile(__dirname+"/db.txt","utf-8",(err,data)=>{
        //  let variable;
        if(err){
            let obj=[];
            res.send("An Error occured");
        }
        else {
            obj =JSON.parse(data);
            console.log("here");
            console.log(obj)
           // res.send("hello")
            obj.forEach(function(value){
                console.log(value.id,id);
                if(value.id==id){
                    value.checked=!value.checked;
                    element=value;
                    // variable=value.checked
                    console.log("me chala");
                }
               
            })
           // res.send("hi");
            fs.writeFile('./db.txt',JSON.stringify(obj),(err)=>{
                if(err){
                    res.end("error occurs while writing file")
                }
                else {
                    res.json(element);
                }
            })
       }
      })
})
app.post('/delete',(req,res)=>{
    //  let element=JSON.stringify(req.body);
    
    let id=req.body.id;
    console.log(id)
    console.log(req.body)
  
    
     fs.readFile(__dirname+"/db.txt","utf-8",(err,data)=>{
        //  let variable;
        if(err){
            let obj=[];
            res.send("An Error occured");
        }
        else {
            obj =JSON.parse(data);
            console.log("here");
            console.log(obj)
           // res.send("hello")
           let newObj= obj.filter(function(value){
                console.log(value.id,id);
                if(value.id==id){
                   return false;
                    // variable=value.checked    
                }
                else {
                    return true;
                }
               
            })
            
           // res.send("hi");
            fs.writeFile('./db.txt',JSON.stringify(newObj),(err)=>{
                if(err){
                    res.end("error occurs while writing file")
                }
                else {
                    res.end("Element deleted successfully");
                }
            })
       }
      })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})