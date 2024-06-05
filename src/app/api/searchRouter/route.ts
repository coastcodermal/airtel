import { createClient } from "@/utils/supabase/sever";


export const GET = async (request: Request) => {
    const supabase = createClient();
    // Search Params
    const {searchParams} = new URL(request.url);
    const searchValue = searchParams.get("search");

    if (searchValue) {
        const { data, error } = await supabase.from('routers').select('*').textSearch('serial_no', searchValue);
        if (error) {
            console.log(error);
            return Response.json({ error: 'Internal server error' }, { status: 500 });
        }
        return Response.json(data, { status: 200 });
    }
};

