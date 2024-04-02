import express, {Express, Request, Response, NextFunction} from 'express';
import router from "./routers/user";
import {DependencyContainer} from "./middleware/DependencyContainer";
import bodyParser from "body-parser";

const PORT: number = 5000;

const app: Express = express();

new DependencyContainer();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use(router);

app.listen(PORT, () => {
    console.log(`Server started at port: ${PORT}, http://localhost:${PORT}`)
})