from django.urls import path

from . import views

urlpatterns = [
    path("addProdotto/", views.addProdotto, name="addProdotto"),
    path("addAcquisto/", views.addAcquisto, name="addAcquisto"),
    path("addFornitore/", views.addFornitore, name="addFornitore"),
    path("getProdotti/", views.getProdotti, name="getProdotti"),
    path("getAggregatedProdotti/", views.getAggregatedProdotti, name="getAggregatedProdotti"),
    path("filterAggregatedProdotti/", views.filterAggregatedProdotti , name="filterAggregatedProdotti"),
    path("getProdotto/<str:nome>/", views.getProdotto, name="getProdotto"),
    path("getFornitori/", views.getFornitori, name="getFornitori"),
    path("getClienti/", views.getClienti, name="getClienti"),
    path("getAcquisti/", views.getAcquisti, name="getAcquisti"),
    path("getVendite/", views.getVendite, name="getVendite"),
    path("deleteFornitore/<int:id>/", views.deleteFornitore, name="deleteFornitore"),
    path("filterProdotto/<str:nome>/", views.filterProdotto, name="filterProdotto"),
    path("deleteProdotto/<str:nome>/", views.deleteProdotto, name="deleteProdotto"),
    path("deleteAcquisto/<int:id>/", views.deleteAcquisto, name="deleteAcquisto"),
    path("filterFornitori", views.filterFornitori, name="filterFornitori"),
    path('getfornitore/<int:id>/', views.getFornitore, name='getFornitore'),
    path('modifyfornitore/<int:id>/', views.modifyFornitore, name='modifyFornitore'),
    path('getPiuVenduti/', views.getPiuVenduti, name='getPiuVenduti'),
    path('getMenoVenduti/', views.getMenoVenduti, name='getMenoVenduti'),
    path('getPiuRemunerativi/', views.getPiuRemunerativi, name='getPiuRemunerativi'),
    path('getFornitoriPiuRemunerativi/', views.getFornitoriPiuRemunerativi, name='getFornitoriPiuRemunerativi'),
    path('getClientiPiuRemunerativi/', views.getClientiPiuRemunerativi, name='getClientiPiuRemunerativi'),
    path('getClientiPiuAcquisti/', views.getClientiPiuAcquisti, name='getClientiPiuAcquisti'),
    path("insertAcquisto/", views.insertAcquisto, name="insertAcquisto"),
    path("insertProdotto/", views.insertProdotto, name="insertProdotto"),
    path("filterAcquisti/", views.filterAcquisti, name="filterAcquisti"),
    path('modifyAcquisto/<int:id>/', views.modifyAcquisto, name='modifyAcquisto'),
    path("getFornitoriPiùOrdinati/", views.getFornitoriPiùOrdinati, name="getFornitoriPiùOrdinati"),
    path("filterClienti/", views.filterClienti, name="filterClienti"),
    path('addVendita/<int:id>/', views.addVendita, name='addVendita'),
    path('getVenduti/', views.getVenduti, name='getVenduti'),
    path("filterVendite/", views.filterVendite, name="filterVendite"),
    path('getAndamentoVendite/', views.getAndamentoVendite, name='getAndamentoVendite'),
    path('changeStatoAcquisto/<int:id>/', views.ChangeStatoAcquisto, name='changeStatoAcquisto'),
    path('updateQuantitaArticoliAcquistati/', views.updateQuantitaArticoliAcquistati, name='updateQuantitaArticoliAcquistati'),
]