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

      const json = await apiRes.json();
      
      const service = json.data || json; 

      const titleEn = service.title || service.name || '';
      const titleKh = service.title_kh || '';
      const titleZh = service.title_zh || '';

      const descEn = service.description || '';
      const descKh = service.description_kh || '';
      const descZh = service.description_zh || '';

      const fullTitle = [titleEn, titleKh, titleZh].filter(Boolean).join(' | ') || 'Service Detail';
      const fullDesc = [descEn, descKh, descZh].filter(Boolean).join(' | ') || 'Check out our service detail.';

      const image = service.img
        ? `${API_URL}${STORAGE}${service.img}`
        : 'https://vensoeng.vercel.app/default-cover.jpg';

      const shareUrl = `https://vensoeng.vercel.app/share/service/${id}`;

      return res.status(200).send(`
          <!DOCTYPE html>
          <html>
          <head>
          <meta charset="utf-8">
          <title>${fullTitle}</title>

          <meta property="og:title" content="${fullTitle}" />
          <meta property="og:description" content="${fullDesc}" />
          <meta property="og:image" content="${image}" />
          <meta property="og:url" content="${shareUrl}" />
          <meta property="og:type" content="article" />

          <meta name="author" content="VenSoeng - Business" />
          <meta name="keywords" content="${service.tags || ''} ${service.tags_active || ''}" />
          <meta name="creator" content="VenSoeng - Business" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="${fullTitle}" />
          <meta name="twitter:description" content="${fullDesc}" />
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