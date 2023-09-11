

const connection = require("../database/dbconnection")

const router = require("express").Router();

router.get("/search" , (req,res)=>
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
module.exports = router ;