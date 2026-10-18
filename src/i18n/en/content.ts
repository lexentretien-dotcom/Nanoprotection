import type { Content } from "../fr/content";

export const content: Content = {
  services: {
    index: {
      title: "Our treatments",
      intro: "Each service is presented with its benefits, its limits and the cases where another solution is better.",
      readMore: "Read the details",
      metaTitle: "Our roof treatments",
      metaDescription:
        "Inspection, rejuvenation and preventive protection for asphalt shingle roofs. Find out what suits your roof, and what does not.",
    },
    labels: {
      what: "What it is for",
      benefits: "Benefits",
      how: "How it works",
      suitable: "Roofs that qualify",
      notSuitable: "When it is not the right solution",
      upkeep: "Maintenance and warranty",
      otherSolution: "What if another solution is better?",
    },
    items: [
      {
        slug: "inspection-evaluation",
        name: "Roof inspection and assessment",
        summary:
          "A technician examines your roof and tells you plainly whether it can be preserved, repaired or must be replaced.",
        intendedUse: "Know where your roof stands before spending anything.",
        benefits: [
          "A clear opinion, with no obligation to buy a treatment",
          "Signs of aging explained with photos",
          "A written recommendation that separates repair, preservation and replacement",
        ],
        suitable: [
          "Asphalt shingle roof of any age",
          "Homeowners comparing preservation and replacement",
        ],
        notSuitable: [
          "Active emergency (a leak in progress): call a roofer for an emergency repair first",
        ],
        method: [
          "Discussion by phone or form",
          "On-site visit and surface examination",
          "Photos and notes on the roof's condition",
          "Recommendation explained in person, then in writing",
        ],
        maintenance:
          "A new inspection is advised at regular intervals, especially after a harsh winter.",
        warranty:
          "The inspection carries no guarantee of results. It provides a professional opinion at a given point in time.",
        alternative:
          "If your roof is at the end of its life or has structural damage, we will tell you and recommend a repair or a replacement.",
        seoTitle: "Roof inspection in Quebec | Free assessment",
        seoDescription:
          "Have your asphalt shingle roof assessed. Honest opinion: preservation, repair or replacement. Request your free assessment.",
      },
      {
        slug: "rajeunissement-toiture",
        name: "Roof rejuvenation",
        summary:
          "A surface treatment applied to asphalt shingles that are still sound, to help extend their useful life without tearing everything off.",
        intendedUse:
          "Middle-aged roofs whose shingles show wear but are not destroyed.",
        benefits: [
          "Avoids a premature replacement when the roof is still sound",
          "Work is generally shorter than a full replacement",
          "Little debris, since nothing is torn off",
        ],
        suitable: [
          "Asphalt shingles with no structural damage",
          "No active water infiltration",
          "Homeowners who plan to stay several more years",
        ],
        notSuitable: [
          "Shingles cracked deeply or lifting on a large scale",
          "Damaged decking or active leaks",
          "Roof at the end of its life",
        ],
        method: [
          "Inspection and confirmation of eligibility",
          "Minor repairs and surface cleaning",
          "Application of the product by a trained technician",
          "Final check and handover of the warranty documents, where applicable",
        ],
        maintenance:
          "Periodic follow-up is recommended. The exact schedule depends on the product and the warranty conditions.",
        warranty:
          "A limited manufacturer warranty may apply depending on the roof's age, its condition and the product. The terms are given to you in writing before the work.",
        alternative:
          "When the roof is too damaged, replacement remains the right solution. A treatment does not replace a structural repair.",
        seoTitle: "Asphalt shingle roof rejuvenation | Quebec",
        seoDescription:
          "Roof rejuvenation can extend the life of asphalt shingles that are still sound. Learn when it is appropriate and when to replace.",
      },
      {
        slug: "protection-preventive",
        name: "Preventive protection",
        summary:
          "A treatment applied early on a recent roof to slow the wear caused by sun, water and frost.",
        intendedUse: "Recent roofs in good condition, before aging appears.",
        benefits: [
          "Acts before the damage rather than after",
          "A maintenance plan you can schedule",
          "Useful in a climate with freeze-thaw cycles",
        ],
        suitable: [
          "A roof only a few years old, with no defects",
          "Homeowners who want to protect a recent investment",
        ],
        notSuitable: ["A roof that is already damaged: a repair comes first"],
        method: [
          "Inspection and confirmation of eligibility",
          "Surface cleaning",
          "Application of the product",
          "Final check",
        ],
        maintenance: "Periodic follow-up advised, following the manufacturer's recommendations.",
        warranty:
          "Warranty terms depend on the product and the condition of the roof. They are provided in writing before the work.",
        alternative:
          "If your roof is already several years old, rejuvenation or a simple inspection may be more appropriate.",
        seoTitle: "Preventive roof protection | Asphalt shingles in Quebec",
        seoDescription:
          "Protect a recent roof before it wears. Learn about preventive protection and its limits, with an honest opinion on what suits your home.",
      },
    ],
  },

  products: {
    metaTitle: "GoNano products: NuRoof Fortify, Revive and Bio-Boost",
    metaDescription:
      "Compare the GoNano products NuRoof Fortify, Revive and Bio-Boost: target roof age, use, application, manufacturer warranty and limits.",
    title: "GoNano products.",
    intro:
      "Three products, three situations. They are not interchangeable and are not all applied together.",
    pickLabel: "Choose a product to highlight",
    tableCaption:
      "Comparison of GoNano products by roof age, added service life, use, compatibility, application, warranty and limits",
    tableRegion: "Product comparison table",
    criterion: "Criterion",
    rows: {
      roofAge: "Target roof age",
      lifeAdded: "Added service life (per manufacturer)",
      recommendedUse: "Recommended use",
      compatibility: "Compatibility",
      considerations: "Application",
      warranty: "Manufacturer warranty",
      limitations: "Limits",
    },
    note: "The products are not interchangeable and are not all applied together on every roof. Added service life and warranty periods come from the manufacturer. They depend on the roof's condition and are confirmed before any work.",
    items: [
      {
        slug: "nuroof-fortify",
        name: "NuRoof Fortify",
        roofAge: "Roofs 0 to 5 years old",
        lifeAdded: "10 to 15 years added",
        summary:
          "Designed for recent roofs, as preventive protection before aging sets in.",
        recommendedUse:
          "Recent roof in good condition, to slow the aging of the shingles.",
        compatibility: "Asphalt shingles (and SBS membranes, for Fortify products only).",
        considerations:
          "Roof health score (RHS) assessment, cleaning and surface preparation before application. Suitable weather required.",
        warranty:
          "Limited manufacturer warranty: 12 to 15 years (single coat), depending on the roof health score. Terms provided in writing before the work.",
        limitations: "Does not repair leaks, flashing or structural problems.",
      },
      {
        slug: "nuroof-revive",
        name: "NuRoof Revive",
        roofAge: "Roofs 5 to 20 years old",
        lifeAdded: "5 to 10 years added",
        summary:
          "Designed for roofs showing the first signs of wear that are still sound overall.",
        recommendedUse:
          "Middle-aged roof with surface wear but no structural damage.",
        compatibility:
          "Asphalt shingles judged eligible after inspection. Not offered on SBS membrane.",
        considerations:
          "Prior inspection is mandatory. Minor repairs are made before the treatment.",
        warranty:
          "Limited manufacturer warranty: 7 to 10 years, depending on the roof health score. Terms provided in writing before the work.",
        limitations:
          "Does not replace the replacement of a roof at the end of its life. Does not fix existing water infiltration.",
      },
      {
        slug: "nuroof-bio-boost",
        name: "NuRoof Bio-Boost",
        roofAge: "Roofs 10 years and older",
        lifeAdded: "3 to 5 years added",
        summary:
          "A transition treatment for older roofs, to gain a few years before a replacement.",
        recommendedUse:
          "Roof 10 years or older that is not yet due for replacement, as a transition solution.",
        compatibility: "Asphalt shingles. Not offered on SBS membrane.",
        considerations:
          "Roof health score (RHS) assessment and prior inspection. Necessary repairs are made first.",
        warranty:
          "Limited manufacturer warranty: 3 to 5 years, depending on the roof health score (called \"Boost\" in the warranty terms).",
        limitations:
          "More modest gain in service life. Does not suit every roof and does not replace necessary repairs.",
      },
    ],

    viewProduct: "View the product page",
    cardImageAlt: "Drum of {name}",
    detail: {
      back: "All products",
      featuresTitle: "Features",
      specsTitle: "Technical data",
      applicationTitle: "Application",
      warrantyTitle: "Manufacturer warranty",
      warrantyIntro:
        "Coverage periods linked to this product, depending on the roof health score (RHS). Non-binding summary.",
      warrantyMore: "Read the official warranty (PDF)",
      sheetCta: "Download the technical data sheet (PDF)",
      sourceNote: "Source: GoNano manufacturer technical data sheet.",
      limitsTitle: "What this product does not do",
      compareCta: "Compare with the other products",
      ctaTitle: "Is this product right for your roof?",
      ctaText: "Only an inspection can tell. We recommend the product that suits your roof, not the most expensive one.",
      backstopTitle: "Your existing warranties",
      backstop:
        "A treatment can raise questions with your shingle manufacturer. That is why GoNano's warranty includes a safety-net clause: if your shingle manufacturer rejects a claim in writing because the treatment appears to be the cause, GoNano helps you file the claim under the original warranty at no cost. GoNano assumes no financial liability beyond that help (limited warranty, section 7). If you still have a shingle warranty, we review it with you before the work.",
      sheetNameNote: "Sheet published by the manufacturer under the name \"Shingle Saver\".",
    },
    details: [
      {
        slug: "nuroof-fortify",
        metaTitle: "NuRoof Fortify: preventive protection for asphalt shingles",
        metaDescription:
          "Product page for GoNano NuRoof Fortify, a clear breathable penetrating sealer for roofs 0 to 5 years old: features, application, manufacturer warranty.",
        imageAlt: "Drum of NuRoof Fortify",
        tagline: "The preventive shield for recent roofs.",
        intro:
          "NuRoof Fortify is a nanotechnology-driven penetrating sealer, clear and breathable, designed to protect asphalt shingles from water, sun and freeze-thaw cycles. Once applied, the nanoparticles bond to the surface aggregate and the bitumen, creating a hydrophobic environment.",
        features: [
          { title: "Waterproofing", text: "Penetrates the shingle, reacts chemically in the pores and capillaries and creates a hydrophobic surface that repels water." },
          { title: "100% breathable", text: "Non-film forming: moisture can escape and the product does not trap it." },
          { title: "Stronger adhesion", text: "Reacts with the bitumen and the aggregate to strengthen their bond." },
          { title: "Oxidation and UV", text: "Reduces the polar bonding that speeds aging and protects against UV rays." },
          { title: "Freeze-thaw", text: "Helps prevent cracking caused by water getting in." },
          { title: "Organic growth", text: "Resists mold, lichen, mildew and efflorescence." },
          { title: "Natural flat finish", text: "Does not change the surface appearance and stays stable in light." },
          { title: "Reduced aging", text: "Aging reduction of up to 68% in a treated versus untreated comparison test, according to the manufacturer." },
        ],
        specs: [
          { label: "Content", value: "20 L drum (about 5 gallons)" },
          { label: "Target roof age", value: "0 to 5 years" },
          { label: "Base", value: "Solvent (excellent in cold weather)" },
          { label: "Active ingredients", value: "Nano-size organosilanes and organosiloxanes" },
          { label: "Appearance", value: "Clear" },
          { label: "Odor", value: "Mild: solvent / petroleum" },
          { label: "VOC", value: "250 g/L maximum" },
          { label: "Flash point", value: "Above 77 °C" },
          { label: "Relative density", value: "0.78 to 0.81 g/cm³" },
          { label: "Coverage", value: "50 to 70 sq. ft per litre (1 coat)" },
          { label: "Drying", value: "4 to 6 h at 25 °C and 50% humidity; full water repellency within 7 days" },
        ],
        steps: [
          "Clean the surface (pressure washing if needed): it must be sound and free of oil, grease, wax and old sealers.",
          "Repair cracks and protect nearby surfaces: windows, plants, outdoor furniture.",
          "Respect the weather: air and surface between 1 °C and 35 °C, and no rain expected within 12 hours.",
          "Test a small area and let it dry 5 to 7 days before inspecting it.",
          "Mix well without diluting, then apply by roller, brush or low-pressure sprayer to saturation, spreading puddles until absorbed.",
        ],
        applicationNote:
          "Applied by a trained technician. Does not prevent water infiltration through cracked surfaces or through defective flashing and caulking.",
        environment: {
          title: "Environment",
          text: "Fortify is a solvent-based formula, chosen for its cold-weather performance. We therefore do not present it as an eco-friendly product. However, extending the life of an existing roof rather than replacing it reduces the debris sent to landfill.",
          points: [
            "Less replacement debris when the roof is preserved",
            "VOC: 250 g/L maximum (data sheet)",
            "Safety instructions provided before the work",
          ],
        },
        warrantyProducts: ["NuRoof Fortify", "Fortify Elite"],
        sheetLabel: "NuRoof Fortify technical data sheet",
      },
      {
        slug: "nuroof-revive",
        metaTitle: "NuRoof Revive: rejuvenation of asphalt shingles",
        metaDescription:
          "Product page for GoNano NuRoof Revive, a bio-oil treatment for roofs 5 to 20 years old: features, application, environment, manufacturer warranty.",
        imageAlt: "Drum of NuRoof Revive",
        tagline: "Bringing flexibility back to aging roofs.",
        intro:
          "NuRoof Revive is a solution for rejuvenating and protecting asphalt shingle roofs. According to the manufacturer, it improves the flexibility and resilience of asphalt, helps prevent cracking and extends the roof's life by up to 10 years.",
        features: [
          { title: "Durability", text: "Backed by research, it gives asphalt roofs added durability." },
          { title: "Flexibility", text: "Improves the flexibility and resilience of asphalt for long-term performance." },
          { title: "Crack prevention", text: "Helps prevent cracking and strengthens water resistance." },
          { title: "Extended lifespan", text: "Extends the life of asphalt roofs, up to 10 years according to the manufacturer." },
          { title: "100% breathable", text: "Non-film forming: moisture can escape with no adverse effect." },
          { title: "Oxidation resistance", text: "Reduces the polar bonding that speeds aging." },
          { title: "Reduced organic growth", text: "Prevents mold, mildew, lichen and efflorescence." },
          { title: "Natural finish", text: "Keeps the original appearance, with no degradation from light." },
        ],
        specs: [
          { label: "Content", value: "20 litres" },
          { label: "Suitable for", value: "Asphalt shingle roofs (5 to 20 years old)" },
          { label: "Active ingredients", value: "Nano-silica, bio-oil, roof adhesive agents" },
          { label: "Appearance", value: "Clear and transparent" },
          { label: "Odor", value: "Mild: petroleum / bio-oil" },
          { label: "Packaging", value: "20 L and 176 L (other sizes by special order)" },
          { label: "VOC", value: "125 g/L maximum" },
          { label: "Flash point", value: "Above 90 °C" },
          { label: "Relative density", value: "0.78 to 0.81 g/cm³" },
          { label: "Coverage", value: "50 to 70 sq. ft per litre (1 coat)" },
          { label: "Drying", value: "4 to 6 h at 32 °C and 50% humidity; best results after 7 days" },
        ],
        steps: [
          "Make sure the substrate is clean and free of debris; repair cracks and damaged areas.",
          "Protect nearby surfaces from splashes.",
          "Mix the product well before and during application.",
          "Apply by roller, brush or low-pressure (non-atomizing) sprayer: 1 litre per 50 to 70 sq. ft, spread evenly until absorbed.",
          "Let dry 4 to 6 hours; results are best after 7 days.",
        ],
        applicationNote: "Applied by a trained technician, after inspection and minor repairs.",
        environment: {
          title: "Environment and sustainability",
          text: "Revive contains a renewable, biodegradable oil, which reduces the use of petroleum-based additives (manufacturer data sheet). Its VOC content is low. Preserving an existing roof also reduces replacement debris.",
          points: [
            "Renewable, biodegradable oil",
            "VOC: 125 g/L maximum (data sheet)",
            "Less replacement debris when the roof is preserved",
          ],
        },
        warrantyProducts: ["NuRoof Revive", "Revive + Fortify"],
        sheetLabel: "NuRoof Revive technical data sheet",
      },
      {
        slug: "nuroof-bio-boost",
        metaTitle: "NuRoof Bio-Boost: economical protection for roofs 10 years and older",
        metaDescription:
          "Product page for GoNano NuRoof Bio-Boost, an economical bio-oil protection for roofs 10 years and older: features, application, environment, warranty.",
        imageAlt: "Drum of NuRoof Bio-Boost",
        tagline: "Economical basic protection for roofs 10 years and older.",
        intro:
          "NuRoof Bio-Boost combines nanotechnology with renewable bio-oils. It is an economical protection and maintenance solution that, according to the manufacturer, can add 3 to 5 years to the roof's life when applied and maintained properly.",
        features: [
          { title: "Basic protection", text: "Provides fundamental protection through siloxane-based water repellency." },
          { title: "Eco-friendly formula", text: "Contains renewable bio-based ingredients, reducing environmental impact." },
          { title: "Water resistance", text: "Helps protect against water damage and reduces absorption into the shingles." },
          { title: "Moderate life extension", text: "Can add 3 to 5 years to the roof's life when applied and maintained properly." },
          { title: "Oxidation protection", text: "Slows the natural oxidation of the shingles." },
          { title: "Natural finish", text: "Keeps the roof's original appearance, without adding shine." },
        ],
        specs: [
          { label: "Content", value: "20 litres (drums of about 5 gallons)" },
          { label: "Suitable for", value: "Asphalt shingle roofs (10 years and older)" },
          { label: "Active ingredients", value: "Proprietary nanoparticle, bio-oil" },
          { label: "Appearance", value: "Light yellow to amber" },
          { label: "Odor", value: "Mild: petroleum / bio-oil" },
          { label: "VOC", value: "250 g/L maximum" },
          { label: "Flash point", value: "75 °C" },
          { label: "Relative density", value: "0.82 g/cm³" },
          { label: "Coverage", value: "40 to 60 sq. ft per litre (1 coat)" },
          { label: "Drying", value: "6 to 8 h at 32 °C and 50% humidity; full effect after 7 days" },
        ],
        steps: [
          "Make sure the surface is clean and free of debris; repair visible cracks or damage.",
          "Protect nearby surfaces to avoid splashes.",
          "Shake or mix the product well before and during application.",
          "Apply by roller, brush or low-pressure sprayer without atomization: 1 litre per 40 to 60 sq. ft, then spread puddles with a broom or roller.",
          "Let dry 6 to 8 hours; full effect after 7 days.",
        ],
        applicationNote: "Applied by a trained technician, after inspection and any necessary repairs.",
        environment: {
          title: "Environment and sustainability",
          text: "Bio-Boost uses renewable bio-oils to reduce the use of petroleum, a more environmentally conscious alternative that keeps basic protective properties (manufacturer data sheet). Preserving an existing roof also reduces replacement debris.",
          points: [
            "Renewable bio-based content (bio-oils)",
            "VOC: 250 g/L maximum (data sheet)",
            "Less replacement debris when the roof is preserved",
          ],
        },
        warrantyProducts: ["NuRoof Boost", "Boost + Fortify"],
        sheetLabel: "NuRoof Bio-Boost technical data sheet",
      },
    ],

    warranty: {
      title: "Limited manufacturer warranty",
      intro:
        "NuRoof products are covered by a limited GoNano warranty when applied by a certified contractor on an eligible roof. Here is a summary. Only the official document is binding.",
      coversTitle: "What is covered",
      covers: [
        "That the treated surface does not lift, buckle or deform prematurely because of the treatment.",
        "Water infiltration through the body of the treated shingle itself. Other entry points (flashing, chimneys, vents, valleys, etc.) are excluded.",
      ],
      remedyTitle: "If a covered defect is confirmed",
      remedy: [
        "Free inspection by a certified contractor.",
        "Free retreatment of the affected area.",
        "If the defect persists 12 months after retreatment, compensation for roofing materials, prorated by year and product.",
      ],
      conditionsTitle: "Conditions to know",
      conditions: [
        "Roof health score (RHS) assessed by a certified contractor, above the required minimum.",
        "Warranty registration within 30 days of the treatment.",
        "Reasonable maintenance: clean gutters, debris removed, branches trimmed.",
        "Transferable once to a later owner, with written notice within 30 days of the sale.",
        "Coverage capped at 5,000 sq. ft treated per property (reduced proportionally beyond that).",
      ],
      exclusionsTitle: "Main exclusions",
      exclusions: [
        "Hail damage, except the 5-year coverage of the Fortify Elite system (\"good\" condition), for verified hailstones of 2 inches or less.",
        "Consequential damage: interior, roof deck, mold.",
        "Defects, leaks or infiltration present before the treatment.",
      ],
      consumer:
        "Your rights under the Quebec Consumer Protection Act are not affected by this warranty.",
      tableTitle: "Coverage periods by product",
      tableCaption: "Coverage periods of the GoNano limited warranty by product and roof health score",
      tableHead: { product: "Product", state: "Roof condition (RHS score)", layers: "Coats", period: "Coverage period" },
      layersUnit: "×",
      rows: [
        { product: "NuRoof Boost", state: "Low (35 to 43)", layers: "1", period: "5 years" },
        { product: "NuRoof Boost", state: "Critical (21 to 34)", layers: "1", period: "5 years" },
        { product: "NuRoof Boost", state: "Replace (0 to 20)", layers: "1", period: "3 years" },
        { product: "NuRoof Revive", state: "Aging (44 to 74)", layers: "1", period: "10 years" },
        { product: "NuRoof Revive", state: "Low (35 to 43)", layers: "1", period: "7 years" },
        { product: "NuRoof Revive", state: "Critical (21 to 34)", layers: "1", period: "7 years" },
        { product: "Boost + Fortify", state: "Low or critical (21 to 43)", layers: "2", period: "10 years" },
        { product: "Revive + Fortify", state: "Aging (44 to 74)", layers: "2", period: "12 years" },
        { product: "NuRoof Fortify", state: "Good (90 to 100)", layers: "1", period: "15 years" },
        { product: "NuRoof Fortify", state: "Fair (75 to 89)", layers: "1", period: "12 years" },
        { product: "Fortify Elite", state: "Good (90 to 100)", layers: "2", period: "20 years, plus 5 years against hail" },
        { product: "Fortify Elite", state: "Fair (75 to 89)", layers: "2", period: "15 years" },
      ],
      source: "Source: GoNano limited warranty terms and conditions (Les Produits GoNano Inc.). Non-binding summary.",
      pdf: "Read the official warranty (PDF, in French)",
    },
  },

  technology: {
    metaTitle: "GoNano technology explained simply",
    metaDescription:
      "How a GoNano treatment works inside an asphalt shingle: microscope photos, particle size, test criteria and limits. A clear explanation, without exaggeration.",
    title: "GoNano technology, without the jargon.",
    intro:
      "What these treatments aim to do, what the manufacturer shows and measures, and what they do not do.",
    source: "Source of the data and photos: GoNano (Les Produits GoNano Inc.). This is manufacturer data and has not been independently verified.",

    how: {
      title: "What happens inside the shingle.",
      intro:
        "Under the microscope, the manufacturer shows what happens to an ordinary shingle when it is treated with GoNano.",
      steps: [
        { label: "Before", caption: "Regular shingle", alt: "Surface of an ordinary asphalt shingle seen under a microscope" },
        { label: "During", caption: "A modification reaction takes place everywhere in the shingle", alt: "Modification reaction inside the shingle during treatment, seen under a microscope" },
        { label: "After", caption: "GoNano modified shingle", alt: "Surface of an asphalt shingle modified by GoNano seen under a microscope" },
      ],
      credit: "Microscope photographs: GoNano.",
    },

    particles: {
      title: "Small enough to enter the pores.",
      intro:
        "The manufacturer explains that GoNano particles are small enough to penetrate the pores of asphalt. The particles in traditional sealants are larger: they stay on the surface and form a layer.",
      scaleTitle: "Relative particle size",
      scaleLabels: {
        pore: "Asphalt pore",
        gonano: "GoNano NuRoof",
        penetrants: "Other \"penetrants\"",
        mixed: "Hybrid coatings",
        silicone: "Silicone",
        acrylic: "Acrylic",
      },
      diagramTitle: "Inside the shingle or on top of it",
      traditional: { title: "Traditional sealants", text: "A layer that sits on the surface." },
      gonano: { title: "GoNano", text: "Particles that penetrate the pores of the asphalt." },
      note: "Conceptual illustration, not to scale. Relative sizes follow the manufacturer's diagram.",
    },

    aging: {
      title: "Why a shingle ages.",
      intro: "Four mechanisms act at the same time on an asphalt shingle roof.",
      items: [
        { icon: "sun", title: "The sun", text: "Ultraviolet rays gradually degrade the asphalt and the granules that protect it." },
        { icon: "thermo", title: "Heat and cold", text: "The shingle expands and contracts every day and every season, which wears it out." },
        { icon: "drop", title: "Water and frost", text: "Water enters small cracks, freezes and enlarges them. The Quebec climate is demanding." },
        { icon: "stack", title: "Granule loss", text: "When the granules are gone, the asphalt is exposed directly to the elements." },
      ],
    },

    performance: {
      title: "Compare the performance.",
      intro:
        "Manufacturer's assessment of NuRoof products applied to a 15-year-old shingle, compared with other bio-oil or soy-based treatments. Each cell shows up to three performance levels.",
      caption: "Performance of GoNano products and other treatments, by criterion",
      criterion: "Criterion",
      products: ["NuRoof Fortify", "NuRoof Revive", "Bio-Boost", "Other bio-oil or soy-based treatments"],
      levelText: "{n} level(s) out of 3",
      header: [
        { label: "Material age", values: ["0 to 5 years", "5 to 20 years", "10 years and older", "Any age"] },
        { label: "Added service life", values: ["10 to 15 years", "5 to 10 years", "3 to 5 years", "Up to 3 years"] },
      ],
      rows: [
        { label: "Breathability", levels: [3, 3, 3, 3] },
        { label: "Revitalization", levels: [3, 3, 2, 2] },
        { label: "Weather resistance", levels: [3, 2, 1, 0] },
        { label: "Hail resistance", levels: [3, 2, 1, 0] },
        { label: "Wind resistance", levels: [3, 2, 1, 0] },
        { label: "Resistance to tear-off forces", levels: [3, 2, 1, 0] },
        { label: "Heat resistance", levels: [3, 2, 1, 0] },
        { label: "UV resistance", levels: [3, 2, 1, 0] },
        { label: "Protection against granule loss", levels: [3, 2, 1, 0] },
        { label: "Freeze-thaw cycle resistance", levels: [3, 2, 0, 0] },
        { label: "Protection against algae, mold and stains", levels: [3, 2, 0, 0] },
      ],
      note: "The manufacturer's scale and method, not independently verified.",
    },

    tests: {
      title: "Test criteria and certifications.",
      intro:
        "A new shingle compared with a 15-year-old shingle treated with GoNano NuRoof, against the performance requirements for a new shingle roof in the International Building Code (IBC) and the National Building Code of Canada (NBCC).",
      caption: "Test results: typical new shingle and 15-year-old shingle treated with GoNano NuRoof",
      head: { category: "Category", standard: "Test standard", typical: "Typical shingle, at installation", treated: "GoNano NuRoof on a 15-year-old roof" },
      provenLabel: "Scientifically proven (per GoNano)",
      rows: [
        { category: "Impact resistance", standard: "UL 2218", typical: "Meets (Class 2)", treated: "Exceeds (Class 3 and above)", exceeds: true },
        { category: "Wind resistance", standard: "ASTM D3161", typical: "Meets (97 km/h)", treated: "Exceeds (177 km/h)", exceeds: true },
        { category: "Moisture barrier", standard: "proven", typical: "Meets", treated: "Exceeds", exceeds: true },
        { category: "Water repellency", standard: "proven", typical: "No", treated: "Exceeds", exceeds: true },
        { category: "Moss and algae removal", standard: "proven", typical: "No", treated: "Exceeds", exceeds: true },
        { category: "Uplift resistance", standard: "ASTM D7158", typical: "Meets", treated: "Meets", exceeds: false },
        { category: "Fire resistance", standard: "ASTM E108", typical: "Meets", treated: "Meets", exceeds: false },
        { category: "UV resistance", standard: "ASTM D4329", typical: "Meets", treated: "Meets", exceeds: false },
        { category: "Tear resistance", standard: "ASTM D3462", typical: "Meets", treated: "Meets", exceeds: false },
      ],
      note: "Results provided by the manufacturer. Ask us for the test reports: we give them to you with the technical data sheet.",
    },

    limits: {
      title: "Preservation or repair?",
      preservation: "Preservation",
      preservationText: "works on shingles that are still sound to slow wear.",
      repair: "Repair",
      repairText:
        "corrects a defect: a missing shingle, broken flashing, a leak. A surface treatment never replaces a needed repair.",
      notTitle: "What the treatment does not do",
      notList: [
        "It does not repair leaks or damaged flashing.",
        "It does not fix damaged decking.",
        "It does not make a roof at the end of its life like new.",
        "It does not remove the need to inspect your roof periodically.",
      ],
      docsTitle: "Documentation",
      docsText:
        "Technical data sheets and safety data sheets for the products used are provided on request before any work. The manufacturer's warranty is summarized on the Products page.",
      warrantyLink: "See the manufacturer's warranty",
    },
  },

  faq: {
    metaTitle: "Frequently asked questions about roof treatments",
    metaDescription:
      "Products, technology, pricing, warranty, installation, safety and eligibility: clear answers to the most common questions.",
    title: "Frequently asked questions.",
    intro: "Direct answers, with their limits.",
    categories: [
      {
        id: "produits",
        label: "Products",
        items: [
          {
            q: "What is GoNano?",
            a: "GoNano is a brand of surface treatments for asphalt shingle roofs. We are an authorized installer of these products. We are not the manufacturer. For technical specifications, the manufacturer's documentation prevails.",
          },
          {
            q: "Are the three products applied together?",
            a: "No. Each product has an intended use, tied to the roof's age and condition. We recommend the product that suits your roof after the inspection, not all three by default. Some two-coat systems exist, but only when the roof's condition justifies them.",
          },
        ],
      },
      {
        id: "technologie",
        label: "Technology",
        items: [
          {
            q: "How does a roof treatment work?",
            a: "The product is applied to the surface of the shingles. The manufacturer explains that its very small particles penetrate the pores of the asphalt rather than forming a layer on the surface. The real effect depends on the roof's starting condition. A treatment does not repair shingles that are already destroyed.",
          },
          {
            q: "Are the results independently proven?",
            a: "The performance data and test results we present come from the manufacturer. We present them as such and do not pass them off as independent studies.",
          },
        ],
      },
      {
        id: "tarification",
        label: "Pricing",
        items: [
          {
            q: "How much does a treatment cost?",
            a: "The price depends on the roof's size, accessibility and condition. We do not publish a fixed price without having seen the roof. The assessment is free and the written quote states the price before any work.",
          },
          {
            q: "Is it cheaper than a replacement?",
            a: "A treatment often costs less than a full replacement, but only if the roof is eligible. We compare both options with you, including when replacement is the best decision.",
          },
        ],
      },
      {
        id: "garantie",
        label: "Warranty",
        items: [
          {
            q: "What warranty is offered?",
            a: "A limited manufacturer warranty applies when the roof is eligible. Depending on the product and the roof health score, the coverage period ranges from 3 to 20 years. The full terms, including exclusions, are in the official document, which you can read at the bottom of every page.",
          },
          {
            q: "Is the warranty transferable?",
            a: "Yes, once, to a later owner, with written notice within 30 days of the sale.",
          },
        ],
      },
      {
        id: "installation",
        label: "Installation",
        items: [
          {
            q: "How long does the application take?",
            a: "For a typical residential home, application is generally done in one day, but the duration varies with roof size, required preparation and weather.",
          },
          {
            q: "Do I need to be home?",
            a: "You do not have to be present during application. We contact you before and after the work.",
          },
        ],
      },
      {
        id: "securite",
        label: "Safety",
        items: [
          {
            q: "Is the treatment safe for the home, the yard and pets?",
            a: "We follow the manufacturer's safety instructions during application. For details (safety data sheet, waiting times, precautions for the yard and pets), we give you the official documentation for the product used.",
          },
        ],
      },
      {
        id: "entretien",
        label: "Maintenance",
        items: [
          {
            q: "What happens after the treatment?",
            a: "We give you the documents for your product and your warranty. We recommend periodic follow-up, because no treatment removes the need to inspect your roof. The warranty also requires reasonable maintenance: clean gutters, debris removed, branches trimmed.",
          },
        ],
      },
      {
        id: "admissibilite",
        label: "Roof eligibility",
        items: [
          {
            q: "Can my roof be treated?",
            a: "It depends on its material, age and condition. The treatment is for asphalt shingles that are still sound. A roof with leaks, deeply cracked shingles or damaged decking must first be repaired, or replaced.",
          },
          {
            q: "Can a 15-year-old roof be treated?",
            a: "It is possible when the shingles are still sound. Only an inspection can confirm it. Age alone does not decide.",
          },
          {
            q: "How do you decide between repairing, preserving and replacing?",
            a: "We look at the condition of the shingles, the decking and the flashing. If there is structural damage or a leak, we repair or replace. If the roof is sound but worn on the surface, preservation may be relevant. Our recommendation is in writing.",
          },
        ],
      },
      {
        id: "zones",
        label: "Service areas",
        items: [
          {
            q: "Which regions do you serve?",
            a: "We serve the Montreal South Shore, Saguenay-Lac-Saint-Jean and the greater Sherbrooke area. If your area is not listed, write to us: we will tell you honestly whether we can come.",
          },
          {
            q: "How fast do you reply?",
            a: "We guarantee a reply within 24 hours to every assessment request.",
          },
        ],
      },
    ],
  },
};
