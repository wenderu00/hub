import { Footer } from "@/components/ui/footer";
import { Hero } from "@/components/ui/hero";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Paginas } from "@/components/paginas";
import { listaPaginas, site } from "@/lib/site";

export default function Page() {
  return (
    <div className="flex min-h-dvh flex-col">
      <main className="flex-1">
        <Hero kicker="// hub" title="Páginas" description={site.descricao} typing="ls ~/paginas" />
        <section aria-label="Lista de páginas" className="mx-auto max-w-content px-6 pb-24">
          <Paginas paginas={listaPaginas} />
        </section>
      </main>
      <Footer
        copyright={`© ${new Date().getFullYear()} Márcio Wendel`}
        groups={[
          {
            title: "Links",
            links: [
              { href: "https://wenderu00.github.io/", label: "Portfólio" },
              { href: "https://wenderu00.github.io/mwds/", label: "@mw/ui" },
              { href: "https://github.com/wenderu00/mwds-pagina", label: "Template de página" },
            ],
          },
        ]}
      >
        <ThemeToggle className="w-fit" />
      </Footer>
    </div>
  );
}
