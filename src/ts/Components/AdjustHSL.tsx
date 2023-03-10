import { useState, useMemo, useEffect } from "react";
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

function AdjustHSL() {
  const [color, setColor] = useState("#00ff00");

  const colorC = useMemo(() => {
    return new Color(color);
  }, [color]);

  const tSat = isColorValid(colorC) ? getSaturation(colorC) * 100 : 0;
  const tHue = isColorValid(colorC) ? getHue(colorC) : 0;
  const tLit = isColorValid(colorC) ? getLightness(colorC) : 0;
  const [h, setH] = useState(tHue);
  const [s, setS] = useState<number>(tSat);
  const [l, setL] = useState<number>(tLit);

  function setColorC(val: string): void {
    setColor(val);
  }

  useEffect(() => {
    if (isColorValid(colorC)) {
      const sat = getSaturation(colorC) * 100 || 0;
      const hue = getHue(colorC) || 0;
      const lit = getLightness(colorC) * 100 || 0;
      setS(Math.round(sat));
      setH(hue);
      setL(Math.round(lit));
    } else {
      setS(0);
      setH(0);
      setL(0);
    }
  }, [colorC]);

  const calculatedColor = isColorValid(colorC)
    ? setLightness(setSaturation(setHue(colorC, h), s), l)
    : new Color("");

  const codeSample = `const color = new Color("${color}");\nconst newColor = setLightness(setSaturation(setHue(color, ${h}), ${s}), ${l});`;

  return (
    <div className="mx-2 my-10 border-b border-zinc-200 pb-10 md:mx-auto md:w-11/12 md:max-w-3xl">
      <div className="mb-6 flex flex-col items-center justify-between sm:flex-row">
        <div className="w-full sm:w-52">
          <p className="mb-4 text-zinc-700 sm:mx-auto sm:w-52">
            Adjust the various properties of a color, such as hue, saturation
            and lightness:
          </p>
          <div className="mx-auto w-52">
            <label
              htmlFor="adjustcolor"
              className="text-md uppercase text-zinc-700"
            >
              Color
            </label>
            <input
              id="adjustcolor"
              name="adjustcolor"
              className="mb-2 w-full rounded border px-2 py-1.5 shadow-inner"
              value={color}
              onChange={(e) => setColorC(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-2 flex w-52 flex-col items-center justify-between">
          <div className="w-full">
            <label htmlFor="hue" className="text-md uppercase text-zinc-700">
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
            <label htmlFor="sat" className="text-md uppercase text-zinc-700">
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
            <label htmlFor="lit" className="text-md uppercase text-zinc-700">
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
