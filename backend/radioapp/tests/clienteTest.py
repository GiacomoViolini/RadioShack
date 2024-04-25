from django.test import TestCase, Client
from django.urls import reverse
from radioapp.models import Cliente, Vendita

class ClienteTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        self.get_clienti_url = reverse('getClienti')
        self.filter_clienti_url = reverse('filterClienti')

    def test_get_clienti(self):
        Cliente.objects.create(
            nome='Test Cliente',
            email='test@example.com',
            telefono='1234567890',
            indirizzo='Test Address'
        )
        response = self.client.get(self.get_clienti_url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 1)

    def test_filter_clienti(self):
        cliente = Cliente.objects.create(
            nome='Test Cliente',
            email='test@example.com',
            telefono='1234567890',
            indirizzo='Test Address'
        )
        Vendita.objects.create(
            codice_cliente=cliente,
            quantità_articoli_acquistati=10,
            costo=1000
        )
        data = {
            'checkedOptions': [
                {
                    'title': 'Quantità Articoli Acquistati',
                    'options': ['< 10']
                },
                {
                    'title': 'Capitale Investito',
                    'options': ['< 1000']
                }
            ]
        }
        response = self.client.post(self.filter_clienti_url, data, content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 1)