# app.py
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
import jwt
import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://username:password@localhost:5432/iot_db'
db = SQLAlchemy(app)

class Device(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    registered_on = db.Column(db.DateTime, default=datetime.datetime.utcnow)

class DataLog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    device_id = db.Column(db.Integer, db.ForeignKey('device.id'), nullable=False)
    data = db.Column(db.String(500), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.datetime.utcnow)

@app.route('/register-device', methods=['POST'])
def register_device():
    name = request.json.get('name')
    device = Device.query.filter_by(name=name).first()
    if not device:
        device = Device(name=name)
        db.session.add(device)
        db.session.commit()
    return jsonify({"id": device.id, "name": device.name})

@app.route('/token', methods=['POST'])
def get_token():
    device_id = request.json.get('device_id')
    token = jwt.encode({'device_id': device_id, 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)}, 'secret_key', algorithm='HS256')
    return jsonify({'token': token})

if __name__ == '__main__':
    app.run(debug=True)