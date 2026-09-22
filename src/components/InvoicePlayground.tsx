import { useMemo, useState } from 'react'

type GstMode = 'split' | 'igst'

function amount(value: number) {
  if (!Number.isFinite(value)) return '0.00'
  return value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function readNumber(value: string) {
  const parsed = Number(value)
  if (!Number.isFinite(parsed) || parsed < 0) return 0
  return parsed
}

export function InvoicePlayground() {
  const [customer, setCustomer] = useState('Sample Customer')
  const [item, setItem] = useState('Consulting')
  const [quantity, setQuantity] = useState('2')
  const [price, setPrice] = useState('1500')
  const [percent, setPercent] = useState('18')
  const [mode, setMode] = useState<GstMode>('split')

  const totals = useMemo(() => {
    const subtotal = readNumber(quantity) * readNumber(price)
    const rate = Math.min(readNumber(percent), 100)
    const gst = subtotal * (rate / 100)
    const split = mode === 'split'
    return {
      subtotal,
      gst,
      cgst: split ? gst / 2 : 0,
      sgst: split ? gst / 2 : 0,
      igst: split ? 0 : gst,
      total: subtotal + gst,
    }
  }, [mode, percent, price, quantity])

  return (
    <div className="playground">
      <p className="demo-label">Interactive Demo</p>
      <p className="demo-note">This calculator runs in the browser. It is not the production invoice application.</p>
      <div className="playground-grid">
        <form className="playground-form" onSubmit={(event) => event.preventDefault()}>
          <label>
            Customer Name
            <input value={customer} maxLength={80} onChange={(event) => setCustomer(event.target.value)} />
          </label>
          <label>
            Item Name
            <input value={item} maxLength={80} onChange={(event) => setItem(event.target.value)} />
          </label>
          <label>
            Quantity
            <input
              inputMode="decimal"
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
            />
          </label>
          <label>
            Unit Price
            <input inputMode="decimal" value={price} onChange={(event) => setPrice(event.target.value)} />
          </label>
          <fieldset>
            <legend>GST Type</legend>
            <label className="choice">
              <input
                type="radio"
                name="gst-type"
                checked={mode === 'split'}
                onChange={() => setMode('split')}
              />
              CGST + SGST
            </label>
            <label className="choice">
              <input type="radio" name="gst-type" checked={mode === 'igst'} onChange={() => setMode('igst')} />
              IGST
            </label>
          </fieldset>
          <label>
            GST percentage
            <input inputMode="decimal" value={percent} onChange={(event) => setPercent(event.target.value)} />
          </label>
        </form>
        <article className="invoice-preview" aria-live="polite">
          <header>
            <p>Invoice preview</p>
            <strong>{customer.trim() || 'Customer'}</strong>
          </header>
          <table>
            <thead>
              <tr>
                <th scope="col">Item</th>
                <th scope="col">Qty</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{item.trim() || 'Item'}</td>
                <td>{quantity || '0'}</td>
                <td>{amount(readNumber(price))}</td>
              </tr>
            </tbody>
          </table>
          <dl>
            <div>
              <dt>Subtotal</dt>
              <dd>{amount(totals.subtotal)}</dd>
            </div>
            <div>
              <dt>GST</dt>
              <dd>{amount(totals.gst)}</dd>
            </div>
            <div>
              <dt>CGST</dt>
              <dd>{amount(totals.cgst)}</dd>
            </div>
            <div>
              <dt>SGST</dt>
              <dd>{amount(totals.sgst)}</dd>
            </div>
            <div>
              <dt>IGST</dt>
              <dd>{amount(totals.igst)}</dd>
            </div>
            <div className="grand">
              <dt>Grand Total</dt>
              <dd>{amount(totals.total)}</dd>
            </div>
          </dl>
        </article>
      </div>
    </div>
  )
}
