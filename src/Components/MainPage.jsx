import React from 'react';

//Stylesheet
import './MainPage.css';

//MathJax
import { MathJaxContext, MathJax } from 'better-react-mathjax';

//Mantine
import { Button, Card, Grid, NumberInput, Text } from '@mantine/core';

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
const MainPage = () => {

   return (
      <>
         <header>
            <Card>
               <Grid>
                  <Grid.Col>
                     <Text align="center" size="xl" weight={700} >Red de difracción</Text>
                     <MathJaxContext version={3} config={config} >
                        <div>
                           <MathJax hideUntilTypeset={"first"} >
                              {`\\[a·sen(θ)=\\pm m·λ\\]`}
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
                  <Card>
                     <Text align="center" size="lg" weight={700} >Ángulo de difracción</Text>
                     <MathJaxContext version={3} config={config} >
                        <div>
                           <MathJax hideUntilTypeset={"first"} >
                              {`\\[θ=tan^{-1}\\left(\\frac{x}{L}\\right)\\]`}
                           </MathJax>
                        </div>
                     </MathJaxContext>
                     <Grid>
                        <Grid.Col span={6} >
                           <NumberInput label="Longitud de onda" variant="filled" icon={"x"} min={0} rightSection="cm." />
                        </Grid.Col>
                        <Grid.Col span={6} >
                           <NumberInput label="Longitud de onda" variant="filled" icon={"L"} min={0} rightSection="m." />
                        </Grid.Col>
                     </Grid>
                     <Grid >
                        <Grid.Col className='button-div' span={12} >
                           <Button variant='default' color="gray" size="md" >Calcular</Button>
                        </Grid.Col>
                     </Grid>
                  </Card>
               </Grid.Col>
            </Grid>
         </main>
      </>
   );
};

export default MainPage; //Export component