/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaStar } from "react-icons/fa";
import { Rating, RoundedStar } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import toast from "react-hot-toast";
import { useState } from "react";

const myRatingStyles = {
  itemShapes: RoundedStar,
  activeFillColor: "#ffb700",
  inactiveFillColor: "#fbf1a9",
};

const RecipeRating = ({
  item,
  setActiveModal,
  activeModal,
  user,
  axiosPublic,
  getAllRecipe,
}: {
  item: any;
  setActiveModal: (id: string | null) => void;
  activeModal: string | null;
  user: any;
  axiosPublic: any;
  getAllRecipe: () => void;
}) => {
  const [rating, setRating] = useState(0);

  const handleRatingSubmit = async (item: any) => {
    // console.log(item);
    if (user) {
      const ratingsData = {
        email: user.email,
        ratings: Number(rating),
      };

      await axiosPublic
        .patch(`/allRecipes/${item._id}/ratings`, ratingsData)
        .then((res: any) => {
          if (res.data.success) {
            toast.success("Successfully rated");
            getAllRecipe();
          }
        });
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <button
          className="border border-primary-orange p-2 rounded-full"
          onClick={() => setActiveModal(item._id as string)}
        >
          <FaStar className="text-primary-orange" />
        </button>
        <p className="text-base text-center mt-1 font-semibold">
          {item.ratingsData && item.ratingsData.length > 0
            ? (
                item.ratingsData.reduce(
                  (sum: number, rating: { ratings: number }) => sum + rating.ratings,
                  0,
                ) / item.ratingsData.length
              ).toFixed(1)
            : 0}
        </p>

      </div>
        {/* give rating */}
        <dialog
          // id={`${item?._id}`}
          open={activeModal === item._id}
          className="modal"
        >
          <div className="modal-box">
            <h3 className="font-bold text-lg">Rate this post</h3>
            <Rating
              value={rating}
              onChange={setRating}
              className="mt-5"
              itemStyles={myRatingStyles}
            />
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button
                  // onClick={() => handleRatingSubmit(item)}
                  onClick={() => {
                    handleRatingSubmit(item);
                    setActiveModal(null);
                  }}
                  className="bg-primary-orange px-4 py-2 rounded-md text-sm"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </dialog>
    </div>
  );
};

export default RecipeRating;
