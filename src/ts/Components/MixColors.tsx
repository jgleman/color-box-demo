import { useState } from "react";

import { Color, mix, contrast, isColorValid } from "@jgleman/color-box";

import ColorSwatch from "@components/ColorSwatch";
import CodeSample from "@components/CodeSample";

function MixColors() {
  const [colorInputA, setColorInputA] = useState("#ff0000");
  const [colorInputB, setColorInputB] = useState("#0000ff");

  const colorA = new Color(colorInputA);
  const colorB = new Color(colorInputB);

  let contrastRatio = "";
  try {
    contrastRatio = contrast(colorA, colorB);
  } catch (e) {
    // probably an invalid color.
  }

  const [mixWeight, setMixWeight] = useState(50);

  const colorMix =
    isColorValid(colorB) && isColorValid(colorA)
      ? mix(colorB, colorA, mixWeight)
      : new Color(undefined);

  const codeSample = `const colorA = new Color("${colorInputA}");\nconst colorB = new Color("${colorInputB}");\nconst mixedColor = mix(colorB, colorA, ${mixWeight});`;

  return (
    <div className="mx-2 my-10 border-b border-zinc-200 pb-10 md:mx-auto md:w-11/12 md:max-w-3xl">
      <p className="mx-auto w-full text-zinc-700">
        Adjust the mix slider to see a demonstration of the{" "}
        <a
          className="text-blue-700 underline hover:text-blue-900"
          href="https://jgleman.github.io/color-box/functions/mix.html"
        >
          mix
        </a>{" "}
        function. Try entering your own colors.
      </p>
      <p className="mx-auto mb-4  w-full text-sm text-zinc-500">
        The mix function is an implementation of the mixing algorithm from{" "}
        <a
          className="text-blue-700 underline hover:text-blue-900"
          href="https://sass-lang.com/documentation/modules/color#mix"
        >
          Sass
        </a>
        .
      </p>
      <div className="mb-6 flex flex-col items-center justify-between sm:flex-row">
        <div className="mb-2 flex w-52 flex-col items-center justify-between">
          <label htmlFor="color1" className="text-md uppercase text-zinc-700">
            Color 1
          </label>
          <input
            id="color1"
            name="color1"
            className="mb-2 w-full rounded border px-2 py-1.5 shadow-inner"
            value={colorInputA}
            onChange={(e) => setColorInputA(e.target.value)}
          />
          <ColorSwatch color={colorA} />
        </div>
        <div className="mb-2 flex w-52 flex-col items-center justify-between">
          <label
            htmlFor="weight"
            className="text-md w-full text-center uppercase text-zinc-700"
          >
            Mix{" "}
            <span className="inline-block text-sm opacity-60">
              (weight: {mixWeight}%)
            </span>
          </label>
          <input
            className="mb-2 h-[38px] w-full px-2 py-1.5"
            type="range"
            id="weight"
            name="weight"
            value={mixWeight}
            min="0"
            max="100"
            onChange={(e) => setMixWeight(parseInt(e.target.value, 10))}
          />
          <ColorSwatch color={colorMix} />
        </div>
        <div className="mb-2 flex w-52 flex-col items-center justify-between">
          <label htmlFor="color2" className="text-md uppercase text-zinc-700">
            Color 2
          </label>
          <input
            id="color2"
            name="color2"
            className="mb-2 w-full rounded border px-2 py-1.5 shadow-inner"
            value={colorInputB}
            onChange={(e) => setColorInputB(e.target.value)}
          />
          <ColorSwatch color={colorB} />
        </div>
      </div>
      <div className="mb-6 text-center">
        <p>
          Contrast Ratio between <span className="opacity-70">Color 1</span> and{" "}
          <span className="opacity-70">Color 2</span>:{" "}
          <strong>{contrastRatio || "??:1"}</strong>
        </p>
      </div>

      <CodeSample code={codeSample} />
    </div>
  );
}

export default MixColors;
