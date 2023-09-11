
const express = require("express");
const app = express();
const cors = require('cors')


app.use(express.json())
app.use(cors())
const port = 3005 || process.env.PORT
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
app.use(require("./sercices/allProducts"))
app.use(require("./sercices/addproduct"))
app.use(require("./sercices/updateproduct"))
app.use(require("./sercices/deleteProduct"))
app.use(require("./sercices/search"))






