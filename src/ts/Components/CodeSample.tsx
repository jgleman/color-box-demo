import CopyToClipboard from "@components/CopyToClipboard";

interface CodeSampleProps {
  code: string;
}

function CodeSample({ code }: CodeSampleProps) {
  return (
    <div className="relative mx-auto rounded bg-[#272822] px-4 py-8 text-[#f8f8f2]">
      <pre className="overflow-auto">{code}</pre>
      <span className="absolute bottom-1 right-1  h-5 w-5 rounded">
        <CopyToClipboard label="code sample" value={code} />
      </span>
    </div>
  );
}

export default CodeSample;
