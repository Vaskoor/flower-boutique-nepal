import { NextRequest, NextResponse } from 'next/server';
import { products } from '@/lib/data';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get('category');
  const occasion = searchParams.get('occasion');

  let filtered = products;

  if (category) {
    filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }
  if (occasion) {
    filtered = filtered.filter(p => p.occasion.some(o => o.toLowerCase() === occasion.toLowerCase()));
  }

  return NextResponse.json(filtered);
}
