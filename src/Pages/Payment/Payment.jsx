import React,{useContext, useState} from 'react'
import LayOut from "../../componentes/LayOut/LayOut";
import classes from'./Payment.module.css'
import { DataContext } from "../../componentes/DataProvider/DataProvider";
import ProductCard from '../../componentes/product/ProductCard';
import {
  useStripe,
  useElements,
  CardElement
} from "@stripe/react-stripe-js";
import CurrencyFormater from '../../componentes/currencyFormat/CurrencyFormat';
import {axiosInstance} from '../../Api/axios'
// import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import {db} from "../../Utility/firebase"
import { useNavigate } from 'react-router-dom';
import { Type } from '../../Utility/action.type';

function Payment() {

  const [{user, basket}, dispatch]= useContext(DataContext);

   const totalItems = basket?.reduce(
     (amount, item) => amount + item.amount,
     0
   );

    const total = basket.reduce((ammount, item) => {
      return item.price * item.amount + ammount;
    }, 0);

   const [cardError, setCardError]=useState(null)

   const [processing, setProcessing] = useState(false)
     const stripe = useStripe();
     const elements = useElements();
     const navigate = useNavigate()

     const handleChange = (e)=>{
// console.log(e);
e.error?.message ? setCardError(e.error?.message) : setCardError("")
     };
     const handlePayment=async(e)=>{
      e.preventDefault()


      try {
        setProcessing(true);
        //1,  backend || functions ----->contact to get the client secret
        const response = await axiosInstance({
          method: "post",
          url: `/payment/create?total=${total * 100}`,
        });
        console.log(response.data);
        const clientSecrete = response.data?.clientSecret;
        console.log("clientSecrete", clientSecrete);

        // 2, client side (react side confermation)

        const {paymentIntent} = await stripe.confirmCardPayment(clientSecrete, {
          payment_method: {
            card:elements.getElement(CardElement),
          },
        });
        // console.log(paymentIntent);

        // 3, after the confermation ---->order firestore database save, clear basket

        await db
        .collection("users")
        .doc(user.uid).collection("orders")
        .doc(paymentIntent.id)
        .set({
        basket:basket,
        amount:paymentIntent.amount,
        created:paymentIntent.created
        })
      // empty the basket
       dispatch({type:Type.EMPTY_BASKET});

setProcessing (false)
navigate("/order", {state:{msg:"you have placed new order"}});
      
} catch (error) {
        console.log(error);
        setProcessing(false);
      }
     }
  return (
    <LayOut>
      header
      <div className={classes.payment_header}>
        Checkout ({totalItems}) items
      </div>
      {/* payment method */}
      <section className={classes.payment}>
        {/* address */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            {/* <div>abe@email.com</div> */}

            {/* user not read ----------------------?*/}
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>Chicago IL</div>
          </div>
        </div>
        <hr />
        {/* product */}
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />
        {/* card form */}
        <div className={classes.flex}>
          <h3>Payment method</h3>
          <div className={classes.payment_card_container}>
            <div className={classes.payment_details}>
              <form onSubmit={handlePayment}>
                {/* error */}
                {cardError && (
                  <small style={{ color: "red" }}> {cardError} </small>
                )}
                {/* card element */}
                <CardElement onChange={handleChange} />
                {/* price */}
                <div className={classes.payment_price}>
                  <div>
                    <span style={{display:"flex", gap:"10px"}}>
                      <p>Total order |</p> <CurrencyFormater amount={total} />
                    </span>
                  </div>
                  <button type="submit">
                  {
                    processing?(
                    <div className={classes.loading}>
                      <ClipLoader color="gray"size={12}
                      />
                      <p>Please wait ...</p>
                    </div>
                    
                    ):"pay Now"
                  }
                 
                  
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;
