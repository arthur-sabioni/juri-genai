import { usePage } from "./hooks";
import { Pages } from "./types";
import Welcome from "../views/Welcome";
import Jurimetry from "../views/Jurimetry";

function PagesHandler() {
  const { currentPage } = usePage();

  if (currentPage === Pages.Welcome) {
    return <Welcome />;
  }

  if (currentPage === Pages.Jurimetry) {
    return <Jurimetry />;
  }

  return <Welcome />;
}

export default PagesHandler;
