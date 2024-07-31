/* eslint-disable react/prop-types */
import { Rating } from "@mui/material";
import CurrencyFormat from "../currencyFormat/CurrencyFormat";
import classes from "./product.module.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Type } from "../../Utility/action.type";
import { DataContext } from "../DataProvider/DataProvider";

function ProductCard({ product, flex, renderDesc, renderAdd }) {
  const { image, rating, id, title, price, description } = product;

  const [,dispatch] = useContext(DataContext);

  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: { image, rating, id, title, price, description },
    });
  };

  return (
    <div
      className={`${classes.card__container} ${
        flex ? classes.product__fixed : ""
      }`}
    >
      <Link to={`/products/${id}`}>
        <img src={image} alt={title} />
      </Link>

      <div>
        <h3>{title}</h3>
        {renderDesc && <div style={{ maxWidth: "750px" }}>{description}</div>}
        <div className={classes.rating}>
          {rating && rating.rate ? (
            <>
              <Rating value={rating.rate} precision={0.1} />
              <small>{rating.count}</small>
            </>
          ) : (
            <small>No ratings available</small>
          )}
        </div>
        <div>
          <CurrencyFormat amount={price} />
        </div>
        {renderAdd && (
          <button onClick={addToCart} className={classes.button}>
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
