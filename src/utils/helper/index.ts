import { createClient } from '@/utils/supabase/sever';

export const getTotalCustomers = async () => {
    const supabase = createClient();
    const { count, error } = await supabase
      .from('customers')
      .select('*', { count: 'exact' });
    if (error) {
      return 0;
    }
    return count;
  }

  export const checkShowModal = ( searchParams: Record<string, string> ) => {
    const searchParam = new URLSearchParams(searchParams);
    return searchParam.get('modal') === 'true';
  };