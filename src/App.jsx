import React from 'react';

//Custom components
import DifractionAngle from './Components/DifractionAngle';
import LambdaClearVariable from './Components/LambdaClearVariable';

//MathJax
import { MathJaxContext, MathJax } from 'better-react-mathjax';

//Mantine
import { Card, Grid, Title, MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';

const config = {
   loader: { load: ["[tex]/html"] },
   tex: {
     packages: { "[+]": ["html"] },
     inlineMath: [
       ["$", "$"],
       ["\\(", "\\)"]
     ],
     displayMath: [
       ["$$", "$$"],
       ["\\[", "\\]"]
     ]
   }
};



//Component content
const App = () => {
    return (
        <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles>
            <NotificationsProvider>
                <header>
                    <Card>
                        <Grid>
                            <Grid.Col>
                                <Title align="center" order={1} >Red de difracción</Title>
                                <MathJaxContext version={3} config={config} >
                                    <div className='lm' >
                                    <MathJax hideUntilTypeset={"first"} >
                                        {`\\[d·\\sin(\\theta)=\\pm m·\\lambda \\]`}
                                    </MathJax>
                                    </div>
                                </MathJaxContext>
                            </Grid.Col>
                        </Grid>
                    </Card>
                </header>
                <br />
                <main>
                    <Grid justify="center" >
                        <Grid.Col span={10} >
                            <DifractionAngle />
                        </Grid.Col>
                        <Grid.Col xs={10} md={5} >
                            <LambdaClearVariable />
                        </Grid.Col>
                        <Grid.Col xs={10} md={5} >
                        </Grid.Col>
                    </Grid>
                </main>
            </NotificationsProvider>
        </MantineProvider>
    );
};

export default App; //Export component