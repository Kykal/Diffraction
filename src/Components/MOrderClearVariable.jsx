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

const LineasMicrometro = () => {

   const { t } = useTranslation("global"); //'t' to access languages

   return(
       <MathJaxContext version={3} config={config} >
           <div className='lm' >
               <MathJax hideUntilTypeset={"first"} dynamic >
                   {`\\(\\frac{${t('clear.mathjax.lines')}}{${t('clear.mathjax.micrometer')}}\\)`}
               </MathJax>
           </div>
       </MathJaxContext>
   );
};

//Component content
const MOrderClearVariable = () => {
   
   //i18next
   const { t } = useTranslation("global"); //'t' to access languages

   //For notification hooks
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
            title: `${t('clear.notification-m.error.title')}`,
            message: `${t('clear.notification-m.error.message')}`
         });
      }else if( variables.d !== 'd' && variables.theta !== 'θ' && variables.lambda !== 'λ' ){
         navigator.clipboard.writeText(variables.m)
         notif.showNotification({
            color: 'teal',
            icon: <BsCheck2 />,
            title: `${t('clear.notification-m.success.title')}`,
            message: `${t('clear.notification-m.success.message')}`
         });
      }else{
         notif.showNotification({
            color: 'orange',
            icon: <BsExclamationLg />,
            title: `${t('clear.notification-m.warning.title')}`,
            message: `${t('clear.notification-m.warning.message')}`
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
         <Title align="center" order={3} >{t('clear.title-m')}</Title>
         <MathJaxContext version={3} config={config} >
            <div>
               <MathJax hideUntilTypeset={"first"} dynamic >
                  {`\\[${variables.m}=\\frac{${variables.d}·\\sin(${variables.theta})}{${variables.lambda}}\\]`}
               </MathJax>
            </div>
         </MathJaxContext>
         <Grid>
            <Grid.Col md={12} lg={4} >
               <NumberInput label={t('clear.d-label')} icon="d" rightSection={<LineasMicrometro />} value={variables.d} onChange={dHandler} hideControls />
            </Grid.Col>
            <Grid.Col md={12} lg={4} >
               <NumberInput label={t('clear.theta-label')} icon="θ" rightSection="º" value={variables.theta} onChange={thetaHandler} hideControls />
            </Grid.Col>
            <Grid.Col md={12} lg={4} >
               <NumberInput label={t('clear.lambda-label')} icon="λ" rightSection="Hz" value={variables.lambda} onChange={lambdaHandler} hideControls />
            </Grid.Col>
            <Grid.Col span={12} >
               <Button fullWidth variant="filled" color="gray" size="md" onClick={copyHandler} >{t('copy-button')}</Button>
            </Grid.Col>
         </Grid>
      </Card>
   );
};

export default MOrderClearVariable; //Export component