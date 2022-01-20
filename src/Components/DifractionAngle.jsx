import React, { useState, useEffect } from 'react';

//React icons
import { BsCheck2, BsExclamationLg } from 'react-icons/bs';
import { FiX } from 'react-icons/fi';

//Mantine
import { Button, Card, Grid, NumberInput, Title } from '@mantine/core';
import { useNotifications } from '@mantine/notifications';

//MathJax
import { MathJaxContext, MathJax } from 'better-react-mathjax';

//i18next
import { useTranslation } from 'react-i18next';

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

//Component content
const DifractionAngle = () => {
   
   //i18next
   const { t } = useTranslation("global"); //'t' to access languages

   //For notification hooks
   const notif = useNotifications();

   //Difraction angle variable values
   const [ difractionValues, setDifractionValues ] = useState({
      x: 'x',
      l: 'L',
      theta: 'θ'
   });

   //When difraction values changes, calculate theta
   useEffect(() => {
      if( difractionValues.x !== 'x' && difractionValues.l !== 'L' ){ //If both values ARE NOT its default values make the operation
         const result = (Math.atan(difractionValues.x / difractionValues.l))*(180/Math.PI);

         if( isNaN(result) ){
             setDifractionValues({ ...difractionValues, theta: `0 º` });
             return;
         }

         setDifractionValues({ ...difractionValues, theta: result });
     }else{   //If any of them has it default value, set 'theta' to θ
         setDifractionValues({ ...difractionValues, theta: 'θ' })
     }
   }, [difractionValues.x, difractionValues.l]);

   //Function to change 'x' variable
   const xValueHandler = (event) => {
      if( event === undefined ){ //If input value is empty/undefined return 'x' string as variable value
         setDifractionValues({ ...difractionValues, x: 'x' });
         return;
      }
      //If not...
      setDifractionValues({ ...difractionValues, x: event });
   };
 
   //Function to change 'l' variable
   const lValueHandler = (event) => {
      if( event === undefined ){ //If input value is empty/undefined return 'l' string as variable value
         setDifractionValues({ ...difractionValues, l: 'L' });
         return;
      }else{
         setDifractionValues({ ...difractionValues, l: event });
      }
   };

   //Function to copy the difraction angle value to clipboard
   const copyDifractionAngleHandler = () => {
      if( difractionValues.theta !== 'θ' ){
         navigator.clipboard.writeText(difractionValues.theta);
         notif.showNotification({
            color: 'teal',
            icon: <BsCheck2 />,
            title: `${t('difraction-angle.notification.success.title')}`,
            message: `${t('difraction-angle.notification.success.message')}`
         });
      }else if( (difractionValues.x !== 'x' || difractionValues.l !== 'L') && difractionValues.theta === 'θ' ){ //If 'L' value has not be assigned
         notif.showNotification({
            color: 'orange',
            icon: <BsExclamationLg />,
            title: `${t('difraction-angle.notification.warning.title')}`,
            message: `${t('difraction-angle.notification.warning.message')}`
         });
      }else{
         notif.showNotification({
            color: 'red',
            icon: <FiX />,
            title: `${t('difraction-angle.notification.error.title')}`,
            message: `${t('difraction-angle.notification.error.message')}`
         });
      }
   };

   return (
      <Card>
         <Title align="center" order={3} >{t('difraction-angle.title')}</Title>
         <MathJaxContext version={3} config={config} >
            <div>
            <MathJax hideUntilTypeset={"first"} dynamic >
                  {`\\[${difractionValues.theta}=\\tan^{-1}\\left(\\frac{${difractionValues.x}}{${difractionValues.l}}\\right)\\]`}
            </MathJax>
            </div>
         </MathJaxContext>
         <Grid align="flex-end">
            <Grid.Col md={12} lg={5} >
               <NumberInput label={t('difraction-angle.x-label')}   variant="filled" icon="x" min={0} rightSection="cm." value={difractionValues.x} onChange={xValueHandler} />
            </Grid.Col>
            <Grid.Col md={12} lg={5} >
               <NumberInput label={t('difraction-angle.l-label')}  variant="filled" icon="L" min={0} rightSection="m."  value={difractionValues.l} onChange={lValueHandler} />
            </Grid.Col>
            <Grid.Col md={12} lg={2} >
               <Button fullWidth  variant="filled" color="gray" size="md" onClick={copyDifractionAngleHandler} >{t('copy-button')}</Button>
            </Grid.Col>
         </Grid>
      </Card>
   );
};

export default DifractionAngle; //Export component