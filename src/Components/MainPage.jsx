import React, { useState } from 'react';

//MathJax
import { MathJaxContext, MathJax } from 'better-react-mathjax';

//Mantine
import { Card, Grid, NumberInput, Title } from '@mantine/core';

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

   const [ difractionAngle, setDifractionAngle ] = useState({
      x: 'x',
      l: 'L',
      theta: 'θ'
   });

   const xVariableHandler = (event) => {
      if( event===undefined ){ //If the input is empty or undefined, set xValue variable to x
         setDifractionAngle({ ...difractionAngle, x: 'x' });

         return; //End this function (do not run the rest of the function)
      }
      setDifractionAngle({ ...difractionAngle, x: event }); //If not...
   };

   const lVariableHandler = (event) => {
      if( event===undefined ){
         setDifractionAngle({ ...difractionAngle, l: 'L' });
         return;
      }
      setDifractionAngle({ ...difractionAngle, l: event });
   };

   const resultHandler = (event) => {
      if( setDifractionAngle.x !== 'x' && setDifractionAngle.l !== 'L' ){

      }
   };

   return (
      <>
         <header>
            <Card>
               <Grid>
                  <Grid.Col>
                     <Title align="center" order={1} >Red de difracción</Title>
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
                     <Title align="center" order={3} >Ángulo de difracción</Title>
                     <MathJaxContext version={3} config={config} >
                        <div>
                           <MathJax hideUntilTypeset={"first"} >
                              {`\\[${difractionAngle.theta}=tan^{-1}\\left(\\frac{${difractionAngle.x}}{${difractionAngle.l}}\\right)\\]`}
                           </MathJax>
                        </div>
                     </MathJaxContext>
                     <Grid>
                        <Grid.Col span={6} >
                           <NumberInput label="Distancia entre los puntos de luz"      variant="filled" icon={"x"} min={0} rightSection="cm."   value={difractionAngle.x} onChange={xVariableHandler} />
                        </Grid.Col>
                        <Grid.Col span={6} >
                           <NumberInput label="Distancia entre la rendija y la pared"  variant="filled" icon={"L"} min={0} rightSection="m."    value={difractionAngle.l} onChange={lVariableHandler}/>
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