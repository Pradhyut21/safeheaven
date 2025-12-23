import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  Avatar, 
  Button, 
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  useTheme,
  useMediaQuery,
  alpha,
  IconButton
} from '@mui/material';
import { 
  Security as SecurityIcon,
  Architecture as ArchitectureIcon,
  Insights as InsightsIcon,
  Shield as ShieldIcon,
  Home as HomeIcon,
  Apartment as ApartmentIcon,
  Engineering as EngineeringIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
  GitHub as GitHubIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const teamMembers = [
  {
    name: 'Dr. Ananya Sharma',
    role: 'Chief Technology Officer',
    bio: 'PhD in Structural Engineering with 15+ years of experience in building safety assessment and risk analysis.',
    image: '/team/ananya.jpg',
    linkedin: '#',
    twitter: '#',
  },
  {
    name: 'Rahul Mehta',
    role: 'Lead AI Engineer',
    bio: 'Machine Learning expert specializing in computer vision applications for structural defect detection.',
    image: '/team/rahul.jpg',
    linkedin: '#',
    github: '#',
  },
  {
    name: 'Priya Patel',
    role: 'Head of Product',
    bio: 'Product management professional with a passion for creating user-centric solutions in the proptech space.',
    image: '/team/priya.jpg',
    linkedin: '#',
    twitter: '#',
  },
  {
    name: 'Arjun Kumar',
    role: 'Senior Civil Engineer',
    bio: 'Licensed civil engineer with expertise in building codes and construction safety standards.',
    image: '/team/arjun.jpg',
    linkedin: '#',
  },
];

const features = [
  {
    icon: <SecurityIcon color="primary" sx={{ fontSize: 40 }} />,
    title: 'Advanced AI Detection',
    description: 'Our proprietary algorithms can identify potential structural issues with 95% accuracy, long before they become visible to the naked eye.'
  },
  {
    icon: <ArchitectureIcon color="primary" sx={{ fontSize: 40 }} />,
    title: 'Comprehensive Reports',
    description: 'Get detailed, easy-to-understand reports with prioritized action items and estimated repair costs.'
  },
  {
    icon: <InsightsIcon color="primary" sx={{ fontSize: 40 }} />,
    title: 'Predictive Analytics',
    description: 'Our system predicts future maintenance needs based on current conditions and historical data.'
  },
  {
    icon: <ShieldIcon color="primary" sx={{ fontSize: 40 }} />,
    title: 'Regulatory Compliance',
    description: 'Stay compliant with local building codes and safety regulations with our up-to-date compliance tracking.'
  },
];

const stats = [
  { value: '10,000+', label: 'Properties Assessed' },
  { value: '98%', label: 'Accuracy Rate' },
  { value: '50+', label: 'Cities Covered' },
  { value: '4.9/5', label: 'User Rating' },
];

const AboutPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <Box sx={{ py: 8, bgcolor: 'background.default' }}>
      {/* Hero Section */}
      <Box 
        sx={{
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          py: 12,
          mb: 8,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.9) 0%, rgba(0, 0, 0, 0.8) 100%)',
            zIndex: 1,
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography 
              variant="h2" 
              component="h1" 
              sx={{ 
                fontWeight: 800, 
                mb: 3,
                fontSize: isMobile ? '2.5rem' : '3.5rem',
                lineHeight: 1.2
              }}
            >
              Building a Safer Tomorrow
            </Typography>
            <Typography 
              variant="h5" 
              component="p" 
              sx={{ 
                maxWidth: '800px',
                mb: 4,
                opacity: 0.9,
                fontSize: isMobile ? '1.1rem' : '1.25rem',
                lineHeight: 1.6
              }}
            >
              At SafeHaven AI, we're revolutionizing building safety through cutting-edge artificial intelligence and expert analysis to protect what matters most - your home and family.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
              <Button 
                variant="contained" 
                color="secondary" 
                size="large"
                sx={{ 
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 600,
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)'
                }}
              >
                Schedule Inspection
              </Button>
              <Button 
                variant="outlined" 
                color="inherit" 
                size="large"
                sx={{ 
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 600,
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  borderWidth: 2,
                  '&:hover': {
                    borderWidth: 2,
                    bgcolor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                Learn More
              </Button>
            </Box>
          </motion.div>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {/* Mission Section */}
        <Box sx={{ mb: 12 }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeIn}>
              <Typography 
                variant="h4" 
                component="h2" 
                sx={{ 
                  fontWeight: 700, 
                  mb: 2,
                  textAlign: 'center',
                  color: 'text.primary'
                }}
              >
                Our Mission
              </Typography>
              <Typography 
                variant="h6" 
                component="p" 
                sx={{ 
                  maxWidth: '800px', 
                  mx: 'auto', 
                  mb: 6,
                  textAlign: 'center',
                  color: 'text.secondary',
                  lineHeight: 1.7
                }}
              >
                To create safer living and working environments by making professional building inspections accessible, affordable, and actionable through technology.
              </Typography>
            </motion.div>

            <Grid container spacing={4} sx={{ mt: 4 }}>
              {features.map((feature, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <motion.div variants={fadeIn}>
                    <Card 
                      elevation={0}
                      sx={{
                        height: '100%',
                        p: 3,
                        borderRadius: 3,
                        bgcolor: 'background.paper',
                        border: '1px solid',
                        borderColor: 'divider',
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)'
                        }
                      }}
                    >
                      <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                      <Typography variant="h6" component="h3" sx={{ mb: 1.5, fontWeight: 600 }}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {feature.description}
                      </Typography>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Box>

        {/* Stats Section */}
        <Box 
          sx={{ 
            bgcolor: 'background.paper',
            borderRadius: 4,
            p: 6,
            mb: 12,
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
            border: '1px solid',
            borderColor: 'divider'
          }}
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <Grid container spacing={4}>
              {stats.map((stat, index) => (
                <Grid item xs={6} sm={3} key={index}>
                  <motion.div variants={fadeIn}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography 
                        variant="h3" 
                        component="div" 
                        sx={{ 
                          fontWeight: 800, 
                          mb: 1,
                          color: 'primary.main',
                          fontSize: isMobile ? '2.2rem' : '3rem',
                          lineHeight: 1.1
                        }}
                      >
                        {stat.value}
                      </Typography>
                      <Typography 
                        variant="subtitle1" 
                        sx={{ 
                          color: 'text.secondary',
                          fontWeight: 500
                        }}
                      >
                        {stat.label}
                      </Typography>
                    </Box>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Box>

        {/* Team Section */}
        <Box sx={{ mb: 12 }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeIn}>
              <Typography 
                variant="h4" 
                component="h2" 
                sx={{ 
                  fontWeight: 700, 
                  mb: 2,
                  textAlign: 'center',
                  color: 'text.primary'
                }}
              >
                Meet Our Team
              </Typography>
              <Typography 
                variant="h6" 
                component="p" 
                sx={{ 
                  maxWidth: '700px', 
                  mx: 'auto', 
                  mb: 6,
                  textAlign: 'center',
                  color: 'text.secondary'
                }}
              >
                Our team combines decades of experience in structural engineering, AI technology, and building safety to deliver unparalleled inspection services.
              </Typography>
            </motion.div>

            <Grid container spacing={4}>
              {teamMembers.map((member, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <motion.div
                    variants={fadeIn}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card 
                      elevation={0}
                      sx={{
                        height: '100%',
                        borderRadius: 3,
                        overflow: 'hidden',
                        border: '1px solid',
                        borderColor: 'divider',
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                          boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)'
                        }
                      }}
                    >
                      <Box 
                        sx={{ 
                          height: '200px', 
                          bgcolor: 'grey.200',
                          position: 'relative',
                          overflow: 'hidden'
                        }}
                      >
                        <Box
                          component="img"
                          src={member.image}
                          alt={member.name}
                          sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.5s ease',
                            '&:hover': {
                              transform: 'scale(1.05)'
                            }
                          }}
                        />
                        <Box 
                          sx={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            p: 2,
                            background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
                            color: 'white'
                          }}
                        >
                          <Typography variant="h6" component="h3" sx={{ mb: 0.5, fontWeight: 600 }}>
                            {member.name}
                          </Typography>
                          <Typography variant="body2" sx={{ opacity: 0.9 }}>
                            {member.role}
                          </Typography>
                        </Box>
                      </Box>
                      <CardContent>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: '60px' }}>
                          {member.bio}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                          {member.linkedin && (
                            <IconButton 
                              size="small" 
                              href={member.linkedin} 
                              target="_blank"
                              sx={{
                                bgcolor: 'grey.100',
                                color: 'text.primary',
                                '&:hover': {
                                  bgcolor: 'primary.main',
                                  color: 'primary.contrastText'
                                }
                              }}
                            >
                              <LinkedInIcon fontSize="small" />
                            </IconButton>
                          )}
                          {member.twitter && (
                            <IconButton 
                              size="small" 
                              href={member.twitter} 
                              target="_blank"
                              sx={{
                                bgcolor: 'grey.100',
                                color: 'text.primary',
                                '&:hover': {
                                  bgcolor: '#1DA1F2',
                                  color: 'white'
                                }
                              }}
                            >
                              <TwitterIcon fontSize="small" />
                            </IconButton>
                          )}
                          {member.github && (
                            <IconButton 
                              size="small" 
                              href={member.github} 
                              target="_blank"
                              sx={{
                                bgcolor: 'grey.100',
                                color: 'text.primary',
                                '&:hover': {
                                  bgcolor: '#333',
                                  color: 'white'
                                }
                              }}
                            >
                              <GitHubIcon fontSize="small" />
                            </IconButton>
                          )}
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Box>

        {/* CTA Section */}
        <Box 
          sx={{ 
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            borderRadius: 4,
            p: { xs: 4, md: 8 },
            mb: 6,
            textAlign: 'center',
            backgroundImage: 'linear-gradient(135deg, rgba(212, 175, 55, 0.9) 0%, rgba(0, 0, 0, 0.8) 100%)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Typography 
              variant="h4" 
              component="h2" 
              sx={{ 
                fontWeight: 700, 
                mb: 3,
                fontSize: isMobile ? '1.8rem' : '2.5rem',
                lineHeight: 1.2
              }}
            >
              Ready to Ensure Your Property's Safety?
            </Typography>
            <Typography 
              variant="h6" 
              component="p" 
              sx={{ 
                maxWidth: '700px', 
                mx: 'auto', 
                mb: 4,
                opacity: 0.9,
                fontSize: isMobile ? '1rem' : '1.25rem',
                lineHeight: 1.6
              }}
            >
              Schedule an inspection today and gain peace of mind with our comprehensive property assessment.
            </Typography>
            <Button 
              variant="contained" 
              color="secondary" 
              size="large"
              sx={{ 
                px: 6,
                py: 1.5,
                borderRadius: 2,
                fontWeight: 600,
                textTransform: 'none',
                fontSize: '1.1rem',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)'
                }
              }}
            >
              Get Started
            </Button>
          </motion.div>
        </Box>
      </Container>

      {/* Footer */}
      <Box 
        sx={{ 
          bgcolor: 'background.paper',
          borderTop: '1px solid',
          borderColor: 'divider',
          py: 6
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <HomeIcon color="primary" sx={{ fontSize: 32, mr: 1 }} />
                  <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
                    SafeHaven AI
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Empowering safer living through advanced AI-powered building inspections and structural analysis.
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                  <IconButton size="small" sx={{ color: 'text.secondary' }}>
                    <LinkedInIcon />
                  </IconButton>
                  <IconButton size="small" sx={{ color: 'text.secondary' }}>
                    <TwitterIcon />
                  </IconButton>
                  <IconButton size="small" sx={{ color: 'text.secondary' }}>
                    <GitHubIcon />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="subtitle1" component="h3" sx={{ fontWeight: 600, mb: 2 }}>
                Company
              </Typography>
              <List dense>
                {['About Us', 'Careers', 'Blog', 'Press', 'Contact'].map((item) => (
                  <ListItem key={item} disableGutters disablePadding sx={{ mb: 1 }}>
                    <ListItemIcon sx={{ minWidth: 30 }}>
                      <ArrowForwardIosIcon fontSize="small" sx={{ fontSize: '0.8rem', color: 'text.secondary' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={
                        <Typography 
                          variant="body2" 
                          component="a" 
                          href="#" 
                          sx={{ 
                            color: 'text.secondary',
                            textDecoration: 'none',
                            '&:hover': {
                              color: 'primary.main',
                              textDecoration: 'underline'
                            }
                          }}
                        >
                          {item}
                        </Typography>
                      } 
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1" component="h3" sx={{ fontWeight: 600, mb: 2 }}>
                Contact Us
              </Typography>
              <List dense>
                <ListItem disableGutters disablePadding sx={{ mb: 1 }}>
                  <ListItemIcon sx={{ minWidth: 30 }}>
                    <EmailIcon color="primary" sx={{ fontSize: '1rem' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={
                      <Typography variant="body2" color="text.secondary">
                        info@safehavenai.com
                      </Typography>
                    } 
                  />
                </ListItem>
                <ListItem disableGutters disablePadding sx={{ mb: 1 }}>
                  <ListItemIcon sx={{ minWidth: 30 }}>
                    <PhoneIcon color="primary" sx={{ fontSize: '1rem' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={
                      <Typography variant="body2" color="text.secondary">
                        +91 98765 43210
                      </Typography>
                    } 
                  />
                </ListItem>
                <ListItem disableGutters disablePadding sx={{ mb: 1 }}>
                  <ListItemIcon sx={{ minWidth: 30 }}>
                    <LocationIcon color="primary" sx={{ fontSize: '1rem' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={
                      <Typography variant="body2" color="text.secondary">
                        123 Tech Park, Bengaluru
                        <br />
                        Karnataka, India - 560001
                      </Typography>
                    } 
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="subtitle1" component="h3" sx={{ fontWeight: 600, mb: 2 }}>
                Newsletter
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Subscribe to our newsletter for the latest updates and insights on building safety.
              </Typography>
              <Box component="form" sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  size="small"
                  placeholder="Your email"
                  variant="outlined"
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: 'background.paper',
                      '& fieldset': {
                        borderColor: 'divider',
                      },
                      '&:hover fieldset': {
                        borderColor: 'primary.main',
                      },
                    },
                  }}
                />
                <Button 
                  variant="contained" 
                  color="primary"
                  sx={{ whiteSpace: 'nowrap' }}
                >
                  Subscribe
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Divider sx={{ my: 4 }} />
          <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} SafeHaven AI. All rights reserved.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mt: isMobile ? 2 : 0 }}>
              <Typography 
                variant="body2" 
                component="a" 
                href="#" 
                sx={{ 
                  color: 'text.secondary',
                  textDecoration: 'none',
                  '&:hover': {
                    color: 'primary.main',
                    textDecoration: 'underline'
                  }
                }}
              >
                Privacy Policy
              </Typography>
              <Typography 
                variant="body2" 
                component="a" 
                href="#" 
                sx={{ 
                  color: 'text.secondary',
                  textDecoration: 'none',
                  '&:hover': {
                    color: 'primary.main',
                    textDecoration: 'underline'
                  }
                }}
              >
                Terms of Service
              </Typography>
              <Typography 
                variant="body2" 
                component="a" 
                href="#" 
                sx={{ 
                  color: 'text.secondary',
                  textDecoration: 'none',
                  '&:hover': {
                    color: 'primary.main',
                    textDecoration: 'underline'
                  }
                }}
              >
                Sitemap
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default AboutPage;
