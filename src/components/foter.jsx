import * as React from 'react';
import { Box, Grid, Link, Typography, Container, IconButton ,Paper,TextField,Avatar} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Telegram } from '@mui/icons-material';
import InputAdornment from '@mui/material/InputAdornment';
import { ArrowUpward } from '@mui/icons-material';



const socialMediaLinks = {
  facebook: '#',
  twitter: '#',
  instagram: '#',
};

const Footer = () => {
  const moveTotop=()=>{
      window.scrollTo({
        top:0,
        behavior:"smooth"
      })
  }
  return (
    <Paper
      sx={{
        bgcolor: 'background.paper',
        color: 'text.secondary',
        py: 3,
        borderTop: '1px solid',
        borderColor: 'divider',
        mt:2
      }}
      elevation={7}
    >
      <Container maxWidth={false}>
        <Grid container spacing={2} justifyContent="space-between">
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{color:"black",fontSize:20,fontWeight:700}} gutterBottom>
              Shopper Shop
            </Typography>
            {/* Add your logo component or image here */}
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle1" sx={{color:"black",fontSize:20,fontWeight:700}} gutterBottom>
              PRODUCT
            </Typography>
            <Link href="#" color="inherit" display="block" sx={{textDecoration:"none"}}>Features</Link>
            <Link href="#" color="inherit" display="block" sx={{textDecoration:"none"}}>Integrations</Link>
            <Link href="#" color="inherit" display="block" sx={{textDecoration:"none"}}>Pricing</Link>
            <Link href="#" color="inherit" display="block" sx={{textDecoration:"none"}}>FAQ</Link>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle1" sx={{color:"black",fontSize:20,fontWeight:700}} gutterBottom>
              COMPANY
            </Typography>
            <Link href="#" color="inherit" display="block" sx={{textDecoration:"none"}}>About Us</Link>
            <Link href="#" color="inherit" display="block" sx={{textDecoration:"none"}}>Careers</Link>
            <Link href="#" color="inherit" display="block" sx={{textDecoration:"none"}}>Privacy Policy</Link>
            <Link href="#" color="inherit" display="block" sx={{textDecoration:"none"}}>Terms of Service</Link>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle1" sx={{color:"black",fontSize:20,fontWeight:700}} gutterBottom>
              DEVELOPERS
            </Typography>
            <Link href="#" color="inherit" display="block" sx={{textDecoration:"none"}}>Public API</Link>
            <Link href="#" color="inherit" display="block" sx={{textDecoration:"none"}}>Documentation</Link>
            <Link href="#" color="inherit" display="block" sx={{textDecoration:"none"}}>Guides</Link>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle1" sx={{color:"black",fontSize:20,fontWeight:700}} gutterBottom>
              SOCIAL MEDIA
            </Typography>
            <IconButton aria-label="Facebook" color="inherit" component="a" href={socialMediaLinks.facebook}>
              <FacebookIcon />
            </IconButton>
            <IconButton aria-label="Twitter" color="inherit" component="a" href={socialMediaLinks.twitter}>
              <TwitterIcon />
            </IconButton>
            <IconButton aria-label="Instagram" color="inherit" component="a" href={socialMediaLinks.instagram}>
              <InstagramIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ pt: 4 }}>
          © 2024 Company Co. All rights reserved.
        </Typography>
        <Box sx={{display:"flex",alignItems:"right",justifyContent:"right",gap:5,mt:-8}}>
        <TextField name="password" sx={{width:"350px",height:"60px"}} 
                              label="Enter Your Email"
                                   InputProps={{ 
                                       endAdornment: (
                                         <InputAdornment position="end" >
                                          
                                             {<Telegram sx={{fontSize:40,color:"green"}}/>}
                                           
                                         </InputAdornment>
                                       )
                                     }}
                                  
         ></TextField>
        <Avatar sx={{backgroundColor:" orange",mt:0.5 }} onClick={moveTotop}>
        <ArrowUpward  />
      </Avatar>
        </Box>
      </Container>
    </Paper>
  );
};

export default Footer;