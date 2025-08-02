const CATEGORIES = [
  {
    key: "consumer_goods_and_services",
    title: "Consumer Goods and Services",
    description: "Information on your rights when buying goods and services.",
  },
  {
    key: "gva_and_hate_crime",
    title: "GVA and Hate Crime",
    description:
      "Support and advice for those affected by gender based violence or hate crimes.",
  },
  {
    key: "benefits_and_tax_credits",
    title: "Benefits",
    description:
      "Help understanding what benefits you may be entitled to and how to claim them.",
  },
  {
    key: "debt",
    title: "Debt and Money",
    description:
      "Guidance on managing debt, budgeting, and financial support options.",
  },
];

function formatCategoryTitle(key: string): string {
  return key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
}

export { CATEGORIES, formatCategoryTitle };
