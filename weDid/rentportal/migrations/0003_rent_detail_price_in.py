# Generated by Django 4.1 on 2022-09-12 13:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rentportal', '0002_rent_detail_valid_at'),
    ]

    operations = [
        migrations.AddField(
            model_name='rent_detail',
            name='price_in',
            field=models.CharField(choices=[('per_hour', 'per_hour'), ('per_day', 'per_day')], default='per_day', max_length=50),
        ),
    ]
