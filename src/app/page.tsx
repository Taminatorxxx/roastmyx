import { Hero } from "@/components/hero";
import { FeaturesPreview } from "@/components/features-preview";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Social proof strip */}
      <section className="border-y border-white/5 bg-white/[0.02]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-3 px-4 py-6 text-center text-sm text-zinc-500 sm:px-6 sm:justify-between">
          <span>
            80% funny · 20% educational · 0% personal attacks
          </span>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge>Profile score</Badge>
            <Badge>Hook score</Badge>
            <Badge>Creator archetype</Badge>
            <Badge>Share card</Badge>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <h2 className="mb-10 text-center text-2xl font-bold text-white sm:text-3xl">
          Three steps. Zero signup.
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              step: "01",
              title: "Enter @username",
              body: "No OAuth. No account. Just a public X handle.",
            },
            {
              step: "02",
              title: "AI analyzes everything",
              body: "Bio, tweets, hooks, consistency, brand, engagement patterns.",
            },
            {
              step: "03",
              title: "Share the roast card",
              body: "Scores, archetype, one-liners — screenshot bait by design.",
            },
          ].map((item) => (
            <div key={item.step} className="glass-card rounded-2xl p-6">
              <div className="mb-3 text-sm font-bold text-orange-400">
                {item.step}
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">
                {item.title}
              </h3>
              <p className="text-sm text-zinc-500">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <FeaturesPreview />

      {/* CTA band */}
      <section className="px-4 pb-24 sm:px-6">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-orange-500/20 bg-gradient-to-br from-orange-500/10 via-rose-500/5 to-transparent p-10 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Ready to get cooked?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-zinc-400">
            The timeline already has opinions about your content. We just made
            them funnier — and useful.
          </p>
          <a
            href="#top"
            className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 via-rose-500 to-pink-500 px-8 text-sm font-semibold text-white shadow-lg shadow-rose-500/25 transition hover:brightness-110"
          >
            🔥 Roast me now
          </a>
        </div>
      </section>
    </>
  );
}
