const https = require('https');

const BREVO_API_KEY = String(process.env.BREVO_API_KEY || '').trim();
const SENDER_EMAIL = String(process.env.BREVO_SENDER_EMAIL || 'noreply@shturman.app').trim();
const SENDER_NAME = String(process.env.BREVO_SENDER_NAME || 'Штурман').trim();

function sendBrevoEmail({ to, toName, subject, htmlContent }) {
  if (!BREVO_API_KEY) {
    console.warn('[Email] BREVO_API_KEY not set, email skipped');
    return Promise.resolve();
  }

  const body = JSON.stringify({
    sender: { name: SENDER_NAME, email: SENDER_EMAIL },
    to: [{ email: to, name: toName || to }],
    subject,
    htmlContent,
  });

  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        hostname: 'api.brevo.com',
        path: '/v3/smtp/email',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': BREVO_API_KEY,
          'Content-Length': Buffer.byteLength(body),
        },
        timeout: 10000,
      },
      (res) => {
        let raw = '';
        res.on('data', (chunk) => {
          raw += chunk.toString('utf8');
        });
        res.on('end', () => {
          if (res.statusCode && res.statusCode >= 400) {
            reject(new Error(`Brevo HTTP ${res.statusCode}: ${raw}`));
            return;
          }
          resolve();
        });
      }
    );

    req.on('timeout', () => {
      req.destroy(new Error('Brevo timeout'));
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function sendWelcomeEmail({ to, name }) {
  await sendBrevoEmail({
    to,
    toName: name,
    subject: 'Добро пожаловать в Штурман',
    htmlContent: `
      <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto;">
        <h2 style="color: #1B3A6B;">Привет, ${name || 'путешественник'}!</h2>
        <p>Добро пожаловать в <strong>Штурман</strong> — AI-помощник для планирования путешествий.</p>
        <p>Теперь вам доступны маршруты по дням, подбор транспорта и отелей, а также единый бюджет поездки.</p>
      </div>
    `,
  });
}

async function sendPasswordRecoveryEmail({ to, name, newPassword }) {
  await sendBrevoEmail({
    to,
    toName: name,
    subject: 'Восстановление пароля — Штурман',
    htmlContent: `
      <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto;">
        <h2 style="color: #1B3A6B;">Восстановление пароля</h2>
        <p>Здравствуйте, ${name || 'пользователь'}.</p>
        <p>Пароль для входа был обновлен.</p>
        <p><strong>Текущий пароль:</strong> <span style="font-family: monospace">${newPassword}</span></p>
        <p>Если это были не вы, смените пароль как можно скорее.</p>
      </div>
    `,
  });
}

module.exports = { sendWelcomeEmail, sendPasswordRecoveryEmail };
