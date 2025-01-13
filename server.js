import express from "express"
import invoiceRouter from "./routes/invoice.js"

const app = express()

app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set("view engine", "ejs")

app.use("/invoice", invoiceRouter)

app.listen(3000)