import React, { useEffect, useState } from 'react';
import { getConfig } from "../config";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useAuth0 } from "@auth0/auth0-react";
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ChickenDetail from '../components/ChickenDetail';


export default function ChickenList() {
    const { user, isAuthenticated, loginWithRedirect, logout, } = useAuth0();
    const { audience } = getConfig();

    const [state, setState] = useState({
        showResult: false,
        apiMessage: "",
        error: null,
    });

    const [data, setData] = useState([]);    
    const [open, setOpen] = useState(false);
    const [selectedChicken, setSelectedChicken] = useState({});

    const handleClickOpen = (chicken) => {
        console.log(chicken);
        setSelectedChicken(chicken);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_ORIGIN}/api/chickens`)
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => setState({
                ...state,
                error: "Error getting the list of chickens!",
            }));
    }, []);

    return (
        <div>
            {isAuthenticated && (
                <Button variant="outlined" startIcon={<AddCircleIcon />} sx={{ m: 2 }}>
                    Add Chicken
                </Button>
            )}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Farm</TableCell>
                            <TableCell>ID</TableCell>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Breed</TableCell>
                            <TableCell align="center">Egg Color</TableCell>
                            <TableCell align="center">Age (months)</TableCell>
                            <TableCell align="center">Height (cm)</TableCell>
                            <TableCell align="center">Weight (kg)</TableCell>
                            <TableCell align="center">Health Score</TableCell>
                            <TableCell align="center">Days Since Last Checkup</TableCell>
                            <TableCell align="center">Check-in Count</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>{row.FarmName}</TableCell>
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell align="center">
                                    <Button onClick={() => handleClickOpen(row)}>{row.name}</Button>
                                </TableCell>
                                <TableCell align="center">{row.breed}</TableCell>
                                <TableCell align="center">{row.eggcolor}</TableCell>
                                <TableCell align="center">{row.age}</TableCell>
                                <TableCell align="center">{row.height}</TableCell>
                                <TableCell align="center">{row.weight}</TableCell>
                                <TableCell align="center">{row.healthscore}</TableCell>
                                <TableCell align="center">{row.DaysSinceLastCheckup}</TableCell>
                                <TableCell align="center">{row.checkincount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <ChickenDetail open={open} handleClose={handleClose} chicken={selectedChicken} authenticated={isAuthenticated}/>
        </div>
    );
};