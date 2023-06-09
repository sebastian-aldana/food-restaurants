import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantModule } from './restaurant/restaurant.module';
import { FoodModule } from './food/food.module';
import { ConfigModule } from '@nestjs/config';
import { FoodRestaurantModule } from './food-restaurant/food-restaurant.module';

@Module({
  imports: [RestaurantModule, FoodModule, ConfigModule.forRoot(), FoodRestaurantModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
