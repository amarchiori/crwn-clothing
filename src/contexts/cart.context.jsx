import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
    
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
        );

    
    if(existingCartItem) {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ?
        {...cartItem, quantity: cartItem.quantity + 1}
        : cartItem
        );
    }

   
    return [...cartItems, { ...productToAdd, quantity: 1 }];

}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartQuantity: 0,
})

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems,setCartItems] = useState([]);
    const [cartQuantity, setCartQuantity] = useState(0);

    useEffect(() => {
        const newCartQuantity = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        setCartQuantity(newCartQuantity)
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartQuantity};

    return (
        <CartContext.Provider value={value} >{children}</CartContext.Provider>
    )
}