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
const LambdaClearVariable = () => {
   
   //i18next
   const { t } = useTranslation("global"); //'t' to access languages

   //For notification hooks
   const notif = useNotifications();

   const [ clearVariableLambda, setClearVariableLambda ] = useState({
      lambda: 'λ',
      d: 'd',
      theta: 'θ',
      m: 'm'
   });

   useEffect(() => {
      if( clearVariableLambda.d !== 'd' && clearVariableLambda.theta !== 'θ' && clearVariableLambda.m !== 'm' ){
         const res = ((clearVariableLambda.d)*( Math.sin(clearVariableLambda.theta/(180/Math.PI)) ))/clearVariableLambda.m;
         setClearVariableLambda({ ...clearVariableLambda, lambda: res });
      }else{
         setClearVariableLambda({ ...clearVariableLambda, lambda: 'λ' });
      }
   }, [clearVariableLambda.d, clearVariableLambda.theta, clearVariableLambda.m]);

   //Function to copy the difraction angle value to clipboard
   const copyThetaHandler = () => {
      if( clearVariableLambda.d === 'd' && clearVariableLambda.theta === 'θ' && clearVariableLambda.m === 'm' ){ //If none of the variables have a value...
         notif.showNotification({
            color: 'red',
            icon: <FiX />,
            title: `${t('clear.notification-lambda.error.title')}`,
            message: `${t('clear.notification-lambda.error.message')}`
         });
      }else if( clearVariableLambda.d !== 'd' && clearVariableLambda.theta !== 'θ' && clearVariableLambda.m !== 'm' ){ //If all variables have a value...
         navigator.clipboard.writeText(clearVariableLambda.lambda);
         notif.showNotification({
            color: 'teal',
            icon: <BsCheck2 />,
            title: `${t('clear.notification-lambda.success.title')}`,
            message: `${t('clear.notification-lambda.success.message')}`
         });
      }else if( clearVariableLambda.d !== 'd' || clearVariableLambda.theta !== 'θ' || clearVariableLambda.m !== 'm' ){ //If there's a variable that have not a value
         notif.showNotification({
            color: 'orange',
            icon: <BsExclamationLg />,
            title: `${t('clear.notification-lambda.warning.title')}`,
            message: `${t('clear.notification-lambda.warning.message')}`
         });
      }
   };

   const dHandler = (event) => {
      if( event===undefined ){
         setClearVariableLambda({ ...clearVariableLambda, d: 'd' });
         return;
      }

      setClearVariableLambda({ ...clearVariableLambda, d: event });
   };

   const thetaHandler = (event) => {
      if( event === undefined ){
         setClearVariableLambda({ ...clearVariableLambda, theta: 'θ' });
         return;
      }

      setClearVariableLambda({ ...clearVariableLambda, theta: event });
   };

   const mHandler = (event) => {
      if( event=== undefined ){
         setClearVariableLambda({ ...clearVariableLambda, m: 'm' });
         return;
      }

      setClearVariableLambda({ ...clearVariableLambda, m: event });
   };

   return (
      <Card>
         <Title align='center' order={3}>{t('clear.title-lambda')}</Title>
         <MathJaxContext version={3} config={config} >
            <div>
               <MathJax hideUntilTypeset={"first"} dynamic >
                  {`\\[${clearVariableLambda.lambda}=\\frac{${clearVariableLambda.d}·\\sin(${clearVariableLambda.theta})}{${clearVariableLambda.m}}\\]`}
               </MathJax>
            </div>
         </MathJaxContext>
         <Grid>
            <Grid.Col md={12} lg={4} >
               <NumberInput label={t('clear.d-label')} variant="filled" icon="d" rightSection={<LineasMicrometro />} hideControls value={clearVariableLambda.d} onChange={dHandler} />
            </Grid.Col>
            <Grid.Col md={12} lg={4} >
               <NumberInput label={t('clear.theta-label')} variant="filled" icon="θ" rightSection="º" hideControls value={clearVariableLambda.theta} onChange={thetaHandler} />
            </Grid.Col>
            <Grid.Col md={12} lg={4} >
               <NumberInput label={t('clear.m-label')} variant="filled" icon="m" hideControls value={clearVariableLambda.m} onChange={mHandler} />
            </Grid.Col>
            <Grid.Col span={12} >
               <Button fullWidth variant="filled" color="gray" size="md" onClick={copyThetaHandler} >{t('copy-button')}</Button>
            </Grid.Col>
         </Grid>
      </Card>
   );
};

export default LambdaClearVariable; //Export component