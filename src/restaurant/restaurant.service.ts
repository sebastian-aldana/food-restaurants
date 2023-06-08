import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { dynamoDBClient } from '../aws-config/dynamoDBClient';

const { TABLE_RESTAURANTS } = process.env;

@Injectable()
export class RestaurantService {
  async create(createRestaurantDto: CreateRestaurantDto) {
    const response = await dynamoDBClient()
      .put({
        TableName: TABLE_RESTAURANTS,
        Item: {
          restaurantName: createRestaurantDto.restaurantName,
          uuid: uuid(),
          foodNames: createRestaurantDto.foodNames,
        },
      })
      .promise();
    return response;
  }

  async findAll() {
    const results = await dynamoDBClient()
      .scan({
        TableName: TABLE_RESTAURANTS,
      })
      .promise();

    return results.Items;
  }

  async findOne(restaurantName: string) {
    const result = await dynamoDBClient()
      .get({
        TableName: TABLE_RESTAURANTS,
        Key: {
          restaurantName,
        },
      })
      .promise();

    return result.Item;
  }

  async update(
    restaurantName: string,
    updateRestaurantDto: UpdateRestaurantDto,
  ) {
    const updated = await dynamoDBClient()
      .update({
        TableName: TABLE_RESTAURANTS,
        Key: { restaurantName },
        UpdateExpression: 'set #foodNames = :foodNames',
        ExpressionAttributeNames: {
          '#foodNames': 'foodNames',
        },
        ExpressionAttributeValues: {
          ':foodNames': updateRestaurantDto.foodNames,
        },
        ReturnValues: 'ALL_NEW',
      })
      .promise();
    return updated.Attributes;
  }

  async remove(restaurantName: string) {
    return await dynamoDBClient()
      .delete({
        TableName: TABLE_RESTAURANTS,
        Key: { restaurantName },
      })
      .promise();
  }
}
