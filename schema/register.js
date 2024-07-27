import * as Yup from "yup";

export const registerSchema = Yup.object({
  fullName: Yup.string()
    .required("Tam ad gerekli. ")
    .min(3, "Tam ad en az 3 karakter olmalıdır."),
  email: Yup.string().required("Email gereklidir.").email("Email geçersiz."),
  password: Yup.string()
    .required("Şifre Gereklidir.")
    .min(8, "Şifre en az 8 karakter olmalıdır.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Şifre en az bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter içermelidir. "
    ),
  confirmPassword: Yup.string()
    .required("Şifreyi onaylamanız gerekiyor.")
    .oneOf([Yup.ref("password"), null], "Şifreler aynı olmalıdır."),
});