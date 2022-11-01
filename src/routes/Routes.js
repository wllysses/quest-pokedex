import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import DetalsPage from '../pages/DetalsPage/DetalsPage'

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<HomePage />}/>
                <Route exact path="/Detals/:name" element={<DetalsPage />}/>
            </Routes>
        </BrowserRouter>
    )
}