import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const {username}  = await request.json();
    console.log("username:" + username);
    
    if (!username) {
      return NextResponse.json({ error: 'Username is required' }, { status: 400 });
    }

    // First get the user ID from username
    const userRes = await fetch(`https://api.twitter.com/2/users/by/username/${username}`, {
      headers: {
        Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
      },
    });

    if (!userRes.ok) {
      const err = await userRes.json();
      return NextResponse.json({ error: 'Failed to fetch user ID', details: err }, { status: userRes.status });
    }

    const userData = await userRes.json();
    const userId = userData.data.id;

    // Then get the tweets
    const tweetsRes = await fetch(`https://api.twitter.com/2/users/${userId}/tweets?max_results=10&tweet.fields=created_at,text`, {
      headers: {
        Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
      },
    });

    if (!tweetsRes.ok) {
      const err = await tweetsRes.json();
      return NextResponse.json({ error: 'Failed to fetch tweets', details: err }, { status: tweetsRes.status });
    }

    const tweets = await tweetsRes.json();
    return NextResponse.json({ tweets: tweets.data || [] });

  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: 'Internal server error', details: String(error) }, { status: 500 });
  }
}
