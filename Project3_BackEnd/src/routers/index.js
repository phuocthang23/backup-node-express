import role from "./roleRouter";
import register from "./authRouter";
import user from "./userRouter";
import address from "./addressRouter";
import categories from "./categoriesRouter";
import imgProduct from "./imageProductRouter";
import product from "./productRouter";
import size from "./sizeRouter";
import sizeProduct from "./sizeProductRouter";
import wishlist from "./wishlistRouter";
import cart from "./cartRouter";
import orderindex from "./orderRouter";
import orderItem from "./orderItemRouter";

const initRouters = (app) => {
  const initLink = "/api/v1";

  app.use(`${initLink}/role`, role);
  app.use(`${initLink}/auth`, register);
  app.use(`${initLink}/user`, user);
  app.use(`${initLink}/address`, address);
  app.use(`${initLink}/categories`, categories);
  app.use(`${initLink}/imgProduct`, imgProduct);
  app.use(`${initLink}/product`, product);
  app.use(`${initLink}/sizes`, size);
  app.use(`${initLink}/sizeProduct`, sizeProduct);
  app.use(`${initLink}/wishlist`, wishlist);
  app.use(`${initLink}/cart`, cart);
  app.use(`${initLink}/orderindex`, orderindex);
  app.use(`${initLink}/orderItem`, orderItem);
};

module.exports = initRouters;
