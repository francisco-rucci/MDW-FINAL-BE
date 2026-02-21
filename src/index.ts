import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import router from "./routes";
import dns from 'dns';

dns.setServers(['8.8.8.8', '1.1.1.1']);

dotenv.config();
connectDB();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Servidor de Recetas funcionando");
});

app.use("/api", router);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
