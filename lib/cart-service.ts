import { Code, Function, Runtime } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

export class CartService extends Construct {
    constructor(scope: Construct, id: string) {
        super(scope, id);
      
        const cartHandler = new Function(this, "cartHandler", {
            runtime: Runtime.NODEJS_18_X,
            handler: 'main.handler',
            code: Code.fromAsset('dist/src'),
        });
    }
}