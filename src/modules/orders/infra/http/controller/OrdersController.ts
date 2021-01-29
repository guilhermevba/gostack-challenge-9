import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateOrderService from '@modules/orders/services/CreateOrderService';
import FindOrderService from '@modules/orders/services/FindOrderService';

export default class OrdersController {
  public async show(request: Request, response: Response): Promise<Response> {
    const findOrderService = container.resolve(FindOrderService);
    const { id } = request.params;
    const order = await findOrderService.execute({ id });
    return response.send(order);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createOrderService = container.resolve(CreateOrderService);
    const { customer_id, products } = request.body;
    const orderResume = await createOrderService.execute({
      customer_id,
      products,
    });
    return response.send(orderResume);
  }
}
