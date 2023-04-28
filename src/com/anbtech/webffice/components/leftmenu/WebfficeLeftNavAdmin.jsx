import React from 'react';

import { NavLink } from 'react-router-dom';
import URL from '@constants/url';

function WebfficeLeftNavAdmin() {
    return (
        <div className="nav">
            <div className="inner">
                <h2>내부시스템관리</h2>
                    <ul className="menu4">
                        <li><NavLink to={URL.ADMIN_USER} className={({ isActive }) => (isActive ? "cur" : "")}>사용자등록관리</NavLink></li>
                        <li><NavLink to={URL.ADMIN_AUTH} className={({ isActive }) => (isActive ? "cur" : "")}>권한관리</NavLink></li>
                        <li><NavLink to={URL.ADMIN_GROUP} className={({ isActive }) => (isActive ? "cur" : "")}>사용자그룹관리</NavLink></li>
                        <li><NavLink to={URL.ADMIN_AUTHORGROUP} className={({ isActive }) => (isActive ? "cur" : "")}>사용자별권한관리</NavLink></li>
                        <li><NavLink to={URL.ADMIN_ROLE} className={({ isActive }) => (isActive ? "cur" : "")}>롤관리</NavLink></li>
                        <li><NavLink to={URL.ADMIN_PROGRAM} className={({ isActive }) => (isActive ? "cur" : "")}>프로그램목록관리</NavLink></li>
                        <li><NavLink to={URL.ADMIN_MENU} className={({ isActive }) => (isActive ? "cur" : "")}>메뉴목록관리</NavLink></li>
                        <li><NavLink to={URL.ADMIN_CODECL} className={({ isActive }) => (isActive ? "cur" : "")}>분류코드관리</NavLink></li>
                        <li><NavLink to={URL.ADMIN_COMCODE} className={({ isActive }) => (isActive ? "cur" : "")}>공통코드관리</NavLink></li>
                        <li><NavLink to={URL.ADMIN_DETAILCODE} className={({ isActive }) => (isActive ? "cur" : "")}>상세코드관리</NavLink></li>
                    </ul>
            </div>
        </div>
    );
}

export default React.memo(WebfficeLeftNavAdmin);