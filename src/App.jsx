import React from 'react';

//Style sheets
import './App.css';

//Mantine hooks
import { Grid, Text } from '@mantine/core';

//Component content
const App = () => {
    
    return (
        <>
            <header>
                <Grid>
                    <Grid.Col>
                        <Text align="center" size="xl" >DIFRACCIÓN</Text>
                    </Grid.Col>
                </Grid>
            </header>
        </>
    );
};

export default App; //Export component