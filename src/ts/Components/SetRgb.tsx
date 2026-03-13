import { useState, useMemo, useEffect } from "react";
import {
  Color,
  setRgb,
  getRed,
  getGreen,
  getBlue,
  isColorValid,
} from "@jgleman/color-box";

import ColorSwatch from "@components/ColorSwatch";
import CodeSample from "@components/CodeSample";

function SetRgb() {
  const [color, setColor] = useState("#336699");
  const [r, setR] = useState(51);
  const [g, setG] = useState(102);
  const [b, setB] = useState(153);

  const baseColor = useMemo(() => new Color(color), [color]);

  useEffect(() => {
    if (isColorValid(baseColor)) {
      setR(getRed(baseColor));
      setG(getGreen(baseColor));
      setB(getBlue(baseColor));
    }
  }, [baseColor]);

  const resultColor = useMemo(() => {
    if (!isColorValid(baseColor)) return new Color("");
    return setRgb(baseColor, { r, g, b });
  }, [baseColor, r, g, b]);

  const codeSample = `const color = new Color("${color}");\nconst newColor = setRgb(color, { r: ${r}, g: ${g}, b: ${b} });`;

  return (
    <div className="mx-2 my-4 rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm md:mx-auto md:w-11/12 md:max-w-3xl md:p-8">
      <p className="mb-4 text-zinc-700">
        Set individual RGB channel values.
      </p>
      <div className="mb-6 flex flex-col items-center justify-between sm:flex-row">
        <div className="mb-4 w-full sm:mb-0 sm:w-52">
          <label htmlFor="rgbcolor" className="text-md uppercase text-zinc-700">
            Color
          </label>
          <input
            id="rgbcolor"
            name="rgbcolor"
            className="mb-2 w-full rounded border px-2 py-1.5 shadow-inner"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        <div className="mb-2 flex w-52 flex-col justify-between">
          <label htmlFor="r" className="text-md uppercase text-zinc-700">
            Red{" "}
            <span className="inline-block text-sm opacity-80">({r})</span>
          </label>
          <input
            className="mb-2 w-full accent-red-500"
            type="range"
            id="r"
            name="r"
            value={r}
            min="0"
            max="255"
            onChange={(e) => setR(parseInt(e.target.value, 10))}
          />
          <label htmlFor="g" className="text-md uppercase text-zinc-700">
            Green{" "}
            <span className="inline-block text-sm opacity-80">({g})</span>
          </label>
          <input
            className="mb-2 w-full accent-green-500"
            type="range"
            id="g"
            name="g"
            value={g}
            min="0"
            max="255"
            onChange={(e) => setG(parseInt(e.target.value, 10))}
          />
          <label htmlFor="b" className="text-md uppercase text-zinc-700">
            Blue{" "}
            <span className="inline-block text-sm opacity-80">({b})</span>
          </label>
          <input
            className="mb-2 w-full accent-blue-500"
            type="range"
            id="b"
            name="b"
            value={b}
            min="0"
            max="255"
            onChange={(e) => setB(parseInt(e.target.value, 10))}
          />
        </div>
        <ColorSwatch color={resultColor} />
      </div>
      <CodeSample code={codeSample} />
    </div>
  );
}

export default SetRgb;
