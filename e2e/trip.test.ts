// @ts-nocheck
import { by, device, element, expect as detoxExpect } from 'detox';

describe('Создание поездки', () => {
  beforeAll(async () => {
    await device.launchApp({ newInstance: true });
  });

  it('Заполнение формы и переход к выбору отеля', async () => {
    await element(by.id('input-email')).typeText('demo@travelai.app');
    await element(by.id('input-password')).typeText('Travel123!');
    await element(by.id('btn-login')).tap();

    await element(by.id('btn-open-create-trip')).tap();

    await element(by.id('input-to')).tap();
    await element(by.id('input-to-search')).replaceText('Казань');
    await element(by.text('Казань')).tap();

    await element(by.id('btn-generate')).tap();

    await detoxExpect(element(by.text('Выбор отеля и номера'))).toBeVisible();
  });
});
