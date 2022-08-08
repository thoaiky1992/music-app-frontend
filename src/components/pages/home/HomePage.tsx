import Footer from "./Footer";
import NewMusic from "./NewMusic";
import TopMusic from "./TopMusic";

const Home = () => {
  return (
    <div className="home w-full text-text-2">
      <NewMusic />
      <TopMusic />
      <Footer />
    </div>
  );
};

export default Home;
