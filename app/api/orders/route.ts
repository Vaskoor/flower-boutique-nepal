// app/api/orders/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { readJsonFile, writeJsonFile } from '@/lib/storage';
import { sendOrderConfirmationEmail } from '@/lib/email'; // 👈 import the email utility

export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  items: OrderItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  createdAt: string;
}

const ORDERS_FILE = 'orders.json';

// GET all orders
export async function GET() {
  const orders = await readJsonFile<Order[]>(ORDERS_FILE);
  return NextResponse.json(orders);
}

// POST a new order
export async function POST(request: NextRequest) {
  const body = await request.json();

  if (!body.customer || !body.items || !body.total) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const newOrder: Order = {
    id: `ORD-${Date.now()}`,
    customer: body.customer,
    items: body.items,
    total: body.total,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  // 1. Save order to JSON file
  const orders = await readJsonFile<Order[]>(ORDERS_FILE);
  orders.push(newOrder);
  await writeJsonFile(ORDERS_FILE, orders);

  // 2. Send email notification (non‑blocking – catch errors to keep the response fast)
  try {
    await sendOrderConfirmationEmail(newOrder);
  } catch (error) {
    console.error('Failed to send order confirmation email:', error);
    // The order is already saved – we just log the error and continue.
  }

  return NextResponse.json(newOrder, { status: 201 });
}