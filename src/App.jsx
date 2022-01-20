import React from 'react';

//Custom components
import DifractionAngle from './Components/DifractionAngle';
import LambdaClearVariable from './Components/LambdaClearVariable';
import MOrderClearVariable from './Components/MOrderClearVariable';

//MathJax
import { MathJaxContext, MathJax } from 'better-react-mathjax';

//i18next
import { useTranslation } from 'react-i18next';

//Mantine
import { Card, Grid, Select, Title, MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';

//MathJax configuration
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

    const [t, i18n] = useTranslation("global"); //'t' to access languages; 'i18n' to make possible change language live.

    return (
        <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles>
            <NotificationsProvider>
                <header>
                    <Card>
                        <Grid justify="center" >
                            <Grid.Col span={12} >
                                <Title align="center" order={1} >{t('header.title')}</Title>
                                <MathJaxContext version={3} config={config} >
                                    <div className='lm' >
                                    <MathJax hideUntilTypeset={"first"} >
                                        {`\\[d·\\sin(\\theta)=\\pm m·\\lambda \\]`}
                                    </MathJax>
                                    </div>
                                </MathJaxContext>
                            </Grid.Col>
                            <Grid.Col sx={6} md={3} lg={2} xl={1} >
                                <Select
                                    defaultValue='en'
                                    data = {[
                                        { value: 'en', label: 'English' },
                                        { value: 'es', label: 'Español' }
                                    ]}
                                    onChange={(value) => {
                                        i18n.changeLanguage(value);
                                    }}
                                />
                            </Grid.Col>
                        </Grid>
                    </Card>
                </header>
                <br />
                <main>
                    <Grid justify="center" >
                        <Grid.Col xs={10} md={10} >
                            <DifractionAngle />
                        </Grid.Col>
                        <Grid.Col xs={10} md={5} >
                            <LambdaClearVariable />
                        </Grid.Col>
                        <Grid.Col xs={10} md={5} >
                            <MOrderClearVariable />
                        </Grid.Col>
                    </Grid>
                </main>
            </NotificationsProvider>
        </MantineProvider>
    );
};

export default App; //Export component