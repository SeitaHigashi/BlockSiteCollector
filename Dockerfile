FROM node:lts

WORKDIR /workdir

# setting npm
COPY ./package.json /workdir/package.json
COPY ./package-lock.json /workdir/package-lock.json
RUN npm ci

# compile typescript
COPY ./tsconfig.json /workdir/tsconfig.json
COPY ./src /workdir/src
RUN npx tsc

COPY ./web /workdir/web
COPY ./views /workdir/views

CMD [ "npm", "start" ]
