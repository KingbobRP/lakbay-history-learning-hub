-- Username-based student login. Existing auth users and learning data are preserved.
alter table public.profiles add column if not exists username text;

create unique index if not exists profiles_username_unique
  on public.profiles (lower(username))
  where username is not null and username <> '';

create or replace function public.handle_new_student()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name, username, class_code, section, avatar)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name',''),
    nullif(lower(new.raw_user_meta_data->>'username'),''),
    coalesce(new.raw_user_meta_data->>'class_code',''),
    coalesce(new.raw_user_meta_data->>'section',''),
    coalesce(new.raw_user_meta_data->>'avatar','')
  )
  on conflict (id) do nothing;
  return new;
end $$;

-- The username directory is never exposed to anon/authenticated clients.
-- Only the student-auth Edge Function uses the service role to resolve a username.
