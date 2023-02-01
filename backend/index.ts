import express, { Express } from "express";
import "reflect-metadata";
import { AppDataSource } from "./src/configs/DataSourceConfig";
import cors from "cors";
import userRoutes from "./src/routes/userRoutes";
import studentRoutes from "./src/routes/studentRoutes";
import passport from "passport";
import cookieparser from "cookie-parser";
import dotenv from "dotenv";
import { app, httpServer, io } from "./app";
const PORT = process.env.PORT || 5000;

dotenv.config();

//const app: Express = express();
//const httpServer = createServer(app);

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "http://localhost:4200"],
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());
app.use(passport.initialize());

//socket io
// const io: Server = new Server(httpServer, {
//   cors: { origin: "http://localhost:3000" },
// });

io.on("connection", (socket: any) => {
  console.log("a user connected");
  app.set("socket", socket);
  socket.on("disconnect", () => {
    console.log("someone disconnected");
  });
});

//routes
app.use("/api/students", studentRoutes);
app.use("/api/users", userRoutes);
//typeorm connection

AppDataSource.initialize()
  .then(() => {
    console.log("success connected to the database!");
    httpServer.listen(PORT, () => {
      console.log("server running on port 5000!");
    });
  })
  .catch((err) => {
    console.log(err);
  });
