import { type NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const res = await request.json();
  return res
}
