import Grid from "./common/grid-component";
import ClickReportSection from "./section/click-report-section";
import CreateLinkSection from "./section/create-link-section";
import LinkResultSection from "./section/link-result-section";

const Main = () => (
  <div className="px-20 py-10">
    <Grid type="container" column={3}>
      <Grid type="item">
        <CreateLinkSection />
      </Grid>
      <Grid type="item" width={2}>
        <LinkResultSection />
      </Grid>
      <Grid type="item" width={3}>
        <ClickReportSection />
      </Grid>
    </Grid>
  </div>
);

export default Main;
