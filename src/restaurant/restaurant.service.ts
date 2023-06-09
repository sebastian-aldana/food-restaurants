import { Injectable } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { FoodRestaurantService } from 'src/food-restaurant/food-restaurant.service';

const { TABLE_RESTAURANTS } = process.env;

@Injectable()
export class RestaurantService {
  constructor(private readonly foodRestaurantService: FoodRestaurantService) {}
  async createRestaurant(createRestaurantDto: CreateRestaurantDto) {
    return this.foodRestaurantService.createItem(
      createRestaurantDto,
      TABLE_RESTAURANTS,
    );
  }

  async findAllRestaurant() {
    return this.foodRestaurantService.getAllItems(TABLE_RESTAURANTS);
  }

  async findOneRestaurant(restaurantName: string) {
    return await this.foodRestaurantService.getItemByName(
      restaurantName,
      TABLE_RESTAURANTS,
    );
  }

  async updateRestaurant(name, updateRestaurantDto: UpdateRestaurantDto) {
    await this.foodRestaurantService.updateItem(
      name,
      updateRestaurantDto,
      TABLE_RESTAURANTS,
    );
  }

  async removeRestaurant(restaurantName: string) {
    await this.foodRestaurantService.DeleteItem(
      restaurantName,
      TABLE_RESTAURANTS,
    );
  }
}
