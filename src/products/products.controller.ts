import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductDto } from "./dto/products.dto";

@Controller("products")
export class ProductsController {
  constructor(private products: ProductsService) {}
  @Get()
  async getAll() {
    return this.products.getAll();
  }
  @Get(":id")
  async getUnique(@Param("id", ParseIntPipe) id: number) {
    return this.products.getUnique(id);
  }
  @Post()
  async create(@Body() dto: ProductDto) {
    return this.products.create(dto);
  }
  @Put(":id")
  async update(@Param("id", ParseIntPipe) id: number, @Body() dto: ProductDto) {
    return this.products.update(id, dto);
  }
  @Delete(":id")
  async delete(@Param("id", ParseIntPipe) id: number) {
    return this.products.delete(id);
  }
}
