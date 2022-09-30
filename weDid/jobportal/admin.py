from django.contrib import admin
from .models import Job_Detail,JobVerification,JobComplaint

# Register your models here.

admin.site.register(Job_Detail)
admin.site.register(JobVerification)
admin.site.register(JobComplaint)