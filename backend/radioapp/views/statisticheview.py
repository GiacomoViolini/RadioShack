from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..models import Prodotto, Acquisto, Fornitore, Cliente, Vendita
from django.db.models import Count, F
from django.db.models.functions import TruncDay
from django.db.models import FloatField, Sum
from django.db.models.functions import Cast

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
    profits = Prodotto.objects.select_related('codice_acquisto__codice_fornitore').annotate(
        profit=Cast(F('prezzo_di_vendita') - F('prezzo_di_acquisto'), FloatField())
    ).values('codice_acquisto__codice_fornitore__nome').annotate(
        total_profit=Sum('profit')
    ).order_by('-total_profit')[:10]

    xpairs = [[profit['codice_acquisto__codice_fornitore__nome'], profit['total_profit']] for profit in profits]
    max_profit = profits[0]['total_profit'] if profits else 0

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
    clienti = Cliente.objects.annotate(num_acquisti=Count('vendita')).order_by('-num_acquisti')
    xpairs = [[cliente.nome, cliente.num_acquisti] for cliente in clienti[:10]]
    max_quantità = max(cliente.num_acquisti for cliente in clienti)
    result = {
        'XPairs': xpairs,
        'YScale': [0, max_quantità],
        'Label': "Clienti più ordinati",
        'Category': "Clienti"
    }
    return Response(result)

@api_view(['GET'])
def getAndamentoVendite(request):
    vendite = Vendita.objects.annotate(day=TruncDay('data_acquisto')).values('day').annotate(total_vendite=Count('id')).order_by('day')
    result = [{'day': vendita['day'].strftime('%Y-%m-%d'), 'total_vendite': vendita['total_vendite']} for vendita in vendite]
    return Response(result)