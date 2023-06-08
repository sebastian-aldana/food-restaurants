import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { DynamoDBClient, ListTablesCommand } from '@aws-sdk/client-dynamodb';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { dynamoDBClient } from '../aws-config/dynamoDBClient';

const { TABLE_FOOD } = process.env;

@Injectable()
export class FoodService {
  /**
   * This is an async function that creates a new item in a DynamoDB table with the provided food name,
   * UUID, and restaurant information.
   * @param {CreateFoodDto} createFoodDto - `createFoodDto` is an object that contains the data needed
   * to create a new food item in the database. It likely includes properties such as `foodName` (the
   * name of the food item), `restaurants` (an array of restaurants that serve the food item), and
   * possibly other properties such
   * @returns The `create` function is returning a Promise that resolves to the result of the `put`
   * operation on a DynamoDB table. The `put` operation is adding a new item to the table with the
   * properties `foodName`, `uuid`, and `restaurants`, which are obtained from the `createFoodDto`
   * parameter.
   */
  async create(createFoodDto: CreateFoodDto) {
    return await dynamoDBClient()
      .put({
        TableName: TABLE_FOOD,
        Item: {
          foodName: createFoodDto.foodName,
          uuid: uuid(),
          restaurants: createFoodDto.restaurants,
        },
      })
      .promise();
  }

  /**
   * This function asynchronously retrieves all items from a DynamoDB table.
   * @returns The `findAll()` function is returning an array of items retrieved from a DynamoDB table
   * specified by the `TABLE_NAME` constant. The items are obtained by performing a scan operation on
   * the table using the `scan()` method of the DynamoDB client object. The `await` keyword is used to
   * wait for the completion of the scan operation before returning the results. The `promise()` method
   * is used to
   */
  async findAll() {
    const results = await dynamoDBClient()
      .scan({
        TableName: TABLE_FOOD,
      })
      .promise();

    return results.Items;
  }

  /**
   * This is an asynchronous function that retrieves a single item from a DynamoDB table based on a
   * given food name.
   * @param {string} foodName - The parameter `foodName` is not being used in the code snippet
   * provided. It is likely that it was intended to be used as a dynamic value for the `Key` object in
   * the `get` method, but instead a hardcoded value of `'rappi'` is being used.
   * @returns The function `findOne` is returning the `Item` object from the result of a `get`
   * operation on a DynamoDB table. The `Key` used for the `get` operation is hardcoded to search for a
   * food item with the name 'rappi'.
   */
  async findOne(foodName: string) {
    const result = await dynamoDBClient()
      .get({
        TableName: TABLE_FOOD,
        Key: {
          foodName,
        },
      })
      .promise();

    return result.Item;
  }

  async update(foodName: string, updateFoodDto: UpdateFoodDto) {
    const updated = await dynamoDBClient()
      .update({
        TableName: TABLE_FOOD,
        Key: { foodName },
        UpdateExpression: 'set #restaurants = :restaurants',
        ExpressionAttributeNames: {
          '#restaurants': 'restaurants',
        },
        ExpressionAttributeValues: {
          ':restaurants': updateFoodDto.restaurants,
        },
        ReturnValues: 'ALL_NEW',
      })
      .promise();
    return updated.Attributes;
  }

  async remove(foodName: string) {
    return await dynamoDBClient()
      .delete({
        TableName: TABLE_FOOD,
        Key: { foodName },
      })
      .promise();
  }
}
