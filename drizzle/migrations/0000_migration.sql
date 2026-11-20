create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  age int,
  gender text not null default '',
  class_code text not null default '',
  section text not null default '',
  avatar text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select, insert, update on public.profiles to authenticated;
grant all on public.profiles to service_role;
alter table public.profiles enable row level security;
create policy "own profile read" on public.profiles for select to authenticated using (auth.uid() = id);
create policy "own profile insert" on public.profiles for insert to authenticated with check (auth.uid() = id);
create policy "own profile update" on public.profiles for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);

create or replace function public.handle_new_student()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name, class_code, section)
  values (new.id,
    coalesce(new.raw_user_meta_data->>'full_name',''),
    coalesce(new.raw_user_meta_data->>'class_code',''),
    coalesce(new.raw_user_meta_data->>'section',''))
  on conflict (id) do nothing;
  return new;
end $$;
create trigger on_auth_user_created_student after insert on auth.users
for each row execute function public.handle_new_student();

create table public.student_progress (
  user_id uuid primary key,
  completed text[] not null default '{}',
  mastered text[] not null default '{}',
  scores jsonb not null default '{}'::jsonb,
  last_lesson text,
  updated_at timestamptz not null default now()
);
grant select, insert, update on public.student_progress to authenticated;
grant all on public.student_progress to service_role;
alter table public.student_progress enable row level security;
create policy "own progress read" on public.student_progress for select to authenticated using (auth.uid() = user_id);
create policy "own progress insert" on public.student_progress for insert to authenticated with check (auth.uid() = user_id);
create policy "own progress update" on public.student_progress for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

create table public.activity_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  kind text not null,
  label text not null default '',
  reward_id text,
  score int,
  points int not null default 0,
  created_at timestamptz not null default now()
);
create unique index activity_log_reward_once on public.activity_log(user_id, reward_id) where reward_id is not null;
create index activity_log_user_time on public.activity_log(user_id, created_at desc);
grant select, insert on public.activity_log to authenticated;
grant all on public.activity_log to service_role;
alter table public.activity_log enable row level security;
create policy "own activity read" on public.activity_log for select to authenticated using (auth.uid() = user_id);
-- students may log plain activities, never points
create policy "own activity insert no points" on public.activity_log for insert to authenticated
  with check (auth.uid() = user_id and points = 0 and reward_id is null);

-- Points are decided here from the reward id, once per student.
create or replace function public.award_points(_reward_id text, _label text)
returns int language plpgsql security definer set search_path = public as $$
declare pts int; uid uuid := auth.uid();
begin
  if uid is null then raise exception 'not signed in'; end if;
  pts := case split_part(_reward_id, ':', 1)
    when 'lesson' then 20 when 'term' then 5 when 'quiz' then 30 when 'perfect' then 20 else 0 end;
  if pts = 0 then return 0; end if;
  insert into public.activity_log(user_id, kind, label, reward_id, points)
  values (uid, 'points', left(coalesce(_label,''), 200), _reward_id, pts)
  on conflict do nothing;
  if not found then return 0; end if;
  return pts;
end $$;
revoke execute on function public.award_points(text, text) from public, anon;
grant execute on function public.award_points(text, text) to authenticated;