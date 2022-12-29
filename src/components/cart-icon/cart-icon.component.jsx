import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { ShoppingBagIcon, ItemCount, CartIconContainer } from './cart-icon.styles';

const CartIcon = () => {
    const { isCartOpen, setIsCartOpen, cartQuantity } = useContext(CartContext);

    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingBagIcon className='shopping-bag-icon' />
            <ItemCount>{cartQuantity}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon;