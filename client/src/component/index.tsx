import React from "react";

import ClickReportSection from "./section/click-report-section";
import CreateLinkSection from "./section/create-link-section";

const Main = () => (
  <div className="grid grid-cols-2 gap-4 px-20 py-20">
    <div>
      <CreateLinkSection />
    </div>
    <div className="..." />
    <div className="col-span-2">
      <ClickReportSection />
    </div>
  </div>
);

export default Main;
