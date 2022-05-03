import React from "react";
import Base from "../Base";
import "./PrintingSolution.css";
import image from "./printer.svg"

var PrintingSolution = () => {
  return (
    <Base
      backgroundStyle={{
        backgroundImage: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        color: "#000000",
      }}
    >
      <div className="col">
        <div className="side-spacer">
          <div className="col justify-content-center align-items-center">
            <div className="row text-center">
              <div className="col-md-10 col-12">
                <img src={image} alt="" className="w-100" />
              </div>
              <div className="col enquire-box">
                <p className=" text-center h5 p-0">
                  In case you're searching for a top-quality custom printer with
                  cordial, gifted experts, look no further. We'll work with you
                  at all times of our relentless duty to surpass your desires.
                </p>
                <div
                  className="button p-3 m-2"
                  onClick={() => {
                    window.location = "whatsapp://send?phone=+91-9435009691";
                  }}
                >
                  Enquire Now
                </div>
              </div>
            </div>
            <div className="row justify-content-center align-items-center border bg-white rounded shadow p-2">
              <div className="col">
                <img src="P002.jpeg" className="w-100 h-100" alt="" />
              </div>
              <div className="col">
                <img src="P004.jpeg" className="w-100 h-100" alt="" />
              </div>
              <div className="col">
                <img src="P005.jpeg" className="w-100 h-100" alt="" />
              </div>
              <div className="col">
                <img src="P003.jpeg" className="w-100 h-100" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="row container-fluid m-0 side-spacer justify-content-center align-items-center ">
          <p className=" text-justify">
            Barkataki Company, an arrangements driven realistic correspondences
            organization with a background marked by progress associating brands
            with customers. While a few organizations essentially give items,
            ABC gives coordinated arrangements that convey your message, change
            discernments and drive deals. Consider us your full-administration
            inventive office without the organization expenses. <br />
            Regardless of whether you are executing a representative motivation
            program, planning an immediate showcasing effort or producing buzz
            for a forthcoming occasion, ABC utilizes innovativeness and
            development to interface you with your crowd. Each task is a chance
            to investigate, with our customers, the boundless prospects and
            potential this joint effort brings. Permit us to have a quantifiable
            effect for your promoting correspondences. <br />
            We are a premier, one-stop custom print and promo shop proudly
            serving the Chicago area and beyond for over 50 years. <br />
            From large format digital to direct mailers to custom packaging and
            promotional products, our print, promo, and packaging experts are
            ready to turn your project into a thing of beauty.
          </p>

          <h4 className="text-center">
            <strong>
              <i>Your brainchild is our motivation.</i>
            </strong>
          </h4>
          <p className=" text-justify">
            Let us consolidate our printing and advertising aptitude with the
            administration important to take your task from idea to finish.
            Business cards to leaflets, inventories and promotion, we'll convey
            what you need, on schedule.
          </p>
        </div>
        <div className="row container-fluid m-0 side-spacer justify-content-center w-100 h-100 ">
          <div className="col-lg-3 border bg-white rounded shadow m-4 p-4 h-100 w-100">
            <h5 className="text-center">High Quality Printing</h5>
            <img src="/HQP.jpeg" className="w-100 h-100 zoom-1" alt="" />
          </div>
          <div className="col-lg-3 border bg-white rounded shadow m-4 p-4 h-100 w-100">
            <h5 className="text-center">Promotional Products</h5>
            <img src="/PP.jpg" className="w-100 h-100 zoom-1" alt="" />
          </div>
          <div className="col-lg-3 border bg-white rounded shadow m-4 p-4 h-100 w-100">
            <h5 className="text-center">Brochures</h5>
            <img src="/BROCHURES.jpg" className="w-100 h-100 zoom-1" alt="" />
          </div>
        </div>
        <div className="row container-fluid m-0 side-spacer justify-content-center w-100 h-100">
          <div className="col-lg-3 border bg-white rounded shadow m-4 p-4 h-100 w-100">
            <h5 className="text-center">Catalogue</h5>
            <img src="/CATALOGUE.jpg" className="w-100 h-100 zoom-1" alt="" />
          </div>
          <div className="col-lg-3 border bg-white rounded shadow m-4 p-4 h-100 w-100">
            <h5 className="text-center">Business Forms</h5>
            <img src="/BF.jpg" className="w-100 h-100 zoom-1" alt="" />
          </div>
          <div className="col-lg-3 border bg-white rounded shadow m-4 p-4 h-100 w-100">
            <h5 className="text-center">Letter Head</h5>
            <img src="/LETTER.png" className="w-100 h-100 zoom-1" alt="" />
          </div>
        </div>
        <div className="col container-fluid m-0 side-spacer justify-content-center align-items-center  text-justify">
          <h2>Equipments</h2>
          <p>
            We utilize the most current technology in the printing industry. Our
            state-of-the-art equipment allows us to provide high-quality
            products on time and on budget. <br />
            We realize that most people aren't interested in which offset press
            model or digital equipment we use. Still, we can't help being proud
            of our toys.
          </p>
          <div className="row  m-0 p-0 justify-content-center align-items-center ">
            <div className=" p-0 text-left">
              <h4>We offer the finest in:</h4>
              <div>
                <p>
                  Design, from simple brochures, logo design, to full marketing
                  programs.
                </p>
                <p>
                  Digital Print, short run sheet printing and multi-page books.
                </p>
                <p>
                  Large Format Digital, We print full process and spot color
                  images on many substrates in both large or small quantities.
                </p>
                <p>
                  Printing, offset lithography, sheet fed and full web
                  capabilities.
                </p>
                <p>
                  Finishing, folding, die cutting, perfect binding, and more.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row container-fluid m-0 side-spacer justify-content-center w-100 h-100">
          <div className="col-lg-3 border bg-white rounded shadow m-4 p-4 h-100 w-100">
            <h5 className="text-center">Banners</h5>
            <img src="BANNERS.jpeg" className="w-100 h-100 zoom-1" alt="" />
          </div>
          <div className="col-lg-3 border bg-white rounded shadow m-4 p-4 h-100 w-100">
            <h5 className="text-center">Envelopes</h5>
            <img src="/ENVELOPES.jpg" className="w-100 h-100 zoom-1" alt="" />
          </div>
          <div className="col-lg-3 border bg-white rounded shadow m-4 p-4 h-100 w-100">
            <h5 className="text-center">Postcards</h5>
            <img src="/PC.jpg" className="w-100 h-100 zoom-1" alt="" />
          </div>
        </div>
        <div className="row container-fluid m-0 side-spacer justify-content-center w-100 h-100">
          <div className="col-lg-3 border bg-white rounded shadow m-4 p-4 h-100 w-100">
            <h5 className="text-center">Newsletters</h5>
            <img src="/NL.jpg" className="w-100 h-100 zoom-1" alt="" />
          </div>
          <div className="col-lg-3 border bg-white rounded shadow m-4 p-4 h-100 w-100">
            <h5 className="text-center">Stationary</h5>
            <img src="/STATIONARY.jpg" className="w-100 h-100 zoom-1" alt="" />
          </div>
          <div className="col-lg-3 border bg-white rounded shadow m-4 p-4 h-100 w-100">
            <h5 className="text-center">Trade Show Displays</h5>
            <img
              src="/TRADESHOWDISPLAY.jpeg"
              className="w-100 h-100 zoom-1"
              alt=""
            />
          </div>
        </div>
      </div>
    </Base>
  );
};
export default PrintingSolution;
