import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style.css";

export default function Index() {
  let naviagte = useNavigate();
  let [job, setJob] = useState([]);
  let [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    try {
      let id = localStorage.getItem("job_id");
      let email = localStorage.getItem("email");
      if (!email || email === "undefined") setLoggedIn(false);
      else setLoggedIn(true);

      axios
        .get(`${process.env.REACT_APP_HOST}/get/job/${id}`)
        .then((res) => {
          setJob(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);
  let onClickLogout = () => {
    localStorage.clear();
    setLoggedIn(false);
  };
  let onClickEditDetails = (id) => {
    localStorage.setItem("job_id", id);
    naviagte("/edit-job-post");
  };
  return (
    <div className="container-view-details">
      <div className="navbar">
        <h1 className="heading-main">Jobfinder</h1>
        <div className="buttons-main">
          {!loggedIn && (
            <>
              <button className="login-main" onClick={() => naviagte("/login")}>
                Login
              </button>
              <button
                className="register-main"
                onClick={() => naviagte("/register")}
              >
                Register
              </button>
            </>
          )}

          {loggedIn && (
            <>
              <p className="logout-main" onClick={() => onClickLogout()}>
                Logout
              </p>
              <p className="greet-recruiter">Hello! Recruiter</p>
              <img src="avatar.png" alt="" className="avatar-img" />
            </>
          )}
        </div>
      </div>
      <div className="wrapper-message-view-details">
        <div className="job-company-greet">
          <p className="message-view-details">
            {`${job.jobPosition} work from home job/internship at`} <br />{" "}
            {`${job.companyName}`}
          </p>
        </div>
      </div>

      <div className="wrapper-full-job-view">
        <div className="full-job-details-view">
          <p className="timeAndType">{`1w ago . ${job.jobType}`}</p>
          <div className="title-location-editJob">
            <div className="title-location">
              <h1 className="job-title-view-details">
                {`${job.jobPosition}`}{" "}
              </h1>
              <p className="job-location-view-details">{`${job.location} | India`}</p>
            </div>
            {loggedIn && <button className="edit-job-view-details" onClick={() => onClickEditDetails(job._id)}>Edit job</button>}
            {!loggedIn && <button className="edit-job-view-details" disabled>Edit job</button>}
          </div>
          <div className="stipend-duration-view-details">
            <div className="stipend">
              <div className="wrapper-stipend">
                <img src="money.png" alt="" className="stipend-img" />
                <p className="stipend-caption">Stipend</p>
              </div>

              <p className="stipendAmount">{`Rs ${job.salary}/month`}</p>
            </div>
            <div className="duration">
              <div className="wrapper-duration">
                <img src="calendar.png" alt="" className="calendar-img" />
                <p className="duration-caption">Duration</p>
              </div>

              <p className="durationAmount">6 Months</p>
            </div>
          </div>
          <h2 className="about-company-caption">About company</h2>
          <p className="about-comapny-details">{job.aboutCompany}</p>
          <h2 className="about-job-caption">About the job/internship</h2>
          <p className="about-job-details">{job.jobDesc}</p>
          <h2 className="skills-required-view-details">
            Skill(s) required
          </h2>{" "}
          <br />
          <div className="skills-view-details">
            {job.skills?.map((skill) => (
              <div className="skills-name-view-details">
                <p className="skill-name-view-details">{skill}</p>
              </div>
            ))}
          </div>
          <h2 className="additional-info-caption">Additional Information</h2>
          <p className="additional-info">
            Stipend structure: This is a performance-based internship. In
            addition to the minimum-assured stipend, you will also be paid a
            performance-linked incentive (₹ 2500 per design).
          </p>
        </div>
      </div>
    </div>
  );
}
