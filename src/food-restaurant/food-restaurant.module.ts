import { Module } from '@nestjs/common';
import { FoodRestaurantService } from './food-restaurant.service';

@Module({
  providers: [FoodRestaurantService],
  exports: [FoodRestaurantService],
})
export class FoodRestaurantModule {}
