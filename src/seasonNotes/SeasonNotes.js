import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import Title from "../Dashboard/Title";
import SeasonModalWithMutate from "./SeasonModal";
import {seasons} from "../constants/constants";

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
    tr: {
        display: 'block',
        margin: theme.spacing(.5, 0),
        borderRadius: theme.spacing(.5, .5, 0, 0),
        '&:hover': {
            backgroundColor: theme.palette.grey[300],
        }
    },
    td: {
        padding: theme.spacing(0, 1),
    }
});

export class SeasonNotes extends React.Component {
    emptyNote= {
        year: new Date().getFullYear(),
        season: seasons[0], //Spring
        notes: ""
    }
    state={
        isModalOpen: false,
        noteOpen: this.emptyNote,
    }

    handleModal= row => {
        this.setState({
            noteOpen: row ? row : this.emptyNote,
            isModalOpen: !this.state.isModalOpen,
        })

    }

    render() {
        const { data, classes } = this.props
        const { isModalOpen, noteOpen} = this.state

        return (
            <div>
                <Title>Season Notes</Title>
                <SeasonModalWithMutate isModalOpen={isModalOpen} handleModal={this.handleModal} note={noteOpen}/>
                <Table size="small">
                    <TableBody>
                        {data.map((row) => (
                            <TableRow key={row.id} className={classes.tr} onClick={() => this.handleModal(row)}>
                                <TableCell className={classes.td}>
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
                    return <SeasonNotes data={seasonNoteses} classes={classes} />;
                }}
            </Query>
        );
    }
}

export default withStyles(styles)(NotesQuery);
