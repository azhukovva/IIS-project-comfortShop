import { useLocation } from "react-router-dom";

/*
 * Custom hook that returns breadcrumb items based on the current URL
 */
const useBreadcrumb = () => {
  const location = useLocation();

  // Split the path into segments
  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment);

  const breadcrumbItems = pathSegments.map((segment, index) => {
    // Create URL for each segment
    const url = segment === "categories" ? "/categories/#categories" : `/${pathSegments.slice(0, index + 1).join("/")}`;
    const title = segment
      .replace(/-/g, "&") // Replace hyphens with space
      .replace(/\b\w/g, (char) => char.toUpperCase());

    return {
      title: title,
      url: url,
    };
  });
  return breadcrumbItems;
};

export default useBreadcrumb;
