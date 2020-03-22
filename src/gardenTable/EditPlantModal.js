import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  form:{
    display: 'flex',
    flexDirection: 'column',
  },
  formField:{
    margin: theme.spacing(1)
  }
}));

const EditPlantModal =({plant}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

//textfield is expecting a pre-formatted date string like MM/DD/YYYY, currently a timestamp
//  "2020-02-16T00:00:00.000Z" does not conform to the required format, "yyyy-MM-dd".
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
            <form className={classes.form} noValidate autoComplete="off">
              <TextField
                  className={classes.formField}
                  data-testid="editPlantModal-textField-variety"
                  label="Variety"
                  variant="outlined"
                  color="secondary"
                  defaultValue={plant.variety}
                  helperText={"Error"}
              />
              <TextField
                  className={classes.formField}
                  data-testid="editPlantModal-textField-seeded"
                  label="Seeded Date"
                  variant="outlined"
                  color="secondary"
                  type="date"
                  defaultValue={plant.seededDate}
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
                  defaultValue={plant.plantedDate}
                  InputLabelProps={{
                    shrink: true,
                  }}
              />
              <TextField
                  className={classes.formField}
                  data-testid="editPlantModal-textField-location"
                  label="Planting Location"
                  variant="outlined"
                  color="secondary"
                  defaultValue={plant.plantingLocation}
                  disabled={true}
              />
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
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default EditPlantModal