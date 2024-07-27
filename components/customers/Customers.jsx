import React from "react";
import Title from "../layout/ui/Title";
import CustomerItem from "./CustomerItem";
import Slider from "react-slick";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Customers = () => {
  function NextBtn({ onClick }) {
    return (
      <button
        className="absolute -bottom-12 left-1/2 bg-primary flex items-center justify-center w-10 h-10 rounded-full text-white"
        onClick={onClick}
      >
        <IoIosArrowForward />
      </button>
    );
  }

  function PrevBtn({ onClick }) {
    return (
      <button
        className="absolute -bottom-12 right-1/2 bg-primary flex items-center justify-center w-10 h-10 rounded-full text-white mr-2"
        onClick={onClick}
      >
        <IoIosArrowBack />
      </button>
    );
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: true,
    nextArrow: <NextBtn />,
    prevArrow: <PrevBtn />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto mb-20 mt-12">
      <Title addClass="text-[40px] text-center">Müşterilerimizin Görüşleri</Title>
      <Slider {...settings}>
        <CustomerItem
          imgSrc="/images/musteri.png"
          name="Ahmet Yılmaz"
          title="Ev Sahibi"
          feedback="Bu gayrimenkul şirketi sayesinde hayalimizdeki evi bulduk. Profesyonel ve hızlı hizmet için teşekkür ederiz."
        />
        <CustomerItem
          imgSrc="/images/musteri.png"
          name="Ayşe Demir"
          title="Yatırımcı"
          feedback="Yatırım amaçlı arsa satın almamda bana çok yardımcı oldular. Güvenilir ve deneyimli bir ekip."
        />
        <CustomerItem
          imgSrc="/images/musteri.png"
          name="Mehmet Kaya"
          title="Satılık Daire Sakini"
          feedback="Satılık daire arayışımda bana en uygun seçenekleri sundular. Hizmetlerinden çok memnun kaldım."
        />
        <CustomerItem
          imgSrc="/images/musteri.png"
          name="Elif Şahin"
          title="Satılık Ev Müşterisi"
          feedback="Satılık ev ararken gösterdikleri ilgi ve alakadan çok memnun kaldım. Kesinlikle tavsiye ederim."
        />
      </Slider>
    </div>
  );
};

export default Customers;
