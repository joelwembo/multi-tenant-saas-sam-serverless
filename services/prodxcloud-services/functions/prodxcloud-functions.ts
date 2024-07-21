import { APIGatewayProxyHandler } from 'aws-lambda';
import * as AWS from 'aws-sdk';

const sns = new AWS.SNS();

export const handler: APIGatewayProxyHandler = async (event) => {
  const topicName = 'ProdxcloudSNSTopic';
  const emailAddress = 'joelwembo@outlook.com';

  try {
    // Create SNS Topic
    const createTopicResponse = await sns.createTopic({ Name: topicName }).promise();
    const topicArn = createTopicResponse.TopicArn;

    // Subscribe email to the SNS Topic
    await sns.subscribe({
      TopicArn: topicArn,
      Protocol: 'email',
      Endpoint: emailAddress
    }).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `SNS topic '${topicName}' created and email subscription added.`,
        topicArn: topicArn
      })
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Internal server error'
      })
    };
  }
};
