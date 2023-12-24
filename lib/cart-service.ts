import { Code, Function, Runtime } from "aws-cdk-lib/aws-lambda";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";
import 'dotenv/config';

export class CartService extends Construct {
    constructor(scope: Construct, id: string) {
        super(scope, id);
      
        const cartHandler = new Function(this, "cartHandler", {
            runtime: Runtime.NODEJS_18_X,
            environment: {
                POSTGRES_HOST: process.env.POSTGRES_HOST,
                POSTGRES_USERNAME: process.env.POSTGRES_USERNAME,
                POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
                POSTGRES_DATABASE: process.env.POSTGRES_DATABASE
            },
            handler: 'main.handler',
            code: Code.fromAsset('dist'),
        });
        
        const api = new apigateway.RestApi(this, "carts-api", {
            restApiName: "Cart Service",
            defaultCorsPreflightOptions: {
                allowOrigins: apigateway.Cors.ALL_ORIGINS,
                allowMethods: apigateway.Cors.ALL_METHODS
            }
        });
  
        const proxy = api.root.addResource('{proxy+}');
        proxy.addMethod('ANY',new apigateway.LambdaIntegration(cartHandler));
    }
}