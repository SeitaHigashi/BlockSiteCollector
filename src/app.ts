import express from "express"
import {Search} from "./search"
import {Connectivity} from "./connectivity"
import session from "express-session"

declare module "express-session" {
  interface Session {
  }
}

const app = express();

app.set('view engine', 'ejs');
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}));
app.use(express.urlencoded({extended: true}));

app.post("/search",async (req, res) => {
  res.header('Content-Type', 'text/html;charset=utf-8')
  console.log(req.body.words);
  Search.search(req.body.words)
  .then(results => Connectivity.tryResults(results.data.items!))
  .then(results => res.render('result',{results: results}));
});

app.get("/", (req, res) => {
  res.header('Content-Type', 'text/html;charset=utf-8')
  res.sendFile('index.html', {root: 'web'});
});

app.get("/:file", (req, res) => {
  const file = req.params.file;
  res.header('Content-Type', 'text/html;charset=utf-8')
  res.sendFile(`${file}`,{ root: 'web' });
});

app.listen(8000);

