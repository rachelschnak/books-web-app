/*import logo from './logo.svg';
import './App.css';*/
import {HashRouter} from "react-router-dom";
import {Routes, Route, Navigate} from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import BookSite from "./BookSite";


function App() { return (
    <HashRouter>
        <div>
            <Routes>
                <Route path="/" element={<Navigate to = "/BookSite"/>}/>
                <Route path="/BookSite/*" element={<BookSite/>}/>
            </Routes>
        </div>
    </HashRouter>
); }
export default App;