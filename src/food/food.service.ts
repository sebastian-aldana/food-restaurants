import { Injectable } from '@nestjs/common';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { FoodRestaurantService } from '../food-restaurant/food-restaurant.service';

const { TABLE_FOOD } = process.env;

@Injectable()
export class FoodService {
  constructor(private readonly foodRestaurantService: FoodRestaurantService) {}
  async createFood(createFoodDto: CreateFoodDto) {
    return this.foodRestaurantService.createItem(createFoodDto, TABLE_FOOD);
  }

  async findAllFood() {
    return this.foodRestaurantService.getAllItems(TABLE_FOOD);
  }

  async findOneFood(name: string) {
    return await this.foodRestaurantService.getItemByName(name, TABLE_FOOD);
  }

  async updateFood(name: string, updateFoodDto: UpdateFoodDto) {
    this.foodRestaurantService.updateItem(name, updateFoodDto, TABLE_FOOD);
  }

  async removeFood(name: string) {
    this.foodRestaurantService.DeleteItem(name, TABLE_FOOD);
  }
}
