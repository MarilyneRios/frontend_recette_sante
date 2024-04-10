import { useState } from "react";
import Hero from "../components/Hero";
import { useAllRecipesAuthQuery } from "../slices/recipesApiSlice";
import { useSelector } from "react-redux";
import ReadRecipeS from "./ReadRecipeS";
import PaginationComponent from "../components/PaginationComponent";

const HomeScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const result = useAllRecipesAuthQuery();
  const recipes = result.data || [];
  const [currentPage, setCurrentPage] = useState(1);
  const [bigCardIndex, setBigCardIndex] = useState(null);

  return (
    <div>
      {!userInfo ? (
        <Hero />
      ) : (
        <div className="d-flex flex-column align-items-center justify-content-center">
          <div className=" d-flex flex-wrap justify-content-around align-self-sm-stretch">
            <ReadRecipeS 
            recipes={recipes} 
            currentPage={currentPage}
            setBigCardIndex={setBigCardIndex} />
          </div>
          <div>
          {bigCardIndex === null && (
            <PaginationComponent 
              recipes={recipes} 
              currentPage={currentPage} 
              setCurrentPage={setCurrentPage} 
            />
          )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
