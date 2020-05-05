import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import Title from "../Dashboard/Title";
import EditPlantModal from "./EditPlantModal";

const PLANTED_QUERY = gql`
  query getPlanted {
    gardenApps {
      id
      variety
      plantedDate
      seededDate
      seedVendor
      plantingLocation
      germenationNotes
      harvestNotes
    }
  }
`;

const styles = (theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
});

export class PlantedTable extends React.Component {
  renderEditButton = (row) => {
    return <EditPlantModal plant={row} />;
  };

  formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = date.getDate();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    return month + "/" + day + "/" + year;
  };

  render() {
    const { data } = this.props;

    return (
      <React.Fragment>
        <Title>Growing History</Title>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Variety</TableCell>
              <TableCell>Seeded date</TableCell>
              <TableCell>Transplant date</TableCell>
              <TableCell>Plant location</TableCell>
              <TableCell>Seed vendor</TableCell>
              <TableCell>Germination notes</TableCell>
              <TableCell>Harvest notes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{this.renderEditButton(row)}</TableCell>
                <TableCell>{row.variety}</TableCell>
                <TableCell>{this.formatDate(row.seededDate)}</TableCell>
                <TableCell>{this.formatDate(row.plantedDate)}</TableCell>
                <TableCell>{row.plantingLocation}</TableCell>
                <TableCell>{row.seedVendor}</TableCell>
                <TableCell>{row.germenationNotes}</TableCell>
                <TableCell>{row.harvestNotes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </React.Fragment>
    );
  }
}

export class PlantedQuery extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <Query query={PLANTED_QUERY}>
        {({ loading, data }) => {
          if (loading) return "Loading...";
          const { gardenApps } = data;
          return <PlantedTable data={gardenApps} classes={classes} />;
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(PlantedQuery);
