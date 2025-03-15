/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import useAxiosPublic from "@/lib/hooks/useAxiosPublic";
import withAuth from "@/utils/withAuth";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BiDislike, BiInfoCircle, BiLike } from "react-icons/bi";
import { LiaCommentSolid } from "react-icons/lia";
import Loading from "../shared/Loading/Loading";
import { TRecipe } from "./RecipeInterface";
import { useAuth } from "@/context/AuthContext";
import { FaStar } from "react-icons/fa";
import toast from "react-hot-toast";
import { Rating, RoundedStar } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import Link from "next/link";
import { TUser } from "../UserDashboard/UserProfileInfo/UserProfileInfo";
import { MdEditNote } from "react-icons/md";
import { RiDeleteBin4Fill } from "react-icons/ri";
import { useRouter } from "next/navigation";

const myRatingStyles = {
  itemShapes: RoundedStar,
  activeFillColor: "#ffb700",
  inactiveFillColor: "#fbf1a9",
};

const RecipeFeed = () => {
  const axiosPublic = useAxiosPublic();
  const { user, token } = useAuth();
  const [allRecipeData, setAllRecipeData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const router = useRouter();

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

  const [rating, setRating] = useState(0);

  const getAllRecipe = async () => {
    setLoading(true);
    await axiosPublic.get(`/allRecipes`).then((res) => {
      setAllRecipeData(res.data.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    getAllRecipe();
  }, []);

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
            getAllRecipe();
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
            getAllRecipe();
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
            getAllRecipe();
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
            getAllRecipe();
          }
        });
    }
  };

  const renderRecipes = () => {
    if (findUser?.userType === "premium") {
      return allRecipeData;
    } else if (findUser?.userType === "free") {
      return allRecipeData.slice(0, 5);
    }
    return [];
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
        getAllRecipe();
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
        getAllRecipe();
      }
    } catch (error) {
      console.log(error);
      toast.error("Error deleting comment");
    }
  };

  const handleFollow = async (userEmail: string) => {
    const followerData = {
      following: true,
      name: findUser?.name,
      email: user?.email,
      image: findUser?.image,
    };

    try {
      const res = await axiosPublic.patch(
        `api/users/${userEmail}/followers`,
        followerData,
      );
      if (res.data.success) {
        toast.success("You followed this chef now!");
        getAllRecipe();
      }
    } catch (error) {
      console.log(error);
      toast.error("You are already following this chef!");
    }
  };

  const handleUnFollow = async (userEmail: string, followerEmail: string) => {
    try {
      const res = await axiosPublic.delete(
        `/api/users/${userEmail}/followers/${followerEmail}`,
      );
      if (res.data.success) {
        toast.success("Unfollowed this chef now!");
        getAllRecipe();
      }
    } catch (error) {
      console.log(error);
      toast.error("You are not following this chef now!");
    }
  };

  const handleDetailsNavigate = async (id: string) => {
    router.push(`/recipe-feed/${id}`);
  };

  return (
    <div className="">
      <div className="max-w-screen-xl mx-auto font-poppins">
      
        <div>
          {isLoading ? (
            <Loading />
          ) : (
            <div className=" px-6 lg:px-0">
              {renderRecipes()?.map((item: TRecipe, index: number) => (
                <div key={index} className="mb-20 ">
                  <div>
                    {/* title section */}
                    <div className="flex lg:flex-row flex-col justify-center items-center lg:justify-between">
                      <div className=" w-full lg:w-fit">
                        <div>
                          <Image
                            className="rounded-full"
                            width={60}
                            height={60}
                            src={item?.profileImg}
                            alt="profile picture"
                          />
                          <p className="mt-2 font-semibold text-xl">
                            {item?.name}
                          </p>
                        </div>
                        <div className="flex gap-3 mt-1">
                          {/* follow unfollow section */}
                          <button
                            onClick={() => handleFollow(item?.email as string)}
                            className="px-3 py-1 rounded-2xl border border-dark-green text-sm font-semibold hover:shadow-md hover:bg-dark-green hover:text-white transition-all duration-200 ease-in-out hover:scale-[94%]"
                          >
                            Follow
                          </button>
                          <button
                            onClick={() =>
                              handleUnFollow(
                                item?.email as string,
                                user?.email as string,
                              )
                            }
                            className="px-3 py-1 rounded-2xl border border-dark-green text-sm font-semibold hover:shadow-md hover:bg-dark-green hover:text-white transition-all duration-200 ease-in-out hover:scale-[94%]"
                          >
                            Unfollow
                          </button>
                        </div>
                      </div>
                      <div className="mt-2">
                        <h3 className=" text-dark-green text-lg">
                          <span className="font-bold mr-3">Recipe Name:</span>{" "}
                          {item?.title}
                        </h3>
                        <div className="flex justify-end mt-1">
                          {/* <Link href={`/recipe-feed/${item?._id}`}> */}
                          <button
                            onClick={() =>
                              handleDetailsNavigate(item._id as string)
                            }
                            className="font-sourGummy text-xl underline flex items-center gap-1"
                          >
                            <BiInfoCircle /> Details
                          </button>
                          {/* </Link> */}
                        </div>
                      </div>
                    </div>
                    {/* divider */}
                    <div className="border my-5"></div>

                    {/* recipe formula */}
                    <div className="prose">
                      <div
                        dangerouslySetInnerHTML={{ __html: item?.recipe }}
                      ></div>
                    </div>

                    {/* Micro elements */}
                    <div className="mt-7">
                      <div className="text-2xl gap-10 flex justify-end">
                        {/* Rating */}
                        <div>
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
                                    (sum, rating) => sum + rating.ratings,
                                    0,
                                  ) / item.ratingsData.length
                                ).toFixed(1)
                              : 0}
                          </p>

                          {/* give rating */}
                          <dialog
                            // id={`${item?._id}`}
                            open={activeModal === item._id}
                            className="modal"
                          >
                            <div className="modal-box">
                              <h3 className="font-bold text-lg">
                                Rate this post
                              </h3>
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

                        {/* Up vote */}
                        <div>
                          <button
                            onClick={() => handleUpvoteSubmit(item)}
                            className={`border border-dark-green p-2 rounded-full ${
                              item.upvote.find(
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
                            {item.upvote
                              ? item.upvote.filter(
                                  (vote) => vote.upvote === true,
                                ).length
                              : 0}
                          </p>
                        </div>

                        {/* Down vote */}
                        <div>
                          <button
                            onClick={() => handleDownvoteSubmit(item)}
                            className={`border border-dark-green p-2 rounded-full ${
                              item.downvote.find(
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
                            {item.downvote
                              ? item.downvote.filter(
                                  (vote) => vote.downvote === true,
                                ).length
                              : 0}
                          </p>
                        </div>

                        {/* Comments */}
                        <div>
                          <button
                            onClick={() => {
                              setActiveCommentsModal(item.email);
                            }}
                            className="border border-dark-green p-2 rounded-full"
                          >
                            <LiaCommentSolid />
                          </button>
                          <p className="text-base text-center mt-1 font-semibold">
                            {item?.comments?.length}
                          </p>

                          {/* Give comments */}
                          <dialog
                            // id={`${item.email}`}
                            open={activeCommentsModal === item.email}
                            className="modal"
                          >
                            <div className="modal-box">
                              <h3 className="font-bold text-lg">
                                Comment on this post
                              </h3>
                              <div className="text-sm h-[280px] overflow-y-auto">
                                {item?.comments?.map((comment, index) => (
                                  <div
                                    key={index}
                                    className="mt-2 flex items-center justify-between"
                                  >
                                    <div>
                                      <p className="font-semibold">
                                        {comment.name}
                                      </p>
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
                                                item._id as string,
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
                                                      item?._id as string,
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
                                    handleCommentsSubmit(item?._id as string, e)
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
                                      // onClick={() => {
                                      //   const dialog = document.getElementById(
                                      //     `${item.email}`
                                      //   ) as HTMLDialogElement | null;
                                      //   if (dialog) {
                                      //     dialog.close(); // Close the modal
                                      //   }
                                      // }}
                                      onClick={() =>
                                        setActiveCommentsModal(null)
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
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {findUser?.userType === "free" && (
                <div className="text-center my-10">
                  <p className="text-lg font-semibold">
                    Please subscribe to see more recipes.
                  </p>
                  <Link href={"/subscription"}>
                    <button className="bg-gray-800 px-6 py-3 rounded-md text-white mt-4">
                      Subscribe Now
                    </button>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default withAuth(RecipeFeed);
