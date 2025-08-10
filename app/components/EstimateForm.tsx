"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const FormSchema = z.object({
  scope: z.enum(["kitchen_remodel", "bath_remodel", "deck"]),
  region: z.string().default("IL-South"),
  season: z.enum(["winter", "spring", "summer", "fall"]).default("spring"),
  finishLevel: z.enum(["basic", "standard", "premium"]).default("standard"),
  floorSF: z.coerce.number().optional(),
  cabLF: z.coerce.number().optional(),
  applianceCount: z.coerce.number().optional(),
  fixtureCount: z.coerce.number().optional(),
  lightingPoints: z.coerce.number().optional(),
  counterMaterial: z.enum(["Laminate", "Quartz"]).optional(),
  wallLF: z.coerce.number().optional(),
  tileHeightFT: z.coerce.number().optional(),
  depthFT: z.coerce.number().optional(),
  widthFT: z.coerce.number().optional(),
  heightFT: z.coerce.number().optional(),
  railingLF: z.coerce.number().optional(),
  deckMaterial: z.enum(["PT","Composite"]).optional(),
  complexity: z.enum(["standard","high"]).optional()
});
type FormValues = z.infer<typeof FormSchema>;

const DEFAULTS: Record<string, Partial<FormValues>> = {
  kitchen_remodel: { floorSF: 144, cabLF: 22, applianceCount: 4, fixtureCount: 3, lightingPoints: 6, counterMaterial: "Quartz" },
  bath_remodel: { floorSF: 40, wallLF: 18, tileHeightFT: 7, fixtureCount: 3 },
  deck: { depthFT: 12, widthFT: 16, heightFT: 4, deckMaterial: "PT", complexity: "standard" }
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export function EstimateForm({ onResult }: { onResult: (data: any) => void }) {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: { scope: "kitchen_remodel", region: "IL-South", season: "spring", finishLevel: "standard", ...DEFAULTS.kitchen_remodel }
  });
  const scopeWatch = form.watch("scope");

  async function onSubmit(values: FormValues) {
    const payload: any = { scope: values.scope, region: values.region, season: values.season, finishLevel: values.finishLevel, data: {} };
    if (values.scope === "kitchen_remodel") {
      payload.data = { floorSF: values.floorSF, cabLF: values.cabLF, applianceCount: values.applianceCount, fixtureCount: values.fixtureCount, lightingPoints: values.lightingPoints, counterMaterial: values.counterMaterial };
    } else if (values.scope === "bath_remodel") {
      payload.data = { floorSF: values.floorSF, wallLF: values.wallLF, tileHeightFT: values.tileHeightFT, fixtureCount: values.fixtureCount };
    } else if (values.scope === "deck") {
      payload.data = { depthFT: values.depthFT, widthFT: values.widthFT, heightFT: values.heightFT, railingLF: values.railingLF, deckMaterial: values.deckMaterial, complexity: values.complexity };
    }
    const res = await fetch(`${API_URL}/estimate/preview`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const json = await res.json();
    onResult(json);
  }

  function setScopeDefaults(scope: FormValues["scope"]) {
    const d = DEFAULTS[scope];
    Object.entries(d).forEach(([k, v]) => { // @ts-ignore
      form.setValue(k, v as any);
    });
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <div>
          <label className="label">Scope</label>
          <select className="input" {...form.register("scope")} onChange={(e) => { form.register("scope").onChange(e); setScopeDefaults(e.target.value as any); }}>
            <option value="kitchen_remodel">Kitchen Remodel</option>
            <option value="bath_remodel">Bathroom Remodel</option>
            <option value="deck">Deck</option>
          </select>
        </div>
        <div>
          <label className="label">Finish Level</label>
          <select className="input" {...form.register("finishLevel")}>
            <option value="basic">Basic</option>
            <option value="standard">Standard</option>
            <option value="premium">Premium</option>
          </select>
        </div>
        <div>
          <label className="label">Region</label>
          <input className="input" defaultValue="IL-South" {...form.register("region")} />
        </div>
        <div>
          <label className="label">Season</label>
          <select className="input" {...form.register("season")}>
            <option value="winter">Winter</option>
            <option value="spring">Spring</option>
            <option value="summer">Summer</option>
            <option value="fall">Fall</option>
          </select>
        </div>
      </div>

      {scopeWatch === "kitchen_remodel" && (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <Input label="Floor SF" name="floorSF" form={form} />
          <Input label="Cabinet LF" name="cabLF" form={form} />
          <Input label="Appliances" name="applianceCount" form={form} />
          <Input label="Plumbing Fixtures" name="fixtureCount" form={form} />
          <Input label="Lighting Points" name="lightingPoints" form={form} />
          <Select label="Countertop" name="counterMaterial" form={form} options={["Laminate","Quartz"]} />
        </div>
      )}

      {scopeWatch === "bath_remodel" && (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <Input label="Floor SF" name="floorSF" form={form} />
          <Input label="Wall LF" name="wallLF" form={form} />
          <Input label="Tile Height (ft)" name="tileHeightFT" form={form} />
          <Input label="Fixtures" name="fixtureCount" form={form} />
        </div>
      )}

      {scopeWatch === "deck" && (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <Input label="Depth (ft)" name="depthFT" form={form} />
          <Input label="Width (ft)" name="widthFT" form={form} />
          <Input label="Height (ft)" name="heightFT" form={form} />
          <Input label="Railing LF" name="railingLF" form={form} />
          <Select label="Material" name="deckMaterial" form={form} options={["PT","Composite"]} />
          <Select label="Complexity" name="complexity" form={form} options={["standard","high"]} />
        </div>
      )}

      <button type="submit" className="btn-brand">Estimate</button>
    </form>
  );
}

function Input({ label, name, form }: any) {
  return (
    <div>
      <label className="label">{label}</label>
      <input className="input" type="number" step="any" {...form.register(name)} />
    </div>
  );
}

function Select({ label, name, form, options }: any) {
  return (
    <div>
      <label className="label">{label}</label>
      <select className="input" {...form.register(name)}>
        {options.map((o: string) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}