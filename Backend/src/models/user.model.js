import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        profilePic: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);
const User = mongoose.model("User", userSchema);//artık MongoDB’de users koleksiyonuna kayıt ekleyebilir
export default User;

//Kullanıcının sahip olacağı alanları (email, ad, şifre vs.) tanımlayan bir şema oluşturduk ve bunu User adında bir mongoose modeline dönüştürdük.
//Bu model sayesinde artık MongoDB’ye kullanıcı ekleyebilir, silebilir, güncelleyebiliriz.

