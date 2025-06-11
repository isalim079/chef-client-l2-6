/* eslint-disable @typescript-eslint/no-explicit-any */
import { TUser } from "@/components/UserDashboard/UserProfileInfo/UserProfileInfo";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiInfoCircle } from "react-icons/bi";
import { FaUserPlus, FaUserMinus } from "react-icons/fa"; // Icons for Follow/Unfollow

interface TitleSectionProps {
  item: any;
  findUser: any;
  user: any;
  axiosPublic: any;
  getAllRecipe: () => void;
  router: any;
  token: string | null;
}

const TitleSection = ({
  item,
  findUser,
  user,
  axiosPublic,
  getAllRecipe,
  router,
  token,
}: TitleSectionProps) => {
  const [allUserData, setAllUserData] = useState<TUser[]>([]);
  const getAllUser = async () => {
    await axiosPublic
      .get(`/api/users`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((res: any) => {
        setAllUserData(res.data.data);
      });
  };

  useEffect(() => {
    getAllUser();
  }, []);

  const [isFollowing, setIsFollowing] = useState(false);

  const findFollowingUser = allUserData.find(
    (userEmail) => userEmail.email === user?.email,
  );

  useEffect(() => {
    if (findFollowingUser && findFollowingUser.following) {
      const isFollowingUser = findFollowingUser.following.some(
        (following: any) => following.email === item.email,
      );
      setIsFollowing(isFollowingUser);
    }
  }, [findFollowingUser, item.email]);

  const handleFollow = async (item: any) => {
    const followerData = {
      following: true,
      name: findUser?.name,
      email: user?.email,
      image: findUser?.image,
    };

    const followingData = {
      following: true,
      name: item?.name,
      email: item?.email,
      image: item?.profileImg,
    };

    try {
      await axiosPublic.patch(
        `/api/users/${user?.email}/followings`,
        followingData,
      );
    } catch (error) {
      console.log(error);
    }

    try {
      const res = await axiosPublic.patch(
        `/api/users/${item?.userEmail}/followers`,
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
      {/* Title Section */}
      <div className="flex lg:flex-row flex-col justify-center items-center lg:justify-between">
        <div className="w-full">
          <div className="flex justify-between w-full">
            <div className="flex items-center gap-3 mb-5">
              <Image
                className="rounded-full"
                width={50}
                height={50}
                src={item?.profileImg}
                alt="profile picture"
              />
              <div>
                <p className="mt-2 font-bold">{item?.name}</p>
                <p className="italic lg:text-base text-sm">{item?.title}</p>
              </div>
            </div>
            <div>
              <button
                onClick={() => handleDetailsNavigate(item._id as string)}
                className="font-sourGummy text-xl underline flex items-center gap-1"
              >
                <BiInfoCircle /> Details
              </button>
            </div>
          </div>
          <div className="flex gap-3 mt-1">
            {isFollowing ? (
              // Unfollow Button
              <button
                onClick={() =>
                  handleUnFollow(item?.email as string, user?.email as string)
                }
                className="px-3 py-1 rounded-2xl border border-red-600 text-sm font-semibold hover:shadow-md hover:bg-red-600 hover:text-white transition-all duration-200 ease-in-out hover:scale-[94%] flex items-center gap-2"
              >
                <FaUserMinus className="text-lg" /> Unfollow
              </button>
            ) : (
              // Follow Button
              <button
                onClick={() => handleFollow(item)}
                className="px-3 py-1 rounded-2xl border border-green-600 text-sm font-semibold hover:shadow-md hover:bg-green-600 hover:text-white transition-all duration-200 ease-in-out hover:scale-[94%] flex items-center gap-2"
              >
                <FaUserPlus className="text-lg" /> Follow
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TitleSection;
