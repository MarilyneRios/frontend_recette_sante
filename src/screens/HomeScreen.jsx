import Hero from "../components/Hero";
import { useSelector } from "react-redux";

const HomeScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div>
      {!userInfo ? (
        <Hero /> 
      ) : (
        <h1 className="text-center text-white">Utilisateur connecté</h1> 
      )}
    </div>
  );
};

export default HomeScreen;
