FROM node:lts

WORKDIR /workdir

# setting npm
COPY ./package.json /workdir/package.json
COPY ./package-lock.json /workdir/package-lock.json
RUN npm ci

# compile typescript
COPY ./src /workdir/src
COPY ./tsconfig.json /workdir/tsconfig.json
RUN npx tsc

COPY ./web /workdir/web
COPY ./views /workdir/views

CMD [ "npm", "start" ]
