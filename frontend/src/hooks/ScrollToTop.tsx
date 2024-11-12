import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/*
 * This component scrolls to the top of the page whenever the route changes
 * Is used in App.tsx
 */
const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
};

export default ScrollToTop;
