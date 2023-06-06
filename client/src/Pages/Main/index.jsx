import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Index() {
  let naviagte = useNavigate();
  let [skillsArr, setSkillsArr] = useState([]);
  let [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_HOST}/get/jobs`)
      .then((res) => {
        setJobs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let onChange = (e) => {
    let temp = e.target.value;
    if (!skillsArr.includes(temp)) {
      setSkillsArr((skillsArr) => [...skillsArr, temp]);
    }

    console.log(skillsArr);
  };

  let deleteSkill = (value) => {
    setSkillsArr((oldValues) => {
      return oldValues.filter((skill) => skill !== value);
    });
  };

  let clearSkill = () => {
    setSkillsArr([]);
  };

  let onClickViewDetails = (id) => {
    localStorage.setItem('job_id',id);
    naviagte("/view-details");
  }

  return (
    <div className="container-main">
      <div className="navbar">
        <h1 className="heading-main">Jobfinder</h1>
        <div className="buttons-main">
          <button className="login-main" onClick={() => naviagte("/login")}>
            Login
          </button>
          <button
            className="register-main"
            onClick={() => naviagte("/register")}
          >
            Register
          </button>
        </div>
      </div>
      <div className="search-engine-wrapper">
        <div className="search-engine">
          <div className="inputAndIcon">
            <img src="search-icon.png" alt="" className="search-main" />
            <input
              type="text"
              name="job-title"
              className="job-title"
              placeholder="Type any job title"
            />
          </div>

          <div className="skillsAndClear">
            <select
              name="skills"
              className="skills-select"
              onChange={(e) => onChange(e)}
            >
              <option value="" selected disabled hidden>
                Skills
              </option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="HTML">HTML</option>
              <option value="CSS">CSS</option>
              <option value="JavaScript">JavaScript</option>
              <option value="ReactJs">ReactJs</option>
              <option value="NodeJS">NodeJS</option>
              <option value="ExpressJs">ExpressJs</option>
              <option value="MongoDB">MongoDB</option>
            </select>

            <div className="skills-selected">
              {skillsArr.map((skill) => (
                <>
                  <div className="skill-main">
                    <div className="skill-name-wrapper">
                      <p className="skill-name">{skill}</p>
                    </div>
                    <button
                      className="skill-cross"
                      onClick={() => deleteSkill(skill)}
                    >
                      X
                    </button>
                  </div>
                </>
              ))}
            </div>
            <p className="skills-clear" onClick={clearSkill}>
              Clear
            </p>
          </div>
        </div>
      </div>
      <div className="jobs-view-wrapper">
        {jobs.map((jobs) => (
          <>
            <div className="jobs-view">
              <div className="left-job-details">
                <img src={`${jobs.logoUrl}`} alt="" className="company-log" />
                <div className="job-infos">
                  <h1 className="job-view-title">{jobs.jobPosition}</h1>
                  <div className="job-position-salary-loc-info">
                    <div className="job-position">
                      <img
                        src="num-positions-icon.png"
                        alt=""
                        className="num-position-img"
                      />
                      <p className="count-info">11-50</p>
                    </div>
                    <div className="job-salary">
                      <img src="rupees.png" alt="" className="salary-img" />
                      <p className="salary-info">{jobs.salary}</p>
                    </div>
                    <div className="job-loc">
                      <img src="india-flag.png" alt="" className="india-img" />
                      <p className="loc-info">{jobs.location}</p>
                    </div>
                  </div>
                  <div className="job-type-role">
                    <p className="job-type">{jobs.jobLocation}</p>
                    <p className="job-role">{jobs.jobType}</p>
                  </div>
                </div>
              </div>
              <div className="right-job-details">
                <div className="skills-view-job">
                  {jobs.skills.map((skill) => (
                    <div className="box-skill-job">
                      <div className="skill-wrapper">
                        <p className="box-skill-name">{skill}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="view-details-job" onClick={() => onClickViewDetails(jobs._id)}>View details</button>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
