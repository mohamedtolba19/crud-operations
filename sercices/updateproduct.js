const connection = require("../database/dbconnection")

const router = require("express").Router();

router.put("/" , (req,res)=>
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
module.exports = router