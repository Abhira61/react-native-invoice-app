export const PdfCode = (name, address, product, quantity, total) => `
  <html>
    <body style="font-family: sans-serif; padding: 20px;">
      <h1>Invoice</h1>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Address:</strong> ${address}</p>
      <p><strong>Product:</strong> ${product}</p>
      <p><strong>Quantity:</strong> ${quantity}</p>
      <p><strong>Total:</strong> ₹${total}</p>
      <p style="margin-top: 40px;">Thank you for your business!</p>
    </body>
  </html>
`;
