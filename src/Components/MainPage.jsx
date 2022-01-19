import React, { useState } from 'react';

//MathJax
import MathJax from 'react-mathjax2';

//Mantine
import { Card, Grid, NumberInput, Title } from '@mantine/core';

//Component content
const MainPage = () => {

   const tex = '\theta';
   
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
                     <MathJax.Context input='tex' >
                        <div>
                           <MathJax.Node >
                              {tex}
                           </MathJax.Node>
                        </div>
                     </MathJax.Context>
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