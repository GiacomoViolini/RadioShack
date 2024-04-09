from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..models import Prodotto, Cliente, Vendita
from django.db.models import Count
import random


@api_view(['GET'])
def getVendite(request):
    return Response([{'costo': v.costo, 'quantità_articoli_acquistati': v.quantità_articoli_acquistati, 'data_acquisto': v.data_acquisto, 'codice_cliente': v.codice_cliente.id} for v in Vendita.objects.all()])


#Da eliminare
@api_view(['GET'])
def addVendita(request, id):
    c = Cliente.objects.get(id=id)
    prodotti_in_magazzino = Prodotto.objects.filter(stato="In magazzino")
    temporary = []
    numb=random.randint(1, 10)
    for i, prodotto in enumerate(prodotti_in_magazzino):
        if i < numb:
            temporary.append(prodotto)
    somma_prezzo_consigliato = sum(prodotto.prezzo_consigliato for prodotto in temporary)
    v = Vendita(costo=somma_prezzo_consigliato, quantità_articoli_acquistati=numb, codice_cliente=c)
    v.save()
    for prodotto in temporary:
        prodotto.prezzo_di_vendita = prodotto.prezzo_consigliato
        prodotto.stato = "Venduto"
        prodotto.codice_vendita = v
        prodotto.save()
    
    return Response({"message": "Vendita added"})    

#Da eliminare
@api_view(['GET'])
def getVenduti(request):
    prodotti_venduti = Prodotto.objects.filter(stato="Venduto")
    for p in prodotti_venduti:
        p.prezzo_di_vendita = p.prezzo_consigliato
        p.save()
    data = [{'nome': p.nome, 'colore': p.colore, 'anno_di_uscita': p.anno_di_uscita, 'capacità': p.capacità, 'stato': p.stato, 'condizione': p.condizione, 'fotocamera': p.fotocamera, 'dimensioni_schermo': p.dimensioni_schermo, 'prezzo_consigliato': p.prezzo_consigliato, 'prezzo_di_acquisto': p.prezzo_di_acquisto, 'prezzo_di_vendita': p.prezzo_di_vendita} for p in prodotti_venduti]
    return Response(data)


@api_view(['POST'])
def filterVendite(request):
    vendite = Vendita.objects.all()
    for filter_data in request.data['checkedOptions']:
        if filter_data['title'] == 'Quantità Articoli Acquistati':
            for fil in filter_data['options']:
                if fil == "< 3":
                    vendite = list(
                        filter(lambda v: v.quantità_articoli_acquistati < 3, vendite))
                elif fil == "3 - 10":
                    vendite = list(
                        filter(lambda v: 3 <= v.quantità_articoli_acquistati <= 10, vendite))
                elif fil == "> 10":
                    vendite = list(
                        filter(lambda v: v.quantità_articoli_acquistati > 10, vendite))
        elif filter_data['title'] == 'Costo':
            for fil in filter_data['options']:
                if fil == "< 1000":
                    vendite = list(
                        filter(lambda v: v.costo < 1000, vendite))
                elif fil == "1000 - 5000":
                    vendite = list(
                        filter(lambda v: 1000 <= v.costo <= 5000, vendite))
                elif fil == "> 5000":
                    vendite = list(filter(lambda v: v.costo > 5000, vendite))
    return Response([{'costo': v.costo, 'quantità_articoli_acquistati': v.quantità_articoli_acquistati, 'data_acquisto': v.data_acquisto, 'codice_cliente': v.codice_cliente.id} for v in vendite])

#Da eliminare
@api_view(['GET'])
def updateQuantitaArticoliAcquistati(request):
    vendite = Vendita.objects.all()

    for vendita in vendite:
        num_prodotti_venduti = Prodotto.objects.filter(codice_vendita=vendita, stato="Venduto").count()
        vendita.quantità_articoli_acquistati = num_prodotti_venduti
        vendita.save()

    return Response({"message": "Updated vendite with the number of purchased products"})