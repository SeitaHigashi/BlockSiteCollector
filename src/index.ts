import * as http from "http";

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
    response.end("Hello! Node.js with TypeScript!");
  }
}

const main = new Main();
