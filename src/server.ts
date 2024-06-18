
import express, { Request, Response}  from 'express'
import path from 'path'
import dotenv from 'dotenv'
import { router } from './routes/routers';

dotenv.config();

const Server = express();

Server.use(express.static(path.join(__dirname, "../public")));
Server.use(express.urlencoded({ extended: true }));

Server.use("/api", router)

Server.use( (req: Request, res: Response) => {
    res.status(404);
    res.json({ error: "Endpoint ERROR!" });
})

Server.listen(process.env.PORT);
