import React from "react";
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';



export default function ChickenDetail({open, handleClose, chicken, authenticated=false}) {
    return <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
            component: 'form',
            onSubmit: (event) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const formJson = Object.fromEntries(formData.entries());
                const email = formJson.email;
                console.log(email);
                handleClose();
            },
        }}
        fullWidth={'lg'}
    >
        <DialogTitle>Details for {chicken.name}:</DialogTitle>
        <DialogContent>
            <TextField id="farm" label="Farm" variant="standard" fullWidth={true} value={chicken.FarmName} inputProps={{readOnly:true}} sx={{m:2}}/>
            <TextField id="name" label="Name" variant="standard" fullWidth={true} defaultValue={chicken.name} disabled={!authenticated} sx={{m:2}}/>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker id="hatchDate" label="Hatched" variant="standard" fullWidth={true} value={dayjs(chicken.hatchdate)} disabled={!authenticated} maxDate={dayjs()} sx={{m:2}}/>
            </LocalizationProvider>
            <InputLabel id="breed-label">Breed</InputLabel>
            <Select
                labelId="breed-label"
                id="breed"
                value={chicken.breed}
                label="Breed"
                sx={{m:2}}
                fullWidth={true}
            >
                <MenuItem value="Orpington">Orpington</MenuItem>
                <MenuItem value="Speckled Sussex">Speckled Sussex</MenuItem>
                <MenuItem value="Araucana">Araucana</MenuItem>
                <MenuItem value="Leghorn">Leghorn</MenuItem>
                <MenuItem value="Rhode Island Red">Rhode Island Red</MenuItem>
            </Select>
            <InputLabel id="eggcolor-label">Egg Color</InputLabel>
            <Select
                labelId="eggcolor-label"
                id="eggcolor"
                value={chicken.eggcolor}
                label="Egg Color"
                sx={{m:2}}
                fullWidth={true}
            >
                <MenuItem value="brown">Brown</MenuItem>
                <MenuItem value="white">White</MenuItem>
                <MenuItem value="green">Green</MenuItem>
            </Select>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>OK</Button>
        </DialogActions>
    </Dialog>
};