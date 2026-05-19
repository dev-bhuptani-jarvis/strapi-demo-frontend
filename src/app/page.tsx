export const dynamic = "force-dynamic";
export const revalidate = 60;

import DynamicZone from "../components/DynamicZone";
import {
  getGlobalTheme,
  getHomePage,
} from "../services/page.service";

import {
  Page,
  Theme,
} from "../types/page.types";

export default async function HomePage() {
  const page: Page | null =
    await getHomePage();

  const theme: Theme | null =
    await getGlobalTheme();

  const resolvedTheme: Theme = theme ?? {
    primaryColor: "#7c3aed",
    secondaryColor: "#f3f4f6",
    backgroundColor: "#ffffff",
    textPrimary: "#111827",
  };

  const sections = page?.sections || [];

  return (
    <main
      style={{
        backgroundColor:
          resolvedTheme.backgroundColor,
        color:
          resolvedTheme.textPrimary,
      }}
      className="min-h-screen"
    >
      <DynamicZone
        sections={sections}
        theme={resolvedTheme}
      />
    </main>
  );
}