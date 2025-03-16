import { Button, Card, CardContent, Grid2, List, Typography } from "@mui/material"
import { useSelector } from "react-redux";
import { RootState } from "../store/reduxStore";
import { useParams } from "react-router";
import { backgroundStyle, buttonStyles } from "./style";
import { useState } from "react";

const ShowRecipe = () => {
    const { id } = useParams()
    const [clicked, setClicked] = useState(false);
    const recipes = useSelector((state: RootState) => state.recipes.recipes);
    const recipe = recipes.find(recipe => recipe.id.toString() === id);
    return (<>

        {recipe ? (
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
              <Grid2 >
            <Card
                sx={{
                    borderRadius: 3,
                    boxShadow: 3,
                    ...backgroundStyle,
                    padding: 3,
                    position: "relative",
                    overflowY: "auto",
                    "& ul": { padding: 0 },
                    scrollbarWidth: "none",
                    "&::-webkit-scrollbar": { display: "none" },
                }}
            >
                
                <CardContent>
                    <Typography
                        variant="h4"
                        gutterBottom
                        sx={{ color: buttonStyles.backgroundColor, fontWeight: "bold", textAlign: "center" }}
                    >
                        {recipe.title}
                    </Typography>

                    <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                        {recipe.description}
                    </Typography>

                    <Typography
                        variant="h5"
                        gutterBottom
                        sx={{ color: buttonStyles.backgroundColor, fontWeight: "bold", mt: 2 }}
                    >
                        Ingredients
                    </Typography>
                    <ul style={{ paddingLeft: "20px" }}>
                        {recipe.ingredients.map((ingredient, index) => (
                            <li key={index}>
                                <Typography variant="body2">{ingredient}</Typography>
                            </li>
                        ))}
                    </ul>

                    <Typography
                        variant="h5"
                        gutterBottom
                        sx={{ color: buttonStyles.backgroundColor, fontWeight: "bold", mt: 2 }}
                    >
                        Instructions
                    </Typography>
                    <Typography variant="body2">{recipe.instructions}</Typography>

                    <Button
                        variant="contained"
                        sx={{
                            ...buttonStyles,
                            cursor: "pointer",
                            mt: 3,
                            width: "100%",
                            fontSize: "1rem",
                        }}
                        onClick={() => setClicked(!clicked)}
                    >
                        {clicked ? " Cook Now 👏" : "Cook Now"}
                    </Button>
                </CardContent>
            </Card>
            </Grid2></List>) : null}
    </>);
};


export default ShowRecipe