import { apiRouter } from "@/config/apiRouter";
import { ICommentSuccesPayload } from "@/interface/commment";
import axiosClient from "@/libs/api/axiosClient";


export const getComment = async (id: string) => {
  const response = await axiosClient.get<ICommentSuccesPayload>(`${apiRouter.getComment}/${id}`);
  return response.data;
}


