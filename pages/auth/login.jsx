import { useFormik } from "formik";
import Link from "next/link";

import { loginSchema } from "../../schema/login";
import Title from "@/components/layout/ui/Title";
import Input from "@/components/form/Input";
import { getSession, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect, useState } from "react";



const Login = () => {
  const { data: session } = useSession();
  const { push } = useRouter();
  const [currentUser, setCurrentUser] = useState();

  const onSubmit = async (values, actions) => {
    const { email, password } = values;
    const options = { redirect: false, email, password };

    try {
      const res = await signIn("credentials", options);

      if (res?.error) {
        // Giriş hatası durumunda uyarı mesajı ver
        toast.error("Giriş başarısız! Lütfen e-posta ve şifrenizi kontrol edin.");
      } else {
        // Başarılı giriş durumunda formu sıfırla ve yönlendir
        actions.resetForm();
        toast.success("Başarıyla giriş yaptınız!");
        
      }
    } catch (err) {
      console.error("Giriş hatası:", err);
      toast.error("Bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
    }
  };
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
        setCurrentUser(
          res.data?.find((user) => user.email === session?.user?.email)
        );
        session && push("/profile/" + currentUser?._id);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [session, push, currentUser]);

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      onSubmit,
      validationSchema: loginSchema,
    });

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email Adresiniz",
      value: values.email,
      errorMessage: errors.email,
      touched: touched.email,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Şifreniz",
      value: values.password,
      errorMessage: errors.password,
      touched: touched.password,
    },
  ];

  return (
    <div className="container mx-auto">
      <form
        className="flex flex-col items-center my-20 md:w-1/2 w-full mx-auto"
        onSubmit={handleSubmit}
      >
        <Title addClass="text-[40px] mb-6">Giriş</Title>
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
            LOGIN
          </button>
          <button
            className="btn-primary !bg-secondary"
            type="button"
            onClick={() => signIn("github")}
          >
            <i className="fa fa-github mr-2 text-lg"></i>
            GITHUB
          </button>
          <Link href="/auth/register">
            <span className="text-sm underline cursor-pointer text-secondary">
              Bir Hesabın Yok mu?
            </span>
          </Link>
        </div>
      </form>
    </div>
  );
};
export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
  const user = res.data?.find((user) => user.email === session?.user.email);
  if (session && user) {
    return {
      redirect: {
        destination: "/profile/" + user._id,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default Login;