
export type LoginParamsType = {
    email: string,
    password: string
}

export type RegisterParamsType = {
    fullName: string
    userName: string
    email: string
    password: string
    avatarUrl?: string | null
}


export type UserDataType = {
    _id: string
    fullName: string
    userName: string
    email: string
    createdAt: string
    updatedAt: string
    token: string
    avatarUrl?: string
    upvoted: string[]
}

export interface authSliceState {
    data: UserDataType | null
    isLoading: boolean
    loadingRejected: boolean
}