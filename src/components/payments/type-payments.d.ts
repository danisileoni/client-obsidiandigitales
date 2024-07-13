export interface FormDataMercadoPago {
  token: string;
  issuer_id: string;
  payment_method_id: string;
  transaction_amount: number;
  installments: number;
  payer: Payer;
}

export interface Payer {
  email: string;
  identification: Identification;
}

export interface Identification {
  type: string;
  number: string;
}

export interface PaypalLinks {
  id: string;
  status: string;
  links: Link[];
}

export interface Link {
  href: string;
  rel: string;
  method: string;
}
