import * as Yup from "yup";

export const reservationSchema = Yup.object({
  fullName: Yup.string()
    .required("Tam ad gereklidir.")
    .min(3, "Tam ad en az 3 karakter olmalidir."),
  phoneNumber: Yup.string()
    .required("Telefon numarasi gereklidir.")
    .min(10, "Telefon numarasi en az 10 karakter olmalidir."),
  email: Yup.string().required("E-posta gereklidir.").email("E-posta geçersiz."),
  persons: Yup.string().required("Kişi sayisi gereklidir."),
  date: Yup.string().required("Gün girilmesi gereklidir."),
});