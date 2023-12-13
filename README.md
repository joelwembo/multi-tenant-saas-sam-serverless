# multi-tenant-saas-sam-serverless-typescript

This project contains source code and supporting files for a serverless application that you can deploy with the SAM CLI. It includes the following files and folders.

- hello-world - Code for the application's Lambda function written in TypeScript.
- events - Invocation events that you can use to invoke the function.
- hello-world/tests - Unit tests for the application code. 
- template.yaml - A template that defines the application's AWS resources.

The application uses several AWS resources, including Lambda functions and an API Gateway API. These resources are defined in the `template.yaml` file in this project. You can update the template to add AWS resources through the same deployment process that updates your application code.

If you prefer to use an integrated development environment (IDE) to build and test your application, you can use the AWS Toolkit.  
The AWS Toolkit is an open source plug-in for popular IDEs that uses the SAM CLI to build and deploy serverless applications on AWS. The AWS Toolkit also adds a simplified step-through debugging experience for Lambda function code. See the following links to get started.

* [CLion](https://docs.aws.amazon.com/toolkit-for-jetbrains/latest/userguide/welcome.html)
* [GoLand](https://docs.aws.amazon.com/toolkit-for-jetbrains/latest/userguide/welcome.html)
* [IntelliJ](https://docs.aws.amazon.com/toolkit-for-jetbrains/latest/userguide/welcome.html)
* [WebStorm](https://docs.aws.amazon.com/toolkit-for-jetbrains/latest/userguide/welcome.html)
* [Rider](https://docs.aws.amazon.com/toolkit-for-jetbrains/latest/userguide/welcome.html)
* [PhpStorm](https://docs.aws.amazon.com/toolkit-for-jetbrains/latest/userguide/welcome.html)
* [PyCharm](https://docs.aws.amazon.com/toolkit-for-jetbrains/latest/userguide/welcome.html)
* [RubyMine](https://docs.aws.amazon.com/toolkit-for-jetbrains/latest/userguide/welcome.html)
* [DataGrip](https://docs.aws.amazon.com/toolkit-for-jetbrains/latest/userguide/welcome.html)
* [VS Code](https://docs.aws.amazon.com/toolkit-for-vscode/latest/userguide/welcome.html)
* [Visual Studio](https://docs.aws.amazon.com/toolkit-for-visual-studio/latest/user-guide/welcome.html)

## Deploy the sample application

The Serverless Application Model Command Line Interface (SAM CLI) is an extension of the AWS CLI that adds functionality for building and testing Lambda applications. It uses Docker to run your functions in an Amazon Linux environment that matches Lambda. It can also emulate your application's build environment and API.

To use the SAM CLI, you need the following tools.

* SAM CLI - [Install the SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
* Node.js - [Install Node.js 16](https://nodejs.org/en/), including the NPM package management tool.
* Docker - [Install Docker community edition](https://hub.docker.com/search/?type=edition&offering=community)

To build and deploy your application for the first time, run the following in your shell:

```bash
sam build
sam deploy --guided
```

The first command will build the source of your application. The second command will package and deploy your application to AWS, with a series of prompts:

* **Stack Name**: The name of the stack to deploy to CloudFormation. This should be unique to your account and region, and a good starting point would be something matching your project name.
* **AWS Region**: The AWS region you want to deploy your app to.
* **Confirm changes before deploy**: If set to yes, any change sets will be shown to you before execution for manual review. If set to no, the AWS SAM CLI will automatically deploy application changes.
* **Allow SAM CLI IAM role creation**: Many AWS SAM templates, including this example, create AWS IAM roles required for the AWS Lambda function(s) included to access AWS services. By default, these are scoped down to minimum required permissions. To deploy an AWS CloudFormation stack which creates or modifies IAM roles, the `CAPABILITY_IAM` value for `capabilities` must be provided. If permission isn't provided through this prompt, to deploy this example you must explicitly pass `--capabilities CAPABILITY_IAM` to the `sam deploy` command.
* **Save arguments to samconfig.toml**: If set to yes, your choices will be saved to a configuration file inside the project, so that in the future you can just re-run `sam deploy` without parameters to deploy changes to your application.

You can find your API Gateway Endpoint URL in the output values displayed after deployment.

## Use the SAM CLI to build and test locally

Build your application with the `sam build` command.

```bash
multi-tenant-saas-sam-serverless-typescript$ sam build
```

The SAM CLI installs dependencies defined in `hello-world/package.json`, compiles TypeScript with esbuild, creates a deployment package, and saves it in the `.aws-sam/build` folder.

Test a single function by invoking it directly with a test event. An event is a JSON document that represents the input that the function receives from the event source. Test events are included in the `events` folder in this project.

Run functions locally and invoke them with the `sam local invoke` command.

```bash
multi-tenant-saas-sam-serverless-typescript$ sam local invoke HelloWorldFunction --event events/event.json
```

The SAM CLI can also emulate your application's API. Use the `sam local start-api` to run the API locally on port 3000.

```bash
multi-tenant-saas-sam-serverless-typescript$ sam local start-api
multi-tenant-saas-sam-serverless-typescript$ curl http://localhost:3000/
```

The SAM CLI reads the application template to determine the API's routes and the functions that they invoke. The `Events` property on each function's definition includes the route and method for each path.

```yaml
      Events:
        HelloWorld:
          Type: Api
          Properties:
            Path: /hello
            Method: get
```

## Add a resource to your application
The application template uses AWS Serverless Application Model (AWS SAM) to define application resources. AWS SAM is an extension of AWS CloudFormation with a simpler syntax for configuring common serverless application resources such as functions, triggers, and APIs. For resources not included in [the SAM specification](https://github.com/awslabs/serverless-application-model/blob/master/versions/2016-10-31.md), you can use standard [AWS CloudFormation](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-template-resource-type-ref.html) resource types.

## Fetch, tail, and filter Lambda function logs

To simplify troubleshooting, SAM CLI has a command called `sam logs`. `sam logs` lets you fetch logs generated by your deployed Lambda function from the command line. In addition to printing the logs on the terminal, this command has several nifty features to help you quickly find the bug.

`NOTE`: This command works for all AWS Lambda functions; not just the ones you deploy using SAM.

```bash
multi-tenant-saas-sam-serverless-typescript$ sam logs -n HelloWorldFunction --stack-name multi-tenant-saas-sam-serverless-typescript --tail
```

You can find more information and examples about filtering Lambda function logs in the [SAM CLI Documentation](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-logging.html).

## Unit tests

Tests are defined in the `hello-world/tests` folder in this project. Use NPM to install the [Jest test framework](https://jestjs.io/) and run unit tests.

```bash
multi-tenant-saas-sam-serverless-typescript$ cd hello-world
hello-world$ npm install
hello-world$ npm run test
```

## Cleanup

To delete the sample application that you created, use the AWS CLI. Assuming you used your project name for the stack name, you can run the following:

```bash
sam delete --stack-name multi-tenant-saas-sam-serverless-typescript
```

## Resources

See the [AWS SAM developer guide](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html) for an introduction to SAM specification, the SAM CLI, and serverless application concepts.

Next, you can use AWS Serverless Application Repository to deploy ready to use Apps that go beyond hello world samples and learn how authors developed their applications: [AWS Serverless Application Repository main page](https://aws.amazon.com/serverless/serverlessrepo/)



Initializing a TypeScript template
This walkthrough requires:

Node.js 14. x
AWS SAM CLI
AWS SAM now provides the capability to create a sample TypeScript project using a template. Since this feature is still in preview, you can enable this by one of the following methods:

Use env variable `SAM_CLI_BETA_ESBUILD=1`
Add the following parameters to your samconfig.toml
[default.build.parameters]
beta_features = true
[default.sync.parameters]
beta_features = true
TOML
Use the --beta-features option with sam build and sam sync. I use this approach in the following examples.
Choose option ‘y’ when CLI prompts you about using beta features.
To create a new project:

Run – sam init
In the wizard, select the following options:
AWS Quick Start Templates
Hello World Example
nodejs14.x – TypeScript
Zip
Keep the name of the application as multi-tenant-saas-sam-serverless-typescript
sam init wizard steps
sam init wizard steps

Open the created project in a text editor. In the root, you see a README.MD file with the project description and a template.yaml. This is the specification that defines the serverless application.

In the hello-world folder is an app.ts file written in TypeScript. This project also includes a unit test in Jest and sample configurations for ESLint, Prettier, and TypeScript compilers.

Project structure
Project structure

Building and deploying a TypeScript project
Previously, to use TypeScript with AWS SAM CLI, you needed custom steps. These transform the TypeScript project into a JavaScript project before running the build.

Today, you can use the sam build command to transpile code from TypeScript to JavaScript. This bundles local dependencies and symlinks, and minifies files to reduce asset size.

AWS SAM uses the popular open source bundler esbuild to perform these tasks. This does not perform type checking but you may use the tsc CLI to perform this task. Once you have built the TypeScript project, use the sam deploy command to deploy to the AWS Cloud.
The following shows how this works.

Navigate to the root of multi-tenant-saas-sam-serverless-typescript.
Run sam build. This command uses esbuild to transpile and package app.ts.
sam build wizard
sam build wizard

Customize the esbuild properties by editing the Metadata section in the template.yaml file.
Esbuild configuration
Esbuild configuration

After a successful build, run sam deploy --guided to deploy the application to your AWS account.
Accept all the default values in the wizard, except this question:
HelloWorldFunction may not have authorization defined, Is this okay? [y/N]: y
sam deploy wizard
sam deploy wizard

After successful deployment, test that the function is working by querying the API Gateway endpoint displayed in the Outputs section.
sam deploy output
sam deploy output

Using AWS SAM Accelerate with TypeScript
AWS SAM Accelerate is a set of features that reduces development and test cycle latency by enabling you to test code quickly against AWS services in the cloud. AWS SAM Accelerate released beta support for TypeScript. Use the template from the last example to use SAM Accelerate with TypeScript.

Use AWS SAM Accelerate to build and deploy your code upon changes.

Run sam sync --stack-name multi-tenant-saas-sam-serverless-typescript --watch.
Open your browser with the API Gateway endpoint from the Outputs section.
Update the handler function in app.ts file to:
export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    let response: APIGatewayProxyResult;
    try {
        response = {
            statusCode: 200,
            body: JSON.stringify({
                message: 'hello SAM',
            }),
        };
    } catch (err) {
        console.log(err);
        response = {
            statusCode: 500,
            body: JSON.stringify({
                message: 'some error happened',
            }),
        };
    }

    return response;
};
TypeScript
Save changes. AWS SAM automatically rebuilds and syncs the application code to the cloud.
AWS SAM Accelerate output
AWS SAM Accelerate output

Refresh the browser to see the updated message.
Deployment package size optimizations
One additional benefit of the TypeScript build process is that it reduces your deployment package size through bundling, tree shaking, and minification. The bundling process removes dependency files not referenced in the control flow. Tree shaking is the term used for unused code elimination. It is a compiler optimization that removes unreachable code within files.

Minification reduces file size by removing white space, rewriting syntax to be more compact, and renaming local variables to be shorter. The sam build process performs bundling and tree shaking by default. Configure minification, a feature typically used in production environments, within the Metadata section of the template.yaml file.

Measure the impact of these optimizations by the reduced deployment package size. For example, measure the before and after size of an application, which includes the AWS SDK for JavaScript v3 S3 Client as a dependency.

To begin, change the package.json file to include the @aws-sdk/client-s3 as a dependency:

From the application root, cd into the hello-world directory.
Run the command:
npm install @aws-sdk/client-s3
Delete all the devDependencies except for esbuild to get a more accurate comparison
package.json contents
package.json contents

Run the following command to build your dependency library:
npm install
From the application root, run the following command to measure the size of the application directory contents:
du -sh hello-world
The current application is approximately 50 MB.
Turn on minification by setting the Minify value to true in the template.yaml file
Metadata section of template.yaml
Metadata section of template.yaml

Now run the following command to build your project using bundling, tree shaking, and minification.
sam build
Your deployment package is now built in the .aws_sam directory. You can measure the size of the package with the following command:
du -sh .aws-sam
The new package size is approximately 2.8 MB. That represents a 94% reduction in uncompressed application size.



                Managed S3 bucket: aws-sam-cli-managed-default-samclisourcebucket-cdefjao99h5f
                A different default S3 bucket can be set in samconfig.toml
                Or by specifying --s3-bucket explicitly.
        Uploading to 7b33e513850748d9482c8e504aacefb2  533 / 533  (100.00%)

        Deploying with following values
        ===============================
        Stack name                   : multi-tenant-saas-sam-serverless-typescript
        Region                       : ap-southeast-1
        Confirm changeset            : True
        Disable rollback             : False
        Deployment s3 bucket         : aws-sam-cli-managed-default-samclisourcebucket-cdefjao99h5f
        Capabilities                 : ["CAPABILITY_IAM"]
        Parameter overrides          : {}
        Signing Profiles             : {}

Initiating deployment
=====================

        Uploading to a463c67e94b747e9fcd48daec62b28b7.template  2025 / 2025  (100.00%)


Waiting for changeset to be created..

CloudFormation stack changeset
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------    
Operation                                        LogicalResourceId                                ResourceType                                     Replacement
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------    
+ Add                                            ApplicationInsightsMonitoring                    AWS::ApplicationInsights::Application            N/A
+ Add                                            ApplicationResourceGroup                         AWS::ResourceGroups::Group                       N/A
+ Add                                            HelloWorldFunctionHelloWorldPermissionProd       AWS::Lambda::Permission                          N/A
+ Add                                            HelloWorldFunctionRole                           AWS::IAM::Role                                   N/A
+ Add                                            HelloWorldFunction                               AWS::Lambda::Function                            N/A
+ Add                                            ServerlessRestApiDeployment47fc2d5f9d            AWS::ApiGateway::Deployment                      N/A
+ Add                                            ServerlessRestApiProdStage                       AWS::ApiGateway::Stage                           N/A
+ Add                                            ServerlessRestApi                                AWS::ApiGateway::RestApi                         N/A
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------    


Changeset created successfully. arn:aws:cloudformation:ap-southeast-1:604020082473:changeSet/samcli-deploy1702493150/ae5d79d6-94b4-469e-a6f5-9dbf957748bc


Previewing CloudFormation changeset before deployment
======================================================
Deploy this changeset? [y/N]: y

2023-12-14 02:46:03 - Waiting for stack create/update to complete

CloudFormation events from stack operations (refresh every 5.0 seconds)
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------    
ResourceStatus                                   ResourceType                                     LogicalResourceId                                ResourceStatusReason
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------    
CREATE_IN_PROGRESS                               AWS::CloudFormation::Stack                       multi-tenant-saas-sam-serverless-typescript                                          User Initiated
CREATE_IN_PROGRESS                               AWS::ResourceGroups::Group                       ApplicationResourceGroup                         -
CREATE_IN_PROGRESS                               AWS::IAM::Role                                   HelloWorldFunctionRole                           -
CREATE_IN_PROGRESS                               AWS::ResourceGroups::Group                       ApplicationResourceGroup                         Resource creation Initiated
CREATE_COMPLETE                                  AWS::ResourceGroups::Group                       ApplicationResourceGroup                         -
CREATE_IN_PROGRESS                               AWS::IAM::Role                                   HelloWorldFunctionRole                           Resource creation Initiated
CREATE_IN_PROGRESS                               AWS::ApplicationInsights::Application            ApplicationInsightsMonitoring                    -
CREATE_IN_PROGRESS                               AWS::ApplicationInsights::Application            ApplicationInsightsMonitoring                    Resource creation Initiated
CREATE_COMPLETE                                  AWS::IAM::Role                                   HelloWorldFunctionRole                           -
CREATE_IN_PROGRESS                               AWS::Lambda::Function                            HelloWorldFunction                               -
CREATE_IN_PROGRESS                               AWS::Lambda::Function                            HelloWorldFunction                               Resource creation Initiated
CREATE_COMPLETE                                  AWS::Lambda::Function                            HelloWorldFunction                               -
CREATE_IN_PROGRESS                               AWS::ApiGateway::RestApi                         ServerlessRestApi                                -
CREATE_COMPLETE                                  AWS::ApplicationInsights::Application            ApplicationInsightsMonitoring                    -
CREATE_IN_PROGRESS                               AWS::ApiGateway::RestApi                         ServerlessRestApi                                Resource creation Initiated
CREATE_COMPLETE                                  AWS::ApiGateway::RestApi                         ServerlessRestApi                                -
CREATE_IN_PROGRESS                               AWS::Lambda::Permission                          HelloWorldFunctionHelloWorldPermissionProd       -
CREATE_IN_PROGRESS                               AWS::ApiGateway::Deployment                      ServerlessRestApiDeployment47fc2d5f9d            -
CREATE_IN_PROGRESS                               AWS::Lambda::Permission                          HelloWorldFunctionHelloWorldPermissionProd       Resource creation Initiated
CREATE_COMPLETE                                  AWS::Lambda::Permission                          HelloWorldFunctionHelloWorldPermissionProd       -
CREATE_IN_PROGRESS                               AWS::ApiGateway::Deployment                      ServerlessRestApiDeployment47fc2d5f9d            Resource creation Initiated
CREATE_COMPLETE                                  AWS::ApiGateway::Deployment                      ServerlessRestApiDeployment47fc2d5f9d            -
CREATE_IN_PROGRESS                               AWS::ApiGateway::Stage                           ServerlessRestApiProdStage                       -
CREATE_IN_PROGRESS                               AWS::ApiGateway::Stage                           ServerlessRestApiProdStage                       Resource creation Initiated
CREATE_COMPLETE                                  AWS::ApiGateway::Stage                           ServerlessRestApiProdStage                       -
CREATE_COMPLETE                                  AWS::CloudFormation::Stack                       multi-tenant-saas-sam-serverless-typescript                                          -
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------    

CloudFormation outputs from deployed stack
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------   
Outputs
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------   
Key                 HelloWorldFunctionIamRole
Description         Implicit IAM Role created for Hello World function
Value               arn:aws:iam::604020082473:role/multi-tenant-saas-sam-serverless-typescript-HelloWorldFunctionRole-bbWXpLAC3AcG

Key                 HelloWorldApi
Description         API Gateway endpoint URL for Prod stage for Hello World function
Value               https://wzoaxvp5tk.execute-api.ap-southeast-1.amazonaws.com/Prod/hello/

Key                 HelloWorldFunction
Description         Hello World Lambda Function ARN
Value               arn:aws:lambda:ap-southeast-1:604020082473:function:multi-tenant-saas-sam-serverless-typescript-HelloWorldFunction-Q5gIJq2fcor6
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------   


Successfully created/updated stack - multi-tenant-saas-sam-serverless-typescript in ap-southeast-1