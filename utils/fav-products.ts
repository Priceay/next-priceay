
export const addToFavCart = (productId:number) => {
    //CHECK CART AVAIlable
  
    if (getFavCart() !== null) {
      // check product is in cart if have in increase qty
      //add new product to cart
      const { inCart, productIndex } = hasProductInCart(
        productId,
        getFavCart().cart
      );
      

        
      if (inCart) {
        // remove product from fav cart
        removeItemFromCart(productId)
      } else {
        //add new product to cart
        addNewProductToCart(productId);
      }
    } else {
      //create new cart and add the product
      createFavCart(productId);
    }
  
    return;
  };

  export const removeItemFromCart = (productId:number) => {
    console.log("Removing Cart Item")
    let userCart = getFavCart();
    const { inCart, productIndex } = hasProductInCart(productId, userCart.cart);
    if (inCart) {
      userCart.cart.splice(productIndex, 1);
      setUserCart(userCart);
    }
  };
export const getFavCart=()=>{
    const favProducts = window.localStorage.getItem("favProducts")
    return JSON.parse(favProducts?favProducts:"null");

}

export const hasProductInCart = (id:number, cart:any) => {
    const productIndex = cart.findIndex((item:any) => item.id == id);
    if (productIndex > -1) {
      return {
        inCart: true,
        productIndex,
      };
    } else {
      return {
        inCart: false,
        productIndex,
      };
    }
  };

  const addNewProductToCart = (productId:number) => {
    console.log("Adding New Product To Cart")
    let userCart = getFavCart()
    let newProductData = {
      id: productId,
      
    };
    userCart.cart.push(newProductData);
    setUserCart(userCart);
  };

  const setUserCart = (userCart:any) => {
    window.localStorage.setItem("favProducts", JSON.stringify(userCart));
    return true;
  };
export const createFavCart = (productId:number) => {
    if (getFavCart() == null) {
      const userCart = JSON.stringify({ cart: [{ id: productId }] });
      window.localStorage.setItem("favProducts", userCart);
  
      return {
        success: true,
        msg: `Fav Cart Created`,
      };
    } else {
      return {
        success: false,
        msg: `Fav Cart Already Available`,
      };
    }
  };

export default getFavCart