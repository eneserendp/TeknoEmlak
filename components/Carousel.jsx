import Image from "next/image";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Title from "./layout/ui/Title";

const WelcomeAnimation = ({ text }) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 200);
    return () => clearInterval(interval);
  }, [text]);

  return <Title addClass="text-5xl text-orange-500">{displayText}</Title>;
};

const Carousel = () => {
  const [clicked, setClicked] = useState(false);

  const handleIconClick = () => {
    setClicked(true);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 30000,
    appendDots: (dots) => (
      <div>
        <ul className="container mx-auto w-full text-start">{dots}</ul>
      </div>
    ),
    customPaging: (i) => (
      <div className="w-3 h-3 border bg-white rounded-full mt-10"></div>
    ),
  };

  return (
    <div className="h-screen w-full -mt-[88px]">
      <div className="absolute top-0 left-0 w-full h-full background-animation">
        <div className="relative h-full w-full">
          <Image
            src="/images/anasayfa34.png"
            alt=""
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
      </div>
      <div className={`icon-container ${clicked ? 'clicked' : ''}`} onClick={handleIconClick}>
        <svg className="home-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
          <path d="M32 12l-20 20h6v20h12v-14h4v14h12V32h6z" />
        </svg>
      </div>
      <Slider {...settings}>
        <div>
          <div className="mt-48 container mx-auto text-white flex flex-col items-start gap-y-8">
            <WelcomeAnimation text="Demirpolat Emlağa Hoşgeldiniz" />
            <p className="text-base sm:w-3/5 w-full">
              Biz, gayrimenkul alım-satımında uzmanlaşmış bir ekibiz.
              Müşterilerimize, hayallerindeki eve veya mülke ulaşmaları için
              kişiye özel hizmetler sunuyoruz. Güvenilir ve şeffaf bir
              yaklaşımla, gayrimenkul dünyasında en iyi fırsatları yakalamanız
              için buradayız. Size özel çözümlerle, her adımda yanınızda
              olmaktan mutluluk duyuyoruz.
            </p>
          </div>
        </div>
        <div>
          <div className="mt-48 container mx-auto text-white flex flex-col items-start gap-y-8">
            <WelcomeAnimation text="Emlakta Yeni Çağ Açıyoruz" />
            <p className="text-base sm:w-3/5 w-full">
              Gayrimenkul dünyasında devrim yaratan yenilikçi çözümlerimizle
              tanışın. Modern teknolojiyi kullanarak, emlak sürecini daha
              hızlı, şeffaf ve verimli hale getiriyoruz. İster ev alıyor,
              satıyor ya da kiralıyorsanız, size özel hizmet anlayışımızla
              yanınızdayız. Demirpolat Emlak ile yeni bir döneme hoş geldiniz.
            </p>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;
