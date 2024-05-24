import React, { useContext, useState } from "react";
import "./Order.css";
import { StoreContext } from "../../context/storeContext";
import axios from "axios";

const Order = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });

  //console.log(data);

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData({...data, [name]: value })
  };

  const placeOrder = async(e) => {
    e.preventDefault();

    let orderItems = [];

    food_list.map((item) => {
      if(cartItems[item._id] > 0){
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    //console.log(orderItems);

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };

    let res = await axios.post(`${url}/api/order/place`, orderData, {headers: { token}});
    if(res.data.success){
      const {session_url} = res.data;
      window.location.replace(session_url);
    }else{
      alert('Error');
      console.log(res.data.success);
      console.log(res.data.error);
      
    };
  };
 
  return (
    <form className="place-order" onSubmit={placeOrder}>
      {/************** LEFT SECTION ****************/}
      <div className="place-order-left">
        <p className="title">Delivery Information</p>

        <div className="multi-fields">
          <input onChange={onChangeHandler} value={data.firstName} name="firstName" type="text" placeholder="First Name" required/>
          <input onChange={onChangeHandler} value={data.lastName} name="lastName" type="text" placeholder="Last Name" required />
        </div>

        <input onChange={onChangeHandler} value={data.email} name="email" type="email" placeholder="Email Address" required />
        <input onChange={onChangeHandler} value={data.street} name="street" type="text" placeholder="Street" required />

        <div className="multi-fields">
          <input onChange={onChangeHandler} value={data.city} name="city" type="text" placeholder="City" required />
          <input onChange={onChangeHandler} value={data.state} name="state" type="text" placeholder="State" required />
        </div>

        <div className="multi-fields">
          <input onChange={onChangeHandler} value={data.zipcode} name="zipcode" type="text" placeholder="Zip Code" required />
          <input onChange={onChangeHandler} value={data.country} name="country" type="text" placeholder="Country"  required/>
        </div>

        <input onChange={onChangeHandler} value={data.phone} name="phone" type="text" placeholder="Phone" required />
      </div>

      {/************** RIGHT SECTION ****************/}
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>

          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>$ {getTotalCartAmount()}</p>
            </div>

            <hr />

            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>$ {getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>

            <hr />

            <div className="cart-total-details">
              <b>Total</b>
              <b>$ {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>

          <button type="submit">Make Payment</button>
        </div>
      </div>
    </form>
  );
};

export default Order;
