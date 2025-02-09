import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Problem2 from "../pages/Problem2.tsx";
import Home from "../pages/Home.tsx";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/problem2" element={<Problem2 />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
