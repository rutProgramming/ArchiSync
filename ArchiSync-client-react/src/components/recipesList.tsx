import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/reduxStore";
import { useEffect, useState } from "react";
import { fetchRecipesGet } from "../store/recipesStore";
import { RecipeType } from "../types/types";
import { Card, CardContent, Typography, Button, Container, Grid2 as Grid, List } from "@mui/material";
import { backgroundStyle, buttonStyles } from "./style";
import { Navigate } from "react-router";

export default function RecipeViewer() {
    const dispatch = useDispatch<AppDispatch>();
    const recipes = useSelector((state: RootState) => state.recipes.recipes);
    const [selectedRecipeId, setSelectedRecipeId] = useState(0);

    useEffect(() => {
        dispatch(fetchRecipesGet());
    }, [dispatch]);

    return (
<List
    sx={{
        width: "100%",
        position: "relative",
        overflowY: "auto", 
        maxHeight: 600,
        "& ul": { padding: 0 },
        scrollbarWidth: "none", 
        "&::-webkit-scrollbar": { display: "none" }, 
    }}
    subheader={<li />}>         
      {selectedRecipeId && <Navigate to={`./ShowRecipe/${selectedRecipeId}`} />}

        <Container sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>

            <Grid >
                
                {recipes.length == 0 ? (
                    <Typography variant="h5" align="center" sx={{color: "#b07d66", fontWeight: "bold"  }}>
                        No recipes available.
                    </Typography>
                ) : (
                    recipes.map((recipe: RecipeType) => (
                        <Card 
                            key={recipe.id} 
                            sx={{ mb: 2,...backgroundStyle, transition: "0.3s", "&:hover": { boxShadow: 6 } }}
                            onClick={() => setSelectedRecipeId(recipe.id)}
                        >
                            <CardContent>
                                <Typography variant="h6" sx={{color:"#d8b6a4",fontWeight:"bold"}}>{recipe.title}</Typography>
                                <Button 
                                    variant="contained" 
                                    fullWidth 
                                    sx={buttonStyles}
                                    onClick={() => setSelectedRecipeId(recipe.id)}
                                >
                                    View Recipe
                                </Button>
                            </CardContent>
                        </Card>
                    ))
                )}
            </Grid>

        </Container>
        </List>
    );
}