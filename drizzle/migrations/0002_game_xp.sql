-- Add game XP rewards while preserving the existing server-side safeguards.
create or replace function public.award_points(_reward_id text, _label text)
returns int language plpgsql security definer set search_path = public as $$
declare pts int; uid uuid := auth.uid();
begin
  if uid is null then raise exception 'not signed in'; end if;
  pts := case split_part(_reward_id, ':', 1)
    when 'lesson' then 25
    when 'term' then 5
    when 'quiz' then 30
    when 'quizAnswer' then 10
    when 'perfect' then 20
    when 'gameAnswer' then 10
    when 'streak3' then 5
    when 'streak5' then 10
    when 'gameComplete' then 15
    else 0
  end;
  if pts = 0 then return 0; end if;
  insert into public.activity_log(user_id, kind, label, reward_id, points)
  values (uid, 'points', left(coalesce(_label,''), 200), _reward_id, pts)
  on conflict do nothing;
  if not found then return 0; end if;
  return pts;
end $$;

revoke execute on function public.award_points(text, text) from public, anon;
grant execute on function public.award_points(text, text) to authenticated;
