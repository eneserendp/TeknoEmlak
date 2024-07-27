import { useState } from 'react';
import { addProduct } from '../../redux/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Title from '@/components/layout/ui/Title';
import Image from 'next/image';
import Modal from 'react-modal';
import ReactPlayer from 'react-player';

const Index = ({ food }) => {
  
  const [prices, setPrices] = useState(food.prices);
  const [price, setPrice] = useState(prices[0]);
  const [size, setSize] = useState(0);
  const [extraItems, setExtraItems] = useState(food?.extraOptions);
  const [extras, setExtras] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const findCart = cart.products.find((item) => item._id === food._id);

  const handleSize = (sizeIndex) => {
    const difference = prices[sizeIndex] - prices[size];
    setSize(sizeIndex);
    changePrice(difference);
  };

  const changePrice = (number) => {
    setPrice(price + number);
  };

  const handleChange = (e, item) => {
    const checked = e.target.checked;

    if (checked) {
      changePrice(item.price);
      setExtras([...extras, item]);
    } else {
      changePrice(-item.price);
      setExtras(extras.filter((extra) => extra.id !== item.id));
    }
  };

  const handleClick = () => {
    dispatch(addProduct({ ...food, extras, price, quantity: 1 }));
  };

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex items-center md:h-[calc(100vh_-_88px)] gap-5 py-20 flex-wrap">
      <div
        className="relative md:flex-1 md:w-[80%] md:h-[80%] w-36 h-36 mx-auto"
        onClick={handleImageClick}
        style={{ cursor: 'pointer' }}
      >
        {/* Resim */}
        <Image
          src={food?.img}
          alt=""
          layout="fill"
          objectFit="contain"
          priority
        />
         {/* Video İşareti ve Metin */}
  <div className="absolute inset-0 flex items-center justify-center flex-col">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-20 w-20 text-orange-500 opacity-70 hover:opacity-100 transition-opacity duration-300 mb-1"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M8.018 13.618l5.5-3.5a.5.5 0 0 0 0-.832l-5.5-3.5A.5.5 0 0 0 7.5 6v6a.5.5 0 0 0 .518.618z"
      />
    </svg>
    <p className="text-orange-500 text-lg font-semibold">VİDEOYU İZLE</p>
  </div>
</div>

      <div className="md:flex-1 md:text-start text-center">
        <Title addClass="text-6xl">{food?.title}</Title>
        <span className="text-primary text-2xl font-bold underline underline-offset-1 my-4 inline-block">
        ₺{price}
        </span>

        <p className="text-sm my-4 md:pr-24">{food?.desc}</p>
        <div>
          <h4 className="text-x font-bold">
            Acileyet Durumunu ve Müsait Olduğunuz Günleri Seçiniz
          </h4>
          {["daire", "arsa", "ofis"].includes(food.category) && (
            <div className="flex items-center gap-x-20 md:justify-start justify-center">
              <div
                className="relative w-8 h-8 cursor-pointer"
                onClick={() => handleSize(0)}
              >
                <Image src="/images/size2.png" alt="" layout="fill" />
                <span className="absolute top-0 -right-6 text-xs bg-primary rounded-full px-[5px] font-medium">
                  Değil
                </span>
              </div>
              <div
                className="relative w-12 h-12 cursor-pointer"
                onClick={() => handleSize(1)}
              >
                <Image src="/images/size2.png" alt="" layout="fill" />
                <span className="absolute top-0 -right-6 text-xs bg-primary rounded-full px-[5px] font-medium">
                  Orta
                </span>
              </div>
              <div
                className="relative w-16 h-16 cursor-pointer"
                onClick={() => handleSize(2)}
              >
                <Image src="/images/size2.png" alt="" layout="fill" />
                <span className="absolute top-0 -right-6 text-xs bg-primary rounded-full px-[5px] font-medium">
                  Acil
                </span>
              </div>
            </div>
          )}
        </div>
        <div className="flex gap-x-4 my-6 md:justify-start justify-center">
          {extraItems.map((item) => (
            <label className="flex items-center gap-x-1" key={item._id}>
              <input
                type="checkbox"
                className="w-5 h-5 accent-primary"
                onChange={(e) => handleChange(e, item)}
              />
              <span className="text-sm font-semibold">{item.text}</span>
            </label>
          ))}
        </div>
        <button
          className="btn-primary"
          onClick={handleClick}
          disabled={findCart}
        >
          Sepete Ekle
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Product Description"
        overlayClassName="modal-overlay"
        closeTimeoutMS={200}
        className="custom-modal" // Modal çerçevesine özel sınıf
      >
        <button className="modal-close-btn" onClick={closeModal}>
          X
        </button>
        <div className="video-container">
          <ReactPlayer
            url={food?.video}
            controls={true}
            width="60%"
            height="115%"
            style={{ margin: 'auto' }} // Videoyu ortalamak için stili buraya ekliyoruz
          />
        </div>
      </Modal>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${params.id}`
  );

  return {
    props: {
      food: res.data ? res.data : null,
    },
  };
};

export default Index;
