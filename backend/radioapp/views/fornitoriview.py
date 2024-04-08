from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..models import Acquisto, Fornitore

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
