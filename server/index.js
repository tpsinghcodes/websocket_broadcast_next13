import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));

// Socket 
import http from "http"
const server = http.createServer(app);
import { Server } from "socket.io";

const io = new Server(server, {cors:{
  origin:"http://192.168.10.135:3000",
  methods: ["GET", "POST"],
}});

io.on("connection", (socket)=>{
  // console.log(`${socket.id}`)
  // console.log(socket)
  socket.on("UserMessage", (data)=>{   
    socket.broadcast.emit("resend", data);
  })
})
// app.use(bodyParser.json({ limit: "30mb", extended: true }));
// app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
// app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// app.get("/", (req, res) => {
//   res.send({ message: "Hello World!" });
// });




server.listen(3001, ()=>{
  console.log("Running on 3001")
})

