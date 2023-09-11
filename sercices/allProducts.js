const connection = require("../database/dbconnection")

const router = require("express").Router();
router.get("/" , (req,res)=>
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

module.exports = router