import React from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";

import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import IconButton from "@material-ui/core/IconButton";

import Title from "../Dashboard/Title";
import {
  SeasonModalWithCreate,
  SeasonModalWithEdit,
} from "./WithMutationModal";
import { seasons } from "../constants/constants";

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

const DELETE_SEASON_NOTE_MUTATION = gql`
  mutation DeleteSeasonNotes($id: ID!) {
    deleteSeasonNotes(where: { id: $id }) {
      id
    }
  }
`;

const styles = (theme) => ({
  tr: {
    display: "block",
    margin: theme.spacing(0.5, 0),
    borderRadius: theme.spacing(0.5, 0.5, 0, 0),
    "&:hover": {
      backgroundColor: theme.palette.grey[300],
    },
  },
  td: {
    padding: theme.spacing(0, 1),
  },
  titleBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export class SeasonNotes extends React.Component {
  emptyNote = {
    year: new Date().getFullYear(),
    season: seasons[0], //Spring
    notes: null,
  };
  state = {
    isEditModalOpen: false,
    isCreateModalOpen: false,
    noteOpen: this.emptyNote,
  };

  handleModal = (row) => {
    this.setState({
      noteOpen: row ? row : this.emptyNote,
      isEditModalOpen: !this.state.isEditModalOpen,
    });
  };

  handleCreateModal = () => {
    this.setState({
      isCreateModalOpen: !this.state.isCreateModalOpen,
    });
  };

  render() {
    const { data, classes, deleteSeasonNotes } = this.props;
    const { isEditModalOpen, isCreateModalOpen, noteOpen } = this.state;

    return (
      <div>
        <div className={classes.titleBar}>
          <Title>Season Notes</Title>
          <IconButton
            color="secondary"
            aria-label="add a note"
            onClick={() => this.handleCreateModal()}
            disableRipple={true}
          >
            <AddCircleOutlineIcon />
          </IconButton>
        </div>
        <SeasonModalWithEdit
          isModalOpen={isEditModalOpen}
          handleModal={this.handleModal}
          handleDeleteMutation={deleteSeasonNotes}
          note={noteOpen}
        />
        <SeasonModalWithCreate
          isModalOpen={isCreateModalOpen}
          handleModal={this.handleCreateModal}
          note={noteOpen}
        />
        <Table size="small">
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.id}
                className={classes.tr}
                onClick={() => this.handleModal(row)}
              >
                <TableCell className={classes.td}>
                  <div>
                    <p>
                      {row.year} - {row.season}
                    </p>
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
          return (
            <Mutation mutation={DELETE_SEASON_NOTE_MUTATION}>
              {(deleteSeasonNotes) =>(
                  <SeasonNotes
                  data={seasonNoteses}
                  classes={classes}
                  deleteSeasonNotes={deleteSeasonNotes}
                />
              )
              }
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(NotesQuery);
