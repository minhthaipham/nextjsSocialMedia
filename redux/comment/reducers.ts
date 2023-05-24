import { createReducer } from "@reduxjs/toolkit";
import { getCommentRequest,
    getCommentSuccess,
    getCommentFailure,
} from "./action";
import { ICommentSucess } from "@/interface/commment";
interface IinitialState {
  loading: boolean;
    listComment: ICommentSucess[];

}

const initialState: IinitialState = {
  loading: true,
  listComment: [],

};

export const CommentReducer = createReducer(initialState, {
    [getCommentRequest.type]: (state) => {
        state.loading = true;
    }
    ,
    [getCommentSuccess.type]: (state, action) => {
        state.loading = false;
        state.listComment = action.payload.data;
    }
    ,
    [getCommentFailure.type]: (state) => {
        state.loading = false;
    }
    ,
   

});