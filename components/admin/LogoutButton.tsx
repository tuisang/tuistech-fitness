"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="text-mono-label border-2 border-paper/30 px-4 py-2 text-xs text-paper transition-colors hover:border-green hover:text-green"
    >
      Sign out
    </button>
  );
}
