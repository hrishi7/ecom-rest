import express from "express";
import config from "config";
import mainRoute from './Router/mainRoute';
import cors from 'cors'

const port = config.get("port") as number;
const host = config.get("host") as string;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());


// api version
app.get('/test', (req, res) => res.json({ ok: 'ok' }))
app.use('/api/v1', mainRoute);

app.listen(port, host, () => {
  console.log(`Server listing at http://${host}:${port}`);
});
