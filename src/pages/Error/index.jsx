import ErrorIllustration from '../../assets/404.svg'
import { Box, Typography, Container, TextField, Button, Alert, useTheme, } from '@mui/material';




function Error() {

  
  return (
	<Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'blue', alignItems: 'center', justifyContent: 'center',}}>
		<Box sx={{ margin: '30px', display: 'flex', flexDirection: 'column', backgroundColor: 'blue', alignItems: 'center', maxWidth: '95%'}}>
		  <Typography component="h1" variant="h1" sx={{ color: 'green', fontWeight: 300, mb: 1 }}> Oups... </Typography>
		  <Box component="img" src={ErrorIllustration} alt="Error image" sx={{ maxWidth: '700px', width: '100%', mb: 2 }}/>
		  <Typography component="h3" variant="h3" sx={{ color: 'yellow', fontSize: { xs: '1.2em', sm: '1.5em', textAlign: 'center', }, fontWeight: 300, }}> Il semblerait que la page que vous cherchez n’existe pas </Typography>
		</Box>
    </Box>
  )
}

export default Error
