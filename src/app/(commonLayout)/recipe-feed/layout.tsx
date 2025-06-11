import RecipeFeedProfile from "@/components/RecipeFeed/RecipeFeedProfile";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chef",
  description: "Recipe Sharing Community",
};

export default function RecipeFeedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="overflow-hidden">
      <div className="grid lg:grid-cols-12">
        {/* left section */}
        <div className="lg:col-span-3">
          <div className="sticky top-0">
            <RecipeFeedProfile />
          </div>
        </div>
        {/* middle section */}
        <div className="lg:col-span-9 max-w-[85%] lg:max-w-full lg:w-full mx-auto">{children}</div>
      </div>
    </div>
  );
}
