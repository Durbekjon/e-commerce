import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryDto } from './dto/category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private category: CategoriesService) {}
  @Get()
  async getAll() {
    return this.category.getAll();
  }
  @Get(':id')
  async getUnique(@Param('id', ParseIntPipe) id: number) {
    return this.category.findUnique(id);
  }
  @Post()
  async create(@Body() dto: CategoryDto) {
    return this.category.create(dto);
  }
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CategoryDto,
  ) {
    return this.category.update(id, dto);
  }
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.category.delete(id);
  }
}
