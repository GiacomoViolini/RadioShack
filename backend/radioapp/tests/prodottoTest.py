from django.test import TestCase, Client
from django.urls import reverse
from radioapp.models import Fornitore, Cliente, Vendita, Prodotto, Acquisto

class ProdottoTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        self.fornitore = Fornitore.objects.create(nome="Fornitore1")
        self.cliente = Cliente.objects.create(nome="Cliente1")
        self.acquisto = Acquisto.objects.create(
            costo=100,
            codice_fornitore=self.fornitore,
            quantità_articoli_acquistati=10
        )
        self.vendita = Vendita.objects.create(
            costo=200,
            quantità_articoli_acquistati=20,
            codice_cliente=self.cliente
        )    
        self.prodotto = Prodotto.objects.create(
            nome='iPhone 13',
            colore='rosso',
            capacità=128,
            anno_di_uscita=2022,
            stato='In arrivo',
            condizione='accettabile',
            fotocamera='Singola',
            dimensioni_schermo=6.2,
            prezzo_di_acquisto=500,
            prezzo_di_vendita=600,
            prezzo_consigliato=700,
            codice_acquisto=self.acquisto,
            codice_vendita=self.vendita
        )

    def test_addProdotto(self):
        response = self.client.post(reverse('addProdotto'), data={
            'nome': 'iPhone 12',
            'colore': 'blue',
            'capacità': 64,
            'anno_di_uscita': 2023,
            'stato': 'In magazzino',
            'condizione': 'accettabile',
            'fotocamera': 'Singola',
            'dimensioni_schermo': 6.4,
            'prezzo_di_acquisto': 800,
            'prezzo_di_vendita': 900,
            'prezzo_consigliato': 1000,
            'codice_acquisto': self.acquisto.id,
            'codice_vendita': self.vendita.id
        })
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['message'], 'Prodotto aggiunto!')

    def test_getProdotti(self):
        response = self.client.get(reverse('getProdotti'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 1)

    def test_deleteProdotto(self):
        response = self.client.delete(reverse('deleteProdotto', args=[self.prodotto.id]))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['message'], 'Prodotto eliminato!')

    def test_filterProdotti(self):
        response = self.client.post(reverse('filterAggregatedProdotti'), data={
            'checkedOptions': [
                {'title': 'Prezzo di acquisto', 'options': ['< 1000']},
                {'title': 'Dimensioni schermo', 'options': ['< 6.5']}
            ]
        }, content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 1)