import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";//Şifreleri güvenli şekilde hash’lemek (şifrelemek) için kullanılır
export const signup = async (req, res) => {
    const { fullName, email, password } = req.body
    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        //hash password
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }
        // Aynı email daha önce kullanılmış mı?
        const user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "Email already exists" });
        // Şifreyi hash’le
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        //Yeni kullanıcı oluştur
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
        });
        // Kullanıcı varsa token üretilecek
        if (newUser) {
            // generate jwt token here
            generateToken(newUser._id, res)
            await newUser.save();//Kullanıcı oluşturulduktan sonra veritabanına kaydetme
            //201 Created → Yeni bir user başarıyla oluşturuldu
            // Kullanıcı kayıt işlemi başarılı olunca, istemciye  id, ad, email ve profil fotoğrafı gibi temel bilgileri döndürdük.
            res.status(201).json({// yeni bir kullanıcı başarıyla oluşturulduktan sonra tarayıcıya (istemciye) JSON formatında (response) döner.
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {

    }
};

export const login = (req, res) => {
    res.send("login route");
};

export const logout = (req, res) => {
    res.send("logout route");
};


//Yeni kullanıcı kaydı (signup) işlemini yazdık. Şifreyi kontrol edip hash’ledik, e-mail benzersiz mi diye baktık, kullanıcıyı oluşturduk.
