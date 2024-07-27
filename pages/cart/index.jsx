import Title from "@/components/layout/ui/Title";
import { reset } from "@/redux/cartSlice";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useEffect, useState } from 'react'; // useEffect ve useState eklenmesi

const Cart = ({ userList }) => {
  const { data: session } = useSession();
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const user = userList?.find((user) => user.email === session?.user?.email);
  const router = useRouter();
  const [selectedProducts, setSelectedProducts] = useState([]); // Seçilen ürünlerin kimliklerini saklamak için state

  useEffect(() => {
    // Her render'da seçilen ürünlerin kimliklerini state'e güncelle
    if (cart?.products?.length > 0) {
      const selectedProductIds = cart.products.map((product) => product._id);
      setSelectedProducts(selectedProductIds);
    }
  }, [cart.products]);

  const newOrder = {
    customer: user?.fullName,
    address: user?.address ? user?.address : "No address",
    total: cart.total,
    phoneNumber: user?.phoneNumber,
    method: 0,
    products: selectedProducts, // Seçilen ürünlerin kimliklerini yeniOrder'a ekle
  };

  const createOrder = async () => {
    try {
      if (session) {
        if (confirm("Siparişinizi Onaylıyor musunuz?")) {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/orders`,
            newOrder
          );
          if (res.status === 201) {
            router.push(`/order/${res.data._id}`);
            dispatch(reset());
            toast.success("Sipariş Başarıyla Oluşturuldu", {
              autoClose: 1000,
            });
          }
        }
      } else {
        toast.error("Lütfen Giriş Yapınız.", {
          autoClose: 1000,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-[calc(100vh_-_433px)]">
      <div className="flex justify-between items-center md:flex-row flex-col">
        <div className="md:min-h-[calc(100vh_-_433px)] flex items-center flex-1 p-10 overflow-x-auto w-full">
          <div className="max-h-52 overflow-auto w-full">
            {cart?.products?.length > 0 ? (
              <table className="w-full text-sm text-center text-black min-w-[1000px]">
                <thead className="text-xs text-gray-200 uppercase bg-gray-700">
                  <tr>
                    <th scope="col" className="py-3 px-6">
                      İlan
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Seçilen Gün
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Tutar
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Adet
                    </th>
                   
                  </tr>
                </thead>
                <tbody>
                  {cart.products.map((product, index) => (
                    <tr
                      className="transition-all bg-gray-200 hover:bg-primary"
                      key={index}
                    >
                      <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white flex items-center gap-x-1 justify-center">
                        <Image
                          src={product?.img}
                          alt=""
                          width={100}
                          height={100}
                        />
                        <span>{product.name}</span>
                      </td>
                      <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                        {product.extras?.length > 0
                          ? product.extras.map((item) => (
                              <span key={item.id}>{item.text}, </span>
                            ))
                          : ""}
                      </td>
                      <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                        ${product.price}
                      </td>
                      <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                        {product.quantity}
                      </td>
                     
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center font-semibold">Hiç Ürün Yok..</p>
            )}
          </div>
        </div>
        <div className="bg-secondary min-h-[calc(100vh_-_433px)] flex flex-col justify-center text-white p-12 md:w-auto w-full md:text-start !text-center">
          <Title addClass="text-[40px]">CART TOTAL</Title>

          <div className="mt-6">
            <b>Subtotal: </b>${cart.total} <br />
            <b className=" inline-block my-1">İndirim: </b>$0.00 <br />
            <b>Total: </b>${cart.total}
          </div>

          <div>
            <button
              className="btn-primary mt-4 md:w-auto w-52"
              onClick={createOrder}
            >
              Kontrol Edin!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);

  return {
    props: {
      userList: res.data ? res.data : [],
    },
  };
};

export default Cart;
