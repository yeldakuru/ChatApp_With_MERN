import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

//Bu protectRoute fonksiyonu, bir middleware olarak çalışır ve yalnızca giriş yapmış (yetkili) kullanıcıların belirli rotalara erişmesini sağlar. Bu, JWT token’ı kontrol ederek yapılır.
export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        //Eğer token yoksa → kullanıcı giriş yapmamıştır → 401 (yetkisiz) hatası döner.
        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No Token Provided" });
        }

        //Token çözülür (decode edilir) ve içindeki userId çıkarılır. Eğer sahte bir token’sa, hata alınır.
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //Token doğru çözülmezse (geçersizse), yine yetkisiz hatası döner.
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized - Invalid Token" });
        }

        //Token'dan alınan userId ile kullanıcı veritabanında aranır.
        //.select("-password") → Şifre bilgisi sonuçtan çıkarılır.
        const user = await User.findById(decoded.userId).select("-password");
        //Kullanıcı bulunamazsa 404 hatası döner.
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user;

        next();
    } catch (error) {
        console.log("Error in protectRoute middleware: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};