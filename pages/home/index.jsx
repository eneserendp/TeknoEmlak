import React from "react";
import Carousel from "../../components/Carousel";

import Campaigns from "@/components/Campaigns";
import Reservation from "@/components/Reservation";
import MenuWrapper from "@/components/product/MenuWrapper";
import About from "@/components/About";
import Customers from "@/components/customers/Customers";


const Index = ({ categoryList, productList }) => {
      return (
    <React.Fragment>
      
      <Carousel/> 
      <Campaigns/>
      <MenuWrapper categoryList={categoryList} productList={productList} />
      <About/>
      <Reservation/>
      <Customers/>
    </React.Fragment>
  );
};

export default Index;