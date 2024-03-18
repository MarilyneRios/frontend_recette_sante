import Hero from "../components/Hero";
import { useSelector } from "react-redux";
import ReadRecipeS from "./readRecipeS";

const HomeScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div>
      {!userInfo ? (
        <Hero /> 
      ) : (
        <div className="m-4">
        <ReadRecipeS/>
      
        </div>
        )}
    </div>
  );
};

export default HomeScreen;
