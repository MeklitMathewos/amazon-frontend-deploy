// import React from "react";
import { Link } from "react-router-dom";
import classes from "./catagory.module.css";

function CatagoryCards({data}) {
  // console.log(data)
  return (
    <div className={classes.catagory}>
      <Link to={`/catagory/${data.name}`}>
        <span>
          <h2>{data.title}</h2>
        </span>
        <img src={data.imgLink} alt="" />
        <p>shop now</p>
      </Link>
    </div>
  );
}

export default CatagoryCards;
