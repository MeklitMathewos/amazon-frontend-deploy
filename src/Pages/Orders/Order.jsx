// import classes from './Order.module.css'
import React, { useContext, useState,useEffect } from "react"; 
import LayOut from "../../componentes/LayOut/LayOut";
import classes from './Order.module.css'
import {db} from "../../Utility/firebase"
import { DataContext } from "../../componentes/DataProvider/DataProvider";
import ProductCard from '../../componentes/product/ProductCard'
function Order() {
  const [{user}, dispatch]=useContext(DataContext)
  const [orders, setOrders]=useState([])
  useEffect(()=>{
if(user){
 
  db.collection("users").doc(user.uid).collection("orders").orderBy("created","desc").onSnapshot((snapshot)=>{
    // console.log(snapshot);
    setOrders(
    snapshot.docs.map((doc)=>({
    id: doc.id,
    data: doc.data()
    }))
  )
  })
}else{
  setOrders([])
}
  }, []);
  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.orders_container}>
          <h2>your orders</h2>
          {orders?.length== 0 && <div style={{padding:"20px"}}>
            you don't have orders yet.
          </div>
          }
          {/* orderd items */}
          <div>
            {orders?.map((eachOrder, i) => {
              return (
                <div key={i}>
                  <hr />
                  <p>Order ID:{eachOrder?.id}</p>
                  {eachOrder?.data?.basket?.map((order) => {
                    return (
                      <ProductCard flex={true} product={order} key={order.id} />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Order