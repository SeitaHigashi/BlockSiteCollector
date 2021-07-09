import express from "express"
import {Search} from "./search"
import {Connectivity} from "./connectivity"

const app = express();

app.use(express.urlencoded({extended: true}));
app.post("/",async (req, res) => {
  res.header('Content-Type', 'text/html;charset=utf-8')
  console.log(req.body.words);
  Search.search(req.body.words)
  .then(results => Connectivity.tryResults(results.data.items!))
  .then(results => res.end(results.toString()));
});

app.get("/", (_, res) => {
  res.header('Content-Type', 'text/html;charset=utf-8')
  res.sendFile('index.html', {root: 'web'});
});

app.get("/:file", (req, res) => {
  const file = req.params.file;
  res.header('Content-Type', 'text/html;charset=utf-8')
  res.sendFile(`${file}`,{ root: 'web' });
});

app.listen(8000);
