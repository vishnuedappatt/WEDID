from django.db import models
from user.models import City,Categories,District,Account
# Create your models here.


class Job_Detail(models.Model):
    user=models.ForeignKey(Account,on_delete=models.SET_NULL,null=True)
    category=models.ForeignKey(Categories,on_delete=models.SET_NULL,null=True)
    title=models.CharField(max_length=50)
    district=models.ForeignKey(District,on_delete=models.SET_NULL,null=True)
    city=models.ForeignKey(City,on_delete=models.SET_NULL,null=True)
    discriptions=models.TextField(max_length=300,null=True,blank=True)
    sub_mobile=models.CharField(max_length=10)
    mobile=models.CharField(max_length=10)
    address=models.CharField(max_length=200)
    place=models.CharField(max_length=20)
    payment=models.BooleanField(default=False)
    rate=models.IntegerField()
    available=models.BooleanField(default=False)    
    slug=models.SlugField(max_length=30)
    ordernumber=models.CharField(max_length=40)
    booked=models.BooleanField(default=False)
    booked_person=models.ForeignKey(Account, related_name="booked_persons", on_delete=models.SET_NULL,null=True)
    created_at = models.DateTimeField(auto_now_add=True)    
    valid_at=models.DateField(blank=True,null=True)
    
    
    def __str__(self):
        return self.title
    