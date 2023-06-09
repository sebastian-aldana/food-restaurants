import { Module } from '@nestjs/common';
import { FoodService } from './food.service';
import { FoodController } from './food.controller';
import { FoodRestaurantModule } from 'src/food-restaurant/food-restaurant.module';

@Module({
  controllers: [FoodController],
  providers: [FoodService],
  imports: [FoodRestaurantModule],
})
export class FoodModule {}
