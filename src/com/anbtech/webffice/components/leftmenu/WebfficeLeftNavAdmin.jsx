import React from 'react';

import { NavLink } from 'react-router-dom';
import URL from '@constants/url';

function WebfficeLeftNavAdmin() {
    return (
        
        <div className="nav">
            <div className="inner">
                <h2>내부시스템관리</h2>
                    <h3>사용자관리</h3>
                    <ul className="menu4">
                        <li><NavLink to={URL.ADMIN_CODE} className={({ isActive }) => (isActive ? "cur" : "")}>사용자등록관리</NavLink></li>
                    </ul>

                    <h3>사용자권한관리</h3>
                    <ul className="menu4">
                        <li><NavLink to={URL.ADMIN_CODE} className={({ isActive }) => (isActive ? "cur" : "")}>권한관리</NavLink></li>
                        <li><NavLink to={URL.ADMIN_MENU} className={({ isActive }) => (isActive ? "cur" : "")}>사용자그룹관리</NavLink></li>
                        <li><NavLink to={URL.ADMIN_AUTH} className={({ isActive }) => (isActive ? "cur" : "")}>사용자별권한관리</NavLink></li>
                        <li><NavLink to={URL.ADMIN_SCHEDULE} className={({ isActive }) => (isActive ? "cur" : "")}>롤관리</NavLink></li>
                    </ul>

                    <h3>메뉴관리</h3>
                    <ul className="menu4">
                        <li><NavLink to={URL.ADMIN_BOARD} className={({ isActive }) => (isActive ? "cur" : "")}>프로그램목록관리</NavLink></li>
                        <li><NavLink to={URL.ADMIN_NOTICE} className={({ isActive }) => (isActive ? "cur" : "")}>메뉴목록관리</NavLink></li>
                    </ul>

                    <h3>코드관리</h3>
                    <ul className="menu4">
                        <li><NavLink to={URL.ADMIN_GALLERY} className={({ isActive }) => (isActive ? "cur" : "")}>분류코드관리</NavLink></li>
                        <li><NavLink to={URL.ADMIN_MANAGER} className={({ isActive }) => (isActive ? "cur" : "")}>공통코드관리</NavLink></li>
                        <li><NavLink to={URL.ADMIN_CODE} className={({ isActive }) => (isActive ? "cur" : "")}>상세코드관리</NavLink></li>
                        <li><NavLink to={URL.ADMIN_CODE} className={({ isActive }) => (isActive ? "cur" : "")}>우편번호관리</NavLink></li>
                    </ul>
            </div>
        </div>
    );
}

export default React.memo(WebfficeLeftNavAdmin);