import "./App.css";
import Home from "./Pages/Home";
import Header from "./components/Header/Header";
import { Routes, Route } from "react-router-dom";
export default function () {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}
