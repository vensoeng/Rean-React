
import { API_URL, STORAGE } from '../src/utils/auth';

export default async function handler(req, res) {
  const { id } = req.query;
  const userAgent = req.headers['user-agent'] || '';

  const isBot = /facebook|twitterbot|telegrambot|slackbot|linkedinbot|whatsapp/i.test(userAgent);

  try {
    if (isBot) {

        const apiRes = await fetch(`${API_URL}/designs/${id}`);

      if (!apiRes.ok) {
        return res.status(404).send('Service not found');
      }

      const json = await apiRes.json();

      const designs = json.data || json; 
      const title = designs.title || 'ចំណង់ចំណូចចិត្តប្រចាំថ្ងៃ';
      const description = designs.des || 'ក្រៅពីការសរសេរកូដ ខ្ញុំក៏ចូលចិត្តការរចនាក្រាហ្វិក និងការថតរូបផងដែរ';

      const image = designs.img
              ? `${API_URL}${STORAGE}${designs.img}`
              : 'https://vensoeng.vercel.app/default-cover.jpg';

      const shareUrl = `https://vensoeng.vercel.app/share/story/${id}`;

      return res.status(200).send(`
          <!DOCTYPE html>
          <html>
          <head>
          <meta charset="utf-8">
          <title>${title}</title>

          <meta property="og:title" content="${title}" />
          <meta property="og:description" content="${description}" />
          <meta property="og:image" content="${image}" />
          <meta property="og:url" content="${shareUrl}" />
          <meta property="og:type" content="article" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="${title}" />
          <meta name="twitter:description" content="${description}" />
          <meta name="twitter:image" content="${image}" />
          </head>
          <body>
            designs Preview
          </body>
          </html>
      `);
    }
    return res.redirect(
      302,
      `https://vensoeng.vercel.app/designs/detail/${id}?open=1`
    );
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server Error');
  }
}