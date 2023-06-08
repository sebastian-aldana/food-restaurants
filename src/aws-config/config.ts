import { config } from 'aws-sdk';

console.log('sebastian', config);

config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS,
  region: process.env.AWS_REGION,
});
