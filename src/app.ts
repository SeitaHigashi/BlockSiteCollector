import express from "express"

const app = express();

app.get("/", (_, res) => {
  res.sendFile('index.html', {root: 'web'});
});

app.get("/:file", (req, res) => {
  const file = req.params.file;
  res.sendFile(`${file}`,{ root: 'web' });
});

app.listen(8000);
