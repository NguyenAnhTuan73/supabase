import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://hzzqerfhbmadwacopfym.supabase.co';

const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6enFlcmZoYm1hZHdhY29wZnltIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU2MDIxNTUsImV4cCI6MjAwMTE3ODE1NX0.UICWVdJYzHqG8I18S37tCGBn_VUp2zSTNOFSf5_2VUE';

export const supabase = createClient(supabaseUrl, supabaseKey);

