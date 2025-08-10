import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-6">
      <header className="card p-6">
        <h1 className="text-3xl font-semibold">AI Construction Estimator</h1>
        <p className="mt-2 text-gray-600">Fast, transparent planning estimates for kitchens, baths, and decks — with realistic P50/P80 timelines.</p>
        <div className="mt-4">
          <Link href="/estimate" className="btn-brand">Create an Estimate</Link>
        </div>
      </header>
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {[
          { title: "Kitchen Remodel", desc: "Pull-and-replace with transparent line items." },
          { title: "Bathroom Remodel", desc: "From tub-to-shower to full gut." },
          { title: "Deck", desc: "PT or composite, rails & stairs." }
        ].map((c) => (
          <div key={c.title} className="card p-5">
            <h3 className="text-lg font-semibold">{c.title}</h3>
            <p className="text-gray-600">{c.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}