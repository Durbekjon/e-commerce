import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class OrdersDto {
  @ApiProperty({
    description: "example user id",
    example: 1,
  })
  @IsNumber()
  user: number;
  @ApiProperty({
    description: "example product id",
    example: 1,
  })
  @IsNumber()
  products: number;
  // @ApiProperty({
  //   description: "example totalPrice",
  //   example: 999,
  // })
  // @IsNumber()
  // totalPrice: number;
  @ApiProperty({
    description: "example product cound",
    example: 40,
  })
  @IsNumber()
  productCount: number;
}
