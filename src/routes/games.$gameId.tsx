import { createFileRoute, notFound } from '@tanstack/react-router';
import { gameCatalog } from '@/lib/history-games';
import { HistoryGame } from '@/components/games/HistoryGame';

export const Route = createFileRoute('/games/$gameId')({
 staticData: { sitemap: false },
 loader: ({ params }) => {
  const game = gameCatalog.find(g=>g.id===params.gameId);
  if(!game) throw notFound();
  return { game };
 },
 head: ({ loaderData }) => {
  const title = loaderData ? `${loaderData.game.title} — HISTORIA` : 'Larong hindi matagpuan — HISTORIA';
  const description = loaderData?.game.description ?? 'Mga larong pangkasaysayan para sa Baitang 11.';
  return { meta: [{ title }, { name:'description', content:description }, { property:'og:title',content:title }, { property:'og:description',content:description }, { property:'og:type',content:'website' }, { name:'twitter:card',content:'summary_large_image' }] };
 },
 component: GamePage,
});
function GamePage() {
 const {game} = Route.useLoaderData();
 return <HistoryGame key={game.id} id={game.id} />;
}