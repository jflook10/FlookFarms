import React, {useState, useEffect} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from "@material-ui/core/Button";

import {seasons} from '../constants/constants'
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';

//TODO move out dupl styles
const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        borderRadius: [4],
        padding: theme.spacing(2, 4, 3),
        width: "100%",
        margin: theme.spacing(2),
        maxWidth: [500],
        minWidth: [200],
        '&:focus': {
            outline: 'none'
        }
    },
    form:{
        display: 'flex',
        flexDirection: 'column',
    },
    formField:{
        margin: theme.spacing(1)
    },
    buttonGroup:{
        display: 'flex',
        justifyContent: 'flex-end',
        width: '100%',
    },
    saveButton:{
        marginRight: theme.spacing(1)
    }
}));

const SeasonModal =({note, mutate, isModalOpen, handleModal, handleDeleteMutation}) => {

    const classes = useStyles();
    //TODO need modal error on no year, required field
    // const [modalError, setModalError] = useState(false)
    const [yearHook, setYear] = useState(note.year)
    const [seasonHook, setSeason] = useState(note.season)
    const [noteHook, setNote] = useState(note.notes)

    useEffect(() => {
        setYear(note.year)
        setSeason(note.season)
        setNote(note.notes)
    } ,[note])

    const handleSubmit = e => {
        e.preventDefault()

        const input = {
          year: parseInt(yearHook),
          season: seasonHook,
          notes: noteHook,
        }

        mutate({ variables: {input: input, id: note.id}})
        handleModal() //TODO error handling for if/when to close
    }

    const onClickDelete = () => {
        handleDeleteMutation({ variables: {id: note.id}})
        handleModal()
    }

    const header = handleDeleteMutation ? "Update season notes" : "Create a season note"

    return (
            <Modal
                aria-labelledby="seasonModal-title"
                className={classes.modal}
                open={isModalOpen}
                onClose={handleModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={isModalOpen}>
                    <div className={classes.paper}>
                        <h2 data-testid="seasonModal-title">{header}</h2>
                        <form onSubmit={e => handleSubmit(e)} className={classes.form} noValidate autoComplete="off">
                            <TextField
                                className={classes.formField}
                                data-testid="seasonModal-textField-year"
                                label="Year"
                                variant="outlined"
                                color="secondary"
                                defaultValue={yearHook}
                                type="number"
                                onChange={e => setYear(e.target.value)}
                            />
                            <FormControl variant="outlined" className={classes.formField}>
                                <InputLabel id="seasonModal-label-season">Season</InputLabel>
                                <Select
                                    labelId="seasonModal-label-season"
                                    data-testid="seasonModal-select-season"
                                    value={seasonHook}
                                    onChange={e => setSeason(e.target.value)}
                                    label="Season"
                                >
                                    {seasons.map(season => <MenuItem value={season} key={season}>{season}</MenuItem>)}
                                </Select>
                            </FormControl>
                            <TextField
                                className={classes.formField}
                                data-testid="seasonModal-textField-note"
                                label="Note"
                                variant="outlined"
                                color="secondary"
                                defaultValue={noteHook}
                                multiline={true}
                                rows={5}
                                rowsMax={20}
                                onChange={e => setNote(e.target.value)}
                            />
                            <div className={classes.buttonGroup}>
                                {
                                    handleDeleteMutation ? <IconButton onClick={() => onClickDelete()} disableRipple={true}>
                                        <DeleteIcon />
                                    </IconButton> : null
                                }

                                <Button type="submit" variant="contained" color="primary" className={classes.saveButton} disableRipple={true}>Save</Button>
                                <Button onClick={() => handleModal()} disableRipple={true}>Cancel</Button>
                            </div>
                        </form>
                    </div>
                </Fade>
            </Modal>
    );
}

export default SeasonModal

