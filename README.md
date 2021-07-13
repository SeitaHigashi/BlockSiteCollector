# Block Site Collector

## Usage
```sh
docker build -t blocksitecollector:latest .
docker run --rm -it -p 8000:8000  \ 
-e GOOGLE_API_KEY=key \
-e GOOGLE_CSE_ID=id \
-e HTTP_PROXY=proxyaddr \
-e HTTPS_PROXY=proxyaddr \
blocksitecollector
```
