# Generated by Django 3.2.25 on 2024-12-13 02:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('notes', '0002_auto_20241212_1801'),
    ]

    operations = [
        migrations.AddField(
            model_name='note',
            name='audio',
            field=models.FileField(blank=True, null=True, upload_to='audios/'),
        ),
    ]
