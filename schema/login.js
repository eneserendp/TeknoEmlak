import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string().required("Email Gereklidir.").email("Email geçersiz"),
  password: Yup.string()
    .required("Şifre Gereklidir.")
    .min(8, " Şifre en az 8 karakter olmalıdır.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Şifre en az bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter içermelidir."
    ),
});