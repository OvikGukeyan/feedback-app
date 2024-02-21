import { UserDataType } from "../auth/authSlice"
import { SortByType } from "../filters/filtersSlice"

export type FetchFeedbacksOptionsType = {
    sortBy: SortByType
    category: string | null
}



export type PostCommentOptionsType = {
    id: string
    options: {
        content: string
    }
}

export type PostReplyOptionsType = {
    commentId: string
    options: {
        content: string
        replyingTo: string
        feedbackId: string

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
    commentsCount: number
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


