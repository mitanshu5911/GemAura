import React from "react";
import Header from "./components/common/Header";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedLayout from "./components/routes/ProtectedRoute";
import GemRecommendationForm from "./pages/GemRecommendationForm";
import GetRecommendation from "./pages/GetRecommendation";
import History from "./pages/history";
import About from "./pages/About";

const App = () => {
  return (
    <div>
      <Header />

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About/>}/>
          <Route element={<ProtectedLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/recommendation" element={<GemRecommendationForm />} />
          <Route path="/recommendation/:recommendationId/:isGenerating" element={<GetRecommendation/>}/>
          <Route path="/history" element={<History/>} />
          </Route>

        </Routes>
    

    </div>
  );
};

export default App;
