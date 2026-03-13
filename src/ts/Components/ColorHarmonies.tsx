import { useState, useMemo } from "react";
import {
  Color,
  analogous,
  triadic,
  splitComplement,
  isColorValid,
} from "@jgleman/color-box";

import ColorSwatch from "@components/ColorSwatch";
import CodeSample from "@components/CodeSample";

type HarmonyType = "analogous" | "triadic" | "splitComplement";

const harmonyFns = { analogous, triadic, splitComplement };
const harmonyLabels: Record<HarmonyType, string> = {
  analogous: "Analogous",
  triadic: "Triadic",
  splitComplement: "Split-Complement",
};
const swatchLabels = ["Base", "Color 2", "Color 3"];

function ColorHarmonies() {
  const [color, setColor] = useState("steelblue");
  const [harmonyType, setHarmonyType] = useState<HarmonyType>("analogous");

  const baseColor = useMemo(() => new Color(color), [color]);

  const harmonyColors = isColorValid(baseColor)
    ? harmonyFns[harmonyType](baseColor)
    : null;

  const codeSample = `const color = new Color("${color}");\nconst [c1, c2, c3] = ${harmonyType}(color);`;

  return (
    <div className="mx-2 my-4 rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm md:mx-auto md:w-11/12 md:max-w-3xl md:p-8">
      <p className="mb-4 text-zinc-700">
        Explore color harmony relationships.
      </p>
      <div className="mb-6 flex flex-col gap-6 sm:flex-row sm:justify-between">
        <div className="w-52 flex-none">
          <label
            htmlFor="harmonycolor"
            className="text-md uppercase text-zinc-700"
          >
            Color
          </label>
          <input
            id="harmonycolor"
            name="harmonycolor"
            className="mb-4 w-full rounded border px-2 py-1.5 shadow-inner"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
          <div className="flex flex-col gap-1">
            {(Object.keys(harmonyLabels) as HarmonyType[]).map((type) => (
              <button
                key={type}
                onClick={() => setHarmonyType(type)}
                className={`rounded-lg px-3 py-1.5 text-left text-sm transition-colors ${
                  harmonyType === type
                    ? "bg-teal-100 font-medium text-teal-800"
                    : "text-zinc-600 hover:bg-zinc-100"
                }`}
              >
                {harmonyLabels[type]}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-4 sm:justify-end">
          {harmonyColors ? (
            harmonyColors.map((c, i) => (
              <ColorSwatch key={i} color={c} label={swatchLabels[i]} />
            ))
          ) : (
            <p className="text-zinc-400">Enter a valid color</p>
          )}
        </div>
      </div>
      <CodeSample code={codeSample} />
    </div>
  );
}

export default ColorHarmonies;
