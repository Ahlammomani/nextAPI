import clientPromise from '@/app/lib/mongodb';

export async function GET(request) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const users = await db.collection('users').find({ deleted: { $ne: true } }).toArray();
    return Response.json(users);
  } catch (e) {
    return Response.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}


export async function POST(request) {
    try {
      const client = await clientPromise;
      const db = client.db();
      const body = await request.json();
      
      const user = await db.collection('users').insertOne({
        ...body,
        createdAt: new Date(),
        updatedAt: new Date(),
        deleted: false
      });
      
      return Response.json(user);
    } catch (e) {
      return Response.json({ error: 'Failed to create user' }, { status: 500 });
    }
  }