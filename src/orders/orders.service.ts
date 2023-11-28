import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { OrdersDto } from "./dto/orders.dto";

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  getAll() {
    return this.prisma.orders.findMany({
      include: {
        user: true,
        product: true,
      },
    });
  }

  async getUnique(id: number) {
    const order = await this.prisma.orders.findUnique({
      where: {
        id,
      },
    });
    if (!order) throw new NotFoundException("order not found");
    return order;
  }

  async create(dto: OrdersDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: dto.user,
      },
    });

    if (!user) throw new NotFoundException("user not found ");

    const product = await this.prisma.products.findUnique({
      where: {
        id: dto.products,
      },
    });

    if (!product) throw new NotFoundException("product not found ");

    const count = product.count;

    if (product.count === 0) return `no ${product.name} left`;

    if (count < dto.productCount) {
      const totalPrice = count * product.price;
      await this.prisma.products.update({
        where: {
          id: dto.products,
        },
        data: {
          count: 0,
        },
      });

      return await this.prisma.orders.create({
        data: {
          user: {
            connect: {
              id: dto.user,
            },
          },
          product: {
            connect: {
              id: dto.products,
            },
          },
          productCount: count,
          totalPrice,
        },
      });
    } else {
      const qolgan = count - dto.productCount;

      await this.prisma.products.update({
        where: {
          id: dto.products,
        },
        data: {
          count: qolgan,
        },
      });

      const totalPrice = dto.productCount * product.price;
      await this.prisma.orders.create({
        data: {
          user: {
            connect: {
              id: dto.user,
            },
          },
          product: {
            connect: {
              id: dto.products,
            },
          },
          productCount: dto.productCount,
          totalPrice,
        },
      });
    }
  }

  // async update(id: number, dto: OrdersDto) {
  //   const order = await this.prisma.orders.findUnique({
  //     where: {
  //       id,
  //     },
  //   });

  //   if (!order) throw new NotFoundException("order was not found");

  //   const product = await this.prisma.products.findUnique({
  //     where: {
  //       id: order.productId,
  //     },
  //   });

  //   this.prisma.orders.update({
  //     where: {
  //       id,
  //     },
  //     data:{

  //     }
  //   });
  // }
  async delete(id: number) {
    return this.prisma.orders.delete({
      where: {
        id,
      },
    });
  }
}
