from django.test import TestCase, Client
from django.urls import reverse
from radioapp.models import Cliente, Vendita

class VenditaTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        self.filter_vendite_url = reverse('filterVendite')

        self.cliente = Cliente.objects.create(
            nome='Test Cliente',
            email='test@example.com',
            telefono='1234567890',
            indirizzo='Test Address'
        )

        Vendita.objects.create(
            codice_cliente=self.cliente,
            quantità_articoli_acquistati=5,
            costo=3000
        )

    def test_filter_vendite(self):
        data = {
            'checkedOptions': [
                {
                    'title': 'Quantità Articoli Acquistati',
                    'options': ['< 10']
                },
                {
                    'title': 'Costo',
                    'options': ['< 5000']
                }
            ]
        }

        response = self.client.post(self.filter_vendite_url, data, content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 1)