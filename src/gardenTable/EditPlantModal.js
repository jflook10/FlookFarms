import React from 'react';

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

import { locations } from '../constants/plantingLocation'

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

const EditPlantModal =({plant, handleSubmit}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [plantingLocation, setPlantingLocation] = React.useState(plant.plantingLocation);
  const [seededDate, setSeededDate] = React.useState(plant.seededDate);
  const [plantedDate, setPlantedDate] = React.useState(plant.plantedDate);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const changeSelect = e  => {
    console.log(e.target.value)
    setPlantingLocation(e.target.value)
  }

  const getFormattedDate = date => {
    const yyyyMMdd = date.slice(0,10)
    return yyyyMMdd
  }

  //gonna need something like this for the mutate
  // const getISODate = date => {
  //   return  new Date(date).toISOString()
  // }

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
            <form onSubmit={handleSubmit} className={classes.form} noValidate autoComplete="off">
              <TextField
                  className={classes.formField}
                  data-testid="editPlantModal-textField-variety"
                  label="Variety"
                  variant="outlined"
                  color="secondary"
                  defaultValue={plant.variety}
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
                    onChange={changeSelect}
                    label="Planting Location"
                >
                  {locations.map(loc => <MenuItem value={loc} key={loc}>{loc}</MenuItem>)}
                </Select>
              </FormControl>
              <TextField
                  className={classes.formField}
                  data-testid="editPlantModal-textField-vendor"
                  label="Vendor"
                  variant="outlined"
                  color="secondary"
                  defaultValue={plant.seedVendor}
              />
              <TextField
                  className={classes.formField}
                  data-testid="editPlantModal-textField-germination"
                  label="Germination Notes"
                  variant="outlined"
                  color="secondary"
                  multiline={true}
                  defaultValue={plant.germenationNotes}
              />
              <TextField
                  className={classes.formField}
                  data-testid="editPlantModal-textField-harvest"
                  label="Harvest Notes"
                  variant="outlined"
                  color="secondary"
                  multiline={true}
                  defaultValue={plant.harvestNotes}
              />
              <div className={classes.buttonGroup}>
                <Button type="submit" variant="contained" color="primary" className={classes.saveButton}>Save</Button>
                <Button onClick={handleClose}>Cancel</Button>
              </div>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

//mutate wrapper for EditPlantModal
//export default EditPlantModalWithMutate

export default EditPlantModal