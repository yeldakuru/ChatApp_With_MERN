import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore"; // Zustand ile global auth verisi
import { Camera, Mail, User } from "lucide-react"; // İkonlar

const ProfilePage = () => {
    const { authUser, isUpdatingProfile, updateProfile } = useAuthStore(); // auth verilerini al
    const [selectedImg, setSelectedImg] = useState(null); // Yüklenen resmi tutar

    const handleImageUpload = async (e) => {
        const file = e.target.files[0]; // Dosyayı al
        if (!file) return;

        const reader = new FileReader(); // Dosyayı okuyacak araç

        reader.readAsDataURL(file); // base64 formatına çevir

        reader.onload = async () => {
            const base64Image = reader.result; // base64 sonucu
            setSelectedImg(base64Image); // Önizleme için state'e yaz
            await updateProfile({ profilePic: base64Image }); // Backend'e gönder
        };
    };

    return (
        <div className="h-screen pt-20">
            <div className="max-w-2xl mx-auto p-4 py-8">
                <div className="bg-base-300 rounded-xl p-6 space-y-8">
                    <div className="text-center">
                        <h1 className="text-2xl font-semibold ">Profile</h1>
                        <p className="mt-2">Your profile information</p>
                    </div>

                    {/* Profil fotoğrafı yükleme alanı */}
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative">
                            <img
                                src={selectedImg || authUser.profilePic || "/avatar.png"} // Önce yeni yüklenen, yoksa eski fotoğraf, o da yoksa varsayılan
                                alt="Profile"
                                className="size-32 rounded-full object-cover border-4 "
                            />
                            <label
                                htmlFor="avatar-upload"
                                className={`
                                    absolute bottom-0 right-0 
                                    bg-base-content hover:scale-105
                                    p-2 rounded-full cursor-pointer 
                                    transition-all duration-200
                                    ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""} // Yükleniyorsa animasyon ve tıklanamaz
                                `}
                            >
                                <Camera className="w-5 h-5 text-base-200" /> {/* Kamera ikonu */}
                                <input
                                    type="file"
                                    id="avatar-upload"
                                    className="hidden" // Gözükmeyen dosya input
                                    accept="image/*"
                                    onChange={handleImageUpload} // Resim seçilince çalışır
                                    disabled={isUpdatingProfile} // Yükleniyorsa engellenir
                                />
                            </label>
                        </div>
                        <p className="text-sm text-zinc-400">
                            {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
                        </p>
                    </div>

                    {/* Kullanıcı adı */}
                    <div className="space-y-6">
                        <div className="space-y-1.5">
                            <div className="text-sm text-zinc-400 flex items-center gap-2">
                                <User className="w-4 h-4" /> {/* Kullanıcı ikonu */}
                                Full Name
                            </div>
                            <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.fullName}</p>
                        </div>

                        {/* Kullanıcı e-posta */}
                        <div className="space-y-1.5">
                            <div className="text-sm text-zinc-400 flex items-center gap-2">
                                <Mail className="w-4 h-4" /> {/* Mail ikonu */}
                                Email Address
                            </div>
                            <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.email}</p>
                        </div>
                    </div>

                    {/* Hesap bilgileri */}
                    <div className="mt-6 bg-base-300 rounded-xl p-6">
                        <h2 className="text-lg font-medium  mb-4">Account Information</h2>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                                <span>Member Since</span>
                                <span>{authUser.createdAt?.split("T")[0]}</span> {/* Tarihi sadece YYYY-MM-DD olarak göster */}
                            </div>
                            <div className="flex items-center justify-between py-2">
                                <span>Account Status</span>
                                <span className="text-green-500">Active</span> {/* Statik "Aktif" yazısı */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage; // Sayfa dışa aktarılır
