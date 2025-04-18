from django.db import models
from django.utils import timezone
# Create your models here.
class ItemList(models.Model):
    Cat_name = models.CharField(max_length=30)
    def __str__(self):
        return  self.Cat_name
class Items(models.Model):
    Name = models.CharField(max_length=30)
    description = models.TextField(blank=False)
    price = models.IntegerField(null=False)
    category = models.ForeignKey(ItemList,related_name="Name",on_delete=models.CASCADE)
    img = models.ImageField(upload_to='Items/',blank=False)
    def __str__(self):
        return self.Name
class About(models.Model):
    about_description = models.TextField(blank=False)
class FeedBook(models.Model):
    feed_name = models.CharField(max_length=20)
    feed_description = models.TextField(blank=False)

class Oder(models.Model):
    order_name = models.CharField(max_length=2)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    address = models.CharField(max_length=50)
    item_name = models.CharField(max_length=40)
    total = models.IntegerField()
    status = models.CharField(max_length=20, default="Confirmed")
