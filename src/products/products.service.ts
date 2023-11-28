import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ProductDto } from "./dto/products.dto";

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}
  async getAll() {
    return this.prisma.products.findMany({
      include: {
        category: true,
      },
    });
  }
  async getUnique(id: number) {
    const product = await this.prisma.products.findUnique({
      where: {
        id,
      },
    });
    if (!product) throw new NotFoundException("product not found");
    return product;
  }
  async create(dto: ProductDto) {
    const category = await this.prisma.category.findUnique({
      where: {
        id: dto.category,
      },
    });
    if (!category) throw new NotFoundException("category not found");
    return this.prisma.products.create({
      data: {
        name: dto.name,
        description: dto.description,
        category: {
          connect: {
            id: dto.category,
          },
        },
        price: dto.price,
        count: dto.count,
      },
    });
  }
  async update(id: number, dto: ProductDto) {
    const product = await this.prisma.products.findUnique({
      where: {
        id,
      },
    });
    if (!product) throw new NotFoundException("product not found");
    const category = await this.prisma.category.findUnique({
      where: {
        id: dto.category,
      },
    });
    if (!category) throw new NotFoundException("category not found");
    return this.prisma.products.update({
      where: {
        id,
      },
      data: {
        name: dto.name,
        description: dto.description,
        price: dto.price,
        count: dto.count,
        category: {
          connect: {
            id: dto.category,
          },
        },
      },
    });
  }
  async delete(id: number) {
    await this.prisma.products.delete({
      where: {
        id,
      },
    });
  }
}
