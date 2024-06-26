from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..models import Prodotto, Acquisto
from ..utils import convertiCapacità


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
    for filter_data in request.data['checkedOptions']:
        if filter_data['title'] == 'Colore':
            products = list(
                filter(lambda p: p.colore in filter_data['options'], products))
        elif filter_data['title'] == 'Capacità':
            products = list(filter(lambda p: convertiCapacità(
                p.capacità) in filter_data['options'], products))
        elif filter_data['title'] == "Stato":
            products = list(
                filter(lambda p: p.stato in filter_data['options'], products))
        elif filter_data['title'] == "Condizione":
            products = list(
                filter(lambda p: p.condizione in filter_data['options'], products))
        elif filter_data['title'] == "Fotocamera":
            products = list(
                filter(lambda p: p.fotocamera in filter_data['options'], products))

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
def filterProdotto(request, nome):
    print(nome)
    products = Prodotto.objects.filter(nome=nome)
    print(products)
    print(request.data)
    for filter_data in request.data['checkedOptions']:
        if filter_data['title'] == 'Colore':
            products = list(
                filter(lambda p: p.colore in filter_data['options'], products))
        elif filter_data['title'] == 'Capacità':
            products = list(filter(lambda p: convertiCapacità(
                p.capacità) in filter_data['options'], products))
        elif filter_data['title'] == "Stato":
            products = list(
                filter(lambda p: p.stato in filter_data['options'], products))
        elif filter_data['title'] == "Condizione":
            products = list(
                filter(lambda p: p.condizione in filter_data['options'], products))
        elif filter_data['title'] == "Fotocamera":
            products = list(
                filter(lambda p: p.fotocamera in filter_data['options'], products))

    prodotti_filtrati = {}
    for product in products:
        key = (product.colore, product.capacità,
               product.stato, product.condizione)
        if key not in prodotti_filtrati:
            prodotti_filtrati[key] = {
                'nome': product.nome,
                'colore': product.colore,
                'capacità': product.capacità,
                'stato': product.stato,
                'condizione': product.condizione,
                'fotocamera': product.fotocamera,
                'dimensioni_schermo': product.dimensioni_schermo,
                'prezzo_consigliato': product.prezzo_consigliato,
                'prezzo_di_acquisto': product.prezzo_di_acquisto,
                'prezzo_di_vendita': product.prezzo_di_vendita,
                'quantità': 0,
                "anno_di_uscita": product.anno_di_uscita,
            }
        prodotti_filtrati[key]['quantità'] += 1
    return Response([{'nome': p["nome"], 'colore': p["colore"], "anno_di_uscita": p["anno_di_uscita"], 'capacità': p["capacità"], 'stato': p["stato"], 'condizione': p["condizione"], 'fotocamera': p["fotocamera"], 'dimensioni_schermo': p["dimensioni_schermo"], 'prezzo_consigliato': p["prezzo_consigliato"], "prezzo_di_acquisto": p["prezzo_di_acquisto"], "prezzo_di_vendita": p["prezzo_di_vendita"], "quantità": p['quantità']} for p in prodotti_filtrati.values()])


@api_view(['GET'])
def getProdotto(request, nome):
    products = Prodotto.objects.filter(nome=nome)

    prodotti_filtrati = {}
    for product in products:
        key = (product.colore, product.capacità,
               product.stato, product.condizione)
        if key not in prodotti_filtrati:
            prodotti_filtrati[key] = {
                'nome': product.nome,
                'colore': product.colore,
                'capacità': product.capacità,
                'stato': product.stato,
                'condizione': product.condizione,
                'fotocamera': product.fotocamera,
                'dimensioni_schermo': product.dimensioni_schermo,
                'prezzo_consigliato': product.prezzo_consigliato,
                'prezzo_di_acquisto': product.prezzo_di_acquisto,
                'prezzo_di_vendita': product.prezzo_di_vendita,
                'quantità': 0,
                "anno_di_uscita": product.anno_di_uscita,
            }
        prodotti_filtrati[key]['quantità'] += 1
    return Response([{'nome': p["nome"], 'colore': p["colore"], "anno_di_uscita": p["anno_di_uscita"], 'capacità': p["capacità"], 'stato': p["stato"], 'condizione': p["condizione"], 'fotocamera': p["fotocamera"], 'dimensioni_schermo': p["dimensioni_schermo"], 'prezzo_consigliato': p["prezzo_consigliato"], "prezzo_di_acquisto": p["prezzo_di_acquisto"], "prezzo_di_vendita": p["prezzo_di_vendita"], "quantità": p['quantità']} for p in prodotti_filtrati.values()])


@api_view(['POST'])
def addProdotto(request):
    p = Prodotto(nome=request.data['nome'], colore=request.data['colore'], capacità=request.data['capacità'], anno_di_uscita=request.data['anno_di_uscita'], stato=request.data['stato'], condizione=request.data['condizione'],
                 fotocamera=request.data['fotocamera'], dimensioni_schermo=request.data['dimensioni_schermo'], prezzo_di_acquisto=request.data['prezzo_di_acquisto'], prezzo_consigliato=request.data['prezzo_consigliato'], codice_acquisto=Acquisto.objects.get(id=1))
    p.save()
    return Response({'message': 'Prodotto aggiunto!'})


@api_view(["DELETE"])
def deleteProdotto(request, nome):
    print(nome)
    p = Prodotto.objects.filter(nome=nome)
    p.delete()
    print(p)
    return Response({"message": "Prodotto eliminato!"})

@api_view(["POST"])
def insertProdotto(request):
    data = request.data['prodotto']
    p = Prodotto(nome=data['nome'], colore=data['colore'], capacità=data['capacità'], anno_di_uscita=data['anno_di_uscita'], condizione=data['condizione'],
                 fotocamera=data['fotocamera'], dimensioni_schermo=data['dimensioni_schermo'], prezzo_di_acquisto=data['prezzo_di_acquisto'], prezzo_consigliato=data['prezzo_consigliato'], codice_acquisto=Acquisto.objects.get(id=data['codice_acquisto']))
    p.save()
    return Response({"id": p.id})
