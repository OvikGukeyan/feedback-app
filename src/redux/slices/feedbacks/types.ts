import { UserDataType } from "../auth/authSlice"
import { FilterType, SortByType } from "../filters/filtersSlice"

export type FetchFeedbacksOptionsType = {
    sortBy?: SortByType
    filter?: FilterType
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

export type ReplyType = {
    _id: string
    content: string
    user: UserDataType
    createdAt: string
    updatedAt: string
    replyingTo: string
    feedbackId: string
    commentId: string
}

export type Comment = {
    _id: string;
    content: string;
    user: UserDataType;
    createdAt: string;
    updatedAt: string;
    replies?: ReplyType[];
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
    currentFeedback: FeedbackItem | null
    isLoading: boolean
    loadingRejected: boolean
}


