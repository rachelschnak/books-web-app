import React, { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import {BiSolidCheckCircle} from "react-icons/bi";
import {PiDotsSixVerticalBold} from "react-icons/pi";
import { useSelector, useDispatch } from "react-redux";
import {
    addModule,
    deleteModule,
    updateModule,
    setModule, resetModule, setModules,
} from "./modulesReducer";

import {createModule, findModulesForCourse} from "./client";
import * as client from "./client";
import axios from "axios";
import modules from "./index";

function ModuleList() {
    const { courseId } = useParams();
    useEffect(() => {
        findModulesForCourse(courseId)
            .then((modules) =>
                      dispatch(setModules(modules))
            );
    }, [courseId]);

    const handleAddModule = () => {
        createModule(courseId, module).then((module) => {
            dispatch(addModule(module));
        });
    };

    const handleDeleteModule = (moduleId) => {
        client.deleteModule(moduleId).then((status) => {
            dispatch(deleteModule(moduleId));
        });
    };

    const handleUpdateModule = async (module) => {
        const status = await client.updateModule(module);
        dispatch(updateModule(module));
    };

    const modules = useSelector((state) => state.modulesReducer.modules);
    const module = useSelector((state) => state.modulesReducer.module);
    const dispatch = useDispatch();

    return (
        <ul className="list-group wd-mod-list">

            <div className="collapse" id="updateModToggle">

                <li className="list-group-item wd-dashboard-module">

                    <div className="col-7 d-inline-block">
                        <input className="form-control" value={module.name}
                               onChange={(e) => dispatch(setModule({ ...module, name: e.target.value }))}
                        />
                        <textarea className="form-control" value={module.description}
                                  onChange={(e) => dispatch(setModule({ ...module, description: e.target.value }))}
                        />
                    </div>
                    <div className="d-inline-block col wd-dashboard-buttons">
                        <button className="btn btn-success wd-dashboard-button"
                                onClick={handleAddModule}>
                                Add
                        </button>
                        <button className="btn btn-primary wd-dashboard-button"
                                onClick={() => handleUpdateModule(module)} data-bs-toggle="collapse" href="#updateModToggle" role="button" aria-expanded="false" aria-controls="updateModToggle">
                            Update
                        </button>
                    </div>


                </li>

            </div>

            {
                modules
                    .filter((module) => module.course === courseId)
                    .map((module, index) => (
                        <li key={index} className="list-group-item wd-module-item">
                            <div className="wd-module-titles flex-grow-1">
                                <PiDotsSixVerticalBold />
                                 {module.name}

                                    <span className="wd-green-icon wd-dashboard-button"><BiSolidCheckCircle /></span>
                                    <button className="btn btn-success wd-dashboard-button float-end" onClick={() => dispatch(setModule(module))} data-bs-toggle="collapse" href="#updateModToggle" role="button" aria-expanded="false" aria-controls="updateModToggle">Edit</button>
                                    <button className="btn btn-danger wd-dashboard-button float-end" onClick={() => handleDeleteModule(module._id)}>Delete</button>


                            </div>
                            <p>{module.description}</p>
                            { module.lessons && (
                                                   <ul className="list-group">
                                                       {
                                                           module.lessons.map((lesson, index) => (
                                                               <li key={index} className="list-group-item">
                                                                   <h4>{lesson.name}</h4>
                                                                   <p>{lesson.description}</p>
                                                               </li>
                                                           ))
                                                       }
                                                   </ul>
                                               )
                            }
                        </li>
                    ))
            }
        </ul>
    );
}
export default ModuleList;