import { rest } from 'msw';
import { reservationAPIList } from './api';

const baseUrl = 'https://jsonplaceholder.typicode.com';

// 공통 요청 처리 함수
async function handleRequest(req, res, ctx, mockFunction) {
  try {
    const response = await ctx.fetch(req);
    /**
     * 만약 baseUrl의 end point로 api를 호출 했는데
      아직 개발되지 않은 api인 경우 catch문에 mockFunction으로 넘어가게끔
      throw 강제 에러를 던져준다.
     * 
    */
    if (response.status >= 400) {
      throw new Error('Bad response');
    }
    return res(ctx.status(response.status), ctx.json(await response.json()));
  } catch (error) {
    console.log('Error:', error.message);
    return mockFunction(req, res, ctx);
  }
}

/**
 *
 * @returns 최종적으로 api 라우터와 응답값을 핸들하는 함수입니다.
 */
export function handlers() {
  return [
    rest.get(`${baseUrl}/time`, (req, res, ctx) =>
      handleRequest(req, res, ctx, reservationAPIList.getTimes)
    ),
    rest.get(`${baseUrl}/todos`, (req, res, ctx) =>
      handleRequest(req, res, ctx, reservationAPIList.getTodos)
    ),
  ];
}
