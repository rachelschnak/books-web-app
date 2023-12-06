import ModuleList from "../Modules/ModuleList";
import CourseStatus from "./CourseStatus";
import "./index.css"
import {BiDotsVerticalRounded, BiTargetLock} from "react-icons/bi";
import {AiOutlineBell, AiOutlineCheckCircle, AiOutlinePlus} from "react-icons/ai";
import db from "../../Database";
import {Link} from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Modules from "../Modules";

function Home() {
    const assignments = db.assignments;
    return (
        <div className="row">
            <div className="col-10 container flex-grow">
                <div className="wd-kanbas-home-main-list">
                    <Modules />
                </div>
            </div>

              <CourseStatus />

            </div>

    );
}
export default Home;