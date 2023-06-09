import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';
import { FoodRestaurantModule } from 'src/food-restaurant/food-restaurant.module';

@Module({
  controllers: [RestaurantController],
  providers: [RestaurantService],
  imports: [FoodRestaurantModule],
})
export class RestaurantModule {}
