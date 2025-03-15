/* eslint-disable @typescript-eslint/no-explicit-any */
import toast from "react-hot-toast";
import { BiLike } from "react-icons/bi";

interface RecipeUpVoteProps {
  item: any;
  user: { email: string } | null;
  axiosPublic: any;
  getAllRecipe: () => void;
}

const RecipeUpVote = ({
  item,
  user,
  axiosPublic,
  getAllRecipe,
}: RecipeUpVoteProps) => {
  const handleUpvoteSubmit = async (item: any) => {
    // console.log(item.upvote);

    const findUserUpvote = item.upvote.find(
      (item: any) => item.email === user?.email,
    );

    if (user) {
      const upVotesData = {
        email: user.email,
        upvote: findUserUpvote ? !findUserUpvote.upvote : true,
      };

      await axiosPublic
        .patch(`/allRecipes/${item._id}/upvote`, upVotesData)
        .then((res: any) => {
          if (res.data.success) {
            toast.success(
              `${
                upVotesData.upvote === true
                  ? "Liked the recipe!"
                  : "Like removed"
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
          onClick={() => handleUpvoteSubmit(item)}
          className={`border border-dark-green p-2 rounded-full ${
            item.upvote.find(
              (email: any) => email.email === user?.email && email.upvote === true,
            )
              ? "bg-dark-green text-primary-white"
              : ""
          }`}
        >
          <BiLike />
        </button>
        <p className="text-base text-center mt-1 font-semibold">
          {item.upvote
            ? item.upvote.filter((vote: any) => vote.upvote === true).length
            : 0}
        </p>
      </div>
    </div>
  );
};

export default RecipeUpVote;
