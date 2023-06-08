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
    return this.foodService.create(createFoodDto);
  }

  /* `@Get() findAll()` is a decorator that specifies the HTTP request method and the endpoint path for
  the `findAll` method. It means that when a GET request is made to the `/food` endpoint, the
  `findAll` method will be called. The `findAll` method is responsible for returning all the food
  items stored in the database. */
  @Get()
  findAll() {
    return this.foodService.findAll();
  }

  /* `@Get(':name')` is a decorator that specifies the HTTP request method and the endpoint path for
  the `findOne` method. It means that when a GET request is made to the `/food/:name` endpoint, the
  `findOne` method will be called. */
  @Get(':foodName')
  findOne(@Param('foodName') foodName: string) {
    return this.foodService.findOne(foodName);
  }

  @Patch(':foodName')
  update(
    @Param('foodName') foodName: string,
    @Body() updateFoodDto: UpdateFoodDto,
  ) {
    return this.foodService.update(foodName, updateFoodDto);
  }

  @Delete(':foodName')
  remove(@Param('foodName') foodName: string) {
    return this.foodService.remove(foodName);
  }
}
