
import express from "express"; //Sunucu oluşturmak için kullanılan Node.js framework’ü.
import dotenv from "dotenv"; //.env dosyasındaki ortam değişkenlerini kullanmamıza yarar.
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser"
import messageRoutes from "./routes/message.route.js";
const app = express();
dotenv.config();
const PORT = process.env.PORT;
app.use(express.json());
app.user(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

app.listen(PORT, () => {
    console.log("Server is running on PORT: " + PORT);//Belirlenen port üzerinden sunucu çalıştırılır.
    connectDB()
});

//Express ile bir backend sunucusu kurduk, auth route'larını tanıttık, ortam değişkenleri okundu ve sunucu başlatıldığında MongoDB’ye bağlandık.