import React from 'react';

//Mantine hooks
import { Card, Grid, Text } from '@mantine/core';

//Component content
const MainPage = () => {
   
   return (
      <>
         <header>
            <Card>
               <Grid>
                  <Grid.Col>
                     <Text align="center" size="xl" weight={700} >Difracción</Text>
                     <Text align="center" size="md" >d·sen&theta;=m·&lambda;</Text>
                  </Grid.Col>
               </Grid>
            </Card>
         </header>
      </>
   );
};

export default MainPage; //Export component