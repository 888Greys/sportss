import { createClient } from '@supabase/supabase-js';

// Copy .env.example → .env and fill in your project credentials.
const supabaseUrl  = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey  = import.meta.env.VITE_SUPABASE_ANON_KEY;

const configured = supabaseUrl && supabaseKey;

// Returns a real client when credentials are present, otherwise a safe stub
// so the app renders without Supabase configured.
export const supabase = configured
  ? createClient(supabaseUrl, supabaseKey)
  : {
      from: () => ({ select: () => Promise.resolve({ data: [], error: null }) }),
      channel: () => ({
        on:        function () { return this; },
        subscribe: function () { return this; },
        unsubscribe: () => {}
      })
    };
