// @vitest-environment node
import { createServer } from 'node:http';

import { expect, test } from 'vitest';

import axiosInstance from './axios';

test('sends transaction requests with JSON bodies and authorization', async () => {
  const requests = [];
  const server = createServer(async (request, response) => {
    let body = '';
    for await (const chunk of request) body += chunk;
    requests.push({
      method: request.method,
      url: request.url,
      authorization: request.headers.authorization,
      contentType: request.headers['content-type'],
      body: body ? JSON.parse(body) : undefined
    });
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ data: { id: 'transaction-1' } }));
  });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const config = {
    baseURL: `http://127.0.0.1:${server.address().port}/`,
    headers: { Authorization: 'Bearer test-token' },
    proxy: false
  };
  const transaction = { description: 'Groceries', amount: 123 };
  try {
    const response = await axiosInstance.get('getAllTransaction', config);
    expect(response.data).toEqual({ data: { id: 'transaction-1' } });
    await axiosInstance.post('addTransaction', transaction, config);
    await axiosInstance.put(
      'editTransaction',
      { id: 'transaction-1', ...transaction },
      config
    );
    await axiosInstance.delete('deleteTransaction', {
      ...config,
      data: { id: 'transaction-1' }
    });
    expect(requests).toEqual(
      [
        ['GET', '/getAllTransaction', undefined],
        ['POST', '/addTransaction', transaction],
        ['PUT', '/editTransaction', { id: 'transaction-1', ...transaction }],
        ['DELETE', '/deleteTransaction', { id: 'transaction-1' }]
      ].map(([method, url, body]) => ({
        method,
        url,
        body,
        authorization: 'Bearer test-token',
        contentType: 'application/json'
      }))
    );
  } finally {
    await new Promise((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve()))
    );
  }
});
