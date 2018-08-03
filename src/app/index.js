import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routers from './router/restful';
import { tokenVerifier } from './middleware/jwt';

const routes = routers();
const app = express();
const initialExpress = function startServer() {
  const baseRoutePublic = process.env.BASE_ROUTE_PUBLIC || '';
  const baseRoutePrivate = process.env.BASE_ROUTE_PRIVATE || /\/[^login]/;
  // const bastPrivateRoute = process.env.BAST_PRIVATE_ROUTE || 'private';
  const port = process.env.EXPRESS_PORT || 3000;
  app.use(cors()); // Allow cors
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded());
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Content-Type', 'application/json');
    next();
  });
  app.all(baseRoutePrivate, tokenVerifier);
  app.use(baseRoutePublic, routes);
  app.listen(port, () => {
    console.log(`Server is running at ${port}`);
  });
};

export default initialExpress;
