import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as EgovNet from '@api/webfficeFetch';
import URL from '@constants/url';
import { NOTICE_BBS_ID } from '@config';
import { default as EgovLeftNav } from '@components/leftmenu/WebfficeLeftNavAdmin';
import EgovPaging from '@components/EgovPaging';
import { itemIdxByPage } from '@utils/calc';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';

function WebfficeAdminMenuList(props) {
    console.group("WebfficeAdminMenuList");
    console.log("[Start] WebfficeAdminMenuList ------------------------------");
    console.log("WebfficeAdminMenuList [props] : ", props);

    const location = useLocation();
    console.log("WebfficeAdminMenuList [location] : ", location);

    const cndRef = useRef();
    const wrdRef = useRef();

    const bbsId = NOTICE_BBS_ID;

    // eslint-disable-next-line no-unused-vars
    const [searchCondition, setSearchCondition] = useState(location.state?.searchCondition || { bbsId: bbsId, pageIndex: 1, searchCnd: '0', searchWrd: '' });// 기존 조회에서 접근 했을 시 || 신규로 접근 했을 시
    const [masterBoard, setMasterBoard] = useState({});
    const [paginationInfo, setPaginationInfo] = useState({});

    const [listTag, setListTag] = useState([]);

    const retrieveList = useCallback((searchCondition) => {
        console.groupCollapsed("WebfficeAdminMenuList.retrieveList()");

        const retrieveListURL = '/cop/bbs/selectBoardListAPI.do';
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(searchCondition)
        }

        EgovNet.requestFetch(retrieveListURL,
            requestOptions,
            (resp) => {
                setMasterBoard(resp.result.brdMstrVO);
                setPaginationInfo(resp.result.paginationInfo);

                let mutListTag = [];

                const resultCnt = parseInt(resp.result.resultCnt);
                const currentPageNo = resp.result.paginationInfo.currentPageNo;
                const pageSize = resp.result.paginationInfo.pageSize;

                // 리스트 항목 구성
                resp.result.resultList.forEach(function (item, index) {
                    if (index === 0) mutListTag = []; // 목록 초기화
                    const listIdx = itemIdxByPage(resultCnt , currentPageNo, pageSize, index);

                    mutListTag.push(
                        <Link to={{pathname: URL.ADMIN_NOTICE_DETAIL}}
                            state={{
                                nttId: item.nttId,
                                bbsId: item.bbsId,
                                searchCondition: searchCondition
                            }}
                            key={listIdx} className="list_item" >
                            <div>{listIdx}</div>
                            {(item.replyLc * 1 ? true : false) &&
                                <><div className="al reply">
                                    {item.nttSj}
                                </div></>}
                            {(item.replyLc * 1 ? false : true) &&
                                <><div className="al">
                                    {item.nttSj}
                                </div></>}
                            <div>{item.frstRegisterNm}</div>
                            <div>{item.frstRegisterPnttm}</div>
                            <div>{item.inqireCo}</div>
                        </Link>
                    );
                });
                if(!mutListTag.length) mutListTag.push(<p className="no_data" key="0">검색된 결과가 없습니다.</p>); // 게시판 목록 초기값
                setListTag(mutListTag);
            },
            function (resp) {
                console.log("err response : ", resp);
            }
        );
        console.groupEnd("WebfficeAdminMenuList.retrieveList()");
    },[]);

    useEffect(() => {
        retrieveList(searchCondition);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    console.log("------------------------------WebfficeAdminMenuList [End]");
    console.groupEnd("WebfficeAdminMenuList");
    return (
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><Link to={URL.MAIN} className="home">Home</Link></li>
                        <li><Link to={URL.INFORM}>사이트 관리</Link></li>
                        <li>{masterBoard && masterBoard.bbsNm}</li>
                    </ul>
                </div>
                {/* <!--// Location --> */}

                <div className="layout">
                    {/* <!-- Navigation --> */}
                    <EgovLeftNav></EgovLeftNav>
                    {/* <!--// Navigation --> */}

                    <div className="contents NOTICE_LIST" id="contents">
                        {/* <!-- 본문 --> */}

                        <h2 className="tit_2">{masterBoard && masterBoard.bbsNm}</h2>

                        {/* <!-- 검색조건 --> */}
                        <div className="condition">
                            <ul>
                                    <li>
                                        <Link to={URL.ADMIN_NOTICE_CREATE} state={{bbsId: bbsId}} className="btn btn_blue_h46 pd35">조회</Link>
                                    </li>
                                    <li>
                                        <Link to={URL.ADMIN_NOTICE_CREATE} state={{bbsId: bbsId}} className="btn btn_blue_h46 pd35">등록</Link>
                                    </li>
                                    <li>
                                        <Link to={URL.ADMIN_NOTICE_CREATE} state={{bbsId: bbsId}} className="btn btn_blue_h46 pd35">수정</Link>
                                    </li>
                            </ul>
                        </div>
                        {/* <!--// 검색조건 --> */}

                        {/* <!-- 게시판목록 --> */}
                        <div className="board_list BRD002">
                            <div className="head">
                                <span>번호</span>
                                <span>제목</span>
                                <span>작성자</span>
                                <span>작성일</span>
                                <span>조회수</span>
                            </div>
                            <div className="result">
                                {listTag}
                            </div>
                        </div>
                        {/* <!--// 게시판목록 --> */}


                        {/* <!--// 본문 --> */}
                    </div>
                </div>
            </div>
        </div>
    );
}


export default WebfficeAdminMenuList;