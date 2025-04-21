import type { typeOfRequest, UserData, ResponseData } from './types';

export default function getRequestBody(id: string, type: typeOfRequest, data: UserData | undefined): ResponseData {
  return {
    id: id.toString(),
    type: type,
    payload: {
      user: data,
    },
  };
}
