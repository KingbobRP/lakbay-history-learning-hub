# Username + PIN login setup

This change preserves existing student Auth users and learning records. Existing students use the one-time **Ilipat ang dating account** flow with their previous full name, class code, and PIN, then choose a new username. Future accounts use username + PIN.

## Required Supabase setup

1. Apply `supabase/migrations/20261123000000_username_login.sql` to the connected Supabase project (Supabase CLI: `supabase db push`, or run the SQL in the SQL Editor).
2. Deploy the Edge Function from the repository root:

   ```sh
   supabase functions deploy student-auth --project-ref vmjxleogbzqjpbrxracm
   ```

3. Confirm the Edge Function has the project's built-in `SUPABASE_URL`, `SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY` secrets. Do not put the service-role key in frontend or Cloudflare environment variables.
4. Build and deploy the web app after the database migration and function deployment are complete.

The Edge Function resolves usernames using the service role and performs password verification through Supabase Auth. It returns only the authenticated session tokens; it never returns the internal Auth email or a public username directory.

## Existing students

Students with old accounts must select **May dati ka nang account? Ilipat ito rito.** once. Their old full name, class code, and PIN are checked by Supabase Auth; then the chosen username and avatar are saved to the existing profile row. Student progress and activity rows are untouched.

## New students

New account creation still asks for the teacher's class code for class grouping, but the regular login screen asks only for username and PIN. The chosen avatar is saved on the profile.
