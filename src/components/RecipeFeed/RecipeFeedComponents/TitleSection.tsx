/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import toast from "react-hot-toast";
import { BiInfoCircle } from "react-icons/bi";

interface TitleSectionProps {
  item: any;
  findUser: any;
  user: any;
  axiosPublic: any; 
  getAllRecipe: () => void;
  router: any
}

const TitleSection = ({ item, findUser, user, axiosPublic, getAllRecipe, router }: TitleSectionProps) => {

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
            <p className="mt-2 font-semibold text-xl">{item?.name}</p>
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
                handleUnFollow(item?.email as string, user?.email as string)
              }
              className="px-3 py-1 rounded-2xl border border-dark-green text-sm font-semibold hover:shadow-md hover:bg-dark-green hover:text-white transition-all duration-200 ease-in-out hover:scale-[94%]"
            >
              Unfollow
            </button>
          </div>
        </div>
        <div className="mt-2">
          <h3 className=" text-dark-green text-lg">
            <span className="font-bold mr-3">Recipe Name:</span> {item?.title}
          </h3>
          <div className="flex justify-end mt-1">
            {/* <Link href={`/recipe-feed/${item?._id}`}> */}
            <button
              onClick={() => handleDetailsNavigate(item._id as string)}
              className="font-sourGummy text-xl underline flex items-center gap-1"
            >
              <BiInfoCircle /> Details
            </button>
            {/* </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TitleSection;
