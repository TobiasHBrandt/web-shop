import { TextField, debounce } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/Store/configureStore";
import { setProductParams } from "./catalogSlice";
import { useMemo, useState } from "react";

export default function ProductSearch() {
    const {productParams} = useAppSelector(state => state.catalog);
    const [searchTerm, setSearchTerm] = useState(productParams.searchTerm);
    const dispatch = useAppDispatch();

    // call the search function and only update when finish with typing in the searchfelt
    const debouncedSearch = useMemo(
        () => 
        debounce((event: any) => {
        dispatch(setProductParams({searchTerm: event.target.value}))
        }, 1000),
        [dispatch]
    );

    return (
        <TextField
            label='Search'
            variant='outlined'
            fullWidth
            value={searchTerm || ''}
            onChange={(event: any) => {
                setSearchTerm(event.target.value);
                debouncedSearch(event);
            }}
        />
    )
}