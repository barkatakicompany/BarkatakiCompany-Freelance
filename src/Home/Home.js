import React from "react";
import { useEffect, useState } from "react";
import "./home.css";
import { loadCurrentDay } from "./helper/homeApis";
import Base from "../Base";
import { API } from "../backend";
import { getBanners } from "../helper/coreApiCalls";
import { getProducts } from "../Store/Product/helper/productHelper";
import dewalpanjikaimage from "./dewalpanjika.svg";
import bookstoreimage from "./bookstore.svg";
import printingimage from "./printing.svg";
import astroimage from "./astro.svg";
import shareMale from "./assets/shareMale.svg";
import shareFemale from "./assets/shareFemale.svg";
import announce from "./assets/announce.jpg";
import facebookLogo from "./assets/facebook.svg";
import instagramLogo from "./assets/instagram.svg";
import youtubeLogo from "./assets/youtube.svg";
import twitterLogo from "./assets/twitter.svg";
import { Redirect } from "react-router";
const Home = () => {
  const [day, setday] = useState({});
  const [month, setmonth] = useState({});
  const [banners, setBanners] = useState([]);
  const [bannersM, setBannersM] = useState([]);
  const [redirectTo, setRedirectTo] = useState(false)

  useEffect(() => {
    getBanners("home").then((res) => {
      if (!res.error) {
        setBanners(res);
      }
    });
    getBanners("home-m").then((res) => {
      if (!res.error) {
        setBannersM(res);
      }
    });
  }, []);

  const loadCarousel = () => {
    return (
      <div className="carousel" data-ride="carousel" data-interval="1500">
        {/* carousel items */}
        <div className="carousel-inner web-banner">
          {banners &&
            banners.map((b, i) => {
              return (
                <div
                  className={i === 0 ? "carousel-item active" : "carousel-item"}
                  key={i}
                >
                  <img
                    className="h-100 w-100"
                    src={`${API}/filesync?fileId=${b.fileId}`}
                    loading="lazy"
                    alt=""
                  />
                </div>
              );
            })}
        </div>

        {/* carousel items */}
        <div className="carousel-inner mobile-banner">
          {bannersM &&
            bannersM.map((b, i) => {
              return (
                <div
                  className={i === 0 ? "carousel-item active" : "carousel-item"}
                  key={i}
                >
                  <img
                    className="h-100 w-100"
                    src={`${API}/filesync?fileId=${b.fileId}`}
                    loading="lazy"
                    alt=""
                  />
                </div>
              );
            })}
        </div>
      </div>
    );
  };

  const loadRow0 = () => {
    return (
      <div className="row m-md-4 m-3 justify-content-center align-items-center">
        {/* day */}
        <div className="m-md-4 m-0 day-details comp-card">
          <div className="p-4 align-items-center justify-content-center w-100 h-100 comp-card-inside">
            <h3>আজি</h3>
            {day.tithi &&
              day.tithi.map((tith, i) => {
                return (
                  <h4 key={i} className=" text-center ">
                    {tith.tithi + " " + tith.asEndTime}
                  </h4>
                );
              })}
            <h4 className=" text-center ">{day.naks1}</h4>
            <h4 className=" text-center ">{day.naks2}</h4>
            <div className="row justify-content-around ">
              <div className="">
                <h4 className=" text-center">সুঃ উঃ {day.sRise}</h4>
              </div>

              <div className="justify-content-center">
                <h4 className=" text-center">সুঃ অঃ {day.sSet}</h4>
              </div>
            </div>
            <h1
              className="text-center display-4"
              style={{ fontWeight: "bolder" }}
            >
              {day.asDate && day.asDate + " " + month.asMonth}
            </h1>
            <div className="text-center h3">{day.muDate}</div>
            <h2 className="text-center" style={{ fontFamily: "Poppins" }}>
              {day.enDate && new Date(day.enDate).toDateString()}
            </h2>
          </div>
        </div>
      </div>
    );
  };

  const showAboutUs = () => {
    return (
      <div className="col container side-spacer">
        <h1 className="lobster text-center">
          It takes a lifetime to build a brand, <br />
          and another to learn to sustain.
        </h1>
        <p className="text-justify">
          Our story began in 1898. Back then we were a book supplier. Today we
          are privileged to be able to connect to more than a million
          subscribers through our Barkataki Company Dewal Panjika. We are also
          glad to share that we have been recognized for being the best
          publisher and printing organization thrice.
          <br />
          <br />
          We go to work everyday hoping to do two things: share our experiences
          with our friends and help make the world a better place to live. We
          have always believed in serving the best of services to our esteemed
          clientele. It’s our goal to adhere to the highest quality parameters,
          using ethical sources and practices to achieve our outputs.
          <br />
          <br />
          We DARE!! There are times when our buddy competitors have gone to
          great lengths to achieve the unachievable. We have continued our
          search to surpass them in many a manner possible pulling the bar even
          at a higher ground. The idea is to fulfill our dreams and aspirations
          whilst staying focused and maintaining the practical framework intact.
          <br />
          <br />
          We ACHIEVE!! There are a few who might think about the ‘other things’
          before taking a work at hand. For us, our patrons comes first, ALWAYS.
          After all, not everything comes first before profits.
          <br />
          We are now a full fledged offset printing house, a publisher, a book
          store and e-publisher.
        </p>
      </div>
    );
  };
  const loadCards = () => {
    return (
      <div className="side-spacer">
        <div className="row justify-content-center">
          <div className="row m-0 p-0">
            <div className="col-md-6 m-0 p-0">
              <div
                className="astro p-2 text-light"
                onClick={(e) => {
                  setRedirectTo("/astrology");
                }}
              >
                <img className="w-100" src={astroimage} alt="" />
                <div className="h4 m-0 p-0">Astrology</div>
                <div className="p m-0 p-0">Get your predictions</div>
              </div>
              <div
                className="store p-2"
                onClick={(e) => {
                  setRedirectTo("/store");
                }}
              >
                <img className="w-100 p-1" src={bookstoreimage} alt="" />
                <div className="h4 m-0 p-0">Book Store</div>
                <div className="p m-0 p-0">Comming soon</div>
              </div>
            </div>
            <div className="col-md-6 m-0 p-0">
              <div
                className="dewal-panjika p-2"
                onClick={(e) => {
                  setRedirectTo("/dewalpanjika");
                }}
              >
                <img className="w-100" src={dewalpanjikaimage} alt="" />
                <div className="h4 m-0 p-0">Dewal Panjika</div>
                <div className="p m-0 p-0">Available Now</div>
              </div>
              <div
                className="printing p-2"
                onClick={(e) => {
                  setRedirectTo("/printingsolution");
                }}
              >
                <img className="w-100" src={printingimage} alt="" />
                <div className="h4 m-0 p-0">Printing Solutions</div>
                <div className="p m-0 p-0">Enquire Now</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const loadNewsBytes = () => {
    return (
      <div className="side-spacer ">
        <div className="">
          <div className="row justify-content-between align-items-bottom">
            <div className="col-md-4 col-5">
              <img
                src={announce}
                alt=""
                className="w-100"
                style={{ position: "absolute", bottom: "0" }}
              />
            </div>
            <div className="col-md-8 col-7">
              <div className="row m-2 p-0 justify-content-center">
                <div className="col-md-6 m-0 embed-responsive embed-responsive-16by9">
                  <iframe
                    className="embed-responsive-item"
                    src="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Fnewsishan%2Fvideos%2F1286348948237392%2F&show_text=false&width=560"
                    scrolling="no"
                    frameborder="0"
                    allowfullscreen="true"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    allowFullScreen="true"
                  ></iframe>
                </div>
                <div className="col-md-6 m-0 embed-responsive embed-responsive-16by9">
                  <iframe
                    className="embed-responsive-item"
                    src="https://www.facebook.com/plugins/video.php?height=409&href=https%3A%2F%2Fwww.facebook.com%2F103551101127944%2Fvideos%2F741100119934737%2F&show_text=false&width=560"
                    scrolling="no"
                    frameborder="0"
                    allowfullscreen="true"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    allowFullScreen="true"
                  ></iframe>
                </div>
                <div className="col-md-6 m-0 embed-responsive embed-responsive-16by9">
                  <iframe
                    className="embed-responsive-item"
                    src="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Fbmcnewsassam%2Fvideos%2F654161645317621%2F&show_text=false&width=560"
                    scrolling="no"
                    frameborder="0"
                    allowfullscreen="true"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    allowFullScreen="true"
                  ></iframe>
                </div>
                {/* <div className="col-6 m-0">
                  <div
                    class="fb-post"
                    data-href="https://www.facebook.com/News18AssamNE/posts/1771406466583461"
                    data-width="300"
                    data-show-text="true"
                  >
                    <blockquote
                      cite="https://www.facebook.com/News18AssamNE/posts/1771406466583461"
                      class="fb-xfbml-parse-ignore"
                    >
                      <p>
                        নতুন বছৰত বৰ্ষচক্ৰ গণনা কৰিলেনে? মেটমৰা সম্ভাৰেৰে
                        ডিজিটেল ৰূপত &#039;বৰকটকী কোম্পানীৰ দেৱাল পঞ্জিকা&#039;
                      </p>
                      Posted by{" "}
                      <a href="https://www.facebook.com/News18AssamNE/">
                        News18 Assam &amp; NE
                      </a>{" "}
                      on&nbsp;
                      <a href="https://www.facebook.com/News18AssamNE/posts/1771406466583461">
                        Wednesday, 14 April 2021
                      </a>
                    </blockquote>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
          <h2 className="">Media Coverage</h2>
        </div>
      </div>
    );
  };

  return (
    <Base backgroundColor="#ffffff">
      {redirectTo && <Redirect to={redirectTo}/>}
      {loadCarousel()}
      {showAboutUs()}
      {loadCards()}
      <div className="socialmedia-home">
        <div className="side-spacer">
          <h2 className="text-center">Follow us on</h2>

          <div className="row justify-content-center">
            <div className="col-md-4">
              <div className="row">
                <div className="col px-4">
                  <a href="https://www.facebook.com/Barkataki-Company-983230688507601">
                    <img src={facebookLogo} alt="Facebook" />
                  </a>
                </div>
                <div className="col px-4">
                  <a href="https://www.instagram.com/barkataki_company/">
                    <img src={instagramLogo} alt="Instagram" />
                  </a>
                </div>
                <div className="col px-4">
                  <a href="https://twitter.com/BarkatakiC">
                    <img src={twitterLogo} alt="Twitter" />
                  </a>
                </div>
                <div className="col px-4">
                  <a href="https://www.youtube.com/channel/UCebsKgM-N78OB80uMMTf_DA">
                    <img src={youtubeLogo} alt="Youtube" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {loadNewsBytes()}
    </Base>
  );
};
export default Home;
