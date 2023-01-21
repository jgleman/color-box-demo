import MixColors from "./MixColors";
import AdjustHSL from "./AdjustHSL";
import AdjustAlpha from "./AdjustAlpha";

function App() {
  return (
    <>
      <div className="mx-2 my-8 md:mx-auto md:w-11/12 md:max-w-3xl">
        <h2 className="text-lg font-bold">Live Demo</h2>
      </div>
      <MixColors />
      <AdjustHSL />
      <AdjustAlpha />
    </>
  );
}

export default App;
