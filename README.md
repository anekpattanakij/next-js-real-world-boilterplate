
# Custom server with TypeScript + Nodemon example

## How to use

Install it and run:

```bash
npm install --save -g
npm install
npm run dev
# or
yarn
yarn dev
```


## The idea behind the example

The example shows how you can use [TypeScript](https://typescriptlang.com) on both the server and the client while using [Nodemon](https://nodemon.io/) to live reload the server code without affecting the Next.js universal code.
Server entry point is `server/index.ts` in development and `production-server/index.js` in production.
The second directory should be added to `.gitignore`.
