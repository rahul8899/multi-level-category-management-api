import express from "express";
import { AuthRoute } from "./modules/auth/auth.route"
import { CategoryRoute } from "./modules/category/category.route";

export class Routes {
  router = express.Router();

  path() {
    this.router.use('/auth', new AuthRoute().router);

    this.router.use('/category', new CategoryRoute().router);

    return this.router;
  }
}
