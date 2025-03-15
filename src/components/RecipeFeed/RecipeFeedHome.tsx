"use client"

// import RecipeFeed from "./RecipeFeed";
import RecipeFeed2 from "./RecipeFeedComponents/RecipeFeed2";
import RecipeFeedProfile from "./RecipeFeedProfile";

const RecipeFeedHome = () => {

;

    return (
        <div className="pt-28">
            <div className="max-w-screen-xl mx-auto grid grid-cols-12 gap-7">
                {/* left section */}
                <div className="col-span-3 ">
                    <div className="">
                        <RecipeFeedProfile />
                    </div>
                </div>
                {/* middle section */}   
                <div className="col-span-6 ">
                    <RecipeFeed2 />
                </div>
                {/* right section */}
                <div className="col-span-3 ">

                </div>
            </div>
        </div>
    );
};

export default RecipeFeedHome;