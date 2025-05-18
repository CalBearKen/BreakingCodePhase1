# kafka_producer.py
from kafka import KafkaProducer
import json

# Initialize Kafka Producer
producer = KafkaProducer(
    bootstrap_servers='localhost:9092',
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)

def send_appointment_notification(appointment_data):
    producer.send('appointment_notifications', appointment_data)
    producer.flush()