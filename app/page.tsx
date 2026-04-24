import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import PortfolioPage from "@/components/PortfolioPage";
import { hasValidSession } from "@/lib/session";

const isAuthDisabledInDev =
  process.env.NODE_ENV !== "production" &&
  process.env.DISABLE_AUTH_IN_DEV === "true";

export default async function Page() {
  if (!isAuthDisabledInDev) {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;
    const isAuthenticated = await hasValidSession(token);

    if (!isAuthenticated) {
      redirect("/login");
    }
  }

  return <PortfolioPage />;
}
