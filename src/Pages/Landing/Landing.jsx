import LayOut from "../../componentes/LayOut/LayOut.jsx";
import CarouselEffect from "../../componentes/carousel/Carousel";
import Catagory from "../../componentes/catagory/Catagory";
import Product from "../../componentes/product/Product";

function Landing() {
  return (
    <>
     <LayOut>
       <CarouselEffect />
      <Catagory />
      <Product />
   </LayOut> 
  </>
  );
}

export default Landing;
