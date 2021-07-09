import * as http from "http";
import fs from "fs";
import {error} from "console";

class Main {
  constructor() {
    const server: http.Server = http.createServer(
      (
        request: http.IncomingMessage,
        response: http.ServerResponse
      ) => this.requestHandler(request, response)
    );

    server.listen('8080');
  }

  private requestHandler(request: http.IncomingMessage, response: http.ServerResponse): void {
    fs.readFile('web/index.html', 'UTF-8', 
                (error, data) => {
                  response.writeHead(200, {'Content-Type': 'text/html'});
                  response.write(data);
                  response.end();
                });
  }
}

const main = new Main();
