import { Test, TestingModule } from '@nestjs/testing';
import {Response} from 'express';
import { ProductsController } from './products.controller';

describe('ProductsController', () => {
  let controller: ProductsController;
  let statusMock = {
    status: 1
  } as unknown as number;

  let responseMock = {
    status: jest.fn((x) => x),
    data: jest.fn((x) => x)
  } as unknown as Response;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  describe('getProductsBasedStatus', () =>{
    it('should return status of 200', () => {
      controller.getProductsBasedStatus(statusMock);
      expect(responseMock.status).toHaveBeenCalledWith(200);
    });
  })
});
