export interface CustomerType {
    id: string;
    created_at: string;
    name: string;
    phone: string;
    email: string;
    city: string;
    town?: string;
    router_mobile_no: string;
    package: number;
    subscriprion_date: string;
    expiry: string;
    routers: {
      id: number;
      router_mobile_no: string;
      account_no:string;
      serial_no: string;
    }
  }

  