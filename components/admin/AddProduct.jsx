import React, { useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { GiCancel } from "react-icons/gi";
import axios from "axios";
import Title from "../layout/ui/Title";
import { toast } from "react-toastify";

import QRCode from "qrcode";
import Modal from "react-modal";


const AddProduct = ({ setIsProductModal }) => {
  const [file, setFile] = useState();
  const [imageSrc, setImageSrc] = useState();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("daire");
  const [prices, setPrices] = useState([]);
  const [extra, setExtra] = useState("");
  const [extraOptions, setExtraOptions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [video, setVideo] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/categories`
        );
        setCategories(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, []);

  const handleExtra = (e) => {
    if (extra) {
      if (extra.text && extra.price) {
        setExtraOptions((prev) => [...prev, extra]);
      }
    }
  };

  const handleOnChange = (changeEvent) => {
    const reader = new FileReader();
    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setFile(changeEvent.target.files[0]);
    };
    reader.readAsDataURL(changeEvent.target.files[0]);
  };

  const changePrice = (e, index) => {
    const newPrices = [...prices];
    newPrices[index] = e.target.value;
    setPrices(newPrices);
  };

  const handleCreate = async () => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "teknoEmlak");
  
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dugwufxmr/image/upload",
        data
      );
      const { url } = uploadRes.data;
      
      // Yeni ürün eklenince dönen cevap içindeki ID'yi al
      const newProductRes = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/products`,
        {
          img: url,
          title,
          desc,
          category: category.toLowerCase(),
          prices,
          extraOptions,
          video,
        }
      );
      const newProductId = newProductRes.data._id;
  
      // QR kodunu oluştur
      const qrCodeDataUrl = await QRCode.toDataURL(`${window.location.origin}/product/${newProductId}`);
  
      // QR kodunu modal içinde göster
      const qrWindow = window.open();
      qrWindow.document.write(`<img src="${qrCodeDataUrl}" alt="QR Code" />`);
      
      setIsProductModal(false);
      toast.success("İlan Başarıyla Eklendi!");
    } catch (err) {
      console.log(err);
    }
  };
  

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-50 after:content-[''] after:w-screen after:h-screen after:bg-white after:absolute after:top-0 after:left-0 after:opacity-60 grid place-content-center">
      <OutsideClickHandler onOutsideClick={() => setIsProductModal(false)}>
        <div className="w-full h-full grid place-content-center relative">
          <div className="relative z-50 md:w-[600px] w-[370px]  bg-white border-2 p-10 rounded-3xl">
            <Title addClass="text-[40px] text-center">Yeni İlan Ekle</Title>
            <div className="flex flex-col text-sm mt-6">
              <label className="flex gap-2 items-center">
                <input
                  type="file"
                  onChange={handleOnChange}
                  className="hidden"
                />
                <button className="btn-primary !rounded-none !bg-blue-600 pointer-events-none">
                  Choose an Image
                </button>
                {imageSrc && (
                  <div>
                    <img
                      src={imageSrc}
                      alt=""
                      className="w-12 h-12 rounded-full"/>
                  </div>
                )}
              </label>
            </div>
            <div className="flex flex-col text-sm mt-4">
              <span className="font-semibold mb-[2px]">Başlık</span>
              <input
                type="text"
                className="border-2 p-1 text-sm px-1 outline-none"
                placeholder="Başlığı Giriniz..."
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="flex flex-col text-sm mt-4">
              <span className="font-semibold mb-[2px]">Açıklama</span>
              <textarea
                className="border-2 p-1 text-sm px-1 outline-none"
                placeholder="Açıklamayı Giriniz..."
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
            <div className="flex flex-col text-sm mt-4">
              <span className="font-semibold mb-[2px]">Kategori</span>
              <select
                className="border-2 p-1 text-sm px-1 outline-none"
                placeholder="Kategoriyi Seçiniz..."
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.length > 0 &&
                  categories.map((category) => (
                    <option
                      value={category.title.toLowerCase()}
                      key={category._id}
                    >
                      {category.title}
                    </option>
                  ))}
              </select>
            </div>
            <div className="flex flex-col text-sm mt-4 w-full">
              <span className="font-semibold mb-[2px]">Fiyat</span>
              {["daire", "arsa", "ofis"].includes(category) ? (
                <div className="flex justify-between gap-6 w-full md:flex-nowrap flex-wrap">
                  <input
                    type="number"
                    className="border-b-2 p-1 pl-0 text-sm px-1 outline-none w-36"
                    placeholder="Acil Değil"
                    onChange={(e) => changePrice(e, 0)}
                  />
                  <input
                    type="number"
                    className="border-b-2 p-1 pl-0 text-sm px-1 outline-none w-36"
                    placeholder="Orta"
                    onChange={(e) => changePrice(e, 1)}
                  />
                  <input
                    type="number"
                    className="border-b-2 p-1 pl-0 text-sm px-1 outline-none w-36"
                    placeholder="Acil"
                    onChange={(e) => changePrice(e, 2)}
                  />
                </div>
              ) : (
                <div className="flex justify-between gap-6 w-full md:flex-nowrap flex-wrap">
                  <input
                    type="number"
                    className="border-b-2 p-1 pl-0 text-sm px-1 outline-none w-36"
                    placeholder="small"
                    onChange={(e) => changePrice(e, 0)}
                  />
                </div>
              )}
            </div>
            <div className="flex flex-col text-sm mt-4">
              <span className="font-semibold mb-[2px]">Video Linki</span>
              <input
                type="text"
                className="border-2 p-1 text-sm px-1 outline-none"
                placeholder="Video linkini buraya yapıştırın..."
                onChange={(e) => setVideo(e.target.value)}
              />
            </div>
            <div className="flex flex-col text-sm mt-4 w-full">
              <span className="font-semibold mb-[2px]">Gün</span>
              <div className="flex  gap-6 w-full md:flex-nowrap flex-wrap">
                <input
                  type="text"
                  className="border-b-2 p-1 pl-0 text-sm px-1 outline-none w-36"
                  placeholder="item"
                  name="text"
                  onChange={(e) =>
                    setExtra({ ...extra, [e.target.name]: e.target.value })
                  }
                />
                <input
                  type="number"
                  className="border-b-2 p-1 pl-0 text-sm px-1 outline-none w-36"
                  placeholder="price"
                  name="price"
                  onChange={(e) =>
                    setExtra({ ...extra, [e.target.name]: e.target.value })
                  }
                />
                <button className="btn-primary ml-auto" onClick={handleExtra}>
                  Ekle
                </button>
              </div>
              <div className="mt-2 flex gap-2">
                {extraOptions.map((item, index) => (
                  <span
                    className="inline-block border border-orange-500 text-orange-500  p-1 rounded-xl text-xs cursor-pointer"
                    key={index}
                    onClick={() => {
                      setExtraOptions(
                        extraOptions.filter((_, i) => i !== index)
                      );
                    }}
                  >
                    {item.text}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex justify-end">
              <button
                className="btn-primary !bg-success"
                onClick={handleCreate}
              >
                Oluştur
              </button>
            </div>
            <button
              className="absolute  top-4 right-4"
              onClick={() => setIsProductModal(false)}
            >
              <GiCancel size={25} className=" transition-all" />
            </button>
          </div>
        </div>
      </OutsideClickHandler>
    </div>
  );
};

export default AddProduct;