import { ListPropertyForm } from "@/components/ListPropertyForm";

export const metadata = {
  title: "List Your Property — Property Deals",
  description: "List your property on South Africa's most affordable portal.",
};

export default function ListPropertyPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">List Your Property</h1>
          <p className="text-slate-400 max-w-lg mx-auto">
            Get started in minutes. Free to list — only{" "}
            <span className="text-amber-400 font-semibold">R99</span> when your property sells.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <ListPropertyForm />
      </div>
    </div>
  );
}
