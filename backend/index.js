import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors';

import userRoutes from "./routes/users.js";

const app = express();
const port = 5000;

app.use (bodyParser.json());
app.use(cors());

app.use("/",userRoutes);

app.get("/", (req, res) => res.send ("Hello From Express"));
app.all("*", (req, res) => res.send ("Route does not exists"));

app.listen (port, () =>
    console. log (`Server is listening on port: http://1ocalhost:${port}`)
);