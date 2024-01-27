import { Given, When, Then, Before, BeforeAll } from '@cucumber/cucumber';
import { getData, postData } from '../utils/restHelper';
import { expect } from '@playwright/test';
import { clearCollection } from '../utils/dbHelper';

Before(async function () {
  this.context = {};
});

BeforeAll(async function () {
  await clearCollection('pagamentos');
});

Given('um pagamento em dinheiro {}', function (body) {
  this.context['body'] = JSON.parse(body);
});

When('envio uma solicitação POST para {}', async function (path) {
  this.context['response'] = await postData(
    `http://localhost:3000${path}`,
    this.context['body'],
  );
});

Then('recebo o código de resposta {}', function (code) {
  expect(Number(this.context['response'].status)).toEqual(Number(code));
});

When('requisitar a busca dos pagamentos na url: {}', async function (path) {
  this.context['response'] = await getData(`http://localhost:3000${path}`);
});

Then('deve ser apresentado total de {} pagamento', function (total) {
  expect(this.context['response'].data).toHaveLength(Number(total));
});

When(
  'requisitar a busca do pagamento por pedidoId: {}',
  async function (pedidoId) {
    this.context['response'] = await getData(
      `http://localhost:3000/pagamentos/${pedidoId}`,
    );
  },
);
