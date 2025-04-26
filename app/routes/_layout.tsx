import {
  createFileRoute,
  Outlet,
  useNavigate,
  useLocation,
} from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Sun, Moon, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/_layout")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const location = useLocation();

  // Mostra il pulsante indietro solo se non siamo nella home
  const showBackButton = location.pathname !== "/";

  return (
    <>
      <Button
        className="absolute top-2 left-2 z-50"
        variant="ghost"
        size="icon"
      >
        {<Sun size={18} />}
      </Button>

      {showBackButton && (
        <Button
          className="absolute top-2 left-12 z-50"
          variant="ghost"
          size="icon"
          onClick={() => navigate({ to: "/" })}
        >
          <ArrowLeft size={18} />
        </Button>
      )}

      <Outlet />
    </>
  );
}
