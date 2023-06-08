import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post()
  create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantService.create(createRestaurantDto);
  }

  @Get()
  findAll() {
    return this.restaurantService.findAll();
  }

  @Get(':restaurantName')
  findOne(@Param('restaurantName') restaurantName: string) {
    return this.restaurantService.findOne(restaurantName);
  }

  @Patch(':restaurantName')
  update(
    @Param('restaurantName') restaurantName: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
  ) {
    return this.restaurantService.update(restaurantName, updateRestaurantDto);
  }

  @Delete(':restaurantName')
  remove(@Param('restaurantName') restaurantName: string) {
    return this.restaurantService.remove(restaurantName);
  }
}
