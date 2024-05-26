from django.db import models

# Create your models here.


class Fornitore(models.Model):
    nome = models.CharField(max_length=50)
    email = models.EmailField()
    telefono = models.CharField(max_length=20)
    indirizzo = models.CharField(max_length=100)
    referente = models.CharField(max_length=50)
    iban = models.CharField(max_length=30)

    def __str__(self):
        return self.nome + " " + self.email + " " + self.telefono + " " + self.indirizzo + " " + self.referente + " " + self.iban


class Cliente(models.Model):
    nome = models.CharField(max_length=50)
    email = models.EmailField()
    telefono = models.CharField(max_length=20)
    indirizzo = models.CharField(max_length=100)

    def __str__(self):
        return self.nome + " " + self.email + " " + self.telefono + " " + self.indirizzo


class Acquisto(models.Model):
    costo = models.FloatField()
    quantità_articoli_acquistati = models.IntegerField()
    data_acquisto = models.DateField(auto_now=True)
    codice_fornitore = models.ForeignKey(
        Fornitore, on_delete=models.SET_NULL, null=True, related_name='acquisti')
    stato = models.CharField(max_length=30, default="In arrivo")

    def __str__(self):
        return str(self.costo) + " " + str(self.quantità_articoli_acquistati) + " " + str(self.data_acquisto) + " " + str(self.id)


class Vendita(models.Model):
    costo = models.FloatField()
    quantità_articoli_acquistati = models.IntegerField()
    data_acquisto = models.DateField(auto_now=True)
    codice_cliente = models.ForeignKey(Cliente, on_delete=models.DO_NOTHING)

    def __str__(self):
        return str(self.costo) + " " + str(self.quantità_articoli_acquistati) + " " + str(self.data_acquisto)


class Prodotto(models.Model):
    nome = models.CharField(max_length=50)
    colore = models.CharField(max_length=50)
    capacità = models.IntegerField()
    anno_di_uscita = models.IntegerField()
    stato = models.CharField(max_length=20, default="In arrivo")
    condizione = models.CharField(max_length=20)
    fotocamera = models.CharField(max_length=20)
    dimensioni_schermo = models.FloatField()
    prezzo_di_acquisto = models.FloatField()
    prezzo_di_vendita = models.FloatField(default=-1)
    prezzo_consigliato = models.FloatField()
    codice_acquisto = models.ForeignKey(Acquisto, on_delete=models.CASCADE)
    codice_vendita = models.ForeignKey(
        Vendita, on_delete=models.DO_NOTHING, null=True)
    # immagine = models.ImageField(upload_to='prodotti', blank=True, null=True)

    def __str__(self):
        return self.nome + " " + self.colore + " " + str(self.capacità) + "GB " + str(self.anno_di_uscita) + " " + self.stato + " " + self.condizione + " " + self.fotocamera + " " + str(self.dimensioni_schermo) + " " + str(self.prezzo_di_acquisto) + " " + str(self.prezzo_di_vendita) + " " + str(self.prezzo_consigliato)
