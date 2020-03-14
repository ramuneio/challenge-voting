import React from "react";
import { StaticRouter } from "react-router-dom";
import express from "express";
import { renderToString } from "react-dom/server";
import products, { incrementVotes } from "./demo-products-model";
import App from "./App";

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();
server
  .disable("x-powered-by")
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  // This route is only here for demo purposes, it would not be included in the real app
  .get("/api/v1/products", (req, res) => {
    res.send({ products });
  })
  // This route is only here for demo purposes, it would not be included in the real app
  .put("/api/v1/products/:id/vote", (req, res) => {
    const { id } = req.params;
    res.send(incrementVotes(id));
  })
  .get("/*", (req, res) => {
    const context = {};
    const markup = renderToString(
      <StaticRouter context={context} location={req.url}>
        <App />
      </StaticRouter>
    );

    if (context.url) {
      res.redirect(context.url);
    } else {
      res.status(200).send(
        `<!doctype html>
    <html lang="en">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="utf-8" />
        <title>Products Demo</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://fonts.googleapis.com/css?family=Lato:400,700,900&display=swap" rel="stylesheet">
         ${
           assets.client.css
             ? `<link rel="stylesheet" href="${assets.client.css}">`
             : ""
         }
        ${
          process.env.NODE_ENV === "production"
            ? `<script src="${assets.client.js}" defer></script>`
            : `<script src="${assets.client.js}" defer crossorigin></script>`
        }
    </head>
    <body>
        <main>
          <div id="root">${markup}</div>
        </main>
    </body>
</html>`
      );
    }
  });

export default server;
