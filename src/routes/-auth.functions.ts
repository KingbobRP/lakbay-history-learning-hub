import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const usernameSchema = z.object({
  username: z.string()
    .trim()
    .min(3)
    .max(20)
    .regex(/^[a-zA-Z0-9][a-zA-Z0-9._-]*$/),
});

export const claimStudentUsername = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((data: unknown) => usernameSchema.parse(data))
  .handler(async ({ data, context }) => {
    const username = data.username.toLowerCase();
    const userId = context.userId;
    const email = `${username}@mag-aaral.historia.app`;

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: existing, error: lookupError } =
      await supabaseAdmin.auth.admin.getUserById(userId);

    if (lookupError || !existing.user) {
      throw new Error("Hindi ma-verify ang account.");
    }

    const { data: profile, error: reserveError } = await supabaseAdmin
      .from("profiles")
      .update({ username })
      .eq("id", userId)
      .is("username", null)
      .select("id")
      .maybeSingle();

    if (reserveError || !profile) {
      throw new Error("Hindi available ang username na ito.");
    }

    const { error: updateError } =
      await supabaseAdmin.auth.admin.updateUserById(userId, {
        email,
        email_confirm: true,
        user_metadata: {
          ...existing.user.user_metadata,
          username,
        },
      });

    if (updateError) {
      await supabaseAdmin
        .from("profiles")
        .update({ username: null })
        .eq("id", userId)
        .eq("username", username);

      throw new Error("Hindi nakumpleto ang paglipat ng account. Subukang muli.");
    }

    return { success: true };
  });
