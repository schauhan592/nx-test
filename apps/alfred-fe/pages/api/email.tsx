import type { NextApiResponse } from 'next';
import { NextRequest } from 'next/server';

// Next.js Edge API Routes: https://nextjs.org/docs/api-routes/edge-api-routes

export const config = {
  runtime: 'experimental-edge',
};

export default async function handler(req: NextRequest, res: NextApiResponse) {
  const webhookURL = process.env.NEXT_PUBLIC_JOIN_NEWSLETTER_HOOK || '';

  const { email } = await req.json();
  const data = JSON.stringify({
    text: `${'```'}\nJoin Newsletter Form Submitted\n\nEmail - ${email}\n${'```'}`,
  });

  fetch(webhookURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: data,
  }).then((response: any) => {
    res.status(200).json(response);
  });
}
