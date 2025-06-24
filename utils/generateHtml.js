export const generateInvoiceHTML = (data) => `
  <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        .header { display: flex; justify-content: space-between; }
        .title { font-size: 32px; font-weight: bold; }
        .section { margin-bottom: 20px; }
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 8px; border: 1px solid #ccc; text-align: left; }
        th { background: #444; color: white; }
        .right { text-align: right; }
        .footer { margin-top: 30px; }
      </style>
    </head>
    <body>
      <div class="header">
        <div>
          <h2>${data.companyName}</h2>
          ${data.companyAddress}<br/>
          ${data.companyCountry}
        </div>
        <div class="title">INVOICE</div>
      </div>
      <div class="section">
        <strong>Bill To:</strong><br/>
        ${data.clientName}<br/>
        ${data.clientAddress}<br/>
        ${data.clientCountry}
      </div>
      <div class="section">
        <table>
          <thead>
            <tr><th>Description</th><th>Qty</th><th>Rate</th><th>Amount</th></tr>
          </thead>
          <tbody>
            ${data.items.map(item => `
              <tr>
                <td>${item.name}</td>
                <td>${item.qty}</td>
                <td>${item.rate}</td>
                <td>${item.qty * item.rate}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <div class="right section">
          <p>Subtotal: ${data.subtotal}</p>
          <p>Tax (18%): ${data.tax}</p>
          <p><strong>Total: ${data.total}</strong></p>
        </div>
      </div>
      <div class="footer">
        <p><strong>Notes:</strong> ${data.notes}</p>
        <p><strong>Terms & Conditions:</strong> ${data.terms}</p>
      </div>
    </body>
  </html>
`;
