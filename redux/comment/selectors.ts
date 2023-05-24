import {createSelector} from '@reduxjs/toolkit';
import type {RootState} from '../reducers';

const selectPost = (state: RootState) => state.comment;

export const listCommentSelector = createSelector(
    selectPost,
    (state) => state.listComment,
);

