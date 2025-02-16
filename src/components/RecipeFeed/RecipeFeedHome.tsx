"use client"

import RecipeFeed from "./RecipeFeed";
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
                    <RecipeFeed />
                </div>
                {/* right section */}
                <div className="col-span-3 ">

                </div>
            </div>
        </div>
    );
};

export default RecipeFeedHome;