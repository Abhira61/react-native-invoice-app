export const generateInvoiceHTML = (data) => `
  <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          padding: 40px;
          color: #333;
         
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          
        }
        .logo {
          max-height: 60px;
        }
        .title {
          font-size: 36px;
          font-weight: bold;
        }
        .meta {
          margin-top: 20px;
          display: flex;
          justify-content: space-between;
        }
        .section {
          margin-top: 30px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        th, td {
          border: 1px solid #ccc;
          padding: 10px;
          text-align: left;
        }
        th {
          background-color: #333;
          color: white;
        }
        .right {
          text-align: right;
        }
        .totals {
          margin-top: 10px;
          text-align: right;
        }
        .footer {
          margin-top: 40px;
          font-size: 13px;
        }
        .signature {
          margin-top: 60px;
          display: flex;
          justify-content: flex-end;
        }
        .signature-line {
          border-top: 1px solid #000;
          width: 200px;
          text-align: center;
          margin-top: 10px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div>
          <h2>${data.companyName || "Company Name"}</h2>
          ${data.companyAddress || ""}<br/>
          ${data.companyCountry || ""}
        </div>
        <div style="text-align: right;">
          ${data.logoUrl ? `<img src="${data.logoUrl}" class="logo" />` : ''}
          <div class="title">INVOICE</div>
        </div>
      </div>

      <div class="meta">
        <div>
          <strong>Bill To:</strong><br/>
          ${data.clientName}<br/>
          ${data.clientAddress}<br/>
          ${data.clientCountry || ""}
        </div>
        <div style="text-align: right;">
          <p><strong>Invoice No:</strong> ${data.invoiceNumber}</p>
          <p><strong>Invoice Date:</strong> ${data.invoiceDate}</p>
          <p><strong>Due Date:</strong> ${data.dueDate}</p>
        </div>
      </div>

      <div class="section">
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Qty</th>
              <th>Rate</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            ${data.items.map(item => `
              <tr>
                <td>${item.description}</td>
                <td>${item.qty}</td>
                <td>₹ ${item.rate.toFixed(2)}</td>
                <td>₹ ${(item.qty * item.rate).toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div class="totals">
          <p><strong>Subtotal:</strong> ₹ ${data.subTotal.toFixed(2)}</p>
          <p><strong>Tax (18%):</strong> ₹ ${data.tax.toFixed(2)}</p>
          <p><strong>Total:</strong> ₹ ${data.total.toFixed(2)}</p>
        </div>
      </div>

      <div class="section footer">
        <p><strong>Notes:</strong> ${data.notes || "Thank you for your business!"}</p>
        <p><strong>Terms & Conditions:</strong> ${data.terms || "Payment is due within 30 days."}</p>
      </div>

      <div class="signature">
        <div>
          <div class="signature-line">Authorized Signature</div>
        </div>
      </div>
    </body>
  </html>
`;
