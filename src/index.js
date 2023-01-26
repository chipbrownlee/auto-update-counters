import { select, csv } from "d3";
// import moment from "moment/min/moment.min";
// import numeral from "numeral/min/numeral.min";
import { format } from 'date-fns';

Promise.all([
  csv("https://raw.githubusercontent.com/chipbrownlee/aprdata/main/Charts/cases.csv"),
  csv("https://raw.githubusercontent.com/chipbrownlee/aprdata/main/Charts/deaths.csv"),
  csv("https://raw.githubusercontent.com/chipbrownlee/aprdata/main/Charts/hospitalizations.csv"),
  csv("https://raw.githubusercontent.com/chipbrownlee/aprdata/main/Charts/tests.csv"),
]).then(function (values) {
  let lastRowCases = values[0].slice(-1)[0];
  let lastRowDeaths = values[1].slice(-1)[0];
  let lastRowHospitalized = values[2].slice(-1)[0];
  let lastRowPositivity = values[3].slice(-1)[0];

  let date = format(new Date(lastRowCases.Date), 'MMMM dd, yyyy');
  let hospitalDate = format(new Date(lastRowHospitalized.Date), 'MMMM dd, yyyy');

  let cumulativeCases = (d) => {
    let cumulativeCases = Number(lastRowCases["Cumulative cases"]);
    return cumulativeCases.toLocaleString()
  };

  let cumulativeDeaths = (d) => {
    let cumulativeDeaths = Number(lastRowDeaths["Cumulative deaths"]);
    return cumulativeDeaths.toLocaleString()
  };

  let hospitalizedDaily = (d) => {
    let hospitalizedDaily = Number(lastRowHospitalized["Hospitalized daily"]);
    return hospitalizedDaily.toLocaleString()
  };

  let lastweekcases = (d) => {
    let lastweekcases = Number(lastRowCases["Cases in the last 7 days"]);
    return lastweekcases.toLocaleString()
  };

  let positivityRate = lastRowPositivity["7-day positivity rate"];

  select("#elementId1").select("h2").text("This data last updated on " + date + ". Hospitalizations data updated on " + hospitalDate + ".");
  select("#elementId2").select("h2").text(cumulativeCases);
  select("#elementId3").select("h2").text(cumulativeDeaths);
  select("#elementId4").select("h2").text(hospitalizedDaily);
  select("#elementId5").select("h2").text(positivityRate);
  select("#elementId6").select("h2").text(lastweekcases);
});