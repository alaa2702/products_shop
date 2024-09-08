import Express from "express";
import { productRouter } from "./products/products.router";
import { cartRouter } from "./cart/cart.router";
import { userRouter } from "./user/user.router";
import { notFoundData } from "./utils/notFoundData";
import { errorHandler } from "./utils/errorHandler";
const port = 3000;
const app = Express();
app.use(Express.json());
//app.use(notFoundData);
app.use("/api/v1", productRouter);
app.use("/api/v1", cartRouter);
app.use("/api/v1", userRouter);
app.use(errorHandler);

app.listen(port, () => {
  console.log("server is running on port", port);
});