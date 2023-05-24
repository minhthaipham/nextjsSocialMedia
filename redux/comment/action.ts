import { ICommentSuccesPayload } from '@/interface/commment';
import {createAction} from '@reduxjs/toolkit';

export const getCommentRequest = createAction<{
    id : string,
}>(
    'ACTION/GET_COMMENT_REQUEST',
);

export const getCommentSuccess = createAction<ICommentSuccesPayload>(   
    'ACTION/GET_COMMENT_SUCCESS',
);

export const getCommentFailure = createAction(
    'ACTION/GET_COMMENT_FAILURE',
);

