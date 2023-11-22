from django.db import models
from api.user.models import CustomerUser
from api.product.models import product
# Create your models here.

class order(models.Model):
    user = models.ForeignKey(CustomerUser,on_delete=models.CASCADE,null=True,blank=True)
    product_names = models.CharField(max_length=500)
    total_product = models.CharField(max_length=500,default=0)
    transaction_id = models.CharField(max_length=50, default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    total_amount = models.CharField(max_length=50,default=0)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.product_names
    
class orderreturns(models.Model):
    user = models.ForeignKey(CustomerUser,on_delete=models.CASCADE,null=True,blank=True)
    return_product = models.CharField(max_length=40)
    return_reason = models.CharField(max_length=100)
    product_image = models.ImageField(upload_to='returnproducts')