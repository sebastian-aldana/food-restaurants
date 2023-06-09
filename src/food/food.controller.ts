import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FoodService } from './food.service';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';

@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Post()
  create(@Body() createFoodDto: CreateFoodDto) {
    return this.foodService.createFood(createFoodDto);
  }

  @Get()
  findAll() {
    return this.foodService.findAllFood();
  }

  @Get(':foodName')
  findOne(@Param('foodName') foodName: string) {
    return this.foodService.findOneFood(foodName);
  }

  @Patch(':foodName')
  update(
    @Param('foodName') foodName: string,
    @Body() updateFoodDto: UpdateFoodDto,
  ) {
    return this.foodService.updateFood(foodName, updateFoodDto);
  }

  @Delete(':foodName')
  remove(@Param('foodName') foodName: string) {
    return this.foodService.removeFood(foodName);
  }
}
