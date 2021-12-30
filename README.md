## CREATE TABLE

aws dynamodb create-table --table-name alert \    
  --attribute-definitions AttributeName=alertId,AttributeType=S \    
  --key-schema AttributeName=alertId,KeyType=HASH \    
  --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1 \    
  --region us-east-1 \    
  --query TableDescription.TableArn --output text    

  #1   Create an alert table using the AWS CLI.
  #2   Provide an attribute definition and tell DynamoDB that your primary key is of type string (S).
  #3   Provide a key schema.
  #4   Set the throughput (read and write capacity) for the DynamoDB table.
  #5   Select the region for your DynamoDB table.
  #6   Print back the table’s Amazon Resource Name (ARN) to confirm that everything is set up correctly.


## Authorize for DynamoDB
aws iam put-role-policy \    
  --role-name alert-api-executor \    
  --policy-name AlertApiDynamoDB \    
  --policy-document file://./roles/dynamodb.json

  #1   Use the put-role-policy command from the iam section of the AWS CLI to add the policy.
  #2   Attach the policy to the Lambda role you got from the claudia.json file.
  #3   Name your policy.
  #4   Use the dynamodb.json file as a source for creating the policy.