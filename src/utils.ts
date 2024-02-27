import { upvoteMinus, upvotePlus } from "./redux/slices/feedbacks/feedbacksSlice";
import { UserDataType, addUpvoted } from "./redux/slices/auth/authSlice";
import { FeedbackItem } from "./redux/slices/feedbacks/types";
import axios from "./axios";


export const handleUpvote = async (dispatch: any, item: FeedbackItem, userData: UserDataType | null) => {
    try {
        if (userData?.upvoted.includes(item._id)) {
            dispatch(upvoteMinus(item._id))
            dispatch(addUpvoted(item._id))
        } else {
            dispatch(upvotePlus(item._id))
            dispatch(addUpvoted(item._id))
        }
        await axios.post(`/feedbacks/${item._id}/upvote`);
    } catch (error) {
        console.warn(error)
        alert('Failed to upvote feedback')
    }
};