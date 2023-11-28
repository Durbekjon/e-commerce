import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CategoryDto } from "./dto/category.dto";

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}
  async getAll() {
    return this.prisma.category.findMany();
  }
  async findUnique(id: number) {
    const category = await this.prisma.category.findUnique({
      where: {
        id,
      },
    });
    if (!category) throw new NotFoundException("category not found");
    return category;
  }

  async create(dto: CategoryDto) {
    return this.prisma.category.create({
      data: {
        name: dto.name,
      },
    });
  }
  async update(id: number, dto: CategoryDto) {
    const category = await this.prisma.category.findUnique({
      where: {
        id,
      },
    });
    if (!category) throw new NotFoundException("category not found");
    return this.prisma.category.update({
      where: {
        id,
      },
      data: {
        name: dto.name,
      },
    });
  }
  async delete(id: number) {
    const category = await this.prisma.category.findUnique({
      where: {
        id,
      },
    });
    if (!category) throw new NotFoundException("category not found");
    return this.prisma.category.delete({
      where: {
        id,
      },
    });
  }
}
