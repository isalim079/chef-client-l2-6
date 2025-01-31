/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import useAxiosPublic from "@/lib/hooks/useAxiosPublic";
import { useEffect, useState } from "react";
import Loading from "../shared/Loading/Loading";
import { RiDeleteBin4Fill } from "react-icons/ri";
import { MdEditNote } from "react-icons/md";
import { TUser } from "../UserDashboard/UserProfileInfo/UserProfileInfo";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { TRecipe } from "./RecipeInterface";
import { BiDislike, BiLeftArrow, BiLike } from "react-icons/bi";
import { FaStar } from "react-icons/fa";
import toast from "react-hot-toast";
import { Rating, RoundedStar } from "@smastrom/react-rating";
import { LiaCommentSolid } from "react-icons/lia";
import { useRouter } from "next/navigation";

const myRatingStyles = {
  itemShapes: RoundedStar,
  activeFillColor: "#ffb700",
  inactiveFillColor: "#fbf1a9",
};

const RecipeDetails = ({ recipeDetails }: { recipeDetails: string }) => {
  const router = useRouter();

  const axiosPublic = useAxiosPublic();
  const { user, token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);

  const [findUser, setFindUser] = useState<TUser | null>(null);

  useEffect(() => {
    if (user) {
      axiosPublic
        .get(`/api/getMe/${user?.email}`, {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then((res) => {
          setFindUser(res.data.data);
        });
    }
  }, [user, token]);

  const [recipeData, setRecipeData] = useState<TRecipe | null>(null);

  useEffect(() => {
    setLoading(true);
    axiosPublic.get("/allRecipes").then((res) => {
      const allRecipes = res.data.data;
      const filteredRecipe = allRecipes?.find(
        (item: any) => item?._id === recipeDetails,
      );
      setRecipeData(filteredRecipe || null);
      setLoading(false);
    });
  }, [recipeDetails]);

  const handleRatingSubmit = async (item: any) => {
    // console.log(item);
    if (user) {
      const ratingsData = {
        email: user.email,
        ratings: Number(rating),
      };

      await axiosPublic
        .patch(`/allRecipes/${item._id}/ratings`, ratingsData)
        .then((res) => {
          if (res.data.success) {
            toast.success("Successfully rated");
          }
        });
    }
  };

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
        .then((res) => {
          if (res.data.success) {
            toast.success(
              `${
                upVotesData.upvote === true
                  ? "Liked the recipe!"
                  : "Like removed"
              }`,
            );
          }
        });
    }
  };

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
        .then((res) => {
          if (res.data.success) {
            toast.success(
              `${
                downVotesData.downvote === true
                  ? "Disliked the recipe!"
                  : "Dislike removed"
              }`,
            );
          }
        });
    }
  };

  const handleCommentsSubmit = async (id: string, e: any) => {
    e.preventDefault();
    const comments = e.target.comments.value;

    if (user) {
      const commentsData = {
        name: user.name,
        email: user.email,
        comments: comments,
      };
      await axiosPublic
        .patch(`/allRecipes/${id}/comments`, commentsData)
        .then((res) => {
          if (res.data.success) {
            toast.success("Comments successfully updated");
          }
        });
    }
  };

  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [activeCommentsModal, setActiveCommentsModal] = useState<string | null>(
    null,
  );
  const [activeUpdateCommentsModal, setActiveUpdateCommentsModal] = useState<
    string | null
  >(null);

  const handleCommentUpdate = async (
    recipeId: string,
    e: any,
    commentId: string,
  ) => {
    e.preventDefault();

    const updatedComment = {
      updatedComment: e.target.comments.value,
    };

    try {
      const res = await axiosPublic.put(
        `/recipes/${recipeId}/comments/${commentId}`,
        updatedComment,
      );

      if (res.data.success) {
        toast.success("Comment updated successfully");
        setActiveUpdateCommentsModal(null);
      }
    } catch (error) {
      toast.error("Error updating comment");
      console.log(error);
    }
  };

  const handleDeleteComment = async (recipeId: string, commentId: string) => {
    try {
      const res = await axiosPublic.delete(
        `/recipes/${recipeId}/comments/${commentId}`,
      );
      if (res.data.success) {
        toast.success("Comment deleted successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error deleting comment");
    }
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div className="pt-28 pb-20 max-w-screen-xl mx-auto">
            <div>
              {/* title section */}
              <div className="flex items-center justify-between">
                <div>
                  <Image
                    className="rounded-full"
                    width={60}
                    height={60}
                    src={recipeData?.profileImg || "/logo.png"}
                    alt="profile picture"
                  />
                  <p className="mt-2 font-semibold text-xl">
                    {recipeData?.name}
                  </p>
                </div>
                <div>
                  <h3 className=" text-dark-green text-lg">
                    <span className="font-bold mr-3">Recipe Name:</span>{" "}
                    {recipeData?.title}
                  </h3>
                  <div className="flex justify-end mt-1">
                    <button
                      onClick={() => router.back()}
                      className="font-sourGummy text-lg underline flex items-center gap-1"
                    >
                      <BiLeftArrow /> Go back
                    </button>
                  </div>
                </div>
              </div>
              {/* divider */}
              <div className="border my-5"></div>

              {/* recipe formula */}
              <div className="prose">
                <div
                  dangerouslySetInnerHTML={{ __html: recipeData?.recipe || "" }}
                ></div>
              </div>

              {/* Micro elements */}
              <div>
                <div className="text-2xl gap-10 flex justify-end">
                  {/* Rating */}
                  <div>
                    <button
                      className="border border-primary-orange p-2 rounded-full"
                      onClick={() =>
                        recipeData && setActiveModal(recipeData._id as string)
                      }
                    >
                      <FaStar className="text-primary-orange" />
                    </button>
                    <p className="text-base text-center mt-1 font-semibold">
                      {recipeData &&
                      recipeData.ratingsData &&
                      recipeData.ratingsData.length > 0
                        ? (
                            recipeData.ratingsData.reduce(
                              (sum, rating) => sum + rating.ratings,
                              0,
                            ) / recipeData.ratingsData.length
                          ).toFixed(1)
                        : 0}
                    </p>

                    {/* give rating */}
                    <dialog
                      // id={`${item?._id}`}
                      open={!!recipeData && activeModal === recipeData._id}
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
                              // onClick={() => handleRatingSubmit(recipeData)}
                              onClick={() => {
                                handleRatingSubmit(recipeData);
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

                  {/* Up vote */}
                  <div>
                    <button
                      onClick={() => handleUpvoteSubmit(recipeData)}
                      className={`border border-dark-green p-2 rounded-full ${
                        recipeData?.upvote.find(
                          (email) =>
                            email.email === user?.email &&
                            email.upvote === true,
                        )
                          ? "bg-dark-green text-primary-white"
                          : ""
                      }`}
                    >
                      <BiLike />
                    </button>
                    <p className="text-base text-center mt-1 font-semibold">
                      {recipeData?.upvote
                        ? recipeData.upvote.filter(
                            (vote) => vote.upvote === true,
                          ).length
                        : 0}
                    </p>
                  </div>

                  {/* Down vote */}
                  <div>
                    <button
                      onClick={() => handleDownvoteSubmit(recipeData)}
                      className={`border border-dark-green p-2 rounded-full ${
                        recipeData?.downvote.find(
                          (email) =>
                            email.email === user?.email &&
                            email.downvote === true,
                        )
                          ? "bg-dark-green text-primary-white"
                          : ""
                      }`}
                    >
                      <BiDislike />
                    </button>
                    <p className="text-base text-center mt-1 font-semibold">
                      {recipeData?.downvote
                        ? recipeData.downvote.filter(
                            (vote) => vote.downvote === true,
                          ).length
                        : 0}
                    </p>
                  </div>

                  {/* Comments */}
                  <div>
                    <button
                      onClick={() => {
                        if (recipeData) {
                          setActiveCommentsModal(recipeData.email);
                        }
                      }}
                      className="border border-dark-green p-2 rounded-full"
                    >
                      <LiaCommentSolid />
                    </button>
                    <p className="text-base text-center mt-1 font-semibold">
                      {recipeData?.comments?.length}
                    </p>

                    {/* Give comments */}
                    <dialog
                      // id={`${item.email}`}
                      open={
                        !!recipeData && activeCommentsModal === recipeData.email
                      }
                      className="modal"
                    >
                      <div className="modal-box">
                        <h3 className="font-bold text-lg">
                          Comment on this post
                        </h3>
                        <div className="text-sm h-[280px] overflow-y-auto">
                          {recipeData?.comments?.map((comment, index) => (
                            <div
                              key={index}
                              className="mt-2 flex items-center justify-between"
                            >
                              <div>
                                <p className="font-semibold">{comment.name}</p>
                                <p>{comment.comments}</p>
                              </div>
                              <div>
                                {findUser?.email === comment.email && (
                                  <div className="pr-5 text-xl flex items-center gap-4">
                                    {/* update comment button */}
                                    <button
                                      onClick={() => {
                                        setActiveUpdateCommentsModal(
                                          comment._id,
                                        );
                                      }}
                                      className=" p-1 rounded-md shadow-md bg-white"
                                    >
                                      <MdEditNote className="text-2xl" />
                                    </button>
                                    {/* delete comment button */}
                                    <button
                                      className=" p-1 rounded-md shadow-md bg-white"
                                      onClick={() =>
                                        handleDeleteComment(
                                          recipeData._id as string,
                                          comment._id,
                                        )
                                      }
                                    >
                                      <RiDeleteBin4Fill className="text-red-600" />
                                    </button>

                                    {/* update comments form */}

                                    <dialog
                                      // id={`${item.email}`}
                                      open={
                                        activeUpdateCommentsModal ===
                                        comment._id
                                      }
                                      className="modal"
                                    >
                                      <div className="modal-box">
                                        <h3 className="font-bold text-lg">
                                          Update your comment
                                        </h3>

                                        <div className="modal-action">
                                          <form
                                            onSubmit={(e) =>
                                              handleCommentUpdate(
                                                recipeData?._id as string,
                                                e,
                                                comment._id,
                                              )
                                            }
                                            //   method="dialog"
                                            className="w-full"
                                          >
                                            {/* if there is a button in form, it will close the modal */}
                                            <textarea
                                              className="border border-dark-green mt-2 text-sm p-4 w-full"
                                              name="comments"
                                              id="comments"
                                              placeholder="Update comments here"
                                            ></textarea>
                                            <div className="flex items-center justify-between mt-3">
                                              <button
                                                type="submit"
                                                className="bg-primary-orange px-4 py-2 rounded-md text-sm flex"
                                              >
                                                Submit
                                              </button>
                                              <button
                                                type="button"
                                                onClick={() =>
                                                  setActiveUpdateCommentsModal(
                                                    null,
                                                  )
                                                }
                                                className="bg-red-600 text-white px-4 py-2 rounded-md text-sm flex"
                                              >
                                                close
                                              </button>
                                            </div>
                                          </form>
                                        </div>
                                      </div>
                                    </dialog>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="modal-action">
                          <form
                            onSubmit={(e) =>
                              handleCommentsSubmit(recipeData?._id as string, e)
                            }
                            //   method="dialog"
                            className="w-full"
                          >
                            {/* if there is a button in form, it will close the modal */}
                            <textarea
                              className="border border-dark-green mt-2 text-sm p-4 w-full"
                              name="comments"
                              id="comments"
                              placeholder="Write your comments here"
                            ></textarea>
                            <div className="flex items-center justify-between mt-3">
                              <button
                                type="submit"
                                className="bg-primary-orange px-4 py-2 rounded-md text-sm flex"
                              >
                                Submit
                              </button>
                              <button
                                type="button"
                                onClick={() => setActiveCommentsModal(null)}
                                className="bg-red-600 text-white px-4 py-2 rounded-md text-sm flex"
                              >
                                close
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </dialog>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeDetails;
