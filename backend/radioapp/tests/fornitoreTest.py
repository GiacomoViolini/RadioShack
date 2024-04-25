from django.test import TestCase
from django.urls import reverse
from radioapp.models import Fornitore, Acquisto

class FornitoreTestCase(TestCase):
    def setUp(self):
        self.fornitore = Fornitore.objects.create(nome='Test', email='test@test.com', telefono='1234567890', indirizzo='Test Address', referente='Test Referente', iban='Test IBAN')
        self.acquisto = Acquisto.objects.create(costo=100, quantità_articoli_acquistati=10, codice_fornitore=self.fornitore)

    def test_addFornitore(self):
        response = self.client.post(reverse('addFornitore'), data={'nome': 'Test 2', 'email': 'test2@test.com', 'telefono': '0987654321', 'indirizzo': 'Test Address 2', 'referente': 'Test Referente 2', 'iban': 'Test IBAN 2'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['message'], 'Fornitore aggiunto!')

    def test_getFornitori(self):
        response = self.client.get(reverse('getFornitori'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 1)

    def test_deleteFornitore(self):
        response = self.client.delete(reverse('deleteFornitore', args=[self.fornitore.id]))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['message'], 'Fornitore eliminato!')

    def test_filterFornitori(self):
        response = self.client.post(reverse('filterFornitori'), data={'checkedOptions': [{'title': 'Quantità Articoli Acquistati', 'options': ['< 10']}, {'title': 'Capitale Investito', 'options': ['< 1000']}]}, content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 0)

    def test_getFornitore(self):
        response = self.client.get(reverse('getFornitore', args=[self.fornitore.id]))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['nome'], 'Test')

    def test_modifyFornitore(self):
        response = self.client.put(reverse('modifyFornitore', args=[self.fornitore.id]), data={'nome': 'Test Modified'}, content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['nome'], 'Test Modified')
