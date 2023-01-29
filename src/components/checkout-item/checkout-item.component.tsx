import { FC } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { selectCartItems } from '../../store/cart/cart.selector';
import { addItemToCart, clearItemFromCart, removeItemFromCart } from '../../store/cart/cart.action';

import { CheckoutItemContainer, ImageContainer, CheckoutName, CheckoutPrice, CheckoutQuantity, RemoveButton } from './checkout-item.styles';

import { CartItem } from '../../store/cart/cart.types';

type CheckoutItemProps = {
    cartItem: CartItem;
  };

const CheckoutItem: FC<CheckoutItemProps> = ({ cartItem }) => {
    const {name, imageUrl, price, quantity} = cartItem;
    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch();

    const clearItemHandler = () => dispatch(clearItemFromCart(cartItems, cartItem));
    const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem));
    const removeItemHandler = () => dispatch(removeItemFromCart(cartItems, cartItem));
    
    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={`${name}`} />
            </ImageContainer>
            <CheckoutName>{name}</CheckoutName>
            <CheckoutQuantity>
                <div className="arrow" onClick={removeItemHandler}>&#10094;</div>
                <span className='value'>{quantity}</span>
                <div className="arrow" onClick={addItemHandler}>&#10095;</div>
            </CheckoutQuantity>
            <CheckoutPrice>{price}</CheckoutPrice>
            <RemoveButton  onClick={clearItemHandler}>&#10005;</RemoveButton >
        </CheckoutItemContainer>
    )
}

export default CheckoutItem;