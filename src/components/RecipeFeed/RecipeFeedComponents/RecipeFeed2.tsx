/* eslint-disable @next/next/no-img-element */
"use client";

import Loading from "@/components/shared/Loading/Loading";
import { useAuth } from "@/context/AuthContext";
import useAxiosPublic from "@/lib/hooks/useAxiosPublic";
import { useEffect, useState } from "react";
import { TRecipe } from "../RecipeInterface";
import TitleSection from "./TitleSection";
import { TUser } from "@/components/UserDashboard/UserProfileInfo/UserProfileInfo";
import { useRouter } from "next/navigation";
import RecipeRating from "./RecipeRating";
import RecipeUpVote from "./RecipeUpVote";
import RecipeDownVote from "./RecipeDownVote";
import RecipeComments from "./RecipeComments";
import Link from "next/link";
import RecipeContent from "./RecipeContent";

const RecipeFeed2 = () => {
  const axiosPublic = useAxiosPublic();
  const { user, token } = useAuth();
  const [allRecipeData, setAllRecipeData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [findUser, setFindUser] = useState<TUser | null>(null);
  const router = useRouter();

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

  const renderRecipes = () => {
    if (findUser?.userType === "premium") {
      return allRecipeData;
    } else if (findUser?.userType === "free") {
      return allRecipeData.slice(0, 5);
    }
    return [];
  };

  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <div>
      <div className="max-w-screen-xl mx-auto font-poppins p-14">
        <div>
          {isLoading ? (
            <Loading />
          ) : (
            <div className=" px-6 lg:px-0">
              {renderRecipes().map((item: TRecipe, index: number) => (
                <div className="mb-20" key={index}>
                  <div>
                    {/* title section */}
                    <TitleSection
                      user={user}
                      item={item}
                      axiosPublic={axiosPublic}
                      findUser={findUser}
                      router={router}
                      getAllRecipe={getAllRecipe}
                      token={token}
                    />
                    {/* divider */}
                    <div className="border my-5"></div>

                    {/* recipe formula */}
                    <div className="prose">
                      {/* <div
                        dangerouslySetInnerHTML={{ __html: item?.recipe }}
                      ></div> */}
                      <RecipeContent recipe={item?.recipe} />
                      <div className="mt-5">
                        <img
                          src={item?.image}
                          width={800}
                          height={100}
                          alt="image"
                          className="object-cover w-[680px] h-[320px]"
                        />
                      </div>
                    </div>
                    <div className="flex gap-7 mt-7">
                      {/* Rating */}
                      <RecipeRating
                        activeModal={activeModal}
                        axiosPublic={axiosPublic}
                        getAllRecipe={getAllRecipe}
                        item={item}
                        setActiveModal={setActiveModal}
                        user={user}
                      />
                      {/* Up Vote */}
                      <RecipeUpVote
                        axiosPublic={axiosPublic}
                        getAllRecipe={getAllRecipe}
                        item={item}
                        user={user}
                      />
                      {/* Down vote */}
                      <RecipeDownVote
                        axiosPublic={axiosPublic}
                        getAllRecipe={getAllRecipe}
                        item={item}
                        user={user}
                      />
                      {/* Comments */}
                      <RecipeComments
                        axiosPublic={axiosPublic}
                        findUser={findUser}
                        getAllRecipe={getAllRecipe}
                        item={item}
                        user={user}
                      />
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

export default RecipeFeed2;
