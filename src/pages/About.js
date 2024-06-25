import React, { Component } from 'react';
import "./About.css";
//import <dummy> from "../assets/dummy.jpg";

export default class About extends Component {
render() {
  return (
    <div>
      <p>{/*Design your About me page*/}</p>
      <div>
        <div className="split left">
          <div className="centered">
            <img
              className="profile_image"
              alt="Profile Pic"
            ></img>
          </div>
        </div>
        <div className="split right">
          <div className="centered">
            <div className="name_title">Kalkidan Asgedom</div>
            <div className="brief_description">
              <p>Hello! My name is Kalkidan Asgedom and I am a Student at the University of Maryland College Park
                 I am majoring in Computer Science and pursuing a career in Software Engineering. During my free
                 I like to stay active so I go to the gym or go on a run with my brothers. I also like spending
                 time with my friends and family and being creative in any way that I can.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
}


