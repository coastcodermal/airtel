import { createClient } from "@/utils/supabase/sever";


export const GET = async (request: Request) => {
    const supabase = createClient();
    // Search Params
    const {searchParams} = new URL(request.url);
    const searchValue = searchParams.get("search");

    if (searchValue) {
        const { data, error } = await supabase.from('routers').select('*').eq('serial_no', searchValue);
        if (error) {
            return Response.json({ error: 'Internal server error' }, { status: 500 });
        }
        return Response.json(data, { status: 200 });
    }
};

// export const POST = async (data: any) => {
//     const supabase = createClient();
//     const { data: routerData, error } = await supabase.from('routers').insert(data);
//     if (error) {
//         console.log(error)
//         return Response.json({ error: 'Internal server error' }, { status: 500 });
//     }
//     return Response.json(routerData, { status: 200 });
// }

