import React, { useState, useEffect } from 'react';

//React icons
import { BsCheck2, BsExclamationLg } from 'react-icons/bs';
import { FiX } from 'react-icons/fi';

//Mantine
import { Button, Card, Grid, NumberInput, Title } from '@mantine/core';
import { useNotifications } from '@mantine/notifications';

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
const MOrderClearVariable = () => {
   
   const notif = useNotifications();

   const [ variables, setVariables ] = useState({
      m: 'm',
      d: 'd',
      theta: 'θ',
      lambda: 'λ'
   });

   useEffect(() => {
      if( variables.d !== 'd' && variables.theta !== 'θ' && variables.lambda !== 'λ' ){
         const res = ( (variables.d)*( Math.sin(variables.theta/(180/Math.PI)) ) )/variables.lambda;

         setVariables({ ...variables, m: res });
      }else{
         setVariables({ ...variables, m: 'm' });
      }
   }, [variables.d, variables.theta, variables.lambda]);

   const copyHandler = () => {
      if( variables.d === 'd' && variables.theta === 'θ' && variables.lambda === 'λ' ){
         notif.showNotification({
            color: 'red',
            icon: <FiX />,
            title: '¡Aún no has ingresado valores!',
            message: 'Por favor, ingrese los valores de "d", "θ" y "λ".'
         });
      }else if( variables.d !== 'd' && variables.theta !== 'θ' && variables.lambda !== 'λ' ){
         navigator.clipboard.writeText(variables.m)
         notif.showNotification({
            color: 'teal',
            icon: <BsCheck2 />,
            title: '¡Copiado con éxito!',
            message: 'Valor de "m" copiado al portapapeles.'
         });
      }else{
         notif.showNotification({
            color: 'orange',
            icon: <BsExclamationLg />,
            title: '¡Faltan valores por ingresar!',
            message: 'Favor de ingresar los valores restantes.'
         });
      }
   };

   const dHandler = (event) => {
      if( event === undefined ){
         setVariables({ ...variables, d: 'd' });
         return;
      }

      setVariables({ ...variables, d: event });
   };

   const thetaHandler = (event) => {
      if( event === undefined ){
         setVariables({ ...variables, theta: 'θ' });
         return;
      }

      setVariables({ ...variables, theta: event });
   };

   const lambdaHandler = (event) => {
      if( event === undefined ){
         setVariables({ ...variables, lambda: 'λ' });
         return;
      }

      setVariables({ ...variables, lambda: event });
   };

   return (
      <Card>
         <Title align="center" order={3} >Despejar m</Title>
         <MathJaxContext version={3} config={config} >
            <div>
               <MathJax hideUntilTypeset={"first"} dynamic >
                  {`\\[${variables.m}=\\frac{${variables.d}·\\sin(${variables.theta})}{${variables.lambda}}\\]`}
               </MathJax>
            </div>
         </MathJaxContext>
         <Grid>
            <Grid.Col md={12} lg={4} >
               <NumberInput label="Líneas por micrómetro" icon="d" rightSection={<LineasMicrometro />} value={variables.d} onChange={dHandler} hideControls />
            </Grid.Col>
            <Grid.Col md={12} lg={4} >
               <NumberInput label="Ángulo de difracción" icon="θ" rightSection="º" value={variables.theta} onChange={thetaHandler} hideControls />
            </Grid.Col>
            <Grid.Col md={12} lg={4} >
               <NumberInput label="Frecuencia de onda" icon="λ" rightSection="Hz" value={variables.lambda} onChange={lambdaHandler} hideControls />
            </Grid.Col>
            <Grid.Col span={12} >
               <Button fullWidth variant="filled" color="gray" size="md" onClick={copyHandler} >Copiar</Button>
            </Grid.Col>
         </Grid>
      </Card>
   );
};

export default MOrderClearVariable; //Export component