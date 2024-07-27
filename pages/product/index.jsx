import Title from "@/components/layout/ui/Title";
import { addProduct } from "@/redux/cartSlice";
import Image from "next/image";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";


const itemsExtra = [
  {
    id: 1,
    name: "Pazartesi",
    price: 0,
  },
  {
    id: 2,
    name: "Salı",
    price: 0,
  },
  {
    id: 3,
    name: "Çarşamba",
    price: 0,
  },
  {
    id: 4,
    name: "Perşembe",
    price: 0,
  },
  {
    id: 5,
    name: "Cuma",
    price: 0,
  },
];
const foodItems = [
  {
    id: 1,
    name: "Satılık Daire",
    price: 10,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda fugit corporis ex laboriosam tenetur at ad aspernatur",
    extraOptions: [
      {
        id: 1,
        name: "Extra 1",
        price: 0,
      },
    ],
  },
];

const Index = () => {
  const [prices, setPrices] = useState([10, 20, 30]);
  const [price, setPrice] = useState(prices[0]);
  const [size, setSize] = useState(0);
  const [extraItems, setExtraItems] = useState(itemsExtra);
  const [extras, setExtras] = useState([]);
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

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
    dispatch(addProduct({ ...foodItems[0], extras, price, quantity: 1 }));
  };

  console.log(cart);
  return (
    <div className="flex items-center md:h-[calc(100vh_-_88px)] gap-5 py-20 flex-wrap ">
      <div className="relative md:flex-1 w-[80%] h-[80%] mx-20">
        <Image src="/images/ev2.jpg" alt="" layout="fill" objectFit="contain" />
      </div>

      <div className="md:flex-1 md:text-start text-center">
        <Title addClass="text-6xl">Satılık Daire</Title>
        <span className="text-primary text-2xl font-bold underline underline-offset-1 my-4 inline-block">
        ₺{price}
        </span>
        <p className="text-sm my-4 md:pr-24">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
          fugit corporis ex laboriosam tenetur at ad aspernatur eius numquam
          molestiae.
        </p>
        <div>
          <h4 className="text-xl font-bold">Acileyetiniz Nedir</h4>
          <div className="flex items-center gap-x-20 md:justify-start justify-center">
            <div
              className="relative w-8 h-8 cursor-pointer"
              onClick={() => handleSize(0)}
            >
              <Image src="/images/size2.png" alt="" layout="fill" />
              <span className="absolute top-0 -right-6 text-xs bg-primary rounded-full px-[5px] font-medium">
                Yok
              </span>
            </div>
            <div
              className="relative w-12 h-12 cursor-pointer"
              onClick={() => handleSize(1)}
            >
              <Image src="/images/size.png" alt="" layout="fill" />
              <span className="absolute top-0 -right-6 text-xs bg-primary rounded-full px-[5px] font-medium">
                Orta
              </span>
            </div>
            <div
              className="relative w-16 h-16 cursor-pointer"
              onClick={() => handleSize(2)}
            >
              <Image src="/images/size.png" alt="" layout="fill" />
              <span className="absolute top-0 -right-6 text-xs bg-primary rounded-full px-[5px] font-medium">
                Acil
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-x-4 my-6 md:justify-start justify-center">
          {extraItems.map((item) => (
            <label className="flex items-center gap-x-1" key={item.id}>
              <input
                type="checkbox"
                className="w-5 h-5 accent-primary"
                onChange={(e) => handleChange(e, item)}
              />
              <span className="text-sm font-semibold">{item.name}</span>
            </label>
          ))}
        </div>
        <button className="btn-primary" onClick={handleClick}>
          Sepete Ekle 
        </button>
      </div>
    </div>
  );
};

export default Index;