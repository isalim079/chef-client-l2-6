"use client";

import { useState } from "react";

const RecipeContent = ({ recipe }: { recipe: string }) => {
  const [showFullContent, setShowFullContent] = useState(false);

  // Function to truncate the content to 200 words
  const truncateContent = (text: string, maxWords: number) => {
    const words = text.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    }
    return text;
  };

  // Truncated content (200 words)
  const truncatedContent = truncateContent(recipe, 5);

  // Check if the content exceeds 200 words
  const isContentLong = recipe.split(" ").length > 5;

  return (
    <div>
      {/* Display truncated or full content based on state */}
      <div
        dangerouslySetInnerHTML={{
          __html: showFullContent ? recipe : truncatedContent,
        }}
      ></div>

      {/* Show More/Show Less button */}
      {isContentLong && (
        <button
          onClick={() => setShowFullContent(!showFullContent)}
          className="mt-2 text-blue-600 hover:underline"
        >
          {showFullContent ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
};

export default RecipeContent;