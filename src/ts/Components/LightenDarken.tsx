import { useState, useMemo } from "react";
import { Color, lighten, darken, isColorValid } from "@jgleman/color-box";
import ColorSwatch from "@components/ColorSwatch";
import CodeSample from "@components/CodeSample";

function LightenDarken() {
  const [ldColor, setLdColor] = useState("#2dd4bf");
  const [litDark, setlitDark] = useState(0);

  const color = useMemo(() => {
    return new Color(ldColor);
  }, [ldColor]);

  const codeSample = `const color = new Color("{ldColor}");\nconst newColor = ${
    litDark < 0 ? "darken" : "lighten"
  }(color, ${Math.abs(litDark)});`;

  return (
    <div className="mx-2 my-10 border-b border-zinc-200 pb-10 md:mx-auto md:w-11/12 md:max-w-3xl">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row">
        <div className="flex w-full items-center md:w-52">
          <p className="mx-auto mb-4 w-full text-zinc-700">
            Make a color darker or lighter
          </p>
        </div>
        <div className="mx-auto flex w-52 flex-none flex-col justify-center gap-2">
          <label htmlFor="ldcolor" className="text-md uppercase text-zinc-700">
            Color
          </label>
          <input
            id="ldcolor"
            name="ldcolor"
            className="mb-2 w-full rounded border px-2 py-1.5 shadow-inner"
            value={ldColor}
            onChange={(e) => setLdColor(e.target.value)}
          />
          <div className="flex w-full flex-col items-center justify-center">
            <label
              htmlFor="ld"
              className="text-md flex w-full justify-between uppercase text-zinc-700"
            >
              <span>&larr; Darker</span>

              <span>Lighter &rarr;</span>
            </label>
            <input
              className="w-full px-2 py-1.5"
              type="range"
              id="ld"
              name="ld"
              value={litDark}
              min="-100"
              max="100"
              onChange={(e) => setlitDark(parseInt(e.target.value, 10))}
            />
            <p className="text-sm text-black/60">
              {litDark < 0 ? (
                <span>{Math.abs(litDark)}% Darker</span>
              ) : litDark === 0 ? (
                <span>&nbsp;</span>
              ) : (
                <span>{Math.abs(litDark)}% Lighter</span>
              )}
            </p>
          </div>
        </div>

        <div className="mx-auto w-52">
          <ColorSwatch
            color={
              isColorValid(color)
                ? litDark < 0
                  ? darken(color, Math.abs(litDark))
                  : lighten(color, litDark)
                : new Color("")
            }
          />
        </div>
      </div>
      <CodeSample code={codeSample} />
    </div>
  );
}

export default LightenDarken;
