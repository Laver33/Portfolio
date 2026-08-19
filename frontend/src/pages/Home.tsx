import About from "../components/About";
import MainInfo from "../components/MainInfo";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center ">
      {/* Информация обо мне */}
      <section className="w-2/3">
        <MainInfo />
        <About />
      </section>
    </div>
  );
};

export default HomePage;
