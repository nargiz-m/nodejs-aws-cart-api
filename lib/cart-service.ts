import { Code, Function, Runtime } from "aws-cdk-lib/aws-lambda";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";

export class CartService extends Construct {
    constructor(scope: Construct, id: string) {
        super(scope, id);
      
        const cartHandler = new Function(this, "cartHandler", {
            runtime: Runtime.NODEJS_18_X,
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