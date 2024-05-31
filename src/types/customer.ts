export interface CustomerType {
    id: string;
    name: string;
    phone: string;
    email: string;
    address: {
      city: string;
      location?: string;
    };
    account_no: string;
    router_mobile_no: string;
    package: string;
    date_of_sub: string;
    expiry_date: string;
    serial_no: string;
  }
  