const express = require("express")
const app = express()

app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set("view engine", "ejs")

const invoiceRouter = require("./routes/invoice")
app.use("/invoice", invoiceRouter)

app.listen(3000)