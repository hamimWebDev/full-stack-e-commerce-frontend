import React from 'react';
import { Order } from '../../types';
import Badge from '../ui/Badge';

interface OrdersTableProps {
  orders: Order[];
  onViewDetails: (orderId: string) => void;
}

const OrdersTable: React.FC<OrdersTableProps> = ({ orders, onViewDetails }) => {
  const getStatusBadge = (status: Order['status']) => {
    const variants: Record<Order['status'], { variant: string; label: string }> = {
      'pending': { variant: 'warning', label: 'Pending' },
      'processing': { variant: 'primary', label: 'Processing' },
      'shipped': { variant: 'accent', label: 'Shipped' },
      'delivered': { variant: 'success', label: 'Delivered' },
      'cancelled': { variant: 'error', label: 'Cancelled' }
    };
    
    const { variant, label } = variants[status];
    
    return <Badge variant={variant as any}>{label}</Badge>;
  };
  
  const getPaymentStatusBadge = (status: Order['paymentStatus']) => {
    const variants: Record<Order['paymentStatus'], { variant: string; label: string }> = {
      'paid': { variant: 'success', label: 'Paid' },
      'pending': { variant: 'warning', label: 'Pending' },
      'failed': { variant: 'error', label: 'Failed' }
    };
    
    const { variant, label } = variants[status];
    
    return <Badge variant={variant as any}>{label}</Badge>;
  };
  
  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-neutral-200">
          <thead className="bg-neutral-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Order ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Customer
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Payment
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Total
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-neutral-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">
                  {order.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">
                  {order.user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(order.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getPaymentStatusBadge(order.paymentStatus)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">
                  ${order.total.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    onClick={() => onViewDetails(order.id)}
                    className="text-primary-600 hover:text-primary-800 font-medium"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTable;