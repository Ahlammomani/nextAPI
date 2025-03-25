import clientPromise from '@/app/lib/mongodb';

export async function PUT(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const { id } = params;
    const body = await request.json();
    
    const user = await db.collection('users').updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...body, updatedAt: new Date() } }
    );
    
    return Response.json(user);
  } catch (e) {
    return Response.json({ error: 'Failed to update user' }, { status: 500 });
  }
}


export async function DELETE(request, { params }) {
    try {
      const client = await clientPromise;
      const db = client.db();
      const { id } = params;
      
      const user = await db.collection('users').updateOne(
        { _id: new ObjectId(id) },
        { $set: { deleted: true, deletedAt: new Date() } }
      );
      
      return Response.json(user);
    } catch (e) {
      return Response.json({ error: 'Failed to delete user' }, { status: 500 });
    }
  }