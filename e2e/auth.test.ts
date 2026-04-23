// @ts-nocheck
import { by, device, element, expect as detoxExpect } from 'detox';

describe('Авторизация', () => {
  beforeAll(async () => {
    await device.launchApp({ newInstance: true });
  });

  it('Открывается экран логина', async () => {
    await detoxExpect(element(by.id('btn-login'))).toBeVisible();
  });

  it('Логин с неверным паролем показывает ошибку', async () => {
    await element(by.id('input-email')).typeText('wrong@test.com');
    await element(by.id('input-password')).typeText('WrongPass1!');
    await element(by.id('btn-login')).tap();
    await detoxExpect(element(by.text('Проверьте логин и пароль'))).toBeVisible();
  });
});
