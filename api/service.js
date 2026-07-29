
import { API_URL, STORAGE } from '../src/utils/auth';

export default async function handler(req, res) {
  const { id } = req.query;
  const userAgent = req.headers['user-agent'] || '';

  const isBot = /facebook|twitterbot|telegrambot|slackbot|linkedinbot|whatsapp/i.test(userAgent);

  try {
    if (isBot) {
      const apiRes = await fetch(`${API_URL}/services/${id}`);

      if (!apiRes.ok) {
        return res.status(404).send('Service not found');
      }

      const service = await apiRes.json();

      const image = service.img
        ? `${API_URL}${STORAGE}${service.img}`
        : 'https://vensoeng.vercel.app/default-cover.jpg';

      const shareUrl = `https://vensoeng.vercel.app/share/service/${id}`;

      return res.status(200).send(`
          <!DOCTYPE html>
          <html>
          <head>
          <meta charset="utf-8">
          <title>${service.title}</title>

          <meta property="og:title" content="${service.title} | ${service.title_kh} | ${service.title_zh}" />
          <meta property="og:description" content="${service.description || ''} | ${service.description_kh || ''} | ${service.description_zh || ''}" />
          <meta property="og:image" content="${image}" />
          <meta property="og:url" content="${shareUrl}" />
          <meta property="og:type" content="article" />

          <meta name="author" content="VenSoeng - Business" />
          <meta name="keywords" content="${service.tags || ''} ${service.tags_active || ''}" />
          <meta name="creator" content="VenSoeng - Business" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="${service.title} | ${service.title_kh} | ${service.title_zh}" />
          <meta name="twitter:description" content="${service.description || ''} | ${service.description_kh || ''} | ${service.description_zh || ''}" />
          <meta name="twitter:image" content="${image}" />
          </head>
          <body>
            Service Preview
          </body>
          </html>
      `);
    }
    return res.redirect(
      302,
      `https://vensoeng.vercel.app/services/detail/${id}?open=1`
    );
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server Error');
  }
}