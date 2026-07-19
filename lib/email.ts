// lib/email.ts
import nodemailer from 'nodemailer';
import { Order } from '@/app/api/orders/route';

// Create a transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendOrderConfirmationEmail(order: Order) {
  const { id, customer, items, total, createdAt } = order;

  // Build a simple HTML table for the order items
  const itemsHtml = items.map(item =>
    `<tr>
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>Rs. ${item.price.toLocaleString()}</td>
      <td>Rs. ${(item.quantity * item.price).toLocaleString()}</td>
    </tr>`
  ).join('');

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_TO,
    subject: `New Order ${id} – Suman Florals`,
    html: `
      <h2>New Order Placed</h2>
      <p><strong>Order ID:</strong> ${id}</p>
      <p><strong>Placed at:</strong> ${new Date(createdAt).toLocaleString()}</p>

      <h3>Customer Details</h3>
      <p><strong>Name:</strong> ${customer.name}</p>
      <p><strong>Email:</strong> ${customer.email}</p>
      <p><strong>Phone:</strong> ${customer.phone}</p>
      <p><strong>Address:</strong> ${customer.address}</p>

      <h3>Order Items</h3>
      <table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse;">
        <thead>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Unit Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" style="text-align: right;"><strong>Grand Total</strong></td>
            <td><strong>Rs. ${total.toLocaleString()}</strong></td>
          </tr>
        </tfoot>
      </table>
      <p>Thank you for using Suman Florals!</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`📧 Order confirmation email sent for ${id}`);
  } catch (error) {
    console.error('❌ Failed to send email:', error);
    // Don't throw – the order is already saved; just log the error
  }
}