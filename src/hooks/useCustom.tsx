import { useEffect, useState } from "react";

function useCustom() {
  const [conut, setCount] = useState("");
  useEffect(() => {
    setCount(
      "hello change make in this components will be added in that section",
    );
  }, []);
  return conut;
}

export default useCustom;
