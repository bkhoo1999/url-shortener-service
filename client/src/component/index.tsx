import Grid from "./common/grid-component";
import ClickReportSection from "./section/click-report-section";
import CreateLinkSection from "./section/create-link-section";

const Main = () => (
  <div className="px-20 py-20">
    <Grid type="container" column={2} spacing={4}>
      <Grid type="item">
        <CreateLinkSection />
      </Grid>
      <Grid type="item" />
      <Grid type="item" width={2}>
        <ClickReportSection />
      </Grid>
    </Grid>
  </div>
);

export default Main;
