import * as dotenv from "dotenv";
import express from "express";
import * as bodyParser from "body-parser";
import { initializeRoute } from "./routes/appRoutes";

const app = express();
let allowCrossDomain = (req: express.Request, res: express.Response, next: Function) => {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization,Cache-Control,Pragma,Expires');
  next();
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(allowCrossDomain);

dotenv.config();

app.use('/api/', initializeRoute());

app.listen(process.env.PORT, async () => {
  console.log(`searchlogs-api started running at ${process.env.PORT} port.`);
});

