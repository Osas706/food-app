import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => { 
  const url = 'http://localhost:4000';
  const [cartItems, setCartItems ] = useState({});
  const [token, setToken] = useState('');
  const [food_list, setFoodList] = useState([]);

  //add to cart func
  const addToCart = (itemId) => {
    if(!cartItems[itemId]){
      setCartItems((prev) => ({...prev, [itemId]:1 }))
    }else{
      setCartItems((prev) => ({...prev,[itemId]:prev[itemId] + 1 }))
    };
  };

  //remove from cart func
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({...prev,[itemId]:prev[itemId] - 1 }));
  };

  //cart total
  const getTotalCartAmount = () => {
    let totalAmount = 0;

    for(const item in cartItems){
      if(cartItems[item] > 0){
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      };
    };

    return totalAmount;
  };

  const fetchFoodList = async() => {
    const res = await axios.get(`${url}/api/food/list`);
    setFoodList(res.data.data)
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchFoodList();

      if(localStorage.getItem("token")){
        setToken(localStorage.getItem("token"));
      };
    };

    loadData();
  }, []);

  //store values
  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  )
};

export default StoreContextProvider;