import { useEffect, useRef } from "react";
import CopyToClipboard from "@components/CopyToClipboard";

declare const Prism: { highlightElement: (el: Element) => void };

interface CodeSampleProps {
  code: string;
}

function CodeSample({ code }: CodeSampleProps) {
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current && typeof Prism !== "undefined") {
      codeRef.current.textContent = code;
      Prism.highlightElement(codeRef.current);
    }
  }, [code]);

  return (
    <div className="relative mx-auto rounded-xl bg-[#272822] px-5 py-6 text-[#f8f8f2]">
      <pre className="overflow-x-auto">
        <code ref={codeRef} className="language-js" style={{ whiteSpace: "pre-wrap" }} />
      </pre>
      <span className="absolute bottom-1 right-1 h-5 w-5 rounded">
        <CopyToClipboard label="code sample" value={code} />
      </span>
    </div>
  );
}

export default CodeSample;
