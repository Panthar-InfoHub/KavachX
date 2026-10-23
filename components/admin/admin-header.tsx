import { LogoutButton } from "./logout-button";

interface AdminHeaderProps {
  userEmail?: string;
  title?: string;
}

export function AdminHeader({ userEmail, title = "Admin Dashboard" }: AdminHeaderProps) {
  return (
    <header className="w-full border-b border-white/10 bg-black/30 backdrop-blur-md px-6 py-4 flex items-center justify-between sticky top-0 z-20">
      <div>
        <h1 className="text-xl font-bold text-white font-syne tracking-tight">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {userEmail && (
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-violet-600/10 border border-violet-500/20 text-xs text-violet-300 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            {userEmail}
          </div>
        )}
        <LogoutButton />
      </div>
    </header>
  );
}
