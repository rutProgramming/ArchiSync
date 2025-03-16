import { Outlet } from "react-router"
import RecipesList from "./recipesList"
import {  Container, Grid, Grid2, Typography } from "@mui/material"
import { backgroundStyle } from "./style"

const Recipes=()=>{
    return (<>
        <Container
            maxWidth={false}
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
                paddingTop: "64px", 
            }}
        >
            <Grid2 container spacing={2} sx={{ width: "80%", height: "80vh" ,display: "flex", alignItems: "center", justifyContent: "center"}} >
            <Grid2 size={6}  >
            <Outlet />
                </Grid2>
                <Grid2 size={6}  >
                <Typography variant="h4" align="center" gutterBottom sx={{color: "#b07d66", fontWeight: "bold"  }}>
                    Recipe List
                </Typography>
                        <RecipesList />
                </Grid2>
            </Grid2>
        </Container>
   </> )
}
export default Recipes