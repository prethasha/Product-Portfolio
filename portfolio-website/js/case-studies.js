/* =====================================================================
   CASE STUDIES LIST  —  THIS IS THE FILE YOU EDIT TO ADD A NEW PDF
   =====================================================================

   HOW TO ADD A NEW CASE STUDY (3 steps, no other code needed):

   1. Put your PDF inside the folder:      assets/case-studies/
      e.g.  assets/case-studies/zomato-checkout.pdf

   2. (Optional) Put a cover image inside: assets/images/
      e.g.  assets/images/zomato-checkout.jpg
      Best size: 1200 x 750 pixels (landscape). JPG, PNG or SVG all work.

   3. Copy one of the blocks below (from the opening {  to the closing },
      including the comma), paste it at the end of the list, and change
      the text inside the quotes.

   The website builds the cards, the filter buttons and the carousel
   from this list automatically.

   TIPS
   - Keep the quotes " " around every text value.
   - Every block must end with a comma  },  — a missing comma is the
     most common reason the cards stop showing.
   - File names: use lowercase and dashes, no spaces
     ("my-case-study.pdf", not "My Case Study.pdf").
   - To hide a case study without deleting it, put  //  at the start
     of every line of its block.
   ===================================================================== */

const CASE_STUDIES = [

  {
    title: "Fintech: Growing reinvestment from 5% toward 20%",   // Card heading
    category: "Fintech",                                        // Used for the filter buttons (cards with the same category are grouped)
    summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Identified funnel drop-offs and proposed targeted experiments to lift reinvestment.",
    tags: ["Funnel analysis", "Experimentation", "Metrics"],    // Small labels on the card (any number)
    image: "assets/images/case-study-1.svg",                    // Cover image path
    pdf: "assets/case-studies/case-study-1.pdf",                // PDF path
    label: "Concept project",                                   // Small badge on the image. Use "" for none
    featured: true                                              // true = also shown in the big carousel at the top
  },

  {
    title: "Swiggy: Rethinking the order-tracking experience",
    category: "Consumer app",
    summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mapped user anxiety points after checkout and redesigned the tracking flow.",
    tags: ["User research", "UX", "RICE"],
    image: "assets/images/case-study-2.svg",
    pdf: "assets/case-studies/case-study-2.pdf",
    label: "Concept project",
    featured: true
  },

  {
    title: "Siemens: Streamlining stakeholder approvals",
    category: "Work project",
    summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Simplified a multi-team approval process and cut turnaround time.",
    tags: ["Process", "Stakeholders", "Agile"],
    image: "assets/images/case-study-3.svg",
    pdf: "assets/case-studies/case-study-3.pdf",
    label: "Real project",
    featured: true
  },

  {
    title: "Product teardown: Lorem ipsum app",
    category: "Teardown",
    summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. A breakdown of onboarding, retention hooks and monetisation.",
    tags: ["Teardown", "Onboarding"],
    image: "assets/images/case-study-4.svg",
    pdf: "assets/case-studies/case-study-4.pdf",
    label: "",
    featured: false
  },

  {
    title: "Prioritising a quarterly roadmap",
    category: "Strategy",
    summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scored 20+ backlog items with RICE and impact vs. effort.",
    tags: ["Roadmap", "RICE", "Backlog"],
    image: "assets/images/case-study-5.svg",
    pdf: "assets/case-studies/case-study-5.pdf",
    label: "Concept project",
    featured: false
  },

  {
    title: "Growth: Diagnosing an activation funnel",
    category: "Fintech",
    summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Defined north-star and guardrail metrics for a first-week activation flow.",
    tags: ["Growth", "Metrics", "A/B testing"],
    image: "assets/images/case-study-6.svg",
    pdf: "assets/case-studies/case-study-6.pdf",
    label: "Concept project",
    featured: false
  },

  /* ---- COPY-PASTE TEMPLATE: copy the block below (not these dashed lines) ----
  {
    title: "Your case study title",
    category: "Fintech",
    summary: "One or two sentences about the problem and what you did.",
    tags: ["Tag one", "Tag two"],
    image: "assets/images/your-image.jpg",
    pdf: "assets/case-studies/your-file.pdf",
    label: "Concept project",
    featured: false
  },
  ---------------------------------------------------------------------- */

];
