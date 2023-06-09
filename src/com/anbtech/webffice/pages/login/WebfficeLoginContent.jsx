import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as WebfficeNet from '@api/webfficeFetch';

import URL from '@constants/url';

function WebfficeLoginContent(props) {

    const navigate = useNavigate();
    const location = useLocation();
    const [userInfo, setUserInfo] = useState({ id: '', password: 'default', userSe: 'USR' });
    const [loginVO, setLoginVO] = useState({});
    const [saveIDFlag, setSaveIDFlag] = useState(false);
    const checkRef = useRef();
    const KEY_ID = "KEY_ID";
    const KEY_SAVE_ID_FLAG = "KEY_SAVE_ID_FLAG";

    const handleSaveIDFlag = () => {
        localStorage.setItem(KEY_SAVE_ID_FLAG, !saveIDFlag);
        setSaveIDFlag(!saveIDFlag);
    };

    let idFlag;
        try {
            idFlag = JSON.parse(localStorage.getItem(KEY_SAVE_ID_FLAG));
        }
        catch(err) {
            idFlag = null;
        } 

    useEffect(() => {

        if (idFlag === null) {
            setSaveIDFlag(false);
            idFlag = false;
        }
        if (idFlag !== null) setSaveIDFlag(idFlag);
        if (idFlag === false) {
            localStorage.setItem(KEY_ID, "");
            checkRef.current.className = "f_chk"
        } else {
            checkRef.current.className = "f_chk on"
        };
      
        let data = localStorage.getItem(KEY_ID);
        if (data !== null) setUserInfo({ ...userInfo, id: data });
      }, [idFlag]);

    const submitFormHandler = (e) => {
        const loginUrl = "/api/login"
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        }

        WebfficeNet.requestFetch(loginUrl,
            requestOptions,
            (resp) => {
                let resultVO = resp.data.User;
                let jToken = resp.data.Token;

                localStorage.setItem('jToken', jToken);

                if (resp.success) {
                    setLoginVO(resultVO);
                    sessionStorage.setItem('loginUser', JSON.stringify(resultVO));
                    props.onChangeLogin(resultVO);
                    if (saveIDFlag) localStorage.setItem(KEY_ID, resultVO?.id);
                    navigate(URL.MAIN);
                    // PC와 Mobile 열린메뉴 닫기
                    document.querySelector('.all_menu.WEB').classList.add('closed');
                    document.querySelector('.btnAllMenu').classList.remove('active');
                    document.querySelector('.btnAllMenu').title = '전체메뉴 닫힘';
		            document.querySelector('.all_menu.Mobile').classList.add('closed');
                } else {
                    alert(resp.resultMessage)
                }
            })
    }

    return (
        <div className="contents" id="contents">
            {/* <!-- 본문 --> */}
            <div className="Plogin">
                <h1>로그인</h1>
                <p className="txt">전자정부표준프레임워크 경량환경 홈페이지 로그인 페이지입니다.<br />로그인을 하시면 모든 서비스를 제한없이 이용하실 수 있습니다.</p>

                <div className="login_box">
                    <form name="" method="" action="" >
                        <fieldset>
                            <legend>로그인</legend>
                            <span className="group">
                                <input type="text" name="" title="아이디" placeholder="아이디" value={userInfo?.id}
                                    onChange={e => {
                                            const value = e.target.value;
                                            if(value === 'admin'){
                                                setUserInfo({ ...userInfo, id: value, userSe: 'admin' })
                                            } else {
                                                setUserInfo({ ...userInfo, id: value })
                                            }
                                        }
                                    }/>
                                <input type="password" name="" title="비밀번호" placeholder="비밀번호"
                                    onChange={e => setUserInfo({ ...userInfo, password: e.target.value })} />
                            </span>
                            <div className="chk">
                                <label className="f_chk" htmlFor="saveid" ref={checkRef}>
                                    <input type="checkbox" name="" id="saveid" onChange={handleSaveIDFlag} checked={saveIDFlag}/> <em>ID저장</em>
                                </label>
                            </div>
                            <button type="button" onClick={submitFormHandler}><span>LOGIN</span></button>
                        </fieldset>
                    </form>
                </div>

                <ul className="list">
                    <li>비밀번호는 6~12자의 영문 대/소문자, 숫자, 특수문자를 혼합해서 사용하실 수 있습니다.</li>
                    <li>쉬운 비밀번호나 자주 쓰는 사이트의 비밀번호가 같을 경우, 도용되기 쉬우므로 주기적으로
                        변경하셔서 사용하는 것이 좋습니다.</li>
                </ul>
            </div>
            {/* <!--// 본문 --> */}
        </div>
    );
}

export default WebfficeLoginContent;