import React from "react";
import "./style.css";

export default function LoggedInUsers() {
  return (
    <div className="container-jobPost">
      <div className="left-jobPost">
        <div className="header-captions-jobPost">
          <h1 className="header-jobPost">Add job description</h1>
        </div>

        <form
          action={`${process.env.REACT_APP_HOST}/api/jobPost`}
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
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <p className="title-r1">Job Type</p>
                </td>
                <td>
                  <select name="jobType" className="jobType">
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
                  <select name="jobLocation" className="jobLocation">
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
          <h1 className="title-jobPost">Recruiter add job details here</h1>
        </div>
      </div>
    </div>
  );
}
