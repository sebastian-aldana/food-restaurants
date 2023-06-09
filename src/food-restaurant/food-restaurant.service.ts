import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { dynamoDBClient } from 'src/aws-config/dynamoDBClient';
import { CreateRestaurantDto } from '../restaurant/dto/create-restaurant.dto';

const { TABLE_RESTAURANTS, TABLE_FOOD } = process.env;

@Injectable()
export class FoodRestaurantService {
  /**
   * This function creates an item in a table after checking if it already exists.
   * @param {any} item - The item parameter is of type any, which means it can be any data type. It is
   * likely an object or a piece of data that needs to be added to a database table.
   * @param {string} table - The `table` parameter is a string that represents the name of the database
   * table where the `item` will be created.
   * @returns The `createItem` function is returning the result of the `checkIfItemExists` function
   * after awaiting its completion.
   */
  async createItem(item: any, table: string) {
    return await this.checkIfItemExists(item, table);
  }

  /**
   * This is an asynchronous function that retrieves an item from a DynamoDB table by its name.
   * @param item - The `item` parameter is an object or a string that represents the name of the item
   * to be retrieved from the DynamoDB table. If it is an object, it should have a `name` property that
   * contains the name of the item. If it is a string, it represents the name of
   * @param table - The `table` parameter is a string that represents the name of the DynamoDB table
   * from which the item needs to be retrieved.
   * @returns The function `getItemByName` returns the `Item` object retrieved from the specified
   * DynamoDB table based on the provided `name` key. If no item is found with the provided name, the
   * function returns `undefined`.
   */
  async getItemByName(item, table) {
    const result = await dynamoDBClient()
      .get({
        TableName: table,
        Key: {
          name: item.name || item,
        },
      })
      .promise();

    return result.Item;
  }

  /**
   * This function checks if an item exists in a table and adds it if it doesn't.
   * @param {any} item - The item parameter is an object that contains the name, uuid, and items
   * properties.
   * @param table - The `table` parameter is a string that represents the name of the DynamoDB table
   * where the item will be checked for existence and potentially added if it doesn't already exist.
   * @returns The function `checkIfItemExists` returns either a promise that resolves to the result of
   * a `put` operation on a DynamoDB table if the item does not already exist, or the string `'item
   * already exists'` if the item already exists in the table.
   */
  async checkIfItemExists(item: any, table) {
    const response = await this.getItemByName(item, table);
    if (!response) {
      return await dynamoDBClient()
        .put({
          TableName: table,
          Item: {
            name: item.name,
            uuid: uuid(),
            items: item.items,
          },
        })
        .promise();
    }
    return 'item already exists';
  }

  /**
   * This function retrieves all items from a DynamoDB table.
   * @param table - The parameter "table" is not used in the code snippet provided. Instead, the
   * constant "TABLE_FOOD" is used as the table name in the DynamoDB scan operation.
   * @returns The function `getAllItems` is returning an array of items from the DynamoDB table
   * specified by the `table` parameter. The items are obtained by performing a scan operation on the
   * table using the `scan` method of the DynamoDB client. The `await` keyword is used to wait for the
   * scan operation to complete and return the results, which are then returned as an array of items.
   */
  async getAllItems(table) {
    const results = await dynamoDBClient()
      .scan({
        TableName: table,
      })
      .promise();

    return results.Items;
  }

  /**
   * This is an async function that deletes an item from a DynamoDB table based on the provided name.
   * @param {string} name - The name of the item to be deleted from the DynamoDB table.
   * @param table - The name of the DynamoDB table from which the item needs to be deleted.
   * @returns The `DeleteItem` function is returning a promise that resolves to the result of the
   * `delete` operation on the specified `table` in DynamoDB, with the item identified by the `name`
   * key being deleted.
   */
  async DeleteItem(name: string, table) {
    return await dynamoDBClient()
      .delete({
        TableName: table,
        Key: { name },
      })
      .promise();
  }
  /**
   * This is an async function that updates an item in a DynamoDB table with a given name and returns
   * the updated attributes.
   * @param name - The name of the item to be updated in the DynamoDB table.
   * @param {any} updateFoodDto - updateFoodDto is an object that contains the updated values for the
   * "items" attribute of an item in a DynamoDB table.
   * @param table - The name of the DynamoDB table where the item will be updated.
   * @returns the updated attributes of the item in the specified DynamoDB table after updating the
   * 'items' attribute with the value provided in the 'updateFoodDto' parameter.
   */
  async updateItem(name, updateFoodDto: any, table) {
    const updated = await dynamoDBClient()
      .update({
        TableName: table,
        Key: { name },
        UpdateExpression: 'set #items = :items',
        ExpressionAttributeNames: {
          '#items': 'items',
        },
        ExpressionAttributeValues: {
          ':items': updateFoodDto.items,
        },
        ReturnValues: 'ALL_NEW',
      })
      .promise();
    return updated.Attributes;
  }
}
