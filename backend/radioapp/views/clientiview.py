from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..models import Cliente, Vendita



@api_view(['GET'])
def getClienti(request):
    clienti = [{"id": c.id, 'nome': c.nome, 'email': c.email, 'telefono': c.telefono,
                'indirizzo': c.indirizzo} for c in Cliente.objects.all()]
    new_clienti = []
    for c in clienti:
        new_clienti.append({**c, "quantità_articoli_acquistati": sum([v.quantità_articoli_acquistati for v in Vendita.objects.filter(
            codice_cliente=c['id'])]), "capitale_investito": sum([v.costo for v in Vendita.objects.filter(codice_cliente=c['id'])])})
    return Response(new_clienti)


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
