import { GlobalNavigation } from "@/components/GlobalNavigation";
import { Greeting } from "@/components/Greeting";
import { HeaderAccessibleNav } from "@/components/HeaderAccessibleNav";
import { AboutSection } from "@/components/AboutSection";
import { BlogSection } from "@/components/BlogSection";
import { ToTop } from "@/components/ToTop";

export default function HomePage() {
  return (
    <>
      <GlobalNavigation />
      <main className="container px-6">
        <Greeting />
        <HeaderAccessibleNav linkHref="/life" linkLabel="to Side B" />
        <AboutSection />
        <BlogSection />
      </main>
      <ToTop />
    </>
  );
}
