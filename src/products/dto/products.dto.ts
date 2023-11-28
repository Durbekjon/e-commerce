import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, isNumber } from "class-validator";

export class ProductDto {
  @ApiProperty({
    description: "Example Product name",
    example: "Apple",
  })
  @IsString()
  name: string;
  @ApiProperty({
    description: "Example Product description",
    example:
      "The apple is one of the pome (fleshy) fruits. Apples at harvest vary widely in size, shape, colour, and acidity, but most are fairly round and some shade of red or yellow. The thousands of varieties fall into three broad classes: cider, cooking, and dessert varieties.",
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: "Example Product price",
    example: 10,
  })
  @IsNumber()
  price: number;
  @ApiProperty({
    description: "Example Product count",
    example: 20,
  })
  count: number;
  @ApiProperty({
    description: "Example Product category",
    example: 2,
  })
  category: number;
}
