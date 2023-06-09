import { SERVER_URL } from '@config';

import URL from '@constants/url';
import CODE from '@constants/code';

export function requestFetch(url, requestOptions, handler, errorHandler) {
    //CORS ISSUE 로 인한 조치 - origin 및 credentials 추가 
    // origin 추가
    if (!requestOptions['origin']) {
        requestOptions = { ...requestOptions, origin: SERVER_URL };
    }
    // credentials 추가 
    if (!requestOptions['credentials']) {
        requestOptions = { ...requestOptions, credentials: 'include' };
    }

    fetch(SERVER_URL + url, requestOptions)
        .then(response => {
            return response.json();
        })
        .then((resp) => {
            if (Number(resp.resultCode) === Number(CODE.RCV_ERROR_AUTH)) { 
                console.log('resp = ', resp);
                alert("Login Alert");
                sessionStorage.setItem('loginUser', JSON.stringify({"id":""}));
                window.location.href = URL.LOGIN;
                return false;
            } else {
                return resp;
            }
        })
        .then((resp) => {
            if (typeof handler === 'function') {
                handler(resp);
            } else {
                console.log('egov fetch handler not assigned!');
            }
        })
        .catch(error => {
            console.error('There was an error!', error);
            if (error === 'TypeError: Failed to fetch') {
                alert("서버와의 연결이 원활하지 않습니다. 서버를 확인하세요.");
            }

            if (typeof errorHandler === 'function') {
                errorHandler(error);
            } else {
                console.error('egov error handler not assigned!');
                alert("ERR : " + error.message);
            }
        })
        .finally(() => {
            console.log("requestFetch finally end");
        });
}