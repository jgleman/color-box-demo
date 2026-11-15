import { useState, useMemo } from "react";
import {
  Color,
  getHue,
  setHue,
  setSaturation,
  getSaturation,
  getLightness,
  setLightness,
  isColorValid,
} from "@jgleman/color-box";

import CodeSample from "@components/CodeSample";
import ColorSwatch from "@components/ColorSwatch";

/** Slider values for a color: hue in degrees, saturation and lightness as 0-100. */
function hslSliders(color: Color): { h: number; s: number; l: number } {
  if (!isColorValid(color)) return { h: 0, s: 0, l: 0 };
  return {
    h: getHue(color) || 0,
    s: Math.round(getSaturation(color) * 100 || 0),
    l: Math.round(getLightness(color) * 100 || 0),
  };
}

function AdjustHSL() {
  const [color, setColor] = useState("#00ff00");

  const colorC = useMemo(() => {
    return new Color(color);
  }, [color]);

  const [initial] = useState(() => hslSliders(colorC));
  const [h, setH] = useState(initial.h);
  const [s, setS] = useState(initial.s);
  const [l, setL] = useState(initial.l);

  // Sync the sliders here rather than in an effect, so typing a color doesn't
  // trigger a second render.
  function setColorC(val: string): void {
    setColor(val);
    const sliders = hslSliders(new Color(val));
    setH(sliders.h);
    setS(sliders.s);
    setL(sliders.l);
  }

  const calculatedColor = isColorValid(colorC)
    ? setLightness(setSaturation(setHue(colorC, h), s), l)
    : new Color("");

  const codeSample = `const color = new Color("${color}");\nconst newColor = setLightness(setSaturation(setHue(color, ${h}), ${s}), ${l});`;

  return (
    <div className="mx-2 my-4 rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm md:mx-auto md:w-11/12 md:max-w-3xl md:p-8 dark:border-zinc-700 dark:bg-zinc-800">
      <div className="mb-6 flex flex-col items-center justify-between sm:flex-row">
        <div className="w-full sm:w-52">
          <p className="mb-4 text-zinc-700 sm:mx-auto sm:w-52 dark:text-zinc-300">
            Adjust the various properties of a color, such as hue, saturation
            and lightness:
          </p>
          <div className="mx-auto w-52">
            <label
              htmlFor="adjustcolor"
              className="text-md uppercase text-zinc-700 dark:text-zinc-300"
            >
              Color
            </label>
            <input
              id="adjustcolor"
              name="adjustcolor"
              className="mb-2 w-full rounded border px-2 py-1.5 shadow-inner dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-200"
              value={color}
              onChange={(e) => setColorC(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-2 flex w-52 flex-col items-center justify-between">
          <div className="w-full">
            <label
              htmlFor="hue"
              className="text-md uppercase text-zinc-700 dark:text-zinc-300"
            >
              Hue{" "}
              <span className="inline-block w-4 text-sm opacity-80">({h})</span>
            </label>
            <input
              className="mb-2 w-full px-2 py-1.5"
              type="range"
              id="hue"
              name="hue"
              value={h}
              min="0"
              max="360"
              onChange={(e) => setH(parseInt(e.target.value, 10))}
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="sat"
              className="text-md uppercase text-zinc-700 dark:text-zinc-300"
            >
              Saturation{" "}
              <span className="inline-block w-4 text-sm opacity-80">({s})</span>
            </label>
            <input
              className="mb-2 w-full px-2 py-1.5"
              type="range"
              id="sat"
              name="sat"
              value={s}
              min="0"
              max="100"
              onChange={(e) => setS(parseInt(e.target.value, 10))}
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="lit"
              className="text-md uppercase text-zinc-700 dark:text-zinc-300"
            >
              Lightness{" "}
              <span className="inline-block w-4 text-sm opacity-80">({l})</span>
            </label>
            <input
              className="mb-2 w-full px-2 py-1.5"
              type="range"
              id="lit"
              name="lit"
              value={l}
              min="0"
              max="100"
              onChange={(e) => setL(parseInt(e.target.value, 10))}
            />
          </div>
        </div>
        <ColorSwatch color={calculatedColor} />
      </div>
      <CodeSample code={codeSample} />
    </div>
  );
}

export default AdjustHSL;
