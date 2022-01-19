import React from 'react';

//MathJax
import { MathJaxContext, MathJax } from 'better-react-mathjax';

//Mantine
import { Button, Card, Grid, NumberInput, Title } from '@mantine/core';

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
                     <Title align="center" order={1} >Red de difracción</Title>
                     <MathJaxContext>
                        <div>
                           <MathJax>
                              {`\\[d·sen(θ)=±m·λ \\]`}
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
                     <Title align="center" order={3} >Ángulo de difracción</Title>
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