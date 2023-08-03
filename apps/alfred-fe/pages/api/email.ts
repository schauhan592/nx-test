import { NextApiResponse, NextApiRequest } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.query;
  const webhookURL = process.env.NEXT_PUBLIC_JOIN_NEWSLETTER_HOOK || '';

  const data = JSON.stringify({
    text: `${'```'}\nJoin Newsletter Form Submitted\n\nEmail - ${email}\n${'```'}`,
  });

  fetch(webhookURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: data,
  })
    .then((response: any) => {
      res.status(200).json(response);
    })
    .catch(() => {
      res.status(500).json({});
    });
}
