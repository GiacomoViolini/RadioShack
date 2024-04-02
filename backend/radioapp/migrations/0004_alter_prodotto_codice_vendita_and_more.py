# Generated by Django 5.0.3 on 2024-04-01 21:34

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('radioapp', '0003_auto_20240401_2232'),
    ]

    operations = [
        migrations.AlterField(
            model_name='prodotto',
            name='codice_vendita',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='radioapp.vendita'),
        ),
        migrations.AlterField(
            model_name='prodotto',
            name='condizione',
            field=models.CharField(max_length=20),
        ),
        migrations.AlterField(
            model_name='prodotto',
            name='fotocamera',
            field=models.CharField(max_length=20),
        ),
        migrations.AlterField(
            model_name='prodotto',
            name='stato',
            field=models.CharField(max_length=20),
        ),
    ]