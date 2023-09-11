
const connection = require("../database/dbconnection")

const router = require("express").Router();
router.delete('/' , (req,res)=>
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

module.exports = router