import express, {Express, Request, Response, NextFunction} from 'express';
import {DependencyContainer} from "./middleware/DependencyContainer";
import bodyParser from "body-parser";
import userRouter from "./routers/user";
import articleRouter from "./routers/article";

const PORT: number = 5000;

const app: Express = express();

new DependencyContainer();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use(userRouter);
app.use(articleRouter);

app.listen(PORT, () => {
    console.log(`Server started at port: ${PORT}, http://localhost:${PORT}`)
})