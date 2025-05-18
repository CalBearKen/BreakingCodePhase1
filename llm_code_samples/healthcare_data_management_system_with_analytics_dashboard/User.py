# models.py
from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    ROLES = (
        ('administrator', 'Administrator'),
        ('doctor', 'Doctor'),
        ('staff', 'Staff'),
    )
    role = models.CharField(max_length=20, choices=ROLES)

class Patient(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    dob = models.DateField()
    address = models.TextField()
    phone = models.CharField(max_length=15)

class Appointment(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    doctor = models.ForeignKey(User, limit_choices_to={'role': 'doctor'}, on_delete=models.CASCADE)
    date = models.DateTimeField()
    description = models.TextField()

class MedicalHistory(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    record = models.TextField()
    created_on = models.DateTimeField(auto_now_add=True)