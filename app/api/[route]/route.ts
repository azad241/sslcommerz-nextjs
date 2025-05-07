// app/api/init/route.ts
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { handle } from 'hono/vercel'
import { dataConfig, sslConfig } from "@/etc/ssl_config";



export const runtime = 'nodejs' // Next.js App Router
const app = new Hono().basePath('/api')

app.use('/*', cors())

app.get('/hello', async (c) => {
  const start = performance.now()
  const query = c.req.query('q')
  const greeting = query
    ? `Hello ${query} from Cloudflare workers!`
    : 'Hello from Cloudflare workers!'
  const duration = performance.now() - start

  return c.json({
    message: `${greeting} (${duration.toFixed(4)} ms)`,
  })
})

//sslcommerz request
app.get('/payment-request', async (c) => {
  const { url = '', txn = '', amount = '4999', product = 'na', c_name = 'na', c_phone='01811111111' } = c.req.query();
  const transactionId = `${txn}`;
    const data = dataConfig({
      total_amount: parseInt(amount),
      tran_id: transactionId,
      success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/api/after-payment?url=${url}&txn=${transactionId}&status=success`,
      fail_url: `${process.env.NEXT_PUBLIC_DOMAIN}/api/after-payment?url=${url}&txn=${transactionId}&status=fail`,
      cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/api/after-payment?url=${url}&txn=${transactionId}&status=cancel`,
      product_name: product,
      product_category: "service",
      cus_name: c_name,
      cus_email: "na@gmail.com",
      cus_add1: "Chittagong",
      cus_phone: c_phone,
    });
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const result: SSLResponse = await sslConfig.init(data);
      if (!result.GatewayPageURL || result.status === "FAILED") {
        return c.json({ message: result.failedreason });
      } else if (result.status === "SUCCESS") {
        return c.json({url: result.GatewayPageURL}, 200);
      }
    } 
      catch (error) {
        console.log(error);
      }
    
      return c.json({ data: 'Payment Request' }, 200)
})
//ssl commerz response
app.post('after-payment', async(c) =>{
  const data = await c.req.parseBody()
  const params = await c.req.query();
  console.log(data);
  // createTransaction(params.txn, data.tran_date.toString(), data.card_issuer.toString(), parseInt(data.amount.toString()), params.status)
  return c.redirect(`/${params.url}?txn=${params.txn}&status=${params.status}`)
})








// Required for Next.js App Router
export const GET = handle(app)
export const POST = handle(app)
// export default app as never
