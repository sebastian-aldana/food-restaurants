import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantModule } from './restaurant/restaurant.module';
import { FoodModule } from './food/food.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [RestaurantModule, FoodModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
