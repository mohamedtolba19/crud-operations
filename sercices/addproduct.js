const connection = require("../database/dbconnection")

const router = require("express").Router();
router.post("/" , (req,res)=>
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

module.exports = router