from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Prodotto, Acquisto, Fornitore
from .utils import convertiCapacità


@api_view(['GET'])
def getProdotti(request):
    return Response([{'id': p.id, 'nome': p.nome, 'colore': p.colore, 'capacità': p.capacità, 'stato': p.stato, 'condizione': p.condizione, 'fotocamera': p.fotocamera, 'dimensioni_schermo': p.dimensioni_schermo, 'prezzo_consigliato': p.prezzo_consigliato} for p in Prodotto.objects.all()])


@api_view(['GET'])
def getAggregatedProdotti(request):
    products = Prodotto.objects.order_by('nome')

    aggregated_products_dict = {}
    for product in products:
        if product.nome not in aggregated_products_dict:
            aggregated_products_dict[product.nome] = {
                'quantità': 0,
                'prezzo': float('inf'),
                'colori_possibili': set(),
                'capacità_possibili': set()
            }

        aggregated_products_dict[product.nome]['quantità'] += 1
        aggregated_products_dict[product.nome]['prezzo'] = min(
            aggregated_products_dict[product.nome]['prezzo'], product.prezzo_consigliato)
        aggregated_products_dict[product.nome]['colori_possibili'].add(
            product.colore)
        aggregated_products_dict[product.nome]['capacità_possibili'].add(
            product.capacità)

    aggregated_products_list = [{
        'nome': nome,
        'quantità': data['quantità'],
        'prezzo': data['prezzo'],
        'colori_possibili': sorted(list(data['colori_possibili'])),
        'capacità_possibili': sorted(list(data['capacità_possibili']))
    } for nome, data in aggregated_products_dict.items()]

    return Response(aggregated_products_list)


@api_view(['POST'])
def filterAggregatedProdotti(request):
    products = Prodotto.objects.order_by('nome')
    print(request.data)
    for filter_data in request.data['checkedOptions']:
        if filter_data['title'] == 'Colore':
            products = list(filter(lambda p: p.colore in filter_data['options'], products))
        elif filter_data['title'] == 'Capacità':
            products = list(filter(lambda p: convertiCapacità(p.capacità) in filter_data['options'], products))
        elif filter_data['title'] == "Stato":
            products = list(filter(lambda p: p.stato in filter_data['options'], products))
        elif filter_data['title'] == "Condizione":
            products = list(filter(lambda p: p.condizione in filter_data['options'], products))
        elif filter_data['title'] == "Fotocamera":
            products = list(filter(lambda p: p.fotocamera in filter_data['options'], products))         

    aggregated_products_dict = {}
    for product in products:
        if product.nome not in aggregated_products_dict:
            aggregated_products_dict[product.nome] = {
                'quantità': 0,
                'prezzo': float('inf'),
                'colori_possibili': set(),
                'capacità_possibili': set()
            }

        aggregated_products_dict[product.nome]['quantità'] += 1
        aggregated_products_dict[product.nome]['prezzo'] = min(
            aggregated_products_dict[product.nome]['prezzo'], product.prezzo_consigliato)
        aggregated_products_dict[product.nome]['colori_possibili'].add(
            product.colore)
        aggregated_products_dict[product.nome]['capacità_possibili'].add(
            product.capacità)

    aggregated_products_list = [{
        'nome': nome,
        'quantità': data['quantità'],
        'prezzo': data['prezzo'],
        'colori_possibili': sorted(list(data['colori_possibili'])),
        'capacità_possibili': sorted(list(data['capacità_possibili']))
    } for nome, data in aggregated_products_dict.items()]
    return Response(aggregated_products_list)


@api_view(['GET'])
def indexa(request):
    return Response({'message': 'AAAA'})


@api_view(['POST'])
def addProdotto(request):
    p = Prodotto(nome=request.data['nome'], colore=request.data['colore'], capacità=request.data['capacità'], anno_di_uscita=request.data['anno_di_uscita'], stato=request.data['stato'], condizione=request.data['condizione'],
                 fotocamera=request.data['fotocamera'], dimensioni_schermo=request.data['dimensioni_schermo'], prezzo_di_acquisto=request.data['prezzo_di_acquisto'], prezzo_consigliato=request.data['prezzo_consigliato'], codice_acquisto=Acquisto.objects.get(id=1))
    p.save()
    return Response({'message': 'Prodotto aggiunto!'})


@api_view(['POST'])
def addAcquisto(request):
    a = Acquisto(costo=request.data['costo'], quantità_articoli_acquistati=request.data[
                 'quantità_articoli_acquistati'], codice_fornitore=Fornitore.objects.get(id=1))
    a.save()
    return Response({'message': 'Acquisto aggiunto!'})


@api_view(['POST'])
def addFornitore(request):
    f = Fornitore(nome=request.data['nome'], email=request.data['email'], telefono=request.data['telefono'], indirizzo=request.data['indirizzo'],
                  referente=request.data['referente'], partita_iva=request.data['partita_iva'], sito_web=request.data['sito_web'], iban=request.data['iban'])
    f.save()
    return Response({'message': 'Fornitore aggiunto!'})
