/* eslint-disable @typescript-eslint/no-explicit-any */
import toast from "react-hot-toast";
import { BiDislike } from "react-icons/bi";

const RecipeDownVote = ({
  item,
  user,
  axiosPublic,
  getAllRecipe,
}: {
  item: any;
  user: { email: string } | null;
  axiosPublic: any;
  getAllRecipe: () => void;
}) => {
  const handleDownvoteSubmit = async (item: any) => {
    // console.log(item.upvote);

    const findUserDownvote = item.downvote.find(
      (item: any) => item.email === user?.email,
    );

    if (user) {
      const downVotesData = {
        email: user.email,
        downvote: findUserDownvote ? !findUserDownvote.downvote : true,
      };

      await axiosPublic
        .patch(`/allRecipes/${item._id}/downvote`, downVotesData)
        .then((res: any) => {
          if (res.data.success) {
            toast.success(
              `${
                downVotesData.downvote === true
                  ? "Disliked the recipe!"
                  : "Dislike removed"
              }`,
            );
            getAllRecipe();
          }
        });
    }
  };

  return (
    <div>
      <div>
        <button
          onClick={() => handleDownvoteSubmit(item)}
          className={`border border-dark-green p-2 rounded-full ${
            item.downvote.find(
              (email: any) =>
                email.email === user?.email && email.downvote === true,
            )
              ? "bg-dark-green text-primary-white"
              : ""
          }`}
        >
          <BiDislike />
        </button>
        <p className="text-base text-center mt-1 font-semibold">
          {item.downvote
            ? item.downvote.filter((vote: any) => vote.downvote === true).length
            : 0}
        </p>
      </div>
    </div>
  );
};

export default RecipeDownVote;
