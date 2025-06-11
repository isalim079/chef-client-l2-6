"use client";
import { HiSquaresPlus } from "react-icons/hi2";
import RecipeFeedProfileCard from "./RecipeFeedProfileCard";
import RecipeFeedProfileCard2 from "./RecipeProfileCard2";

const RecipeFeedProfile = () => {
  return (
    <div className="py-5 lg:py-0">
      {/* sidebar */}
      <div className="lg:hidden block">
        <div className="drawer drawer-end">
          <input
            id="recipeFeedProfileSidebar"
            type="checkbox"
            className="drawer-toggle"
          />
          <div className="drawer-content">
            {/* Page content here */}
            <label htmlFor="recipeFeedProfileSidebar" className="">
              <p className="p-3 bg-white shadow-md rounded-full w-fit flex ml-auto mr-6">
                <HiSquaresPlus className="text-2xl" />
              </p>
            </label>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="recipeFeedProfileSidebar"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="bg-white w-80 min-h-full">
              {/* Sidebar content here */}
              <RecipeFeedProfileCard2 />
            </ul>
          </div>
        </div>
      </div>

      {/* profile card */}
      <RecipeFeedProfileCard />
    </div>
  );
};

export default RecipeFeedProfile;
