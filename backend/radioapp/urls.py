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
    path('getacquisto/<int:id>/', views.getAcquisto, name='getAcquisto'),
    path('modifyacquisto/<int:id>/', views.modifyAcquisto, name='modifyAcquisto'),
    path('api/getPiuVenduti/', views.getPiuVenduti, name='getPiuVenduti'),
    path('api/getMenoVenduti/', views.getMenoVenduti, name='getMenoVenduti'),
    path("insertAcquisto/", views.insertAcquisto, name="insertAcquisto"),
    path("insertProdotto/", views.insertProdotto, name="insertProdotto"),
]