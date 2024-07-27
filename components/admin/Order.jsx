import Title from "../layout/ui/Title";
import axios from "axios";
import { useEffect, useState } from "react";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(null); // Confirmation state
  const status = ["İstek Alındı", "İstek Gönderiliyor", "Kabul Edildi"];

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/orders`);
        setOrders(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getOrders();
  }, []);

  const handleStatus = async (id) => {
    const item = orders.find((order) => order._id === id);
    const currentStatus = item.status;

    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/${id}`,
        {
          status: currentStatus + 1,
        }
      );
      setOrders([res.data, ...orders.filter((order) => order._id !== id)]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    if (confirmDelete === id) { // Check if confirmation state matches the id
      try {
        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/orders/${id}`);
        setOrders(orders.filter((order) => order._id !== id));
        setConfirmDelete(null); // Reset confirmation state
      } catch (err) {
        console.log(err);
      }
    } else {
      setConfirmDelete(id); // Set confirmation state to trigger the pop-up
    }
  };

  const handleShowProduct = (productId) => {
    if (productId) {
      const productUrl = `/product/${productId}`;
      window.open(productUrl, "_blank");
    } else {
      console.error("Ürün ID'si alınamadı.");
    }
  };

  return (
    <div className="lg:p-8 flex-1 lg:mt-0 mt-5">
      <Title addClass="text-[40px]">Randevular</Title>
      {confirmDelete && ( // Confirmation pop-up
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-md">
            <p>Bu Randevuyu Silmek İstediğinize Emin misiniz?</p>
            <div className="flex justify-between mt-4">
              <button
                className="btn-primary !bg-success"
                onClick={() => handleDelete(confirmDelete)}
              >
                Evet
              </button>
              <button
                className="btn-primary !bg-danger"
                onClick={() => setConfirmDelete(null)}
              >
                Hayır
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="overflow-x-auto w-full mt-5">
        <table className="w-full text-sm text-center text-black min-w-[1000px]">
          <thead className="text-xs text-gray-200 uppercase bg-gray-700">
            <tr>
              <th scope="col" className="py-3 px-6">
                ORDER ID
              </th>
              <th scope="col" className="py-3 px-6">
                KULLANICI
              </th>
              <th scope="col" className="py-3 px-6">
                TOTAL
              </th>
              <th scope="col" className="py-3 px-6">
                ÖDEME
              </th>
              <th scope="col" className="py-3 px-6">
                Tel NU
              </th>
              <th scope="col" className="py-3 px-6">
                DURUM
              </th>
              <th scope="col" className="py-3 px-6">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 &&
              orders
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((order) => (
                  <tr
                    className="transition-al bg-gray-200 bg-gray-200 hover:bg-primary"
                    key={order?._id}
                  >
                    <td
                      className="py-4 px-6 font-medium whitespace-nowrap hover:text-white gap-x-1"
                      onClick={() => handleShowProduct(order?.products)}
                    >
                      {order?._id.substring(0, 6)}...
                    </td>
                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                      {order?.customer}
                    </td>
                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                      ₺ {order?.total}
                    </td>
                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                      {order?.method === 0 ? "Cash" : "Card"}
                    </td>
                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                      {order?.phoneNumber}
                    </td>
                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                      {status[order?.status]}
                    </td>
                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                      <button
                        className="btn-primary !bg-success mr-2"
                        onClick={() => handleStatus(order?._id)}
                        disabled={order?.status > 1}
                      >
                        Sonraki Adım
                      </button>
                      <button
                        className="btn-primary !bg-danger"
                        onClick={() => handleDelete(order?._id)}
                      >
                        Sil
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;
