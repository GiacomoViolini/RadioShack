from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Prodotto, Acquisto, Fornitore, Cliente, Vendita
from .utils import convertiCapacità
from django.db.models import Count, F, Sum


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
    products = Prodotto.objects.filter(nome=nome)
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
                  referente=request.data['referente'], iban=request.data['iban'])
    f.save()
    return Response({'message': 'Fornitore aggiunto!'})


@api_view(['GET'])
def getFornitori(request):
    fornitori = [{'id': f.id, 'nome': f.nome, 'email': f.email, 'telefono': f.telefono,
                  'indirizzo': f.indirizzo, 'referente': f.referente, 'iban': f.iban} for f in Fornitore.objects.all()]
    new_fornitori = []
    for f in fornitori:
        new_fornitori.append({**f, "quantità_articoli_acquistati": sum([a.quantità_articoli_acquistati for a in Acquisto.objects.filter(
            codice_fornitore=f['id'])]), "capitale_investito": sum([a.costo for a in Acquisto.objects.filter(codice_fornitore=f['id'])])})
    return Response(new_fornitori)


@api_view(['DELETE'])
def deleteFornitore(request, id):
    f = Fornitore.objects.get(id=id)
    f.delete()
    return Response({'message': 'Fornitore eliminato!'})


@api_view(['GET'])
def getClienti(request):
    clienti = [{"id": c.id, 'nome': c.nome, 'email': c.email, 'telefono': c.telefono,
                'indirizzo': c.indirizzo} for c in Cliente.objects.all()]
    new_clienti = []
    for c in clienti:
        new_clienti.append({**c, "quantità_articoli_acquistati": sum([v.quantità_articoli_acquistati for v in Vendita.objects.filter(
            codice_cliente=c['id'])]), "capitale_investito": sum([v.costo for v in Vendita.objects.filter(codice_cliente=c['id'])])})
    return Response(new_clienti)


@api_view(['GET'])
def getAcquisti(request):
    return Response([{
        'id': a.id,
        'totale': a.costo,
        'quantità_articoli_acquistati': a.quantità_articoli_acquistati,
        'data': a.data_acquisto,
        'codice_fornitore': a.codice_fornitore.id if a.codice_fornitore else None,
        'stato': a.stato
    } for a in Acquisto.objects.all()])


@api_view(['GET'])
def getVendite(request):
    return Response([{'costo': v.costo, 'quantità_articoli_acquistati': v.quantità_articoli_acquistati, 'data_acquisto': v.data_acquisto, 'codice_cliente': v.codice_cliente.id} for v in Vendita.objects.all()])


@api_view(["DELETE"])
def deleteProdotto(request, nome):
    print(nome)
    p = Prodotto.objects.filter(nome=nome)
    p.delete()
    print(p)
    return Response({"message": "Prodotto eliminato!"})


@api_view(['DELETE'])
def deleteAcquisto(request, id):
    f = Acquisto.objects.get(id=id)
    f.delete()
    return Response({'message': 'Acquisto eliminato!'})


@api_view(["POST"])
def filterFornitori(request):
    fornitori = Fornitore.objects.all()
    for filter_data in request.data['checkedOptions']:
        if filter_data['title'] == 'Quantità Articoli Acquistati':
            for fil in filter_data['options']:
                if fil == "< 10":
                    fornitori = list(
                        filter(lambda f: sum([a.quantità_articoli_acquistati for a in Acquisto.objects.filter(codice_fornitore=f.id)]) < 10, fornitori))
                elif fil == "10 - 50":
                    fornitori = list(
                        filter(lambda f: 10 <= sum([a.quantità_articoli_acquistati for a in Acquisto.objects.filter(codice_fornitore=f.id)]) <= 50, fornitori))
                elif fil == "50 - 100":
                    fornitori = list(filter(lambda f: 50 <= sum(
                        [a.quantità_articoli_acquistati for a in Acquisto.objects.filter(codice_fornitore=f.id)]) <= 100, fornitori))
                elif fil == "> 100":
                    fornitori = list(
                        filter(lambda f: sum([a.quantità_articoli_acquistati for a in Acquisto.objects.filter(codice_fornitore=f.id)]) > 100, fornitori))
        elif filter_data['title'] == 'Capitale Investito':
            for fil in filter_data['options']:
                if fil == "< 1000":
                    fornitori = list(
                        filter(lambda f: sum([a.costo for a in Acquisto.objects.filter(codice_fornitore=f.id)]) < 1000, fornitori))
                elif fil == "1000 - 5000":
                    fornitori = list(
                        filter(lambda f: 1000 <= sum([a.costo for a in Acquisto.objects.filter(codice_fornitore=f.id)]) <= 5000, fornitori))
                elif fil == "5000 - 10000":
                    fornitori = list(
                        filter(lambda f: 5000 <= sum([a.costo for a in Acquisto.objects.filter(codice_fornitore=f.id)]) <= 10000, fornitori))
                elif fil == "> 10000":
                    fornitori = list(
                        filter(lambda f: sum([a.costo for a in Acquisto.objects.filter(codice_fornitore=f.id)]) > 10000, fornitori))
    return Response([{'id': f.id, 'nome': f.nome, 'email': f.email, 'telefono': f.telefono,
                      'indirizzo': f.indirizzo, 'referente': f.referente, 'iban': f.iban, "quantità_articoli_acquistati": sum([a.quantità_articoli_acquistati for a in Acquisto.objects.filter(codice_fornitore=f.id)]), "capitale_investito": sum([a.costo for a in Acquisto.objects.filter(codice_fornitore=f.id)])} for f in fornitori])


@api_view(['GET'])
def getFornitore(request, id):
    f = Fornitore.objects.get(id=id)
    return Response({'id': f.id, 'nome': f.nome, 'email': f.email, 'telefono': f.telefono, 'indirizzo': f.indirizzo, 'referente': f.referente, 'iban': f.iban})


@api_view(['PUT'])
def modifyFornitore(request, id):
    f = Fornitore.objects.get(id=id)
    data = request.data
    f.nome, f.email, f.telefono, f.indirizzo, f.referente, f.iban = data.get('nome', f.nome), data.get('email', f.email), data.get(
        'telefono', f.telefono), data.get('indirizzo', f.indirizzo), data.get('referente', f.referente), data.get('iban', f.iban)
    f.save()
    return Response({'id': f.id, 'nome': f.nome, 'email': f.email, 'telefono': f.telefono, 'indirizzo': f.indirizzo, 'referente': f.referente, 'iban': f.iban})


@api_view(['GET'])
def getAcquisto(request, id):
    a = Acquisto.objects.get(id=id)
    return Response({'id': a.id, 'nome': a.nome, 'quantita': a.quantita, 'prezzo': a.prezzo, 'fornitore': a.fornitore.id})


@api_view(['PUT'])
def modifyAcquisto(request, id):
    a = Acquisto.objects.get(id=id)
    data = request.data
    a.nome, a.quantita, a.prezzo, a.fornitore = data.get('nome', a.nome), data.get(
        'quantita', a.quantita), data.get('prezzo', a.prezzo), data.get('fornitore', a.fornitore)
    a.save()
    return Response({'id': a.id, 'nome': a.nome, 'quantita': a.quantita, 'prezzo': a.prezzo, 'fornitore': a.fornitore.id})


@api_view(['PUT'])
def ChangeStatoAcquisto(request, id):
    a = Acquisto.objects.get(id=id)
    a.stato = "Consegnato"
    a.save()
    prodotti = Prodotto.objects.filter(codice_acquisto=a.id)
    for p in prodotti:
        p.stato = "In magazzino"
        p.save()
    return Response({
        'id': a.id,
        'totale': a.costo,
        'quantità_articoli_acquistati': a.quantità_articoli_acquistati,
        'data': a.data_acquisto,
        'codice_fornitore': a.codice_fornitore.id if a.codice_fornitore else None,
        'stato': a.stato
    })


@api_view(["POST"])
def insertAcquisto(request):
    data = request.data['acquisto']
    a = Acquisto(costo=data['costo'], quantità_articoli_acquistati=data[
                 'quantità_articoli_acquistati'], codice_fornitore=Fornitore.objects.get(id=data['codice_fornitore']))
    a.save()
    return Response({"id": a.id})


@api_view(["POST"])
def insertProdotto(request):
    data = request.data['prodotto']
    p = Prodotto(nome=data['nome'], colore=data['colore'], capacità=data['capacità'], anno_di_uscita=data['anno_di_uscita'], condizione=data['condizione'],
                 fotocamera=data['fotocamera'], dimensioni_schermo=data['dimensioni_schermo'], prezzo_di_acquisto=data['prezzo_di_acquisto'], prezzo_consigliato=data['prezzo_consigliato'], codice_acquisto=Acquisto.objects.get(id=data['codice_acquisto']))
    p.save()
    return Response({"id": p.id})


@api_view(['GET'])
def getPiuVenduti(request):
    p = (Prodotto.objects
         .values('nome')
         .annotate(sold_units=Count('codice_vendita'))
         .order_by('-sold_units')[:10])
    xpairs = [[product['nome'], product['sold_units']] for product in p]
    max_sold_units = max(product['sold_units'] for product in p)
    result = {
        'XPairs': xpairs,
        'YScale': [0, max_sold_units],
        'Label': "Prodotti più venduti",
        'Category': "Prodotti"
    }
    return Response(result)


@api_view(['GET'])
def getMenoVenduti(request):
    p = (Prodotto.objects
         .values('nome')
         .annotate(sold_units=Count('codice_vendita'))
         .order_by('sold_units')[:10])
    xpairs = [[product['nome'], product['sold_units']] for product in p]
    max_sold_units = max(product['sold_units'] for product in p)
    result = {
        'XPairs': xpairs,
        'YScale': [0, max_sold_units],
        'Label': "Prodotti meno venduti",
        'Category': "Prodotti"
    }
    return Response(result)


@api_view(['GET'])
def getPiuRemunerativi(request):
    profitable_products = (Prodotto.objects
                           .values('nome')
                           .annotate(profit=F('prezzo_di_vendita') / F('prezzo_di_acquisto'),
                                     sold_units=Count('codice_vendita'))
                           .order_by('-profit')[:10])
    xpairs = [[product['nome'], product['profit'] * product['sold_units']]
              for product in profitable_products]
    max_profit = max(product['profit'] * product['sold_units']
                     for product in profitable_products)
    result = {
        'XPairs': xpairs,
        'YScale': [0, max_profit],
        'Label': "Prodotti più remunerativi",
        'Category': "Prodotti"
    }
    return Response(result)


@api_view(['GET'])
def getFornitoriPiuRemunerativi(request):
    products = Prodotto.objects.values('codice_acquisto',
                                       'prezzo_di_acquisto', 'prezzo_di_vendita')
    for product in products:
        acquisto = Acquisto.objects.get(id=product['codice_acquisto'])
        codice_fornitore = acquisto.codice_fornitore.id
        fornitore = Fornitore.objects.get(id=codice_fornitore)
        product["fornitore"] = fornitore.nome
        print(product)
    temp = {}
    for product in products:
        if product['fornitore'] not in temp:
            temp[product['fornitore']] = 0
        temp[product['fornitore']] += product['prezzo_di_vendita'] - \
            product['prezzo_di_acquisto']
    xpairs = [[fornitore, profit] for fornitore, profit in temp.items()]
    xpairs = sorted(xpairs, key=lambda x: x[1], reverse=True)[:10]
    max_profit = max(profit for profit in temp.values())
    result = {
        'XPairs': xpairs,
        'YScale': [0, max_profit],
        'Label': "Fornitori più remunerativi",
        'Category': "Fornitori"
    }
    return Response(result)


@api_view(['GET'])
def getFornitoriPiùOrdinati(request):
    fornitori = Fornitore.objects.all()
    temp = {}
    for fornitore in fornitori:
        acquisti = Acquisto.objects.filter(codice_fornitore=fornitore.id)
        temp[fornitore.nome] = sum(
            [acquisto.quantità_articoli_acquistati for acquisto in acquisti])
    xpairs = [[fornitore, quantità] for fornitore, quantità in temp.items()]
    xpairs = sorted(xpairs, key=lambda x: x[1], reverse=True)[:10]
    max_quantità = max(quantità for quantità in temp.values())
    result = {
        'XPairs': xpairs,
        'YScale': [0, max_quantità],
        'Label': "Fornitori più ordinati",
        'Category': "Fornitori"
    }
    return Response(result)


@api_view(['GET'])
def getClientiPiuRemunerativi(request):
    sales = Vendita.objects.values('codice_cliente', 'costo')
    temp = {}
    for sale in sales:
        cliente = Cliente.objects.get(id=sale['codice_cliente'])
        cliente_nome = cliente.nome
        if cliente_nome not in temp:
            temp[cliente_nome] = 0
        temp[cliente_nome] += sale['costo']
    xpairs = [[cliente, total] for cliente, total in temp.items()]
    xpairs = sorted(xpairs, key=lambda x: x[1], reverse=True)[:10]
    max_total = max(total for total in temp.values())
    result = {
        'XPairs': xpairs,
        'YScale': [0, max_total],
        'Label': "Clienti più remunerativi",
        'Category': "Clienti"
    }
    return Response(result)


@api_view(['GET'])
def getClientiPiuAcquisti(request):
    clienti = Cliente.objects.all()
    temp = {}
    for cliente in clienti:
        vendite = Vendita.objects.filter(codice_cliente=cliente.id)
        temp[cliente.nome] = sum(
            [vendita.quantità_articoli_acquistati for vendita in vendite])
    xpairs = [[cliente, quantità] for cliente, quantità in temp.items()]
    xpairs = sorted(xpairs, key=lambda x: x[1], reverse=True)[:10]
    max_quantità = max(quantità for quantità in temp.values())
    result = {
        'XPairs': xpairs,
        'YScale': [0, max_quantità],
        'Label': "Clienti più ordinati",
        'Category': "Clienti"
    }
    return Response(result)


@api_view(['POST'])
def filterAcquisti(request):
    acquisti = Acquisto.objects.all()
    for filter_data in request.data['checkedOptions']:
        if filter_data['title'] == 'Quantità Articoli Acquistati':
            for fil in filter_data['options']:
                if fil == "< 10":
                    acquisti = list(
                        filter(lambda a: a.quantità_articoli_acquistati < 10, acquisti))
                elif fil == "10 - 50":
                    acquisti = list(
                        filter(lambda a: 10 <= a.quantità_articoli_acquistati <= 50, acquisti))
                elif fil == "> 50":
                    acquisti = list(
                        filter(lambda a: a.quantità_articoli_acquistati > 50, acquisti))
        elif filter_data['title'] == 'Costo':
            for fil in filter_data['options']:
                if fil == "< 1000":
                    acquisti = list(
                        filter(lambda a: a.costo < 1000, acquisti))
                elif fil == "1000 - 5000":
                    acquisti = list(
                        filter(lambda a: 1000 <= a.costo <= 5000, acquisti))
                elif fil == "> 5000":
                    acquisti = list(filter(lambda a: a.costo > 5000, acquisti))
    return Response([{'id': a.id, 'costo': a.costo, 'quantità_articoli_acquistati': a.quantità_articoli_acquistati, 'data_acquisto': a.data_acquisto, 'codice_fornitore': a.codice_fornitore.id} for a in acquisti])


@api_view(['POST'])
def filterClienti(request):
    clienti = Cliente.objects.all()
    for filter_data in request.data['checkedOptions']:
        if filter_data['title'] == 'Quantità Articoli Acquistati':
            for fil in filter_data['options']:
                if fil == "< 10":
                    clienti = list(
                        filter(lambda c: sum([v.quantità_articoli_acquistati for v in Vendita.objects.filter(codice_cliente=c.id)]) < 10, clienti))
                elif fil == "10 - 50":
                    clienti = list(
                        filter(lambda c: 10 <= sum([v.quantità_articoli_acquistati for v in Vendita.objects.filter(codice_cliente=c.id)]) <= 50, clienti))
                elif fil == "> 50":
                    clienti = list(
                        filter(lambda c: sum([v.quantità_articoli_acquistati for v in Vendita.objects.filter(codice_cliente=c.id)]) > 50, clienti))
        elif filter_data['title'] == 'Capitale Investito':
            for fil in filter_data['options']:
                if fil == "< 1000":
                    clienti = list(
                        filter(lambda c: sum([v.costo for v in Vendita.objects.filter(codice_cliente=c.id)]) < 1000, clienti))
                elif fil == "1000 - 5000":
                    clienti = list(
                        filter(lambda c: 1000 <= sum([v.costo for v in Vendita.objects.filter(codice_cliente=c.id)]) <= 5000, clienti))
                elif fil == "> 5000":
                    clienti = list(
                        filter(lambda c: sum([v.costo for v in Vendita.objects.filter(codice_cliente=c.id)]) > 5000, clienti))
    return Response([{'id': c.id, 'nome': c.nome, 'email': c.email, 'telefono': c.telefono, 'indirizzo': c.indirizzo, "quantità_articoli_acquistati": sum([v.quantità_articoli_acquistati for v in Vendita.objects.filter(codice_cliente=c.id)]), "capitale_investito": sum([v.costo for v in Vendita.objects.filter(codice_cliente=c.id)])} for c in clienti])
