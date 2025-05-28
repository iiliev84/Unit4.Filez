import express from "express";
const app = express();
export default app;
import filesRouter from "#api/files";
import foldersRouter from "#api/folders";

app.use(express.json())

app.use("/files", filesRouter);
app.use("/folders", foldersRouter);


app.use((err,req,res,next)=>{
    console.log(err)
    res.status(500).send("An error occured " + err)
})