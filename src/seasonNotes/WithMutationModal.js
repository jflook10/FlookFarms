import React from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo"
import SeasonModal from "./SeasonModal";



const UPDATE_SEASON_MUTATION = gql`
mutation EditSeason($input: SeasonNotesUpdateInput!, $id:ID!){
  updateSeasonNotes(
    where: {
      id: $id
    }
    data: $input
    )
   {
    id
  }
}
`

const CREATE_SEASON_MUTATION = gql`
mutation CreateSeasonNote($input: SeasonNotesCreateInput!){
  createSeasonNotes(
    data: $input
    )
   {
    id
  }
}
`

export class SeasonModalWithEdit extends React.Component {

    render() {
        return(
            <Mutation mutation={UPDATE_SEASON_MUTATION}>
                {
                    (updateSeasonNote, {data}) => <SeasonModal {...this.props} mutate={updateSeasonNote} data={data}/>
                }
            </Mutation>
        )
    }
}

export class SeasonModalWithCreate extends React.Component {
    render() {
        return(
            <Mutation mutation={CREATE_SEASON_MUTATION}>
                {
                    (createSeasonNote, {data}) => <SeasonModal {...this.props} mutate={createSeasonNote} data={data}/>
                }
            </Mutation>
        )
    }
}


