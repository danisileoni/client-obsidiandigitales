import { createOrder } from '@/services/order.service';
import { CreateOrder, Order } from '@/services/types-services';
import Cookies from 'js-cookie';

export const useOrders = () => {
  const createOrders = async (body: CreateOrder): Promise<Order> => {
    const accessToken = Cookies.get('token');

    console.log(accessToken);

    const order = await createOrder(accessToken, body);

    return order;
  };

  return {
    createOrders,
  };
};
