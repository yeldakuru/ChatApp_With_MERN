
import express from "express"; //Sunucu oluşturmak için kullanılan Node.js framework’ü.
import dotenv from "dotenv"; //.env dosyasındaki ortam değişkenlerini kullanmamıza yarar.
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser"
import messageRoutes from "./routes/message.route.js";
import cors from "cors";
dotenv.config();
const app = express();

const PORT = process.env.PORT;
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173", //Frontend uygulamasının adresi
    credentials: true,
}));
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

app.listen(PORT, () => {
    console.log("Server is running on PORT: " + PORT);//Belirlenen port üzerinden sunucu çalıştırılır.
    connectDB()
});

//Express ile bir backend sunucusu kurduk, auth route'larını tanıttık, ortam değişkenleri okundu ve sunucu başlatıldığında MongoDB’ye bağlandık.