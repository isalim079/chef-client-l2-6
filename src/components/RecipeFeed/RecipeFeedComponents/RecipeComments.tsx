/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import toast from "react-hot-toast";
import { LiaCommentSolid } from "react-icons/lia";
import { MdEditNote } from "react-icons/md";
import { RiDeleteBin4Fill } from "react-icons/ri";

const RecipeComments = ({
  item,
  findUser,
  axiosPublic,
  user,
  getAllRecipe,
}: {
  item: any;
  findUser: { email: string } | null;
  axiosPublic: any;
  user: { name: string; email: string } | null;
  getAllRecipe: () => void;
}) => {
  const [activeCommentsModal, setActiveCommentsModal] = useState<string | null>(
    null,
  );
  const [activeUpdateCommentsModal, setActiveUpdateCommentsModal] = useState<
    string | null
  >(null);

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
        .then((res: any) => {
          if (res.data.success) {
            toast.success("Comments successfully updated");
            getAllRecipe();
          }
        });
    }
  };

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

  return (
    <div>
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
            <h3 className="font-bold text-lg">Comment on this post</h3>
            <div className="text-sm h-[280px] overflow-y-auto">
              {item?.comments?.map((comment: any, index: any) => (
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
                            setActiveUpdateCommentsModal(comment._id);
                          }}
                          className=" p-1 rounded-md shadow-md bg-white"
                        >
                          <MdEditNote className="text-2xl" />
                        </button>
                        {/* delete comment button */}
                        <button
                          className=" p-1 rounded-md shadow-md bg-white"
                          onClick={() =>
                            handleDeleteComment(item._id as string, comment._id)
                          }
                        >
                          <RiDeleteBin4Fill className="text-red-600" />
                        </button>

                        {/* update comments form */}

                        <dialog
                          // id={`${item.email}`}
                          open={activeUpdateCommentsModal === comment._id}
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
                                      setActiveUpdateCommentsModal(null)
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
                onSubmit={(e) => handleCommentsSubmit(item?._id as string, e)}
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
  );
};

export default RecipeComments;
