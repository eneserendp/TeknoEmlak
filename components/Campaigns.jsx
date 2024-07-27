import { RiCustomerService2Line, RiBarChartHorizontalLine } from "react-icons/ri";

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(
        <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M9.618 16.472l-5.236 2.76a.5.5 0 0 1-.764-.538l1-5.826L.318 8.652a.5.5 0 0 1 .276-.752l5.964-.865L9.44 1.528a.5.5 0 0 1 .92 0l2.882 5.507 5.964.865a.5.5 0 0 1 .276.752l-4.3 4.096 1 5.826a.5.5 0 0 1-.764.538l-5.236-2.76z"/>
        </svg>
      );
    } else {
      stars.push(
        <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
        </svg>
      );
    }
  }
  return (
    <div className="flex items-center gap-x-1">
      {stars}
    </div>
  );
};

const StatisticsSection = () => {
  return (
    <div className="container mx-auto py-5 gap-6 flex-wrap">
     <div className="bg-gradient-to-br from-gray-600 to-orange-300 rounded-md py-8 px-6 flex items-center justify-between">

        <div className="flex items-center gap-x-4">
          <div className="flex items-center justify-center bg-primary text-white rounded-full w-12 h-12 transition-transform transform-gpu hover:scale-110">
            <RiCustomerService2Line size={24} />
          </div>
          <div>
            <p className="text-base font-semibold text-gray-800">Müşteri Memnuniyeti</p>
            <div className="flex items-center">
              <StarRating rating={5} /> {/* Burada rating değeri değiştirilebilir */}
              
            </div>
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-lg font-semibold text-white">İstatistikler</h2>
          <p className="text-gray-300 text-sm">İşte müşteri memnuniyeti ve genel satışlar hakkındaki istatistikler</p>
        </div>
        <div className="flex items-center gap-x-4">
          <div className="flex items-center justify-center bg-primary text-white rounded-full w-12 h-12 transition-transform transform-gpu hover:scale-110">
            <RiBarChartHorizontalLine size={24} />
          </div>
          <div>
            <p className="text-base font-semibold text-gray-800">Genel Satışlar</p>
            <p className="text-gray-300 text-sm">Son 6 Ayda +70 Daire Satışı</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsSection;
