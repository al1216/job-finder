import React, {useState, useEffect} from "react";
import "./style.css";
import axios from "axios";


export default function LoggedInUsers() {
  // let [job, setJob] = useState([]);
  let [jobId,setJobId] = useState('');
  let [companyName, setCompanyName] = useState('');
  let [logoUrl, setLogoUrl] = useState('');
  let [jobPosition, setJobPosition] = useState('');
  let [salary, setSalary] = useState('');
  let [jobType, setJobType] = useState('');
  let [location, setLocation] = useState('');
  let [jobLocation, setJobLocation] = useState('');
  let [jobDesc, setJobDesc] = useState('');
  let [aboutCompany, setAboutCompany] = useState('');
  let [skills, setSkills] = useState('');

  useEffect(() => {
    try{
      let id = localStorage.getItem("job_id");
      axios
        .get(`${process.env.REACT_APP_HOST}/get/job/${id}`)
        .then((res) => {
          let temp  = res.data;
          setJobId(temp._id);
          setCompanyName(temp.companyName);
          setLogoUrl(temp.logoUrl);
          setJobPosition(temp.jobPosition);
          setSalary(temp.salary);
          setJobType(temp.jobType);
          setLocation(temp.location);
          setJobLocation(temp.jobLocation);
          setJobDesc(temp.jobDesc);
          setAboutCompany(temp.aboutCompany);
          setSkills(temp.skills);
        })
        .catch((err) => {
          console.log(err);
        });

        // console.log(job);
    }
    catch(err) {
      console.log(err);
    }
  },[]);
  return (
    <div className="container-jobPost">
      <div className="left-jobPost">
        <div className="header-captions-jobPost">
          <h1 className="header-jobPost">Edit job description</h1>
        </div>

        <form
          action={`${process.env.REACT_APP_HOST}/api/edit-job-post/${jobId}`}
          className="form-jobPost"
          method="post"
        >
          <table>
            <tbody>
              <tr>
                <td>
                  <p className="title-r1">Company Name</p>
                </td>
                <td>
                  <input
                  autoFocus
                    type="text"
                    name="companyName"
                    className="companyName"
                    placeholder="Enter your company name here"
                    value = {companyName}
                    onChange={(e) => {
                      setCompanyName(e.target.value);
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <p className="title-r1">Add logo URL</p>
                </td>
                <td>
                  <input
                    type="text"
                    name="logoUrl"
                    className="logoUrl"
                    placeholder="Enter the link"
                    value = {logoUrl}
                    onChange={(e) => {
                      setLogoUrl(e.target.value);
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <p className="title-r1">Job position</p>
                </td>
                <td>
                  <input
                    type="text"
                    name="jobPosition"
                    className="jobPosition"
                    placeholder="Enter job position"
                    value = {jobPosition}
                    onChange={(e) => {
                      setJobPosition(e.target.value);
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <p className="title-r1">Monthly salary</p>
                </td>
                <td>
                  <input
                    type="number"
                    name="salary"
                    className="salary"
                    placeholder="Enter Amount in rupees"
                    value = {salary}
                    onChange={(e) => {
                      setSalary(e.target.value);
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <p className="title-r1">Job Type</p>
                </td>
                <td>
                  <select name="jobType" className="jobType" value = {jobType}
                    onChange={(e) => {
                      setJobType(e.target.value);
                    }}>
                    <option value="" selected disabled hidden>
                      Select
                    </option>
                    \<option value="Full Time">Full Time</option>
                    <option value="Internship">Internship</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="title-r1">Remote/office</p>
                </td>
                <td>
                  <select name="jobLocation" className="jobLocation" value = {jobLocation}
                    onChange={(e) => {
                      setJobLocation(e.target.value);
                    }}>
                    <option value="" selected disabled hidden>
                      Select
                    </option>
                    \<option value="Remote">Remote</option>
                    <option value="Office">Office</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="title-r1">Location</p>
                </td>
                <td>
                  <input
                    type="text"
                    name="location"
                    className="location"
                    placeholder="Enter Location"
                    value = {location}
                    onChange={(e) => {
                      setLocation(e.target.value);
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <p className="title-r1">Job Description</p>
                </td>
                <td>
                  <textarea
                    name="jobDesc"
                    className="jobDesc"
                    placeholder="Type the job description"
                    value = {jobDesc}
                    onChange={(e) => {
                      setJobDesc(e.target.value);
                    }}
                  ></textarea>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="title-r1">About Company</p>
                </td>
                <td>
                  <textarea
                    name="aboutCompany"
                    className="aboutCompany"
                    placeholder="Type about your company"
                    value = {aboutCompany}
                    onChange={(e) => {
                      setAboutCompany(e.target.value);
                    }}
                  ></textarea>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="title-r1">Skills Required</p>
                </td>
                <td>
                  <input
                    type="text"
                    name="skills"
                    className="skills"
                    placeholder="Skills Required"
                    value = {skills}
                    onChange={(e) => {
                      setSkills(e.target.value);
                    }}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="buttons">
            <button className="cancel-jobPost">Cancel</button>
            <button className="submit-jobPost" type="submit">+ Add Job</button>
          </div>
        </form>
      </div>
      <div className="right-jobPost">
        <img src="image-job-post.png" alt="" className="jobPost-img" />

        <div className="title-wrapper-jobPost">
          <h1 className="title-jobPost">Recruiter edit job details here</h1>
        </div>
      </div>
    </div>
  );
}
