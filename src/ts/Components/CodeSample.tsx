function CodeSample(props: any) {
  return (
    <pre className="mx-auto rounded bg-[#272822] px-4 py-4 text-[#f8f8f2] md:w-4/5">
      {props.children}
    </pre>
  );
}

export default CodeSample;
