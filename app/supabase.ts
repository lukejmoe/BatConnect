import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qbjlmjelxtfvdgirhnfu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFiamxtamVseHRmdmRnaXJobmZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMyNDgwNTIsImV4cCI6MjA4ODgyNDA1Mn0.dOHMBtZmbbZpq0C-hMc_aXOeztb6ZXZz608yTbKVvoM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
