import CopyToClipboard from "@components/CopyToClipboard";
import { Color, hexString, rgbString, hslString } from "@jgleman/color-box";

interface ColorSwatchProps {
  color: Color;
  label?: string;
}

function ColorSwatch({ color, label = "" }: ColorSwatchProps) {
  return (
    <div className="w-52">
      {label ? <p className="m-2 font-bold leading-none">{label}</p> : null}
      <div className="mb-2 w-full overflow-hidden rounded border border-zinc-400">
        <div>
          <div
            className="h-24 w-full overflow-hidden"
            style={{ background: hexString(color) }}
          ></div>
          <div className="relative">
            <p className="w-full whitespace-nowrap pl-2 font-mono text-sm leading-8">
              {hexString(color) || "\xa0"}
            </p>
            <div className="absolute right-0 bottom-0 mx-1 flex h-8 w-5 items-center">
              <CopyToClipboard value={hexString(color)} />
            </div>
          </div>
          <div className="relative">
            <p className="w-full whitespace-nowrap pl-2 font-mono text-xs leading-8">
              {rgbString(color) || "\xa0"}
            </p>
            <div className="absolute right-0 bottom-0 mx-1 flex h-8 w-5 items-center">
              <CopyToClipboard value={rgbString(color)} />
            </div>
          </div>
          <div className="relative">
            <p className="w-full whitespace-nowrap pl-2 font-mono text-xs leading-8">
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
