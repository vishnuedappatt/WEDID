

from django.db import models
from django.contrib.auth.models import AbstractBaseUser,BaseUserManager

# Create your models here.
class MyAccountManager(BaseUserManager):
    def create_user(self,first_name,last_name,mobile,email,password=None):
        if not email:
            raise ValueError('you must have email addressed')
        user=self.model(
            email=self.normalize_email(email),
            first_name=first_name,
            last_name=last_name,
            mobile=mobile,
            
        )
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    
    def create_superuser(self,first_name,last_name,email,mobile,password):
        user=self.create_user( 
            email=self.normalize_email(email),
            first_name=first_name,
            last_name=last_name,
            password=password,
            mobile=mobile,
            )
        
    
        user.is_admin=True
        user.is_staff=True
        user.is_active=True
        user.is_superuser=True
        user.save(using=self._db)
        return user
        
    def create_staff(self,first_name,last_name,email,mobile,password):
        user=self.create_user( 
            email=self.normalize_email(email),
            first_name=first_name,
            password=password,
            last_name=last_name,
            mobile=mobile,
            )
        
        user.is_staff=True
        user.save(using=self._db)
        return user
      
        
    
class Account(AbstractBaseUser):
    first_name=models.CharField(max_length=20)
    last_name=models.CharField(max_length=20)
    email=models.EmailField(max_length=30,unique=True)
    mobile=models.CharField(max_length=10,unique=True)    
    date_joined=models.DateField(auto_now_add=True)
    last_login=models.DateField(auto_now_add=True)
    is_admin=models.BooleanField(default=False)
    is_staff=models.BooleanField(default=False)
    is_active=models.BooleanField(default=False)
    is_superuser=models.BooleanField(default=False)
    count=models.IntegerField(default=0)
    
    
    USERNAME_FIELD='email'
    REQUIRED_FIELDS=['first_name','last_name','mobile',]
    
    
    objects=MyAccountManager()
    
    def __str__(self):
        return self.email
    
    def has_perm(self,perm,obj=None):
        return self.is_admin
    
    
    def has_module_perms(self,add_label):
        return True
    
    
class UserToken(models.Model):
    user_id=models.IntegerField()
    token=models.CharField(max_length=300)
    created_at=models.DateTimeField(auto_now_add=True)
    expired_at=models.DateTimeField()
    
    
    # def __str__(self):
    #     return self.user_id



class Categories(models.Model):
    CAT=(
        ('rent','rent'),
        ('job','job'),
        ('sell','sell'),
    )
    name=models.CharField(max_length=20)
    category_of=models.CharField(choices=CAT,max_length=20)
    image=models.ImageField(upload_to='category/',null=True,blank=True)
    
    def __str__(self):
        return self.name
    
    
class District(models.Model):
    district=models.CharField(max_length=50)
    
    def __str__(self):
        return self.district

class City(models.Model):
    district=models.ForeignKey(District,on_delete=models.SET_NULL,null=True)
    city=models.CharField(max_length=50)
    
    def __str__(self):
        return self.city



    
    
    