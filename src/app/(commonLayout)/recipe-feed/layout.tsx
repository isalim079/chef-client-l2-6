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
    <div>
      <div className="grid grid-cols-12">
        {/* left section */}
        <div className="col-span-3">
          <div className="sticky top-0">
            <RecipeFeedProfile />
          </div>
        </div>
        {/* middle section */}
        <div className="col-span-9">{children}</div>
      </div>
    </div>
  );
}
