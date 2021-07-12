import express from "express"
import {Search} from "./search"
import {Connectivity} from "./connectivity"
import {Store} from "./store"
import {StoreSet} from "./storeSet"
import {Output} from "./output"
import session from "express-session"

declare module "express-session" {
  interface Session {
    data: StoreSet[]
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
  res.header('Content-Type', 'text/html;charset=utf-8');
  Search.search(req.body.words)
  .then(results => Connectivity.tryResults(results.data.items!))
  .then(results => {
    req.session.data = results;
    res.render('result',{results: results});
  });
});

app.post("/entry", async (req, res) => {
  res.header('Content-Type', 'text/html;charset=utf-8');
  const store = Store.getStore();
  store.set(req.session.data);
  res.end('<a href="/">home</a>');
});

app.get("/", (_req, res) => {
  res.header('Content-Type', 'text/html;charset=utf-8')
  res.sendFile('index.html', {root: 'web'});
});

app.get("/list", (req, res) => {
  res.header('Content-Type', 'text/html;charset=utf-8')
  const sets = Store.getStore().getAll();
  res.render('list',{sets: sets});
});

app.get("/blocksite.xlsx", (req, res) => {
  res.setHeader('Content-disposition', 'attachment; filename=blocksite.xlsx');
  res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  res.send(Buffer.from(Output.out()))
});

app.get("/:file", (req, res) => {
  const file = req.params.file;
  res.header('Content-Type', 'text/html;charset=utf-8')
  res.sendFile(`${file}`,{ root: 'web' });
});

app.listen(8000);

