const express =require("express")
const mysql = require("mysql")
var app=express()
app.use(express.json())

const con =mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'book_data'
})

//CREATE DATABASE

// con.connect(function(err){
//     if(err)
//     {
//         console.log(err)
//     }else{
//         var sql="CREATE TABLE book_table (id int,book_name varchar(10),book_quantity int,book_genre varchar(10),is_best_seller varchar(10),created_at varchar(10),updated_at varchar(10))";
//         con.query(sql,(err,result)=>{
//             if(err)
//             {
//                 console.log(err)
//             }else{
//                 console.log("connected")
//             }
//         })    
//     }
// })

// 1.GET ALL BOOK LIST 

con.connect((err)=>{
    if(err)
    {
        console.log(err)
    }else{
        console.log("connected!!")
    }
})
app.get('/fetch',(req,res)=>{
    con.query("SELECT * FROM book_data.book_table",function(err,result,fields){
        
            if(err)
            {
                console.log(err)
            }else{
                res.send(result)
            }
        
    })
})
// app.listen(5000,(err)=>{
//     if(err)
//     {
//         console.log(err)
//     }else{
//         console.log("posted on 5000")
//     }
// })

// 2.GET BOOK DETAILS BY ID

con.connect((err)=>{
    if(err)
    {
        console.log(err)
    }else{
        console.log("connected!!")
    }
})

app.get("/fetchbyid/:id",(req,res)=>{
    const fetchid=req.params.id;
    con.query("SELECT * FROM book_data.book_table WHERE id=?",fetchid,(err,result)=>{
        if(err)
        {
            console,log(err)
        }else{
            res.send(result)
        }        
    })
})
// app.listen(5000,(err)=>{
//     if(err)
//     {
//         console.log(err)
//     }else{
//         console.log("posted on 5000")
//     }
// })


//3.POST THE DATA(ADD BOOK DATA)

con.connect((err)=>{
    if(err)
    {
        console.log(err)
    }else{
        console.log("connected!!")
    }
})
app.post('/post',(req,res)=>{
    const id=req.body.id;
    const book_name=req.body.book_name;
    const book_quantity=req.body.book_quantity;
    const book_genre=req.body.book_genre;
    const is_best_seller=req.body.is_best_seller;
    const created_at=req.body.created_at;
    const updated_at=req.body.updated_at;
    
    con.query('insert into book_table values(?,?,?,?,?,?,?)',[id,book_name,book_quantity,book_genre,is_best_seller,created_at,updated_at],(err,result)=>{
        
            if(err)
            {
                console.log(err)
            }else{
                res.send("POSTED")
            }
        
    })
}) 

// app.listen(5000,(err)=>{
//     if(err)
//     {
//         console.log(err)
//     }else{
//         console.log("posted on 5000")
//     }
// })



//4.DELETE BOOK DATA BY AN ID

con.connect((err)=>{
    if(err)
    {
        console.log(err)
    }else{
        console.log("connected!!")
    }
})
app.delete("/deletebyid/:id",(req,res)=>{
    const deleteid=req.params.id;
    con.query('DELETE from book_table WHERE id=?',deleteid,(err,result)=>{
        if(err)
        {
            console,log(err)
        }else{
            res.send("BOOK DELETED")
            console.log(result)
        }        
    })
})

// app.listen(5000,(err)=>{
//     if(err)
//     {
//         console.log(err)
//     }else{
//         console.log("on port 5000")
//     }
// })


//5.UPDATE BOOK DATA BY AN ID

con.connect((err)=>{
    if(err)
    {
        console.log(err)
    }else{
        console.log("connected!!")
    }
})
app.put("/updatebyid/:id",(req,res)=>{
    const updateid=req.params.id;
    const id=req.body.id;
    const book_name=req.body.book_name;
    const book_quantity=req.body.book_quantity;
    const book_genre=req.body.book_genre;
    const is_best_seller=req.body.is_best_seller;
    const created_at=req.body.created_at;
    const updated_at=req.body.updated_at;

    con.query('UPDATE book_table SET book_name=?,book_quantity=?,book_genre=?,is_best_seller=?,created_at=?,updated_at=? WHERE id=?',[book_name,book_quantity,book_genre,is_best_seller,created_at,updated_at,updateid],(err,result)=>{
        if(err)
        {
            console,log(err)
        }else{
            // res.send("UPDATED")
            console.log(result)
            if(result.affectedRows==0)
            {
                res.send("id not present")
            }else{
                res.send("UPDATED")
            }
        }        
    })
})
app.listen(5000,(err)=>{
    if(err)
    {
        console.log(err)
    }else{
        console.log("on port 5000")
    }
})
