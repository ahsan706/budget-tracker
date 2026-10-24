// @vitest-environment node
import { readFile } from 'node:fs/promises';
import { createServer } from 'node:http';

import i18n from 'i18next';
import { expect, test, vi } from 'vitest';

test('loads English and Swedish locales through the real HTTP backend', async () => {
  const locales = new Map();
  for (const language of ['en', 'sv']) {
    locales.set(
      `/locales/${language}/translation.json`,
      await readFile(
        new URL(
          `../../public/locales/${language}/translation.json`,
          import.meta.url
        ),
        'utf8'
      )
    );
  }
  const requests = [];
  const server = createServer((request, response) => {
    requests.push(request.url);
    const locale = locales.get(request.url);
    response.writeHead(locale ? 200 : 404, { 'Content-Type': 'application/json' });
    response.end(locale || '{}');
  });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  const nativeFetch = globalThis.fetch;
  // Resolve relative URLs as a browser would, then use native fetch over HTTP.
  vi.stubGlobal('fetch', (url, options) =>
    nativeFetch(new URL(url, origin), options)
  );
  let onInitialized;
  const initialized = new Promise((resolve) => {
    onInitialized = resolve;
    i18n.on('initialized', onInitialized);
  });
  try {
    await import('./i18n');
    await initialized;
    expect(i18n.t('App.Header.title')).toBe('Budget Tracker');
    await i18n.changeLanguage('sv');
    expect(i18n.t('App.Header.title')).toBe('Budgetspårare');
    expect(i18n.t('Common.description')).toBe('Beskrivning');
    expect(requests).toEqual([
      '/locales/en/translation.json',
      '/locales/sv/translation.json'
    ]);
  } finally {
    i18n.off('initialized', onInitialized);
    vi.unstubAllGlobals();
    await new Promise((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve()))
    );
  }
});
