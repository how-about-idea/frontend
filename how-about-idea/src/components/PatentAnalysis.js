import React from "react";
import styled from "styled-components";
import HomeFooter from "./HomeFooter";
import paperImg from "../images/paper.png";
import lensImg from "../images/lens.png";
import paperlensImg from "../images/paperlens.png";
import ButtonFooter from "./ButtonFooter";

const PatentAnalysisCSS = styled.div`
  margin: 5vh auto 0 auto;
  text-align: center;
  font-family: "Quicksand", sans-serif;
  font-size: 15px;
  height: 800px;

  p {
    color: var(--color-main-blue);
    font-size: 30px;
    &.notice {
      margin-top: 15px;
    }
  }
  .gsentence {
    width: 370px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 5px solid var(--color-main-blue);
    border-radius: 20px;
    font-size: 20px;
    color: var(--color-main-blue);
    margin: 15px auto 0 auto;
    @media (max-width: 400px) {
      width: 90%;
    }
  }
  .analysisBox {
    position: relative;
  }
  img {
    &.paperlens {
      margin-top: 20px;
      margin-left: 30px;
    }
    &.paper {
      margin-top: 70px;
    }
    &.lens {
      position: absolute;
      top: 20px;
      right: 30px;
      z-index: 20;
    }
  }
`;

const PatentAnalysis = () => {
  return (
    <>
      <PatentAnalysisCSS>
        <p>특허청 분석 중</p>
        <div className="gsentence">날개 머시기 머시기 장치</div>

        <div className="analysisBox">
          <img src={paperlensImg} className="paperlens" alt="paperlens" />
          {/* <img src={paperImg} className="paper" alt="paper" /> */}
          {/* <img src={lensImg} className="lens" alt="lens" /> */}
        </div>
        <p className="notice">잠시만 기다려 주세요</p>
        <ButtonFooter nextPage="/patentresult" />
      </PatentAnalysisCSS>
      {/* <HomeFooter /> */}
    </>
  );
};

export default PatentAnalysis;
