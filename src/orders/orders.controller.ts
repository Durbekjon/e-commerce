import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { OrdersDto } from "./dto/orders.dto";

@Controller("orders")
export class OrdersController {
  constructor(private ordersService: OrdersService) {}
  @Get()
  async getAll() {
    return this.ordersService.getAll();
  }
  @Get(":id")
  async getUnique(@Param("id", ParseIntPipe) id: number) {
    return this.ordersService.getUnique(id);
  }
  @Post()
  async create(@Body() dto: OrdersDto) {
    return this.ordersService.create(dto);
  }
  @Delete(":id")
  async delete(@Param("id", ParseIntPipe) id: number) {
    return this.ordersService.delete(id);
  }
}
