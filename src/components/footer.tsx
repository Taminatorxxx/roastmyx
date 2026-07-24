import { Flame } from "lucide-react";
import { APP_DOMAIN, APP_NAME } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <Flame className="h-4 w-4 text-orange-500" />
          <span>
            © {new Date().getFullYear()} {APP_NAME} · {APP_DOMAIN}
          </span>
        </div>
        <p className="max-w-md text-xs text-zinc-600">
          We roast content strategy, never people. Public profiles only. Not
          affiliated with X Corp.
        </p>
      </div>
    </footer>
  );
}
