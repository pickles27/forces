const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  const buildFolder = path.join(__dirname, "public");
  const requestedFilePath = path.join(buildFolder, req.url);
  const extension = path.extname(requestedFilePath);

  if (req.url === "/") {
    fs.readFile(path.join(buildFolder, "index.html"), (error, data) => {
      if (error) {
        res.writeHead(404);
        res.end();
        return;
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    });
    return;
  } else if (extension === ".css") {
    fs.readFile(requestedFilePath, (error, data) => {
      if (error) {
        res.writeHead(404);
        res.end();
        return;
      }
      res.writeHead(200, { "Content-Type": "text/css" });
      res.write(data);
      res.end();
    });
  } else if (extension === ".js") {
    fs.readFile(requestedFilePath, (error, data) => {
      if (error) {
        res.writeHead(404);
        res.end();
        return;
      }
      res.writeHead(200, { "Content-Type": "application/javascript" });
      res.write(data);
      res.end();
    });
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(3000);
console.log("listening on port 3000... o.o");
