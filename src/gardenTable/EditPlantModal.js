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

const UPDATE_PLANT_MUTATION = gql`
mutation EditPlant($id:ID!, $input: GardenAppUpdateInput!){
  updateGardenApp(
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

const EditPlantModal =({plant, mutate}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [modalError, setModalError] = React.useState(false)
  const [plantingLocation, setPlantingLocation] = React.useState(plant.plantingLocation);
  const [seededDate, setSeededDate] = React.useState(plant.seededDate);
  const [plantedDate, setPlantedDate] = React.useState(plant.plantedDate);
  const [harvestNotes, setHarvestNotes] = React.useState(plant.harvestNotes);
  const [germenationNotes, setGermenationNotes] = React.useState(plant.germenationNotes);
  const [variety, setVariety] = React.useState(plant.variety);
  const [vendor, setVendor] = React.useState(plant.seedVendor);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const changeVariety = value => {
    setVariety(value)
    if(value.length < 1) setModalError(true)
    if(modalError && value.length > 1) setModalError(false)
  }
  const getFormattedDate = date => {
    const yyyyMMdd = date.slice(0,10)
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
      germenationNotes: germenationNotes,
      seededDate: getISODate(seededDate)
    }

    mutate({ variables: {id: plant.id, input: input}})
    handleClose() //TODO error handling for if/when to close
  }

  return (
    <div>
      <IconButton onClick={handleOpen}>
        <CreateIcon />
      </IconButton>
      <Modal
          aria-labelledby="editPlantModal-title"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 data-testid="editPlantModal-title">Update your plant history</h2>
            <form onSubmit={e => handleSubmit(e)} className={classes.form} noValidate autoComplete="off">
              <TextField
                  className={classes.formField}
                  data-testid="editPlantModal-textField-variety"
                  label="Variety"
                  variant="outlined"
                  color="secondary"
                  defaultValue={variety}
                  onChange={e => changeVariety(e.target.value)}
              />
              <TextField
                  className={classes.formField}
                  data-testid="editPlantModal-textField-seeded"
                  label="Seeded Date"
                  variant="outlined"
                  color="secondary"
                  type="date"
                  defaultValue={getFormattedDate(seededDate)}
                  onChange={e => setSeededDate(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
              />
              <TextField
                  className={classes.formField}
                  data-testid="editPlantModal-textField-transplant"
                  label="Transplant Date"
                  variant="outlined"
                  color="secondary"
                  type="date"
                  defaultValue={getFormattedDate(plantedDate)}
                  onChange={e => setPlantedDate(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
              />
              <FormControl variant="outlined" className={classes.formField}>
                <InputLabel id="editPlantModal-label-location">Planting Location</InputLabel>
                <Select
                    labelId="editPlantModal-label-location"
                    data-testid="editPlantModal-select-location"
                    value={plantingLocation}
                    onChange={e => setPlantingLocation(e.target.value)}
                    label="Planting Location"
                >
                  {locations.map(loc => <MenuItem value={loc} key={loc}>{loc}</MenuItem>)}
                </Select>
              </FormControl>
              <FormControl variant="outlined" className={classes.formField}>
                <InputLabel id="editPlantModal-label-location">Seed Vendor</InputLabel>
                <Select
                    labelId="editPlantModal-label-vendor"
                    data-testid="editPlantModal-select-vendor"
                    value={vendor}
                    onChange={e => setVendor(e.target.value)}
                    label="Seed Vendor"
                >
                  {vendors.map(vendor => <MenuItem value={vendor} key={vendor}>{vendor}</MenuItem>)}
                </Select>
              </FormControl>
              <TextField
                  className={classes.formField}
                  data-testid="editPlantModal-textField-germination"
                  label="Germination Notes"
                  variant="outlined"
                  color="secondary"
                  multiline={true}
                  defaultValue={germenationNotes}
                  onChange={e => setGermenationNotes(e.target.value)}
              />
              <TextField
                  className={classes.formField}
                  data-testid="editPlantModal-textField-harvest"
                  label="Harvest Notes"
                  variant="outlined"
                  color="secondary"
                  multiline={true}
                  defaultValue={harvestNotes}
                  onChange={e => setHarvestNotes(e.target.value)}
              />
              <div className={classes.buttonGroup}>
                <Button disabled={modalError} type="submit" variant="contained" color="primary" className={classes.saveButton}>Save</Button>
                <Button onClick={handleClose}>Cancel</Button>
              </div>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export class EditPlantModalWithMutate extends React.Component {
  render() {
    return(
        <Mutation mutation={UPDATE_PLANT_MUTATION}>
          {
            (updateGardenApp, {data}) => <EditPlantModal {...this.props} mutate={updateGardenApp} data={data}/>
          }
        </Mutation>
    )
  }
}

export default EditPlantModalWithMutate

