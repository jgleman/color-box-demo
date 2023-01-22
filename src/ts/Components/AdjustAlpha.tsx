// const [alphaP, setAlphaP] = useState(100);

import { useState, useMemo, useEffect } from "react";
import { Color, hexString, getAlpha, setAlpha } from "@jgleman/color-box";

import CodeSample from "@components/CodeSample";

function AdjustAlpha() {
  const [backgroundColor, setBackgroundColor] = useState("#2dd4bf");
  const [textColor, setTextColor] = useState("#000000");
  const [a, setA] = useState(100);

  const bgColor = useMemo(() => {
    return new Color(backgroundColor);
  }, [backgroundColor]);

  const txtColor = useMemo(() => {
    return new Color(textColor);
  }, [textColor]);

  useEffect(() => {
    if (txtColor.hex) {
      const alpha = getAlpha(txtColor);
      const a = typeof alpha === "undefined" ? 100 : alpha * 100;
      setA(a);
    } else {
      setA(100);
    }
  }, [txtColor]);

  const codeSample = `const color = new Color("${textColor}");\nconst newColor = setAlpha(color, ${a}));`;

  return (
    <div className="mx-2 my-10 border-b border-zinc-200 pb-10 md:mx-auto md:w-11/12 md:max-w-3xl">
      <p className="mx-auto mb-4 text-zinc-700 md:w-full">
        Adjust the opacity (alpha) of a color.
      </p>
      <div className="flex flex-row justify-between gap-4 max-[440px]:flex-col">
        <div className="mx-auto w-52 flex-none">
          <label htmlFor="txtcolor" className="text-md uppercase text-zinc-700">
            Text Color
          </label>
          <input
            id="txtcolor"
            name="txtcolor"
            className="mb-2 w-full rounded border px-2 py-1.5 shadow-inner"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
          />
          <label htmlFor="bgcolor" className="text-md uppercase text-zinc-700">
            Background Color
          </label>
          <input
            id="bgcolor"
            name="bgcolor"
            className="mb-2 w-full rounded border px-2 py-1.5 shadow-inner"
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e.target.value)}
          />
        </div>
        <div className="mb-2 flex flex-1 flex-col items-center items-center justify-between">
          <div
            className="mb-4 mt-6 w-52 rounded md:w-full"
            style={{ backgroundColor: hexString(bgColor) }}
          >
            <p
              style={{
                color:
                  txtColor.hex !== ""
                    ? hexString(setAlpha(txtColor, a))
                    : "#000000",
              }}
              className="py-8 text-center text-2xl font-bold md:text-4xl"
            >
              Alpha {a}%
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <label htmlFor="alpha" className="text-md uppercase text-zinc-700">
              Alpha
            </label>
            <input
              className="mb-2 w-full px-2 py-1.5"
              type="range"
              id="alpha"
              name="alpha"
              value={a}
              min="0"
              max="100"
              onChange={(e) => setA(parseInt(e.target.value, 10))}
            />
          </div>
        </div>
      </div>
      <CodeSample code={codeSample} />
    </div>
  );
}

export default AdjustAlpha;
