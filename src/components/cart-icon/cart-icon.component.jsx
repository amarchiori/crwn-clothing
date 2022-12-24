import { useContext } from 'react';
import './cart-icon.styles.scss';
import { ReactComponent as ShoppingBagIcon } from '../../assests/shopping-bag.svg'
import { CartContext } from '../../contexts/cart.context';

const CartIcon = () => {
    const { isCartOpen, setIsCartOpen } = useContext(CartContext);

    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

    return (
        <div className='cart-icon-container' onClick={toggleIsCartOpen}>
            <ShoppingBagIcon className='shopping-bag-icon' />
            <span className="item-count">0</span>
        </div>
    )
}

export default CartIcon;