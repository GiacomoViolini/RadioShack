# Generated by Django 5.0.3 on 2024-04-03 12:25

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('radioapp', '0004_alter_prodotto_codice_vendita_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='fornitore',
            name='partita_iva',
        ),
        migrations.RemoveField(
            model_name='fornitore',
            name='sito_web',
        ),
    ]
