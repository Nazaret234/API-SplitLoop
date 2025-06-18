import express, { Express, Request, Response } from "express";
import initial from "./services/serviceLocator/composer";
import router from "./routes";

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
initial();
router(app);

app.get("/", (req: Request, res: Response) => {
  res.send("¡API funcionando con TypeScript!");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
