# Generated by Django 4.1 on 2022-09-30 09:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('rentportal', '0012_remove_rent_detail_returned_it'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Rent_detail',
        ),
    ]
