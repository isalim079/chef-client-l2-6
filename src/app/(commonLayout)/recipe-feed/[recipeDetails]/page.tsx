import RecipeDetails from "@/components/RecipeFeed/RecipeDetails";

const RecipeDetailsPage = ({
  params,
}: {
  params: { recipeDetails: string };
}) => {
  return (
    <div>
      <RecipeDetails recipeDetails={params.recipeDetails} />
    </div>
  );
};

export default RecipeDetailsPage;
