import * as Yup from "yup";

export const adminSchema = Yup.object({
  username: Yup.string()
    .required("Kullanıcı adı gerekli.")
    .min(3, "Kullanıcı adı en az 3 karakter olmalıdır."),
  password: Yup.string()
    .required("Şifre gerekli.")
    .min(5, "Password must be at least 5 characters."),
});