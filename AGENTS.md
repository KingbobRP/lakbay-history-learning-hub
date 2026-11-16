<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Course content (lessons, timeline, quizzes) lives in src/lib/historia-data.ts; student progress is stored in browser localStorage via src/lib/progress.ts — no backend needed.
- Shared visual roles and editorial page styles are defined in src/styles.css; page controls use the existing Button component to keep presentation consistent.
- Derive sitemap static URLs from required route-level staticData.sitemap decisions and dynamic lesson URLs from the existing course collection; omit personal progress/search surfaces and lastmod without authoritative content dates.
- Keep game question banks and scoring rules in src/lib/history-games.ts and reusable game presentation in src/components/games; games use session-only scores, not a shared leaderboard, because the app has no persistent user accounts.
