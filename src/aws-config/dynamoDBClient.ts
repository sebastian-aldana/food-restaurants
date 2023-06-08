import * as AWS from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import 'dotenv/config';

const { REGION } = process.env;

export const dynamoDBClient = (): DocumentClient => {
  return new AWS.DynamoDB.DocumentClient({
    region: REGION,
  });
};
