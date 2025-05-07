import { SslCommerzPayment } from "sslcommerz";

const store_id = process.env.SSL_STORE_ID;
const store_passwd = process.env.SSL_STORE_PASSWORD;
const is_live = false; //true for live, false for sandbox


export const sslConfig = new SslCommerzPayment(store_id, store_passwd, is_live);

interface Props {
  total_amount: number;
  tran_id: string;
  success_url: string;
  fail_url: string;
  cancel_url: string;
  product_name: string;
  product_category: string;
  cus_name: string;
  cus_email: string;
  cus_add1: string;
  cus_phone: string;
}
export const dataConfig = ({
  total_amount,
  tran_id,
  success_url,
  fail_url,
  cancel_url,
  product_name,
  product_category,
  cus_name,
  cus_email,
  cus_add1,
  cus_phone,
}: Props) => {
  const data = {
    total_amount,
    tran_id,
    currency: "BDT",
    success_url,
    fail_url,
    cancel_url,
    ipn_url: "http://localhost:3000/ipn",
    shipping_method: "Courier",
    product_name,
    product_category,
    product_profile: "general",
    cus_name,
    cus_email,
    cus_add1,
    cus_add2: "Chittagong",
    cus_city: "Chittagong",
    cus_state: "Chittagong",
    cus_postcode: "4000",
    cus_country: "Bangladesh",
    cus_phone,
    cus_fax: "01711111111",
    ship_name: "None",
    ship_add1: "Chittagong",
    ship_add2: "Chittagong",
    ship_city: "Chittagong",
    ship_state: "Chittagong",
    ship_postcode: 4000,
    ship_country: "Bangladesh",
  };
  return data;
};