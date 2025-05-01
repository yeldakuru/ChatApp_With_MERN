import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";//Şifreleri güvenli şekilde hash’lemek (şifrelemek) için kullanılır
import cloudinary from "../lib/cloudinary.js";


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

//Kullanıcının e-posta ve şifre bilgilerini kontrol eder, doğrularsa JWT token oluşturur ve kullanıcı bilgilerini döner.
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });//bu email ile kayıtlı bir kullanıcı olup olmadığı kontrol edilir

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        generateToken(user._id, res);

        res.status(200).json({//Giriş başarılıysa, kullanıcı bilgileri frontend'e gönderilir.
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        });
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

//Kullanıcının JWT token’ını (çerez olarak saklanan) sıfırlayarak oturumunu kapatır.
export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });//jwt adındaki çerezi (cookie) boş bir string yapar ve süresini 0 milisaniye olarak ayarlayarak silmiş olur.
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

//kullanıcının profil fotoğrafını güncellemek için
export const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;
        const userId = req.user._id;

        if (!profilePic) {
            return res.status(400).json({ message: "Profile pic is required" });
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePic: uploadResponse.secure_url },
            { new: true }
        );

        res.status(200).json(updatedUser);
    } catch (error) {
        console.log("error in update profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


//Yeni kullanıcı kaydı (signup) işlemini yazdık. Şifreyi kontrol edip hash’ledik, e-mail benzersiz mi diye baktık, kullanıcıyı oluşturduk.
