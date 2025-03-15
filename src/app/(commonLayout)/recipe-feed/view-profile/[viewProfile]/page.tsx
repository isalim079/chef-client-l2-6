import ViewProfile from "@/components/RecipeFeed/Followers/ViewProfile";

const RecipeDetailsPage = ({
  params,
}: {
  params: { viewProfile: string };
}) => {

    const decodedEmail = decodeURIComponent(params?.viewProfile)

  return (
    <div>
      <ViewProfile followerEmail={decodedEmail}  />
    </div>
  );
};

export default RecipeDetailsPage;
