import {
  forwardRef,
  Ref,
  useImperativeHandle,
  useRef,
  MouseEvent,
} from "react";

interface RefObject {
  handleUpdateProgressWith: (percent: number) => void;
}

interface ProgressBarProps {
  handleChangeProgressWidth: (offsetX: number, clientWidth: number) => void;
}

const ProgressBar = (
  { handleChangeProgressWidth }: ProgressBarProps,
  ref: Ref<RefObject>
) => {
  const progresBarRef = useRef<HTMLDivElement>(null);
  const progresAreaRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => ({ handleUpdateProgressWith }));

  function handleUpdateProgressWith(perent: number) {
    if (progresBarRef.current) {
      progresBarRef.current.style.width = perent + "%";
    }
  }

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (progresAreaRef.current) {
      handleChangeProgressWidth(
        e.nativeEvent.offsetX,
        progresAreaRef.current.clientWidth
      );
    }
  };
  return (
    <div
      ref={progresAreaRef}
      onClick={handleClick}
      className="progress-area absolute z-30 left-0 -top-1 lg:-top-2 w-full progress-area flex-1 h-2 rounded-lg bg-text-2 cursor-pointer"
    >
      <div
        ref={progresBarRef}
        className="progress-bar w-0 h-full bg-gradient-to-r from-[rgb(255,85,62)] to-[rgb(255,0,101)] rounded-lg"
      ></div>
    </div>
  );
};
export default forwardRef(ProgressBar);
