from django.urls import path

from . import views

urlpatterns = [
    path("a/", views.indexa, name="indexa"),
    path("addProdotto/", views.addProdotto, name="addProdotto"),
    path("addAcquisto/", views.addAcquisto, name="addAcquisto"),
    path("addFornitore/", views.addFornitore, name="addFornitore"),
    path("getProdotti/", views.getProdotti, name="getProdotti"),
    path("getAggregatedProdotti/", views.getAggregatedProdotti, name="getAggregatedProdotti"),
    path("filterAggregatedProdotti/", views.filterAggregatedProdotti , name="filterAggregatedProdotti"),
    path("getProdotto/<str:nome>/", views.getProdotto, name="getProdotto"),
    path("getFornitori/", views.getFornitori, name="getFornitori"),
]