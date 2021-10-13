import {CREATE_BOARD_PATH, CREATE_POST_PATH} from '@constants';
import {RootState} from '@modules';
import {getRecruitAndPostListAsync} from '@modules/board/actions';
import {PostPartial} from '@modules/board/types';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link as RouterLink} from 'react-router-dom';
import './sidebox.css';

function SideBox() {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const sideboxState = useSelector(
      (state: RootState) => state.Board.sideboxState);
  const loading = useSelector(
      (state: RootState) => state.Board.sideboxState.loading);
  useEffect(() => {
    dispatch(getRecruitAndPostListAsync.request());
  }, []);

  const renderRecruitAndPollList = () => {
    if (sideboxState.data && sideboxState.data.posts) {
      return sideboxState.data.posts.map((post: PostPartial) => {
        return (
          <div className="post link">
            <RouterLink style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
            }}
            to={`/board/post/${post.id}`}
            >
              <div>
                {post.title}
              </div>
              <div>
                {post.currentCount}/{post.totalMember}
              </div>
            </RouterLink>
          </div>
        );
      });
    }
  };

  const adminMenu = () => {
    return (
      <div className="box link">
        <div className="head">
          <RouterLink to={CREATE_BOARD_PATH} className="head">
            <img src="/img/board/boardicon.png"/>
            <span className = "title">게시판 생성하기</span>
          </RouterLink>
        </div>
      </div>
    );
  };

  return (
    <div id="BoardSideBox" className='
      hidden lg:block w-72 ml-4
      min-h-full flex-col
    '>
      {user.session && user.session.role.name == 'ADMIN' ? adminMenu() : ''}
      <div className="box link">
        <div className="head">
          <RouterLink to={CREATE_POST_PATH} className="head">
            <img src="/img/board/posticon.png"/>
            <span className = "title">게시글 작성하기</span>
          </RouterLink>
        </div>
      </div>
      <div className="box">
        <div className="head">
          <img src="/img/board/staricon.png"/>
          <span className = "title">게시판 즐겨찾기</span>
        </div>
      </div>
      <div className="box">
        <div className="head">
          <img src="/img/board/scheduleicon.png"/>
          <span className = "title">일정 알림</span>
        </div>
      </div>
      <div className="box">
        <div className="head">
          <img src="/img/board/recruiticon.png"/>
          <span className = "title">최근 모집 게시글</span>
        </div>
        <div>
          {!loading ? renderRecruitAndPollList() :
            'loading...'
          }
        </div>
      </div>
    </div>
  );
}

export default SideBox;
