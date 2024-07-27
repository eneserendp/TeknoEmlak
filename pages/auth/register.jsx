import { useFormik } from "formik";
import Link from "next/link";
import Input from "@/components/form/Input";
import Title from "@/components/layout/ui/Title";
import { registerSchema } from "../../schema/register";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";


const Register = () => {
  const { push } = useRouter();
  const onSubmit = async (values, actions) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users/register`,
        values
      );
      if (res.status === 200) {
        toast.success("Kullanıcı Oluşturma Başarılı.");
        push("/auth/login");
      }
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err);
    }
    actions.resetForm();
  };
  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      onSubmit,
      validationSchema: registerSchema,
    });

  const inputs = [
    {
      id: 1,
      name: "fullName",
      type: "text",
      placeholder: "İsim Soyisim Giriniz",
      value: values.fullName,
      errorMessage: errors.fullName,
      touched: touched.fullName,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email Adresinizi Giriniz",
      value: values.email,
      errorMessage: errors.email,
      touched: touched.email,
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Şifreniz",
      value: values.password,
      errorMessage: errors.password,
      touched: touched.password,
    },
    {
      id: 4,
      name: "confirmPassword",
      type: "password",
      placeholder: "Şifrenizi Tekrar Giriniz",
      value: values.confirmPassword,
      errorMessage: errors.confirmPassword,
      touched: touched.confirmPassword,
    },
  ];

  return (
    <div className="container mx-auto">
      <form
        className="flex flex-col items-center my-20 md:w-1/2 w-full mx-auto"
        onSubmit={handleSubmit}
      >
        <Title addClass="text-[40px] mb-6">Üye Ol</Title>
        <div className="flex flex-col gap-y-3 w-full">
          {inputs.map((input) => (
            <Input
              key={input.id}
              {...input}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          ))}
        </div>
        <div className="flex flex-col w-full gap-y-3 mt-6">
        <button className="btn-primary" type="submit">
            Kayıt Et
          </button>
          <Link href="/auth/login">
            <span className="text-sm underline cursor-pointer text-secondary">
              Bir Hesabın Yok mu?
            </span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;