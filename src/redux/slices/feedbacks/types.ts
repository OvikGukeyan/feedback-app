import { UserDataType } from "../auth/authSlice"
import { sortByType } from "../filters/filtersSlice"

export type FetchFeedbacksOptionsType = {
    sortBy: sortByType
    category: string | null
}

export type PostCommentOptionsType = {
    id: string
    options: {
        content: string
    }
}

export type PostReplyOptionsType = {
    id: string
    options: {
        content: string,
        replyingTo: string
    }
}

type Reply = {
    _id: string;
    content: string;
    user: UserDataType;
    createdAt: string;
    updatedAt: string;
    replyingTo: string
}

export type Comment = {
    _id: string;
    content: string;
    user: UserDataType;
    createdAt: string;
    updatedAt: string;
    replies?: Reply[];
}




export type FeedbackItem = {
    _id: string
    title: string
    description: string
    upvotes: number
    category: string
    status: string
    user: UserDataType
    comments?: Comment[]
    createdAt: string
    updatedAt: string
    __v: number
};


export interface FeedbacksSliceState {
    feedbacks: FeedbackItem[]
    curentFeedback: FeedbackItem | null
    isLoading: boolean
    loadingRejected: boolean
}


