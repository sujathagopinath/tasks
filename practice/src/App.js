import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import RecipeReviewCard from "./Components/RecipeReviewCard";
// import SocialMedia from "./Components/socialMedia";
function App() {
  return (
    <div className="App">
      <div className="App-header">
        Posts
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<RecipeReviewCard />} />
            {/* <Route path="/share" element={<SocialMedia />} /> */}
          </Routes>
        </BrowserRouter>
        {/* <RecipeReviewCard /> */}
      </div>
    </div>
  );
}

export default App;
