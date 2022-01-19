import React from 'react';

import MainPage from './Components/MainPage';

//Mantine hooks
import { MantineProvider } from '@mantine/core';

//Component content
const App = () => {
    
    return (
        <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles>
            <MainPage />
        </MantineProvider>
    );
};

export default App; //Export component