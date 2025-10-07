import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://wiwloahicgxcwgnwilwj.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indpd2xvYWhpY2d4Y3dnbndpbHdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY0MTcxMDQsImV4cCI6MjA3MTk5MzEwNH0.f_xggM3YIZHjnxHRsUT7TtXnwiZX9KvgttIeMc5C3n0";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
