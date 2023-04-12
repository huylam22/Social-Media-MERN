import { useEffect, useRef, useState } from "react";

export default function useClickOutside(dom = "button") {
  const [show, setShow] = useState(false);
  const nodeRef = useRef(null);

  // CACH 1: DUNG USEREF
  useEffect(() => {
    function handleClickOutSide(e) {
      if (
        nodeRef.current &&
        !nodeRef.current.contains(e.target) &&
        !e.target.matches(dom)
      ) {
        setShow(false);
      }
    }
    document.addEventListener("click", handleClickOutSide);

    return () => document.removeEventListener("click", handleClickOutSide);
  }, [dom]);

  return { nodeRef, show, setShow };
}
