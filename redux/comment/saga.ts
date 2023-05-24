import { ICommentSuccesPayload } from '@/interface/commment';
import { getCommentRequest,
    getCommentSuccess,
    getCommentFailure,
} from './action';
import {call, ForkEffect, put, takeLatest} from 'redux-saga/effects';
import { getComment } from './api';
  
  
  function* getCommentWorker(action: ReturnType<typeof getCommentRequest>) {
    try {
      const response: ICommentSuccesPayload = yield call(getComment, action.payload.id);
      if (response) {
        yield put(getCommentSuccess(response));
      } else {
        yield put(getCommentFailure());
      }
    } catch (error) {
      yield put(getCommentFailure());
      console.log(error);
    }
  }

  function* CommentsSagas(): Generator<ForkEffect<never>, void> {
    yield takeLatest(getCommentRequest.type, getCommentWorker);
  }
  export default CommentsSagas;
  