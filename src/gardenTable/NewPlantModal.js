import React from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo"

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

import { locations, vendors } from '../constants/constants'

const CREATE_PLANT_MUTATION = gql`
mutation CreatePlant($input: GardenAppCreateInput!){
  createGardenApp(
    data: $input
    )
   {
    id
  }
}
`

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

const EditPlantModal =({mutate, isModalOpen, handleModal}) => {
    const classes = useStyles();
    const [modalError, setModalError] = React.useState(true)
    const [plantingLocation, setPlantingLocation] = React.useState(locations[0]);
    const [seededDate, setSeededDate] = React.useState(null);
    const [plantedDate, setPlantedDate] = React.useState(null);
    const [harvestNotes, setHarvestNotes] = React.useState(null);
    const [germinationNotes, setGermenationNotes] = React.useState(null);
    const [variety, setVariety] = React.useState(null);
    const [vendor, setVendor] = React.useState(vendors[0]);

    const changeVariety = value => {
        setVariety(value)
        if(value.length < 1) setModalError(true)
        if(modalError && value.length > 1) setModalError(false)
    }
    const getFormattedDate = () => {
        const currentDate = new Date().toISOString()
        const yyyyMMdd = currentDate.slice(0,10)
        console.log(yyyyMMdd, "YYYYMMDD")
        return yyyyMMdd
    }

    const handleSubmit = (e) => {
        const getISODate = date => {
            return  new Date(date).toISOString()
        }  //TODO maybe could pull this out as a util with other date funcs?
        e.preventDefault()

        const input = {
            plantedDate: getISODate(plantedDate),
            plantingLocation,
            harvestNotes,
            variety,
            seedVendor: vendor,
            germinationNotes: germinationNotes,
            seededDate: getISODate(seededDate)
        }

        mutate({ variables: {input: input}})
        handleModal() //TODO error handling for if/when to close
    }

    return <Modal
                aria-labelledby="createPlantModal-title"
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
                        <h2 data-testid="createPlantModal-title">Create a new plant history</h2>
                        <form onSubmit={e => handleSubmit(e)} className={classes.form} noValidate autoComplete="off">
                            <TextField
                                className={classes.formField}
                                data-testid="createPlantModal-textField-variety"
                                label="Variety"
                                variant="outlined"
                                color="secondary"
                                defaultValue={variety}
                                onChange={e => changeVariety(e.target.value)}
                            />
                            <TextField
                                className={classes.formField}
                                data-testid="createPlantModal-textField-seeded"
                                label="Seeded Date"
                                variant="outlined"
                                color="secondary"
                                type="date"
                                defaultValue={getFormattedDate()}
                                onChange={e => setSeededDate(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                className={classes.formField}
                                data-testid="createPlantModal-textField-transplant"
                                label="Transplant Date"
                                variant="outlined"
                                color="secondary"
                                type="date"
                                defaultValue={getFormattedDate()}
                                onChange={e => setPlantedDate(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <FormControl variant="outlined" className={classes.formField}>
                                <InputLabel id="createPlantModal-label-location">Planting Location</InputLabel>
                                <Select
                                    labelId="createPlantModal-label-location"
                                    data-testid="createPlantModal-select-location"
                                    value={plantingLocation}
                                    onChange={e => setPlantingLocation(e.target.value)}
                                    label="Planting Location"
                                >
                                    {locations.map(loc => <MenuItem value={loc} key={loc}>{loc}</MenuItem>)}
                                </Select>
                            </FormControl>
                            <FormControl variant="outlined" className={classes.formField}>
                                <InputLabel id="createPlantModal-label-location">Seed Vendor</InputLabel>
                                <Select
                                    labelId="createPlantModal-label-vendor"
                                    data-testid="createPlantModal-select-vendor"
                                    value={vendor}
                                    onChange={e => setVendor(e.target.value)}
                                    label="Seed Vendor"
                                >
                                    {vendors.map(vendor => <MenuItem value={vendor} key={vendor}>{vendor}</MenuItem>)}
                                </Select>
                            </FormControl>
                            <TextField
                                className={classes.formField}
                                data-testid="createPlantModal-textField-germination"
                                label="Germination Notes"
                                variant="outlined"
                                color="secondary"
                                multiline={true}
                                defaultValue={germinationNotes}
                                onChange={e => setGermenationNotes(e.target.value)}
                            />
                            <TextField
                                className={classes.formField}
                                data-testid="createPlantModal-textField-harvest"
                                label="Harvest Notes"
                                variant="outlined"
                                color="secondary"
                                multiline={true}
                                defaultValue={harvestNotes}
                                onChange={e => setHarvestNotes(e.target.value)}
                            />
                            <div className={classes.buttonGroup}>
                                <Button disabled={modalError} type="submit" variant="contained" color="primary" className={classes.saveButton} disableRipple={true}>Save</Button>
                                <Button onClick={() => handleModal()} disableRipple={true}>Cancel</Button>
                            </div>
                        </form>
                    </div>
                </Fade>
            </Modal>
}

export class EditPlantModalWithMutate extends React.Component {
    render() {
        return(
            <Mutation mutation={CREATE_PLANT_MUTATION}>
                {
                    (createGardenApp, {data}) => <EditPlantModal {...this.props} mutate={createGardenApp} data={data}/>
                }
            </Mutation>
        )
    }
}

export default EditPlantModalWithMutate

