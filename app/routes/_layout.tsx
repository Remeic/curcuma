import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

export const Route = createFileRoute("/_layout")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Button className="absolute top-2 right-2" variant="ghost" size="icon">
        {<Sun size={18} />}
      </Button>
      <Outlet />
    </>
  );
}
