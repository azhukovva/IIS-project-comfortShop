# Generated by Django 5.1.3 on 2024-11-25 00:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0002_alter_proposedcategory_parent'),
    ]

    operations = [
        migrations.AlterField(
            model_name='proposedcategory',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
