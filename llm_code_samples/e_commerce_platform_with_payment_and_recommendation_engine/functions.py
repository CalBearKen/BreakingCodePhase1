# recommendation.py
import tensorflow as tf
import numpy as np

# Dummy data for user behavior; in a real application, you would import your data
user_behaviors = np.array([[0, 1, 0], [1, 0, 1], [1, 1, 0]])
product_ids = np.array([101, 102, 103])

model = tf.keras.Sequential([
    tf.keras.layers.Dense(3, activation='relu', input_shape=(3,)),
    tf.keras.layers.Dense(3, activation='softmax')
])

model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
model.fit(user_behaviors, product_ids, epochs=5)

def recommend(user_behavior):
    prediction = model.predict(np.array([user_behavior]))
    recommended_product = product_ids[np.argmax(prediction)]
    return recommended_product

user_behavior = [1, 0, 0]  # Example input
print(recommend(user_behavior))