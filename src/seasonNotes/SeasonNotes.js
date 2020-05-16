import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import Title from "../Dashboard/Title";

const NOTES_QUERY = gql`
  query getNotes {
    seasonNoteses {
      id
      year
      season
      notes
    }
  }
`;

const styles = (theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
});

export class PlantedTable extends React.Component {
    render() {
        const { data } = this.props;

        return (
            <div>
                <Title>Season Notes</Title>
                <Table size="small">
                    <TableBody>
                        {data.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>
                                    <div>
                                        <p>{row.year} - {row.season}</p>
                                        <p>{row.notes}</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    }
}

export class NotesQuery extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <Query query={NOTES_QUERY}>
                {({ loading, data }) => {
                    if (loading) return "Loading...";
                    const { seasonNoteses } = data;
                    return <PlantedTable data={seasonNoteses} classes={classes} />;
                }}
            </Query>
        );
    }
}

export default withStyles(styles)(NotesQuery);
