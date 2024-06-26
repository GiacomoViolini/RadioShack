# Generated by Django 5.0.3 on 2024-03-29 23:40

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('radioapp', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Cliente',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=50)),
                ('email', models.EmailField(max_length=254)),
                ('telefono', models.CharField(max_length=20)),
                ('indirizzo', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Fornitore',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=50)),
                ('email', models.EmailField(max_length=254)),
                ('telefono', models.CharField(max_length=20)),
                ('indirizzo', models.CharField(max_length=100)),
                ('referente', models.CharField(max_length=50)),
                ('partita_iva', models.CharField(max_length=20)),
                ('sito_web', models.URLField()),
                ('iban', models.CharField(max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='Acquisto',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('costo', models.FloatField()),
                ('quantità_articoli_acquistati', models.IntegerField()),
                ('data_acquisto', models.DateField(auto_now=True)),
                ('codice_fornitore', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='radioapp.fornitore')),
            ],
        ),
        migrations.CreateModel(
            name='Vendita',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('costo', models.FloatField()),
                ('quantità_articoli_acquistati', models.IntegerField()),
                ('data_acquisto', models.DateField(auto_now=True)),
                ('codice_cliente', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='radioapp.cliente')),
            ],
        ),
        migrations.CreateModel(
            name='Prodotto',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=50)),
                ('colore', models.CharField(max_length=50)),
                ('capacità', models.IntegerField(choices=[(128, '128 GB'), (256, '256 GB'), (512, '512 GB'), (1024, '1 TB')])),
                ('anno_di_uscita', models.IntegerField()),
                ('stato', models.CharField(choices=[('in magazzino', 'In magazzino'), ('venduto', 'Venduto'), ('in arrivo', 'In arrivo')], max_length=20)),
                ('condizione', models.CharField(choices=[('accettabile', 'Accettabile'), ('ottiomo', 'Ottimo'), ('eccellente', 'Eccellente')], max_length=20)),
                ('fotocamera', models.CharField(choices=[('singola', 'Singola'), ('doppia', 'Doppia'), ('tripla', 'Tripla')], max_length=20)),
                ('dimensioni_schermo', models.FloatField()),
                ('prezzo_di_acquisto', models.FloatField()),
                ('prezzo_di_vendita', models.FloatField(default=-1)),
                ('prezzo_consigliato', models.FloatField()),
                ('codice_acquisto', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='radioapp.acquisto')),
                ('codice_vendita', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='radioapp.vendita')),
            ],
        ),
        migrations.DeleteModel(
            name='Choice',
        ),
        migrations.DeleteModel(
            name='Question',
        ),
    ]
