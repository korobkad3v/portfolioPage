import { useRef, useEffect } from "react";

function ScrollBox() {
  const boxRef = useRef(null);

  useEffect(() => {
    const box = boxRef.current;

    const handleScroll = () => {
      const scrollTop = box.scrollTop;
      const scrollHeight = box.scrollHeight;
      const clientHeight = box.clientHeight;
      const maxScroll = scrollHeight - clientHeight;

      const progress = scrollTop / maxScroll;
      console.log("Scroll progress:", progress);
    };

    box.addEventListener("scroll", handleScroll);
    return () => box.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={boxRef}
      style={{
        height: "300px",
        overflowY: "auto",
        border: "1px solid black",
      }}
    >
      <div style={{ height: "1000px", padding: "10px" }}>
        <p>scroll content</p>
      </div>
    </div>
  );
}
export default ScrollBox;