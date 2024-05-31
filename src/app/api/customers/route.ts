import type { CustomerType } from '@/types/customer';
import fs from 'node:fs';

const CUSTOMERS_FILE_PATH = './data/customers.json';

export async function GET(): Promise<Response> {
    const customersData = fs.readFileSync(CUSTOMERS_FILE_PATH, 'utf8');
    const customers: { customers: CustomerType[]} = await JSON.parse(customersData)
    if (!customers) {
        console.log(customers)
        return Response.json({ message: 'Error , Data not found' }, { status: 500 })  
    }
    
    return Response.json({ customers }, { status: 200 })
}