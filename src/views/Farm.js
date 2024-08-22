import React, { useEffect, useState } from 'react';
import { getConfig } from "../config";
import { DataGrid } from '@mui/x-data-grid';

export default function FarmList() {
    const { audience } = getConfig();

    const [state, setState] = useState({
        showResult: false,
        apiMessage: "",
        error: null,
    });

    const [data, setData] = useState([]);

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'name',
            headerName: 'Name',
            width:'150',
            editable: true,
        },
        {
            field: 'manager',
            headerName: 'Manager',
            width:'150',
            editable: true,
        },
        {
            field: 'chickencapacity',
            headerName: 'Chicken Capacity',
            type: 'number',
            width: 150,
            editable: false,
        },
    ];


    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_ORIGIN}/api/farm`)
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => setState({
                ...state,
                error: "Error getting the list of farms!",
            }));
    }, []);

    return (
        <DataGrid
            rows={data}
            columns={columns}
            initialState={{
                pagination: {
                    paginationModel: {
                        pageSize: 10,
                    },
                },
            }}
            pageSizeOptions={[10]}
            checkboxSelection
            disableRowSelectionOnClick
        />
    );
};