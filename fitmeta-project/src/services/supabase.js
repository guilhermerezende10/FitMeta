import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://xwwwlceaiwutwhqpqfar.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3d3dsY2VhaXd1dHdocXBxZmFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk4NDIyNjIsImV4cCI6MjA3NTQxODI2Mn0.9seOozQRsndjKydmOmzkU4V2QacsI7zBdGG9ijo9Gps";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
