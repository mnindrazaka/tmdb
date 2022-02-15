import Image from "./asset/resource/logo.png";
import "./app.css";

const App = () => {
  return (
    <div>
      <h1>hello world</h1>
      <img src={Image} alt="" />
      <button className="btn layout">Submit</button>
    </div>
  );
};

export default App;
