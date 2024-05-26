from django.test import TestCase, Client
from django.urls import reverse
from radioapp.models import Fornitore, Acquisto
import json

class AcquistoTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        self.fornitore = Fornitore.objects.create(nome="Fornitore1")
        self.acquisto = Acquisto.objects.create(costo=100, quantità_articoli_acquistati=10, codice_fornitore=self.fornitore)

    def test_addAcquisto(self):
        payload = {'costo': 200, 'quantità_articoli_acquistati': 20, 'codice_fornitore': self.fornitore.id}
        response = self.client.post(reverse('addAcquisto'), data=payload, content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(Acquisto.objects.count(), 2)

    def test_ChangeStatoAcquisto(self):
        response = self.client.put(reverse('changeStatoAcquisto', kwargs={'id': self.acquisto.id}))
        self.assertEqual(response.status_code, 200)
        self.acquisto.refresh_from_db()
        self.assertEqual(self.acquisto.stato, "Consegnato")

    def test_getAcquisti(self):
        response = self.client.get(reverse('getAcquisti'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 1)

    def test_deleteAcquisto(self):
        response = self.client.delete(reverse('deleteAcquisto', kwargs={'id': self.acquisto.id}))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(Acquisto.objects.count(), 0)

    def test_modifyAcquisto(self):
        response = self.client.put(reverse('modifyAcquisto', kwargs={'id': self.acquisto.id}))
        self.assertEqual(response.status_code, 200)
        self.acquisto.refresh_from_db()
        self.assertEqual(self.acquisto.stato, "Consegnato")

    def test_insertAcquisto(self):
        payload = {'acquisto': {'costo': 300, 'quantità_articoli_acquistati': 30, 'codice_fornitore': self.fornitore.id}}
        response = self.client.post(reverse('insertAcquisto'), data=json.dumps(payload), content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(Acquisto.objects.count(), 2)

    def test_filterAcquisti(self):
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
        response = self.client.post(reverse('filterAcquisti'), data=data, content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 0)