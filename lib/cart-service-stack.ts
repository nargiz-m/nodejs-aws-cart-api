import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CartService } from './cart-service';

export class CartServiceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    new CartService(this, 'Cart');
  }
}
