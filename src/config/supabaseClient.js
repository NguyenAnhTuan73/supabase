import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://thrdqnqwarbpechltlbn.supabase.co';

const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRocmRxbnF3YXJicGVjaGx0bGJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU1MDU5OTcsImV4cCI6MjAwMTA4MTk5N30.TLQ9sgS8Bkip9BjGWAyL6W987xb0KrQsAfZqwgR-UNM';

const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;

