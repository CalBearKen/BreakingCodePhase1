// FraudDetectionService.java
package com.example.frauddetectionservice;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class FraudDetectionService {

    @KafkaListener(topics = "transaction_events", groupId = "fraud_detection_group")
    public void listenTransactionEvents(String message) {
        // Logic for fraud detection
        System.out.println("Received Message in group fraud_detection_group: " + message);
        // Perform fraud detection algorithm here
    }
}