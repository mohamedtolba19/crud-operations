
const express = require("express");
const app = express();
const cors = require('cors')
const mysql = require("mysql2");

const connection = mysql.createConnection({
    host:"sql12.freesqldatabase.com",
    database:"sql12645305",
    user:"sql12645305",
    password:"uDFZaY9bYG"
})

app.use(express.json())
app.use(cors())
const port = 3005 || process.env.PORT
app.listen(port, () => console.log(`Example app listening on port ${port}!`))


app.get("/" , (req,res)=>
{
    connection.execute("select * from products" , (err,result)=>
    {
        if(!err)
        {
            res.json({message:"success" , result})
        }
        else
        {
            res.json({message:"failed" , err})
        }

    })

})

app.post("/" , (req,res)=>
{
    let requiredProps = ["name" , "price" , "description"]
    let requestProps = Object.keys(req.body);
    let isValid = requestProps.every((prop)=>requiredProps.includes(prop))
    let isValid2 = requiredProps.every((prop)=>requestProps.includes(prop))
    if(isValid&&isValid2)
    {
        let {name,price,description} = req.body;
        connection.execute(`insert into products (name , price , description) values('${name}' , '${price}', '${description}')` , (err,result)=>
        {
            if(!err)
            {
                res.json({message:"success" , result})
            }
            else
            {
                res.json({message:"failed" , err})
            }
    
    
        })
    }
    else
    {
        res.json({message:"failed",err:"please enter valid props"})
    }
 
})
app.put("/" , (req,res)=>
{
    let requiredProps = [ "id" ,"name" , "price" , "description"]
    let requestProps = Object.keys(req.body);
    let isValid = requestProps.every((prop)=>requiredProps.includes(prop))
    let isValid2 = requiredProps.every((prop)=>requestProps.includes(prop))
    if(isValid&&isValid2)
    {
        let {id,name,price,description} = req.body;
        connection.execute(`select * from products where id = ${id}` , (err,result)=>
        {
          if(!err)
          {
              if(result.length>0)
              {
                connection.execute(`UPDATE products SET name="${name}", price=${price}, description="${description}" WHERE id = ${id} ` , (err,result)=>
                {
                    if(!err)
                    {
                        res.json({message:"success" , result})
                    }
                    else
                    {
                        res.json({message:"failed" , err})
                    }
            
            
                })
              }   
              else
              {
                  res.json({message:"failed" , error:"No Data for this id"})
              }
          }
          else
          {
              res.json({message:"failed" , err})
          }
        })
     
    }
    else
    {
        res.json({message:"failed",err:"please enter valid props"})
    }
 
})

app.delete('/' , (req,res)=>
{
    let requiredProps = ["id"];
    let requestProps = Object.keys(req.body);
    let isValid = requestProps.every((prop)=> requiredProps.includes(prop))
    let isValid2 = requiredProps.every((prop)=>requestProps.includes(prop))
    if(isValid&&isValid2)
    {
      let {id} = req.body ;
      connection.execute(`select * from products where id = ${id}` , (err,result)=>
      {
        if(!err)
        {
            if(result.length>0)
            {
                 connection.execute(`Delete from products where id = ${id}` , (err,result)=>
        {
            if(!err)
            {
                res.json({message:"success" , result})
            }
            else
            {
                res.json({message:"failed" , err})
            }
        })
            }
            else
            {
                res.json({message:"failed" , error:"No Data for this id"})
            }
        }
        else
        {
            res.json({message:"failed" , err})
        }
      })
       
    }
    else
    {
        res.json({message:"failed" , error:"please enter bvalid props "})
    }
})

app.get("/search" , (req,res)=>
{
let searchTerm=  req.query["term"];
connection.execute(`SELECT * from products where name LIKE "%${searchTerm}%"` , (err,result)=>
{
    if(!err)
    {
        res.json({message:"success" ,result })
    }
    else
    {
        res.json({message:"failed" ,err })
    }

})

})