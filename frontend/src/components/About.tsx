import PortfolioModel from "../components/3d/PortfolioModel";

const About = () => {
  const test: boolean = true;

  const About: string =
    "Hello, I'm Pavel Drabena, frontend developer and former QA tester who decided to transition into full-stack development to build complete projects. I enjoy development. I currently position myself as a Junior Full-stack Developer. I have completed several full-stack projects and am continuing to reach new heights in my learning.";

  return (
    <>
      <div>
        <h2 className="mt-10 text-xl font-medium  text-center">Описание</h2>
        <p className="my-4 bg-amber-100 text-lg">{About}</p>
      </div>

      <div>{test ? <PortfolioModel /> : <p>test</p>}</div>
    </>
  );
};

export default About;
