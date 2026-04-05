const KV_REST_API_URL =
  process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const KV_REST_API_TOKEN =
  process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

const allowedReactions = new Set(['like', 'dislike']);

const json = (res, status, body) => {
  res.status(status).setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body));
};

const hasStorage = () => Boolean(KV_REST_API_URL && KV_REST_API_TOKEN);

const encodePart = (value) => encodeURIComponent(String(value));

const callKv = async (command, ...parts) => {
  const response = await fetch(
    `${KV_REST_API_URL}/${[command, ...parts].map(encodePart).join('/')}`,
    {
      headers: {
        Authorization: `Bearer ${KV_REST_API_TOKEN}`,
      },
    }
  );

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || 'KV request failed');
  }

  return response.json();
};

const getCounts = async (articleId) => {
  const result = await callKv('HMGET', `reactions:${articleId}:counts`, 'like', 'dislike');
  const [likes = 0, dislikes = 0] = Array.isArray(result.result) ? result.result : [0, 0];

  return {
    like: Math.max(0, Number(likes) || 0),
    dislike: Math.max(0, Number(dislikes) || 0),
  };
};

const getVote = async (articleId, visitorId) => {
  if (!visitorId) {
    return null;
  }

  const result = await callKv('GET', `reactions:${articleId}:visitor:${visitorId}`);
  return allowedReactions.has(result.result) ? result.result : null;
};

export default async function handler(req, res) {
  if (!hasStorage()) {
    return json(res, 503, {
      error: 'Reaction storage is not configured.',
      setupRequired: true,
    });
  }

  const articleId = req.query?.id;

  if (!articleId) {
    return json(res, 400, { error: 'Article id is required.' });
  }

  if (req.method === 'GET') {
    try {
      const visitorId = req.query?.visitorId;
      const [counts, reaction] = await Promise.all([
        getCounts(articleId),
        getVote(articleId, visitorId),
      ]);

      return json(res, 200, { counts, reaction });
    } catch (error) {
      return json(res, 500, { error: 'Failed to load reactions.', detail: error.message });
    }
  }

  if (req.method === 'POST') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const visitorId = body?.visitorId;
      const nextReaction = body?.reaction;

      if (!visitorId) {
        return json(res, 400, { error: 'Visitor id is required.' });
      }

      if (!allowedReactions.has(nextReaction)) {
        return json(res, 400, { error: 'Reaction type is invalid.' });
      }

      const voteKey = `reactions:${articleId}:visitor:${visitorId}`;
      const countsKey = `reactions:${articleId}:counts`;
      const currentReaction = await getVote(articleId, visitorId);

      if (currentReaction === nextReaction) {
        await Promise.all([
          callKv('HINCRBY', countsKey, currentReaction, -1),
          callKv('DEL', voteKey),
        ]);

        const counts = await getCounts(articleId);
        return json(res, 200, { counts, reaction: null });
      }

      if (currentReaction) {
        await callKv('HINCRBY', countsKey, currentReaction, -1);
      }

      await Promise.all([
        callKv('HINCRBY', countsKey, nextReaction, 1),
        callKv('SET', voteKey, nextReaction),
      ]);

      const counts = await getCounts(articleId);
      return json(res, 200, { counts, reaction: nextReaction });
    } catch (error) {
      return json(res, 500, { error: 'Failed to save reaction.', detail: error.message });
    }
  }

  res.setHeader('Allow', 'GET, POST');
  return json(res, 405, { error: 'Method not allowed.' });
}
