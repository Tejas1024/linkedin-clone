from django.contrib.auth.models import AbstractUser
from django.db import models

print("✅ CustomUser model loaded")

class CustomUser(AbstractUser):
    bio = models.TextField(max_length=500, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.username