import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Main from "./components/Main";
import Login from "./components/Login";
import Register from "./components/Register";
import MindStore from "./components/MindStore";
import MindSearch from "./components/MindSearch";
// import GoMind from "./components/MindMap/GoMind";
import Mind from "./components/MindMap/Mind";
import BrainStorming from "./components/BrainStorming";
import NodeSelect from "./components/NodeSelect";
import PatentResult from "./components/PatentResult";
import Header from "./components/Header";
/* icon */
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  fas,
  faHouse,
  faUser,
  faPlay,
  faRightFromBracket,
  faArrowRotateRight,
  faAngleLeft,
  faEye,
  faEyeSlash,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  fas,
  faHouse,
  faUser,
  faPlay,
  faRightFromBracket,
  faArrowRotateRight,
  faAngleLeft,
  faStar,
  faEye,
  faEyeSlash
);

/* App CSS */
const AppCSS = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  * {
    font-family: "Quicksand", sans-serif;
  }

  .Link {
    text-decoration: none;
    color: #000000;
  }

  .sidebar {
    position: fixed;
    top: 8vh;
    right: ${(props) => (props.sidebar ? 0 : -100)}vw;
    transition: ${(props) => (props.sidebar ? 0.3 : 0)}s;
    height: 92vh;
    background: #ffffff;
    width: 20vw;

    @media (max-width: 500px) {
      width: 80vw;
    }

    .menuList {
      width: 20vw;
      @media (max-width: 500px) {
        width: 80vw;
      }
      background: #ffffff;
    }

    .title {
      width: 20vw;
      @media (max-width: 500px) {
        width: 80vw;
      }
      padding: 2vh 0;
      text-align: center;
      font-size: 24px;
    }

    .menu {
      display: block;
      text-decoration: none;
      padding: 2vh 10%;
      width: 100%;
      font-size: 20px;
      font-weight: 700;
      cursor: pointer;
      color: #000000;
    }
  }

  .back {
    display: ${(props) => (props.sidebar ? "block" : "none")};
    position: fixed;
    width: 100vw;
    height: 92vh;
    top: 8vh;
    left: 0;
    background: #00000055;
    margin: 0;
  }
`;

function App() {
  const [size, setSize] = useState(
    window.innerHeight < 600 ? window.screen.availHeight : window.innerHeight
  );
  const [menuList1, setMenuList1] = useState([
    { name: "홈", link: "/" },
    { name: "브레인스토밍", link: "/?brainstorming" },
    { name: "저장소", link: "/mindstore" },
    { name: "검색", link: "/mindsearch" },
  ]);

  const [menuList2, setMenuList2] = useState([
    { name: "홈", link: "/" },
    { name: "로그인", link: "/login" },
    { name: "회원가입", link: "/register" },
  ]);

  const [sidebar, setSideBar] = useState(false);

  const [menuCss, setMenuCss] = useState({
    menu1: false,
    menu2: false,
    menu3: false,
    menu4: false,
    menu5: false,
    menu6: false,
  });

  useEffect(() => {
    window.addEventListener("resize", () => {
      setSize(
        window.innerHeight < 600
          ? window.screen.availHeight
          : window.innerHeight
      );
    });
  }, []);

  return (
    <AppCSS vh={size / 100} sidebar={sidebar}>
      <link rel="preconnect" href="https://fonts.googleapis.com"></link>
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      ></link>
      <link
        href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300&display=swap"
        rel="stylesheet"
      ></link>
      <BrowserRouter basename={"how-about-idea"}>
        <Header sidebar={sidebar} setSideBar={setSideBar} />
        <Routes>
          <Route path="/" exact={true} element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mindstore" element={<MindStore />} />
          <Route path="/mindsearch" element={<MindSearch />} />
          <Route path="/nodeselect" element={<NodeSelect />} />
          <Route path="/patentresult" element={<PatentResult />} />
          <Route path="/BrainStorming" element={<BrainStorming />} />
        </Routes>
        <div
          className="back"
          onClick={() => {
            setSideBar(false);
          }}
        ></div>

        <div className="sidebar">
          <p className="title">menu</p>

          <div className="menuList">
            {sessionStorage.getItem("howai_id") !== null && (
              <>
                {menuList1.map((e, idx) => {
                  return (
                    <Link
                      to={e.link}
                      key={idx}
                      className="menu"
                      onClick={() => {
                        setSideBar(false);
                      }}
                      onMouseOver={(e) => {
                        e.target.style.color = "#3CAEFF";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = "#000000";
                      }}
                      onTouchStart={(e) => {
                        e.target.style.color = "#3CAEFF";
                      }}
                      onTouchEnd={(e) => {
                        e.target.style.color = "#000000";
                      }}
                    >
                      {e.name}
                    </Link>
                  );
                })}

                <Link
                  to="/"
                  className="menu"
                  onClick={() => {
                    sessionStorage.removeItem("howai_id");
                    setSideBar(false);
                  }}
                  onMouseOver={(e) => {
                    e.target.style.color = "#EB5A5A";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "#000000";
                  }}
                  onTouchStart={(e) => {
                    e.target.style.color = "#EB5A5A";
                  }}
                  onTouchEnd={(e) => {
                    e.target.style.color = "#000000";
                  }}
                >
                  로그아웃
                </Link>
              </>
            )}

            {sessionStorage.getItem("howai_id") === null &&
              menuList2.map((e, idx) => {
                return (
                  <Link
                    to={e.link}
                    key={idx}
                    className="menu"
                    onClick={() => {
                      setSideBar(false);
                    }}
                    onMouseOver={(e) => {
                      e.target.style.color = "#3CAEFF";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = "#000000";
                    }}
                    onTouchStart={(e) => {
                      e.target.style.color = "#3CAEFF";
                    }}
                    onTouchEnd={(e) => {
                      e.target.style.color = "#000000";
                    }}
                  >
                    {e.name}
                  </Link>
                );
              })}
          </div>
        </div>
      </BrowserRouter>
    </AppCSS>
  );
}

export default App;
