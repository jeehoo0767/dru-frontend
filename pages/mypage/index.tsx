import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRecoilState } from 'recoil'
import { currentUserInfo } from 'store/userInfo'
import { useRouter } from 'next/router'
import API from 'service/api'
import PostsTable from 'components/PostsTable'
import Pagination from 'components/Pagination'
import { Container, Title } from 'common.styles'
import {
  FollowPostsSection,
  InfoSection,
  MyPageContainer,
  MyPostSection,
  TopSection,
} from 'styles/mypage/styles'
import ProfileCard from 'components/ProfileCard'
import FollowerTab from 'components/FollowerTab'
import InfoCard from 'components/InfoCard'
import { PostUserModel } from 'service/model/postModel'

interface IMypageProps {}

export default function Mypage(props: IMypageProps) {
  const router = useRouter()
  const [userInfo, setUserInfo] = useRecoilState(currentUserInfo)
  const [myPosts, setMyPosts] = useState([])
  const [total_cnt, setTotalCnt] = useState(0)
  const [current_page, setCurrentPage] = useState(1)
  const [current_profile, setCurrentProfile] = useState<PostUserModel>(
    {} as PostUserModel,
  )
  const [follow_posts, setFollowPosts] = useState([])
  const [current_page_f, setCurrentPageF] = useState(1)
  const [total_cnt_f, setTotalCntF] = useState(0)

  const getMyPosts = async () => {
    if (userInfo._id) {
      await API.posts
        .getMyPosts(userInfo._id, current_page, 10)
        .then((res) => {
          setTotalCnt(res.data.postTotalCnt)
          setMyPosts(res.data.data.post)
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }

  const getUserProfile = async () => {
    if (userInfo._id) {
      await API.user
        .getUserProfile(userInfo._id)
        .then((res) => {
          setCurrentProfile(res.data)
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }

  const getFollowPosts = async () => {
    await API.posts
      .getFollowPosts(current_page_f, 10)
      .then((res) => {
        setFollowPosts(res.data.data.post)
        setTotalCntF(res.data.postTotalCnt)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const onClickEditButton = () => {
    router.push('/infoForm')
  }

  useEffect(() => {
    getMyPosts()
    getUserProfile()
    getFollowPosts()
  }, [userInfo, current_page])

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [])

  return (
    <MyPageContainer>
      <Head>
        <title>Dr.u | 마이페이지</title>
      </Head>
      <Container>
        <TopSection>
          <ProfileCard
            nickname={userInfo.info.nickname}
            followerCnt={userInfo.followerIds.length}
            followingCnt={userInfo.followingIds.length}
            postsCnt={total_cnt}
          />
          <FollowerTab
            follow_ids={userInfo.followerIds}
            following_ids={userInfo.followingIds}
            followers={current_profile.followers}
            followings={current_profile.followings}
          />
        </TopSection>
        <InfoSection>
          <Title>내 정보</Title>
          <InfoCard
            name={userInfo.info.name}
            age={userInfo.info.age}
            gender={userInfo.info.gender}
            nickname={userInfo.info.nickname}
            bloodtype={userInfo.info.bloodtype}
            allergy={userInfo.info.allergy}
            medicines={userInfo.info.medicines}
          />
        </InfoSection>
        <MyPostSection>
          <PostsTable table_title="내 게시글" posts={myPosts} />
          <Pagination
            total_count={total_cnt}
            current_page={current_page}
            per_page={10}
            onChange={setCurrentPage}
            block={5}
          />
        </MyPostSection>
        <FollowPostsSection>
          <PostsTable table_title="팔로우 게시글" posts={follow_posts} />
          <Pagination
            total_count={total_cnt_f}
            current_page={current_page_f}
            per_page={10}
            onChange={setCurrentPageF}
            block={5}
          />
        </FollowPostsSection>
      </Container>
    </MyPageContainer>
  )
}
