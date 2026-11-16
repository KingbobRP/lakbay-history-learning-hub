import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/games')({
 staticData: { sitemap: false },
 component: () => <Outlet />,
});