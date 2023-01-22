import Duplicate from "@components/Images/Duplicate";

interface CopyToClipboardProps {
  value: string;
}

function CopyToClipboard({ value }: CopyToClipboardProps) {
  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(
      function () {
        // eventually, add logic to temp change the UI to indicate copy was successful
      },
      function (e) {
        console.log({ e });
      }
    );
  }

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        copyToClipboard(value);
      }}
      className="group h-5 w-5 rounded transition-all"
    >
      <span className="sr-only">Copy {value} to clipbaord</span>
      <Duplicate
        title={`Copy ${value} to clipboard`}
        className="h-4 w-4 stroke-zinc-400 transition-all group-hover:stroke-blue-400"
      />
    </button>
  );
}

export default CopyToClipboard;
