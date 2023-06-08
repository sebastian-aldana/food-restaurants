import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantModule } from './restaurant/restaurant.module';
import { FoodModule } from './food/food.module';

@Module({
  imports: [RestaurantModule, FoodModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
