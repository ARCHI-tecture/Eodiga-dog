import { NextApiRequest, NextApiResponse } from 'next';

async function fetchReviews() {
    const response = await fetch('http://localhost:3000/api/map');
    const data = await response.json();
    return data.reviews;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { key } = req.query;

  if (typeof key !== 'string') {
    return res.status(400).json({ error: 'Invalid key' });
  }

  let reviews = await fetchReviews();

  if (req.method === 'DELETE') {
    const reviewKey = parseInt(key, 10);

    if (isNaN(reviewKey)) {
      return res.status(400).json({ error: 'Invalid key format' });
    }

    reviews = reviews.filter((review: { key: number; }) => review.key !== reviewKey);

    // 여기에 실제 데이터베이스 업데이트 로직을 추가해야 합니다.
    return res.status(200).json({ message: 'Review deleted', reviews });
  } else {
    res.setHeader('Allow', ['DELETE']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
