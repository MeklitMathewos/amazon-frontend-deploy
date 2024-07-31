// import classes from "./Results.module.css"
import LayOut from "../../componentes/LayOut/LayOut";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/endPoints";
import { useEffect, useState } from "react";
import classes from "./Result.module.css"
import ProductCard from "../../componentes/product/ProductCard";
import Loader from "../../componentes/Loader/Loader";


function Results() {
  const [results, setResults] = useState([]);
  const { catagoryName } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  // console.log(catagoryName);
  useEffect(() => {
    setIsLoading(true);

    axios .get(`${productUrl}/products/category/${catagoryName}`)
      .then((res) => {
        setResults(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, []);

  return (
    <LayOut>
      {isLoading ? (
        <Loader />
      ) : (
        <section>
          <h1 style={{ padding: "30px" }}>Results</h1>
          <p style={{ padding: "30px" }}>Catagory/{catagoryName}</p>
          <hr />
          <div className={classes.products__container}>
            {results?.map((Product) => (
              <ProductCard
                product={Product}
                key={Product.id}
                renderAdd={true}
              />
            ))}
          </div>
        </section>
      )}
    </LayOut>
  );
}

export default Results;
