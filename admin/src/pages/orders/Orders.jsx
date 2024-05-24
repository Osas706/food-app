import React, { useEffect, useState } from "react";
import "./Orders.css";
import axios from "axios";
import {toast} from 'react-toastify';
import { assets } from "../../../../frontend/src/assets/assets";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const res = await axios.get(`${url}/api/order/list`);
    if (res.data.success) {
      setOrders(res.data.data);
      console.log(orders);
    }else{
      toast.error("Error")
    }
  };

  useEffect(() => {
    fetchAllOrders()
  }, []);


  return ( 
    <div className="order add">
      <h2>Order Page</h2>

      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />

            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => {
                  if(index === order.items.length - 1){
                    return item.name + " X " + item.quantity;
                  }else{
                    return item.name + " X " + item.quantity + ", ";
                  }
                })}
              </p>

              <p className="order-item-name">{order.address.firstName + " " + order.address.lastName}</p>

              <div className="order-item-address">
                <p>{order.address.street + "," }</p>
                <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode }</p>
              </div>

              <p className="order-item-phone">{order.address.phone}</p>
            </div>

            <p>Items : {order.items.length} </p>
            <p className="amount">${order.amount}</p>

            <select>
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
};

export default Orders;
