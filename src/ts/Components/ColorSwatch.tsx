import CopyToClipboard from "@components/CopyToClipboard";
import { Color, hexString, rgbString, hslString } from "@jgleman/color-box";

interface ColorSwatchProps {
  color: Color;
  label?: string;
}

function ColorSwatch({ color, label = "" }: ColorSwatchProps) {
  return (
    <div className="w-52">
      {label ? <p className="m-2 font-bold leading-none dark:text-zinc-200">{label}</p> : null}
      <div className="mb-2 w-full overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-600">
        <div className="dark:bg-zinc-900">
          <div
            className="h-24 w-full overflow-hidden"
            style={{ background: hexString(color) }}
          ></div>
          <div className="relative">
            <p className="w-full whitespace-nowrap pl-2 font-mono text-sm leading-8 dark:text-zinc-200">
              {hexString(color) || "\xa0"}
            </p>
            <div className="absolute right-0 bottom-0 mx-1 flex h-8 w-5 items-center">
              <CopyToClipboard value={hexString(color)} />
            </div>
          </div>
          <div className="relative">
            <p className="w-full whitespace-nowrap pl-2 font-mono text-xs leading-8 dark:text-zinc-300">
              {rgbString(color) || "\xa0"}
            </p>
            <div className="absolute right-0 bottom-0 mx-1 flex h-8 w-5 items-center">
              <CopyToClipboard value={rgbString(color)} />
            </div>
          </div>
          <div className="relative">
            <p className="w-full whitespace-nowrap pl-2 font-mono text-xs leading-8 dark:text-zinc-300">
              {hslString(color) || "\xa0"}
            </p>
            <div className="absolute right-0 bottom-0 mx-1 flex h-8 w-5 items-center">
              <CopyToClipboard value={hslString(color)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ColorSwatch;
