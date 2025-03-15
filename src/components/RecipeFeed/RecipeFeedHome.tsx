"use client";

import withAuth from "@/utils/withAuth";
import RecipeFeed2 from "./RecipeFeedComponents/RecipeFeed2";

const RecipeFeedHome = () => {
  return (
    <div className="">
      <RecipeFeed2 />
    </div>
  );
};

export default withAuth(RecipeFeedHome);
