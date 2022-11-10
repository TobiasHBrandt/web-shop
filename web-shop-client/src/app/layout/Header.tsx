import { AppBar, Toolbar, Typography } from "@mui/material";

export default function Headers() {
    return (
        <AppBar position="static" sx={{mb: 4}}>
            <Toolbar>
                <Typography variant="h6">
                    Web-Shop
                </Typography>
            </Toolbar>
        </AppBar>
    )
}