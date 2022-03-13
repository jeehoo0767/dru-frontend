import * as React from "react";
import {
  Descript,
  FooterContainer,
  InfoCardContainer,
  SnsContainer,
} from "./styles";
import logo from "../assets/img/flogo.svg";
import github from "../assets/img/github.svg";
import insta from "../assets/img/insta.svg";
import { Container } from "common.styles";

interface IFooterProps {}
interface IInfoCardProps {
  name: String;
  githubName: String;
  instaName: String;
}

const InfoCard = ({ name, githubName, instaName }: IInfoCardProps) => (
  <InfoCardContainer>
    <h2 className="name">Info.{name}</h2>
    <div className="snsIconContainer">
      <a
        href={`https://github.com/${githubName}`}
        target="_blank"
        rel="noreferrer"
      >
        <img src={github.src} alt="github icon" />
      </a>
      <a
        href={`https://www.instagram.com/${instaName}/`}
        target="_blank"
        rel="noreferrer"
      >
        <img src={insta.src} alt="instagram icon" />
      </a>
    </div>
  </InfoCardContainer>
);

export default function Footer(props: IFooterProps) {
  return (
    <FooterContainer>
      <Container>
        <img className="logo" src={logo.src} alt="logo" />
        <Descript>Contributor | 이성범 김지현 박지후</Descript>
        <Descript>
          Generated by | React.js, Node.js, MongoDB, Koa.js, Express.js
        </Descript>
        <Descript>
          Copyrightⓒ2021 What is Your Disease All rights reserved.
        </Descript>
        <SnsContainer>
          <InfoCard
            name="이성범"
            githubName="SeongBeom27"
            instaName="seong_bm"
          />
          <InfoCard name="김지현" githubName="jkim68888" instaName="hyunn383" />
          <InfoCard name="박지후" githubName="jeehoo0767" instaName="wln__n" />
        </SnsContainer>
      </Container>
    </FooterContainer>
  );
}
