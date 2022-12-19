import { Dimensions } from "react-native";

import { useState, useEffect } from "react";

export default function windowDimensions() {
  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 16 * 2
  );

  useEffect(() => {
    const event = Dimensions.addEventListener("change", ({ window }) => {
      const currentWidth = window.width - 16 * 2;
      setDimensions(currentWidth);
    });
    return () => {
      event.remove();
    };
  }, []);

  return dimensions;
}
