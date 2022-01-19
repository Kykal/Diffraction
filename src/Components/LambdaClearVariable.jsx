import React, { useState } from 'react';

//Mantine
import { Card, Grid, NumberInput, Title } from '@mantine/core';

//MathJax
import { MathJaxContext, MathJax } from 'better-react-mathjax';

//MathJaxConfig
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

const LineasMicrometro = () => {
   return(
       <MathJaxContext version={3} config={config} >
           <div className='lm' >
               <MathJax hideUntilTypeset={"first"} >
                   {`\\(\\frac{lineas}{micrómetro}\\)`}
               </MathJax>
           </div>
       </MathJaxContext>
   );
};

//Component content
const LambdaClearVariable = () => {
   
   const [ clearVariableLambda, setClearVariableLambda ] = useState({
      lambda: 'λ',
      d: 'd',
      theta: 'θ',
      m: 'm'
  });

   return (
      <Card>
         <Title align='center' order={3}>Despejar &lambda;</Title>
         <MathJaxContext version={3} config={config} >
            <div>
               <MathJax hideUntilTypeset={"first"} dynamic >
                  {`\\[${clearVariableLambda.lambda}=\\frac{${clearVariableLambda.d}·\\sin(${clearVariableLambda.theta})}{${clearVariableLambda.m}}\\]`}
               </MathJax>
            </div>
         </MathJaxContext>
         <Grid>
            <Grid.Col md={12} lg={4} >
               <NumberInput label="Líneas por micrómetro" variant="filled" icon="d" rightSection={<LineasMicrometro />} rightSectionWidth={89} />
            </Grid.Col>
            <Grid.Col md={12} lg={4} >
               <NumberInput label="Ángulo de difracción" variant="filled" icon="θ" rightSection="º" />
            </Grid.Col>
            <Grid.Col md={12} lg={4} >
               <NumberInput label="Orden del mínimo" variant="filled" icon="m" hideControls />
            </Grid.Col>
         </Grid>
      </Card>
   );
};

export default LambdaClearVariable; //Export component