import { AiOutlineMenu } from "react-icons/ai";

import classes from "./Header.module.css";

function LowerHeader() {
  return (
    <div>
      <ul className={classes.lower__container}>
        <li>
          <p>{<AiOutlineMenu />} All</p>
        </li>
        <li>Today&#39; Deals</li>
        <li>Costumer Service</li>
        <li>Rigistery</li>
        <li>Gift Card</li>
        <li>Sell</li>
      </ul>
    </div>
  );
}

export default LowerHeader;
