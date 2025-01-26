export type TComments = {
    email: string;
    comments: string;
}

export type TRatings = {
    email: string;
    ratings: number;
}

export type TUpVote = {
    email: string;
    upvote: boolean;
}

export type TDownVote = {
    email: string;
    downvote: boolean;
}

export type TRecipe = {
    image: string;
    title: string;
    recipe: string; 
    email: string;
    name: string;
    profileImg: string;
    rating: number;
    comments?: TComments[];
    ratingsData?: TRatings[];
    upvote: TUpVote[];
    downvote: TDownVote[];
}