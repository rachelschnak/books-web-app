import ModuleList from "./ModuleList";
import "./index.css"
import {AiOutlineCheckCircle, AiOutlinePlus} from "react-icons/ai";
import {BiDotsVerticalRounded} from "react-icons/bi";
import {addModule, setModule, updateModule, resetModule} from "./modulesReducer";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";


function Modules() {
    const { courseId } = useParams();
    const modules = useSelector((state) => state.modulesReducer.modules);
    const module = useSelector((state) => state.modulesReducer.module);
    const dispatch = useDispatch();
    return (
        <div className="wd-module-content">
            <div className="container flex-grow">
                <div className="wd-kanbas-home-buttons-main">
                    <a className="list-group-item wd-kanbas-home-button-main btn-light" role="button"> Collapse All</a>
                    <a className="list-group-item wd-kanbas-home-button-main wd-published-button btn-light" role="button">  View Progress</a>
                    <div className="dropdown">
                        <button className="btn btn-light wd-kanbas-home-button-main dropdown-toggle"  type="button"
                                data-bs-toggle="dropdown" aria-expanded="false"><AiOutlineCheckCircle /> Publish All
                        </button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item wd-not-red-links" >Publish
                                All</a></li>
                            <li><a className="dropdown-item wd-not-red-links" >Publish all
                                items and modules</a></li>
                            <li><a className="dropdown-item wd-not-red-links" >Unpublish</a>
                            </li>
                        </ul>
                    </div>
                    <a className=" wd-kanbas-home-button-main wd-published-button wd-red-button" onClick={() => dispatch(resetModule({}))} role="button" data-bs-toggle="collapse" href="#updateModToggle" role="button" aria-expanded="false" aria-controls="updateModToggle"><AiOutlinePlus />  Module</a>
                    <a className="list-group-item wd-kanbas-home-button-main btn-light" role="button"> <BiDotsVerticalRounded /></a>
                </ div>
            </div>
            <hr />

            <ModuleList />
        </div>
    );
}
export default Modules;