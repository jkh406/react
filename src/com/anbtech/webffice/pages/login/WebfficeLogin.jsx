import React from 'react';
import { Link } from 'react-router-dom';

import WebfficeLoginContent from '@pages/login/WebfficeLoginContent';

import URL from '@constants/url';

function WebfficeLogin(props) {
    console.group("WebfficeLogin");
    console.log("[Start] WebfficeLogin ------------------------------");
    console.log("WebfficeLogin [props] : ", props);

    const onChangeLogin = (user) => {
        props.onChangeLogin(user);
    }

    console.log("------------------------------WebfficeLogin [End]");
    console.groupEnd("WebfficeLogin");

    return (
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><Link to={URL.MAIN} className="home" >Home</Link></li>
                        <li>로그인</li>
                    </ul>
                </div>
                {/* <!--// Location --> */}

                <div className="layout">
                    <WebfficeLoginContent
                        onChangeLogin={onChangeLogin}
                    ></WebfficeLoginContent>
                </div>
            </div>
        </div>
    );
}

export default WebfficeLogin;