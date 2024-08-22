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
            <DatePicker id="hatchDate" label="Hatched" variant="standard" fullWidth={true} value={dayjs(chicken.hatchdate)} disabled={!authenticated} sx={{m:2}}/>
            </LocalizationProvider>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>OK</Button>
        </DialogActions>
    </Dialog>
};