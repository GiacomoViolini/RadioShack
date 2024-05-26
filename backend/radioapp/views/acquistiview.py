from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..models import Prodotto, Acquisto, Fornitore

@api_view(['POST'])
def addAcquisto(request):
    a = Acquisto(costo=request.data['costo'], quantità_articoli_acquistati=request.data[
                 'quantità_articoli_acquistati'], codice_fornitore=Fornitore.objects.get(id=1))
    a.save()
    return Response({'message': 'Acquisto aggiunto!'})

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

@api_view(['DELETE'])
def deleteAcquisto(request, id):
    f = Acquisto.objects.get(id=id)
    f.delete()
    return Response({'message': 'Acquisto eliminato!'})

@api_view(['PUT'])
def modifyAcquisto(request, id):
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

@api_view(['POST'])
def filterAcquisti(request):
    acquisti = Acquisto.objects.all()
    for filter_data in request.data['checkedOptions']:
        if filter_data['title'] == 'Quantità articoli acquistati':
            filtered = []
            for fil in filter_data['options']:
                if fil == "< 10":
                    temp = list(
                        filter(lambda a: a.quantità_articoli_acquistati < 10, acquisti))
                    filtered.extend(temp)
                elif fil == "10 - 50":
                    temp = list(
                        filter(lambda a: 10 <= a.quantità_articoli_acquistati <= 50, acquisti))
                    filtered.extend(temp)
                elif fil == "> 50":
                    temp = list(
                        filter(lambda a: a.quantità_articoli_acquistati > 50, acquisti))
                    filtered.extend(temp)
            acquisti = filtered.copy()
        elif filter_data['title'] == 'Costo':
            filtered = []
            for fil in filter_data['options']:
                if fil == "< 1000":
                    temp = list(
                        filter(lambda a: a.costo < 1000, acquisti))
                    filtered.extend(temp)
                elif fil == "1000 - 5000":
                    temp = list(
                        filter(lambda a: 1000 <= a.costo <= 5000, acquisti))
                    filtered.extend(temp)
                elif fil == "> 5000":
                    temp = list(filter(lambda a: a.costo > 5000, acquisti))
                    filtered.extend(temp)
            acquisti = filtered.copy()
    return Response([{'id': a.id, 'costo': a.costo, 'quantità_articoli_acquistati': a.quantità_articoli_acquistati, 'data_acquisto': a.data_acquisto, 'codice_fornitore': a.codice_fornitore.id, 'stato': a.stato} for a in acquisti])
