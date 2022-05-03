import React, { useEffect, useState } from "react";
import Base from "../Base";
import "./style.css";
import DatePicker from "react-datepicker";
import { numberOnly } from "../utils";
import { saveAstroRequest } from "./helper/astroHelper";
import { generateOtp, isAuthenticated, verifyOtp } from "../User/helper/auth";
import { updatePaymentStatusAstro } from "./helper/astroHelper";
import { Link } from "react-router-dom";
import pageBackground from "./star-background.svg";
import moon from "./moon.svg";
import ganesha from "./ganesha.svg";
import telescope from "./telescope.svg";
import chakra from "./chakra.svg";
import { getRashifalData } from "./rashifalData.js";
import { PAYMENT_KEY } from "../backend";
const Astrology = () => {
  document.getElementsByClassName("ganesha");
  const [userDetails, setUserDetails] = useState({
    mobile: isAuthenticated() ? isAuthenticated().mobile : "",
    email: isAuthenticated() ? isAuthenticated().email : "",
    user: isAuthenticated() ? isAuthenticated().id : "",
    fname: "",
    lname: "",
    dob: "",
    pob: "",
    gender: "",
  });
  const DateCustomInput = ({ value, onClick }) => (
    <input
      type="text"
      className="form-control "
      placeholder="Date of Birth"
      onClick={onClick}
      value={value}
    />
  );
  const startPayment = (order, e) => {
    var options = {
      key: PAYMENT_KEY, // Enter the Key ID generated from the Dashboard
      order_id: order.razorpayOrderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      prefill: {
        name: userDetails.fname + " " + userDetails.lname,
        email: userDetails.email,
        contact: userDetails.mobile,
      },
      handler: function (response) {
        updatePaymentStatusAstro(response, order._id).then((res) => {
          if (res.error) {
            //show error
            console.log(res);
          } else {
            alert(
              "Order placed successfully. Please wait for 2 working days for your report to be delivered. Your payment id is #" +
                res.paymentId.replace("pay_", "") +
                ". Please keep screenshot of this."
            );
            window.location.reload();
          }
        });
      },
      modal: {
        ondismiss: function () {
          window.location.reload();
        },
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
    e.preventDefault();
  };
  var loadForm = () => {
    return (
      <div className="col astro-form container-fluid">
        <div className="row justify-content-between">
          <div className="col-md-2 col-6 moon">
            <img src={moon} alt="" className="w-100 p-3 floating" />
          </div>
          <div className="col-md-2 col-6 ganesha">
            <img src={ganesha} alt="" className="w-100" />
          </div>
        </div>
        <div className="row justify-content-center main-form">
          <div className="col-md-7 ">
            <div className="text-center">
              <h1 className="kalpurush">জানক আপোনাৰ</h1>
              <h5 className="kalpurush display-">
                ৰাশিফল | ভাগ্যফল | পুৰ্বাভাষ
              </h5>
            </div>
            <div className=" row  justify-content-center align-items-center ">
              <div className="col-md-7">
                <div className="col m-0 container-fluid">
                  <div>
                    <div className="input-group mb-2">
                      <input
                        id="email"
                        type="text"
                        placeholder="Email"
                        className="form-control"
                        value={userDetails.email}
                        disabled={isAuthenticated().email}
                        onChange={(e) => {
                          setUserDetails({
                            ...userDetails,
                            email: e.target.value,
                          });
                        }}
                      />
                    </div>

                    <div className="input-group mb-2">
                      <input
                        id="mobile"
                        type="text"
                        placeholder="Mobile"
                        className="form-control"
                        value={userDetails.mobile}
                        disabled={isAuthenticated().mobile}
                        onInput={(e) => {
                          numberOnly(e);
                          if (e.target.value.length > 10) {
                            e.target.value = e.target.value.substring(0, 10);
                          }
                        }}
                        onChange={(e) => {
                          setUserDetails({
                            ...userDetails,
                            mobile: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="row m-0 p-0 ">
                      <div className="col m-0 p-0 mr-1">
                        <div className="input-group mb-2">
                          <input
                            id="fname"
                            type="text"
                            placeholder="First Name"
                            className="form-control"
                            value={userDetails.fname}
                            onChange={(e) => {
                              setUserDetails({
                                ...userDetails,
                                fname: e.target.value,
                              });
                            }}
                          />
                        </div>
                      </div>
                      <div className="col m-0 p-0 ml-1">
                        <div className="input-group mb-2">
                          <input
                            id="lname"
                            type="text"
                            placeholder="Last Name"
                            className="form-control"
                            value={userDetails.lname}
                            onChange={(e) => {
                              setUserDetails({
                                ...userDetails,
                                lname: e.target.value,
                              });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="input-group mb-2">
                      <select
                        id="gender"
                        className="input-group-prepend custom-select"
                        onChange={(e) => {
                          setUserDetails({
                            ...userDetails,
                            gender: e.target.value,
                          });
                        }}
                      >
                        <option disabled selected value="">
                          Select Gender
                        </option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                    {/* <div className="input-group mb-2">
                      <DatePicker
                        className=""
                        id="dob"
                        name="dob"
                        timeInputLabel="Time of Birth:"
                        dateFormat="dd/MM/yyyy h:mm aa"
                        showTimeInput
                        isClearable
                        shouldCloseOnSelect={false}
                        closeOnScroll={true}
                        selected={
                          userDetails.dob ? new Date(userDetails.dob) : null
                        }
                        onChange={(date) =>
                          setUserDetails({ ...userDetails, dob: date })
                        }
                        customInput={<DateCustomInput />}
                      />
                    </div> */}
                    <p className="m-0 mt-1 p-0">Birth Details</p>
                    <div className="row m-0 p-0">
                      <div className="col m-0 p-0 mr-1 ">
                        <div className="input-group mb-2">
                          <input
                            id="uyob"
                            type="number"
                            class="form-control"
                            placeholder="Year"
                          ></input>
                        </div>
                      </div>
                      <div className="col m-0 p-0 mr-1 ml-1">
                        <div className="input-group mb-2">
                          <input
                            id="umob"
                            type="number"
                            class="form-control"
                            placeholder="Month"
                          ></input>
                        </div>
                      </div>
                      <div className="col m-0 p-0 ml-1 ">
                        <div className="input-group mb-2">
                          <input
                            id="udob"
                            type="number"
                            class="form-control"
                            placeholder="Date"
                          ></input>
                        </div>
                      </div>
                    </div>
                    <div className="row m-0 p-0">
                      <div className="col m-0 p-0 mr-1">
                        <div className="input-group mb-2">
                          <input
                            id="uhob"
                            type="number"
                            class="form-control"
                            placeholder="Hours"
                          ></input>
                        </div>
                      </div>
                      <div className="col m-0 p-0 mr-1 ml-1">
                        <div className="input-group mb-2">
                          <input
                            id="umuob"
                            type="number"
                            class="form-control"
                            placeholder="Minutes"
                          ></input>
                        </div>
                      </div>
                      <div className="col m-0 p-0 ml-1">
                        <div className="input-group mb-2">
                          <select id="uaob" className="custom-select">
                            <option value="AM">AM</option>
                            <option value="PM">PM</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="input-group mb-2">
                      <input
                        id="pob"
                        type="text"
                        placeholder="Place"
                        className="form-control"
                        value={userDetails.pob}
                        onChange={(e) => {
                          setUserDetails({
                            ...userDetails,
                            pob: e.target.value,
                          });
                        }}
                      />
                    </div>

                    <div
                      id="confirmModalButton"
                      className="d-none"
                      data-toggle="modal"
                      data-target="#confirmModal"
                    ></div>

                    <center>
                      <div
                        className="button"
                        onClick={(e) => {
                          var Y = document.getElementById("uyob").value;
                          var M = document.getElementById("umob").value;
                          var D = document.getElementById("udob").value;
                          var H = document.getElementById("uhob").value;
                          var MU = document.getElementById("umuob").value;
                          var A = document.getElementById("uaob").value == "AM";
                          if (
                            !userDetails.email.match(
                              "^[\\w-\\.+]*[\\w-\\.]\\@([\\w]+\\.)+[\\w]+[\\w]$"
                            )
                          ) {
                            alert("Please enter a valid email.");
                            return;
                          } else if (!userDetails.fname) {
                            alert("Please enter first name.");
                            return;
                          } else if (!userDetails.lname) {
                            alert("Please enter last name.");
                            return;
                          } else if (!userDetails.gender) {
                            alert("Please select your gender.");
                            return;
                          } else if (
                            parseInt(Y) > new Date().getFullYear() ||
                            !Y
                          ) {
                            alert("Please enter valid year.");
                            return;
                          } else if (parseInt(Y) < 1901) {
                            alert("Year cannot be less than 1901.");
                          } else if (
                            parseInt(M) > 12 ||
                            parseInt(M) < 1 ||
                            !M
                          ) {
                            alert("Please enter valid month.");
                            return;
                          } else if (
                            parseInt(D) > 31 ||
                            parseInt(D) < 1 ||
                            !D
                          ) {
                            alert("Please enter valid date.");
                            return;
                          } else if (
                            parseInt(H) > 12 ||
                            parseInt(H) < 1 ||
                            !H
                          ) {
                            alert("Please enter valid hours.");
                            return;
                          } else if (
                            parseInt(MU) > 59 ||
                            parseInt(MU) < 0 ||
                            !MU
                          ) {
                            alert("Please enter valid minutes.");
                            return;
                          } else if (!userDetails.pob) {
                            alert("Please enter place of birth.");
                            return;
                          } else {
                            var birthDate = new Date(
                              Y,
                              M - 1,
                              D,
                              A
                                ? A && H == "12"
                                  ? 0
                                  : H
                                : !A && H == "12"
                                ? H
                                : 12 + parseInt(H),
                              MU
                            );
                            setUserDetails({ ...userDetails, dob: birthDate });
                            document
                              .getElementById("confirmModalButton")
                              .click();
                          }
                        }}
                      >
                        Continue
                      </div>
                    </center>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-end telescope">
          <img src={telescope} alt="" className="" />
        </div>
      </div>
    );
  };
  var loadChatSection = () => {
    return (
      <div className="side-spacer row justify-content-center align-items-center">
        <div className="col-md p-4">
          <img src={chakra} alt="" className="m-4 rotation" />
        </div>
        <div className="col-md p-4">
          <h1>92 years of experience.</h1>
          <p>
            We have a mere 92 year old Astrological experience in the form of
            the Barkataki Dewal Panjika, one of the oldest in India, practising
            both Indian Astrology, Kundali Bisleshan with simple and home
            remedies. We provide exclusive consultation according to your
            horoscope by analysing your birth chart, astrology sign, zodiac
            sign, lagna calculation, vaastu analysis, and many more.
          </p>
          <center>
            <div
              className="button p-3 m-2"
              onClick={() => {
                window.location = "whatsapp://send?phone=+91-9435009691";
              }}
            >
              Chat Now
            </div>
          </center>
        </div>
      </div>
    );
  };
  var knowYourPlanets = () => {
    return (
      <div className="side-spacer">
        <div className="col container-fluid m-0 p-4 text-center">
          <h1>Let's know your Planets</h1>
          <h1 className="kalpurush">আপোনাৰ গ্ৰহৰ বিষয়ে অলপ</h1>
          <div className="knowyourplanets row m-0 p-2 justify-content-center">
            <div className="col-md-4 px-4">
              <img className="w-100" src="/planets/sun.png" alt="" />
              <p>Sun</p>
              <p className="desc">
                The planet is known as the King of Celestial Cabinet. It is the
                hottest planet among all. It indicates the Government or
                Authoritative position in the society. It represents our
                &quot;Soul&quot; and &quot;Father&quot;. It provides the energy
                to all the planets. It illuminates the whole world through its
                brightness. It rules over &quot;Leo&quot; sign and gets exalted
                in “Aries”.
              </p>
            </div>
            <div className="col-md-4 px-4">
              <img className="w-100 " src="/planets/moon.png" alt="" />
              <p>Moon</p>
              <p className="desc">
                It is considered to be an important planet among all as it
                represents &quot;Mind&quot; of a person. It is also known as
                &quot;Queen&quot; of Celestial Cabinet. It represents our
                &quot;Mother&quot; in astrology. When Moon is directly opposite
                to the Sun in one’s birthchart, then it forms a good Yoga as
                Sun’s rays illuminate the energy of the planet Moon. Moon
                governs to the &quot;Cancer&quot; sign and gets exalted in
                “Taurus”.
              </p>
            </div>
            <div className="col-md-4 px-4">
              <img className="w-100 " src="/planets/mercury.png" alt="" />
              <p>Mercury</p>
              <p className="desc">
                This planet reflects the quality of &quot;Prince&quot;. Mercury
                is a planet which indicates the logical ability or calculative
                ability of a person. It deals with Mathematics and is a provider
                of the knowledge of &quot;Astrology&quot;. Since it is very
                close to the Sun, it is also called a &quot;Messenger of
                God&quot; and deals with our communicative ability. It
                represents our siblings and day to day activities and
                expressions. It rules over “Gemini” and “Virgo” and gets exalted
                in “Virgo” sign.
              </p>
            </div>
            {/* </div>
        <div className="knowyourplanets row m-0 p-2 justify-content-center align-items-end"> */}
            <div className="col-md-4 px-4">
              <img className="w-100 " src="/planets/venus.png" alt="" />
              <p>Venus </p>
              <p className="desc">
                This is the planet which everyone seeks for and it acts as a
                &quot;Princess&quot; in the Celestial Cabinet. Venus indicates
                love, romance, beauty and any kind of relations in one’s life.
                It also represents the wife, the girlfriend or any girl in Men’s
                Birth Chart. It is the Karaka planet for marriage too. It
                represents the monetary value or finances of a person. It rules
                over &quot;Taurus&quot; and &quot;Libra&quot; and gets exalted
                in &quot;Pisces&quot; sign.
              </p>
            </div>
            <div className="col-md-4 px-4">
              <img className="w-100 " src="/planets/mars.png" alt="" />
              <p>Mars</p>
              <p className="desc">
                It is a Commander In Chief or Soldier of Celestial Cabinet. It
                shows our fighting ability and aggression. It provides us
                courage to tackle any situation. It is always in
                &quot;Hurry&quot; and ready to fight. It shows the &quot;quick
                respond&quot; or &quot;activeness&quot; of a person. It is a
                karaka planet of your younger sibling.. It rules over
                &quot;Aries&quot; and &quot;Scorpio&quot; and gets exalted in
                “Capricorn” sign.
              </p>
            </div>
            <div className="col-md-4 px-4">
              <img className="w-100 " src="/planets/jupiter.png" alt="" />
              <p>Jupiter</p>
              <p className="desc">
                It is the &quot;King’s Minister&quot; in the Celestial Cabinet.
                It represents the Wisdom of a person. It also represents the
                &quot;Gurus&quot; or &quot;Teachers&quot; which are running into
                our life. It represents the &quot;Husband&quot; in woman’s
                chart. It is a religious and most benefic planet. It represents
                children and family of a person. It rules over “Sagittarius” and
                &quot;Pisces&quot; and gets exalted in &quot;Cancer&quot; Zodiac
                sign.
              </p>
            </div>
            {/* </div>
        <div className="knowyourplanets row m-0 p-2 justify-content-center align-items-end"> */}
            <div className="col-md-4 px-4">
              <img className="w-100 " src="/planets/saturn.png" alt="" />
              <p>Saturn</p>
              <p className="desc">
                It is &quot; Servant&quot; of the Celestial Cabinet. It
                represents the masses or public. It is the planet which is known
                for its judgment. It judges you according to your Karma
                performed during birth and gives you grades accordingly. It’s a
                very slow planet and takes time to provide you results. It shows
                the &quot;Patience&quot; of a person. It is all about delaying
                the things. It gets exalted in &quot;Libra&quot; and debilitated
                in &quot;Aries&quot;. It rules over “Capricorn” and “Aquarius”
                signs.
              </p>
            </div>
            <div className="col-md-4 px-4">
              <img className="w-100 " src="/planets/rahu.png" alt="" />
              <p>Rahu</p>
              <p className="desc">
                Though it is not a planet, it is basically a North node of a
                planet Moon. It is also known as &quot;Chhaya Grah&quot; in
                Vedic Astrology. It has only Head of the Demon. Rahu is always
                curious about the &quot;Worldly Fame&quot;. It always runs after
                the materialistic things. It is commonly known as
                &quot;Shanivrat Rahu&quot;, that means it behaves like a planet
                &quot;Saturn&quot;. Since it’s bodiless planet so it always
                wants more and more and never be satisfied with one thing at
                every aspect of one’s life. It is assumed that it gets exalted
                in &quot;Taurus” and “Gemini&quot; signs and debilitated in
                &quot;Scorpio” and “Sagittarius&quot; signs. There is no
                specific sign for Rahu as it behaves like the sign or planet in
                which it sits.
              </p>
            </div>
            <div className="col-md-4 px-4">
              <img className="w-100 " src="/planets/ketu.png" alt="" />
              <p>Ketu</p>
              <p className="desc">
                It is again not a Planet, It is commonly known as South Node of
                planet Moon. It’s a tail of Demon. It is also a &quot;Chhaya
                Grah&quot; like Rahu. It doesn’t have interest in worldly fame
                and desires. It is just opposite to Rahu. It’s a very spiritual
                planet which seeks only for enlightenment. It is all about
                separation from materialistic things. It’s a headless planet.
                Only Ketu is the planet considered for Moksha in this life. It
                reflects our past life karmas, Sanchit Karma etc. It is believed
                that Ketu behaves like Planet &quot;Mars&quot;. It gets exalted
                in &quot;Scorpio” and “Sagittarius&quot; signs and debilitated
                in &quot;Taurus” and “Gemini&quot; signs.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  var rashifals = () => {
    return (
      <div className="side-spacer">
        <h1 className="text-center">Let's know your Rashi.</h1>
        <h1 className="kalpurush text-center">আপোনাৰ ৰাশিৰ বিষয়ে অলপ</h1>
        <div className="row justify-content-center align-items-center text-center">
          {getRashifalData().rashifals.map((rashifal, i) => {
            return (
              <div className="col-md col-3 my-1">
                <a href="#rashifal" data-slide-to={i} className="text-light">
                  <img
                    src={"/rashifals/" + rashifal.imageUrl}
                    alt=""
                    className="w-100 nav-rashi"
                  />
                  <p className="m-0 p-0">{rashifal.name}</p>
                  <p className="kalpurush m-0 p-0">{rashifal.asName}</p>
                </a>
              </div>
            );
          })}
        </div>
        <div
          id="rashifal"
          className=" carousel slide"
          data-ride="carousel"
          data-interval="false"
        >
          <div class="carousel-inner">
            {getRashifalData().rashifals.map((rashifal, i) => {
              return (
                <div className={"carousel-item " + (i == 0 ? "active" : "")}>
                  <div className="">
                    <div className="text-center">
                      <h1 className="pt-1 ">
                        {rashifal.name} (
                        <span className="kalpurush">{rashifal.asName}</span>)
                      </h1>
                      {/* <img
                        src={"/rashifals/" + rashifal.imageUrl}
                        alt=""
                        className="body-rashi"
                      /> */}
                    </div>
                    <h3>Physical Appearence</h3>
                    <p>{rashifal.physicalAppearence}</p>
                    <br />
                    <h3>Mental Tendencies</h3>
                    <p>{rashifal.mentalTendencies}</p>
                    <br />
                    <h3>Personality</h3>
                    <p>{rashifal.personality}</p>
                    <br />
                    <h3>Weakness</h3>
                    <p>{rashifal.weakness}</p>
                    <br />
                    <h3>Health and Diseases</h3>
                    <p>{rashifal.health}</p>
                    <br />
                    <h3>Cautions</h3>
                    <p>{rashifal.cautions}</p>
                    <br />
                    <h3>Finance and Fortune</h3>
                    <p>{rashifal.finances}</p>
                    <br />
                    <h3>Love & Marriage</h3>
                    <p>{rashifal.loveAndMarriage}</p>
                    <br />
                    <h3>Husbands</h3>
                    <p>{rashifal.husbands}</p>
                    <br />
                    <h3>Ladies</h3>
                    <p>{rashifal.ladies}</p>
                    <br />
                    <h3>Children</h3>
                    <p>{rashifal.children}</p>
                    <br />
                    <h3>Friends</h3>
                    <p>{rashifal.friends}</p>
                    <br />
                    <h3>Ideal Match</h3>
                    <p>{rashifal.idealMatch}</p>
                    <br />
                    <h3>Domestic Environment</h3>
                    <p>{rashifal.domesticEnviornments}</p>
                    <br />
                    <h3>Professions</h3>
                    <p>{rashifal.professions}</p>
                    <br />
                    <h3>Lucky</h3>
                    <p>{rashifal.lucky}</p>
                    <br />
                    <h3>Traits to be Corrected</h3>
                    <p>{rashifal.traits}</p>
                    <br />
                    <h3>Gemstone</h3>
                    <p>{rashifal.gemstoneWarning}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };
  return (
    <Base
      backgroundStyle={{
        backgroundColor: "#0D0014",
        color: "#ffffff",
        backgroundImage: `url(${pageBackground})`,
      }}
    >
      <div className="m-0 p-0 ">
        <div className="col main-background">
          {loadForm()}
          {loadChatSection()}
          {knowYourPlanets()}
          {rashifals()}
        </div>
      </div>

      <div class="modal fade text-dark" id="confirmModal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h3>Confirm Your Details</h3>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body p-4">
              <div className="col">
                <div className="row">
                  <div className="col-md h5 m-0 p-0">Name:</div>
                  <div className="col-md p m-0 p-0">
                    {userDetails.fname + " " + userDetails.lname}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md h5 m-0 p-0">Mobile:</div>
                  <div className="col-md p m-0 p-0">{userDetails.mobile}</div>
                </div>
                <div className="row">
                  <div className="col-md h5 m-0 p-0">Email:</div>
                  <div className="col-md p m-0 p-0">{userDetails.email}</div>
                </div>
                <div className="row">
                  <div className="col-md h5 m-0 p-0">
                    Date and Time of Birth:
                  </div>
                  <div className="col-md p m-0 p-0">
                    {new Date(userDetails.dob).toLocaleString()}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md h5 m-0 p-0">Place of Birth:</div>
                  <div className="col-md p m-0 p-0">{userDetails.pob}</div>
                </div>
                <div className="row">
                  <div className="col-md h5 m-0 p-0">Gender:</div>
                  <div className="col-md p m-0 p-0">{userDetails.gender}</div>
                </div>
                <div className="row">
                  <div className="col-md h5 m-0 p-0">Amount:</div>
                  <div className="col-md p m-0 p-0">₹ 151.00/-</div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <div className="row align-items-center">
                <div className="col-1">
                  <input
                    className="m-2 "
                    id="tncCheck"
                    type="checkbox"
                    aria-label="Checkbox for following text input"
                  />
                </div>
                <div className="col">
                  <p className="m-2 p-0">
                    I, agree to
                    <Link to="/termsandconditions">
                      <strong> Terms & Conditions </strong>
                    </Link>
                    and
                    <Link to="/privacypolicy">
                      <strong> Privacy Policy </strong>
                    </Link>
                    .
                  </p>
                </div>
              </div>
              <div
                class="button"
                onClick={(e) => {
                  if (userDetails.mobile && userDetails.mobile.length != 10) {
                    alert("Enter a valid mobile number.");
                    return;
                  }
                  if (!document.getElementById("tncCheck").checked) {
                    alert(
                      "Please agree to Terms & Conditions and Privacy Policy"
                    );
                    return;
                  }
                  if (
                    userDetails.email.match(
                      "^[\\w-\\.+]*[\\w-\\.]\\@([\\w]+\\.)+[\\w]+[\\w]$"
                    )
                  ) {
                    saveAstroRequest(userDetails).then((res) => {
                      if (res.razorpayOrderId) {
                        startPayment(res, e);
                      } else {
                        alert("Please Try Again");
                      }
                    });
                  } else {
                    alert("Enter valid email.");
                  }
                }}
              >
                Proceed to pay
              </div>
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
};
export default Astrology;
