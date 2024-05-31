import { createClient } from "@/utils/supabase/sever";


export const GET = async () => {
  const supabase = createClient();

  try {
    const { data, error } = await supabase.from('customers').select(`
      id,
      created_at,
      name,
      phone,
      email,
      city,
      town,
      package,
      subscription_date,
      expiry,
      routers (
        id,
        router_mobile_no,
        account_no,
        serial_no
      )
    `);
    if (error) {
        console.log(error)
        
        return Response.json({ error: 'Internal server error' },{status:500});
    }
    return Response.json(data,{status: 200});
  } catch (error) {
    console.error('Error fetching data:', error);
    return Response.json({ error: 'Internal server error' },{status:500});
  }
};
