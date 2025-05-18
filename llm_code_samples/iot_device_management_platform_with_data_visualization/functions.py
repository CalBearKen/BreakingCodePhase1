# lambda_function.py
import json
import boto3
from botocore.exceptions import ClientError

def lambda_handler(event, context):
    try:
        processed_data = process_data(event['data'])
        store_data_in_kinesis(processed_data)
        return {
            'statusCode': 200,
            'body': json.dumps('Data processed successfully')
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps('Error processing data')
        }

def process_data(data):
    # Placeholder for data processing logic
    return data

def store_data_in_kinesis(data):
    client = boto3.client('kinesis', region_name='us-west-2')
    client.put_record(
        StreamName='IoTStream',
        Data=json.dumps(data),
        PartitionKey='device_id'
    )