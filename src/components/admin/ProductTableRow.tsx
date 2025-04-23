import React from 'react';
import { Edit, Trash2, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import Badge from '../ui/Badge';

interface ProductTableRowProps {
  product: Product;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const ProductTableRow: React.FC<ProductTableRowProps> = ({ product, onEdit, onDelete }) => {
  return (
    <tr className="hover:bg-neutral-50">
      <td className="py-3 px-4 border-b border-neutral-200">
        <div className="flex items-center">
          <div className="w-10 h-10 flex-shrink-0 mr-3 bg-neutral-200 rounded-md overflow-hidden">
            <img 
              src={product.images[0]} 
              alt={product.name} 
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="truncate max-w-xs">
            <span className="font-medium text-neutral-900">{product.name}</span>
          </div>
        </div>
      </td>
      
      <td className="py-3 px-4 border-b border-neutral-200">
        <span className="font-medium">
          ${(product.discountPrice || product.price).toFixed(2)}
        </span>
        {product.discountPrice && (
          <span className="ml-2 text-sm text-neutral-500 line-through">
            ${product.price.toFixed(2)}
          </span>
        )}
      </td>
      
      <td className="py-3 px-4 border-b border-neutral-200">
        <Badge 
          variant={product.stock > 10 ? 'success' : product.stock > 0 ? 'warning' : 'error'}
          size="sm"
        >
          {product.stock > 10 ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Out of Stock'}
        </Badge>
      </td>
      
      <td className="py-3 px-4 border-b border-neutral-200">
        <span className="capitalize">{product.category}</span>
      </td>
      
      <td className="py-3 px-4 border-b border-neutral-200">
        <div className="flex items-center space-x-2">
          <Link 
            to={`/product/${product.id}`}
            className="p-1 text-neutral-600 hover:text-primary-600 transition-colors"
          >
            <Eye size={18} />
          </Link>
          
          <button 
            onClick={() => onEdit(product.id)} 
            className="p-1 text-neutral-600 hover:text-primary-600 transition-colors"
          >
            <Edit size={18} />
          </button>
          
          <button 
            onClick={() => onDelete(product.id)} 
            className="p-1 text-neutral-600 hover:text-error-600 transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ProductTableRow;