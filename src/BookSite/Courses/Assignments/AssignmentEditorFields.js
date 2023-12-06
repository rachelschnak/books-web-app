function AssignmentEditorFields() {
    return(
        <div>


            <div className="wd-flex-grow-1 wd-kanbas-home-content wd-assignment-edit">
                <div className="mb-3 row">
                    <div><label htmlFor="bio1"
                                className="col-sm-2 col-form-label wd-xl-label"> </label></div>
                    <div className="col-8"> <textarea className="form-control" id="bio1" rows="5">This assignment decribes how to install the development environment for creating and working with Web applications we will be developing this semester. We will add new content every week. pushing the code to a GitHub source repository, and then deploying the content to a remote server hosted on Netlify.
                </textarea></div>
                </div>


                <div className="row g-2 wd-edit-offset">
                    <div className="col-2 wd-right-align"><label htmlFor="points1"
                                                                 className="col-form-label">Points</label>
                    </div>
                    <div className="col-3"><input type="text" className="form-control" id="points1"
                                                  value="100"/></div>
                </div>


                <div className="row g-2 wd-edit-offset">
                    <div className="col-2 wd-right-align"><label htmlFor="group1"
                                                                 className="col-7"> Assignment
                        Group </label></div>
                    <div className="col-3"><select className="form-select" id="group1">
                        <option selected>ASSIGNMENTS</option>
                        <option>QUIZZES</option>
                        <option>EXAMS</option>
                        <option>PROJECTS</option>
                    </select></div>
                </div>

                <div className="row g-2 wd-edit-offset">
                    <div className="col-2 wd-right-align"><label htmlFor="gradeDisplay"
                                                                 className="col-7"> Display Grade
                        as </label></div>
                    <div className="col-3"><select className="form-select" id="gradeDisplay">
                        <option selected>Percentage</option>
                        <option>Points</option>
                    </select>
                        <br/>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="countFinal"/>
                            <label htmlFor="countFinal">Do not count this assignment towards final
                                grade.</label> <br/></div>
                    </div>

                </div>


                <div className="row g-2 wd-edit-offset">
                    <div className="col-2 wd-right-align"><label htmlFor="subType"
                                                                 className="col-7"> Submission
                        Type </label></div>

                    <div className="col-3">
                        <div className="wd-submission-box">
                            <select className="form-select" id="subType">
                                <option selected>Online</option>
                                <option>In-Person</option>
                            </select>
                            <br/><h5>Online Entry Options</h5>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="textEntry"/>
                                <label htmlFor="textEntry">Text Entry</label> <br/>
                                <input className="form-check-input" type="checkbox"
                                       id="websiteURL"/> <label htmlFor="websiteURL">Website
                                URL</label> <br/>
                                <input className="form-check-input" type="checkbox"
                                       id="mediaRecordings"/> <label htmlFor="mediaRecordings">Media
                                Recordings </label><br/>
                                <input className="form-check-input" type="checkbox"
                                       id="studentAnnotation"/><label htmlFor="studentAnnotation">Student
                                Annotation</label> <br/>
                                <input className="form-check-input" type="checkbox"
                                       id="fileUploads"/> <label htmlFor="fileUploads">File
                                Uploads </label><br/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row g-2 wd-edit-offset">
                    <div className="col-2 wd-right-align"><label htmlFor="subType"
                                                                 className="col-7"> Assign </label>
                    </div>

                    <div className="col-3">
                        <div className="wd-submission-box">
                            <h6>Assign To</h6>
                            <select className="form-select" id="assignto">
                                <option selected>Everyone</option>
                                <option>None</option>
                            </select>
                            <br/><h6>Due</h6>
                            <input type="date" value="2023-09-18"/><br/><br/>
                            <div className="row g-2">
                                <div className="col-6">Available from</div>
                                <div className="col-6">Until</div>
                            </div>

                            <div className="row g-2">
                                <div className="col-6"><input type="date" value="2023-09-06"/></div>
                                <div className="col-6"><input type="date"/></div>
                            </div>

                        </div>
                        <div className="col-auto btn-group wd-special-save-button form-control">
                            <a className="btn btn-light wd-not-red-links wd-grey-btn wd-special-save-button"
                               role="button"><i className="fa-solid fa-plus"></i>Add</a>
                        </div>
                    </div>
                </div>

                <hr/>
                <div className="row g-3">
                    <div className="form-check col-4">
                        <input className="form-check-input" type="checkbox" id="notify"/> <label
                        htmlFor="notify">Notify users that this content has changed. </label>
                    </div>

                </div>


</div>

        </div>
    )
}
export default AssignmentEditorFields