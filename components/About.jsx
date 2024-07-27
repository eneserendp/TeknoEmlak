import Image from "next/image";
import Title from "./layout/ui/Title";

const About = () => {
  return (
    <div className="bg-secondary py-14">
      <div className="container mx-auto flex items-center text-white gap-20 justify-center flex-wrap-reverse">
        <div className="flex justify-center">
          <div className="relative sm:w-[445px] sm-h-[600px]  flex justify-center w-[300px] h-[450px]">
            <Image src="/images/sonlogom3.png" alt="" layout="fill" />
          </div>
        </div>
        <div className="md:w-1/2 ">
        <Title addClass="text-[40px]">BİZ KİMİZ?</Title>

          <p className="my-5 flex flex-col items-center">
          Demirpolat Emlak, emlak sektöründe kalite ve güvenilirlik standartlarını temsil eden bir şirkettir. 
          İnşaat, satış, kiralama, danışmanlık ve emlak yönetimi gibi farklı alanlarda geniş bir yelpazede 
          hizmetler sunarak, müşterilerimize emlak ihtiyaçlarını karşılamada yardımcı oluyoruz. 
          Emlak dünyasında 10 yıldan fazla deneyime sahip olan Demirpolat Emlak, uzman ekibi ve
           köklü geçmişi ile emlak konularında bilgi birikimini en üst seviyede tutmaktadır.
            Bu sayede müşterilerimize en iyi hizmeti sunma konusundaki taahhüdümüzü sürdürüyoruz.
          
          </p>
          <button className="btn-primary">Read More</button>
        </div>
      </div>
    </div>
  );
};

export default About;