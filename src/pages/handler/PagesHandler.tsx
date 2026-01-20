import { usePage } from "../../contexts/pages/hooks";
import { Pages } from "./types";
import Welcome from "../views/welcome";
import Jurimetry from "../views/jurimetry";
import { JurimetryProvider } from "../../contexts/jurimetry/JurimetryContext";

function PagesHandler() {
  const { currentPage } = usePage();

  if (currentPage === Pages.Welcome) {
    return <Welcome />;
  }

  if (currentPage === Pages.Jurimetry) {
    return (
      <JurimetryProvider>
        <Jurimetry />
      </JurimetryProvider>
    );
  }

  return <Welcome />;
}

export default PagesHandler;
