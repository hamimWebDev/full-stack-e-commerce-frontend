import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '../../types';
import { useCart } from '../../context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();
  const { product, quantity } = item;
  
  const currentPrice = product.discountPrice || product.price;
  const totalPrice = currentPrice * quantity;
  
  const handleIncrement = () => {
    updateQuantity(product.id, quantity + 1);
  };
  
  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    } else {
      removeItem(product.id);
    }
  };
  
  const handleRemove = () => {
    removeItem(product.id);
  };
  
  return (
    <div className="flex flex-col sm:flex-row py-6 border-b border-neutral-200 last:border-b-0">
      <div className="flex-shrink-0 w-full sm:w-24 h-24 bg-neutral-100 rounded-md overflow-hidden mb-4 sm:mb-0">
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="w-full h-full object-cover object-center"
        />
      </div>
      
      <div className="flex-grow sm:ml-6">
        <div className="flex flex-col sm:flex-row sm:justify-between">
          <div>
            <h3 className="text-base font-medium text-neutral-900">{product.name}</h3>
            
            {product.discountPrice && (
              <div className="mt-1 flex items-center">
                <span className="font-medium text-neutral-800">${product.discountPrice.toFixed(2)}</span>
                <span className="ml-2 text-sm text-neutral-500 line-through">${product.price.toFixed(2)}</span>
              </div>
            )}
            
            {!product.discountPrice && (
              <p className="mt-1 font-medium text-neutral-800">${product.price.toFixed(2)}</p>
            )}
          </div>
          
          <div className="flex flex-col sm:items-end mt-4 sm:mt-0">
            <div className="flex items-center border border-neutral-300 rounded-md">
              <button 
                className="p-2 text-neutral-600 hover:text-neutral-900"
                onClick={handleDecrement}
                aria-label="Decrease quantity"
              >
                <Minus size={16} />
              </button>
              
              <span className="px-3 py-1 text-center w-10">{quantity}</span>
              
              <button 
                className="p-2 text-neutral-600 hover:text-neutral-900"
                onClick={handleIncrement}
                aria-label="Increase quantity"
              >
                <Plus size={16} />
              </button>
            </div>
            
            <div className="flex items-center justify-between sm:justify-end w-full mt-4">
              <button 
                className="text-neutral-500 hover:text-error-600 transition-colors flex items-center"
                onClick={handleRemove}
              >
                <Trash2 size={16} className="mr-1" />
                <span className="text-sm">Remove</span>
              </button>
              
              <p className="font-semibold text-neutral-900 ml-4">
                ${totalPrice.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;