-- HISTORIA: username authentication
-- Existing student UUIDs and progress remain unchanged.

ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS username text;

-- Case-insensitive username uniqueness.
CREATE UNIQUE INDEX IF NOT EXISTS profiles_username_lower_unique
ON public.profiles (lower(username))
WHERE username IS NOT NULL;

-- Username format constraint (safe to rerun).
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'profiles_username_format'
      AND conrelid = 'public.profiles'::regclass
  ) THEN
    ALTER TABLE public.profiles
    ADD CONSTRAINT profiles_username_format
    CHECK (
      username IS NULL OR
      username ~ '^[a-zA-Z0-9][a-zA-Z0-9._-]{2,19}$'
    );
  END IF;
END
$$;

-- Only the trusted server-side service role may change a claimed username.
CREATE OR REPLACE FUNCTION public.protect_student_username()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF auth.role() = 'authenticated'
     AND NEW.username IS DISTINCT FROM OLD.username THEN
    RAISE EXCEPTION 'Username changes must use the secure account process.'
      USING ERRCODE = '42501';
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS protect_student_username_update
ON public.profiles;

CREATE TRIGGER protect_student_username_update
BEFORE UPDATE OF username ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.protect_student_username();

-- Keep the existing student profile creation behavior.
CREATE OR REPLACE FUNCTION public.handle_new_student()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles
    (id, full_name, class_code, section, username)
  VALUES (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.raw_user_meta_data->>'class_code', ''),
    coalesce(new.raw_user_meta_data->>'section', ''),
    nullif(trim(new.raw_user_meta_data->>'username'), '')
  )
  ON CONFLICT (id) DO NOTHING;

  RETURN new;
END;
$$;
