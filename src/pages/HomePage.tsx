import { useEffect, useState } from 'react';
import { Box, Container, Grid, Typography, Button, Card, CardContent, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  TrendingUp as TrendingUpIcon, 
  Warning as WarningIcon, 
  Speed as GaugeIcon, 
  Notifications as BellIcon,
  Upload as UploadIcon,
  BarChart as ChartIcon,
  Settings as SettingsIcon,
  CameraAlt as CameraIcon
} from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import CountUp from 'react-countup';

// Styled Components
const HeroSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, rgba(62, 39, 35, 0.9) 0%, rgba(93, 64, 55, 0.9) 100%)',
  color: '#FFF8E1',
  padding: theme.spacing(8, 0),
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(4),
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23d4af37\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
    opacity: 0.3,
  },
}));

const StatCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
  },
}));

const StatValue = styled(Typography)({
  fontSize: '2.5rem',
  fontWeight: 700,
  background: 'linear-gradient(135deg, #D4AF37 0%, #FFD700 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  lineHeight: 1.2,
});

const StatIconWrapper = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  padding: theme.spacing(1.5),
  borderRadius: '50%',
  marginBottom: theme.spacing(2),
  background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(255, 215, 0, 0.1) 100%)',
  color: '#D4AF37',
}));

const RiskBadge = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'severity',
})<{ severity: 'low' | 'medium' | 'high' | 'critical' }>(({ theme, severity }) => {
  const colorMap = {
    low: theme.palette.success.main,
    medium: theme.palette.warning.main,
    high: '#FF7043', // Orange
    critical: theme.palette.error.main,
  };

  return {
    display: 'inline-flex',
    alignItems: 'center',
    padding: theme.spacing(0.5, 1.5),
    borderRadius: 12,
    backgroundColor: `${colorMap[severity]}15`,
    color: colorMap[severity],
    fontWeight: 600,
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  };
});

// Sample data
const stats = [
  { id: 1, title: 'Total Inspections', value: 15432, icon: <TrendingUpIcon fontSize="large" />, trend: '+12.5%' },
  { id: 2, title: 'High-Risk Properties', value: 1845, icon: <WarningIcon fontSize="large" />, trend: '+3.2%' },
  { id: 3, title: 'Avg. Risk Score', value: 42, icon: <GaugeIcon fontSize="large" />, trend: '-5.1%' },
  { id: 4, title: 'Active Alerts', value: 127, icon: <BellIcon fontSize="large" />, trend: '+8.7%' },
];

const recentInspections = [
  { 
    id: 1, 
    propertyId: 'PROP-2023-001', 
    address: '12 Lotus Street, Bengaluru', 
    date: '2023-05-15', 
    riskScore: 72, 
    status: 'High Risk',
    statusSeverity: 'high'
  },
  { 
    id: 2, 
    propertyId: 'PROP-2023-002', 
    address: '9 River View, Hyderabad', 
    date: '2023-05-14', 
    riskScore: 88, 
    status: 'Critical',
    statusSeverity: 'critical'
  },
  { 
    id: 3, 
    propertyId: 'PROP-2023-003', 
    address: '78 Green Apartments, Mumbai', 
    date: '2023-05-13', 
    riskScore: 18, 
    status: 'Low Risk',
    statusSeverity: 'low'
  },
  { 
    id: 4, 
    propertyId: 'PROP-2023-004', 
    address: '45 Tech Park, Electronic City', 
    date: '2023-05-12', 
    riskScore: 45, 
    status: 'Medium Risk',
    statusSeverity: 'medium'
  },
  { 
    id: 5, 
    propertyId: 'PROP-2023-005', 
    address: '23 Villa Heights, Whitefield', 
    date: '2023-05-10', 
    riskScore: 5, 
    status: 'Safe',
    statusSeverity: 'low'
  },
];

// Columns for the data grid
const columns: GridColDef[] = [
  { 
    field: 'propertyId', 
    headerName: 'Property ID', 
    flex: 1,
    minWidth: 150,
    renderCell: (params) => (
      <Typography variant="body2" fontWeight={500}>
        {params.value}
      </Typography>
    ),
  },
  { 
    field: 'address', 
    headerName: 'Address', 
    flex: 2,
    minWidth: 250,
  },
  { 
    field: 'date', 
    headerName: 'Inspection Date', 
    flex: 1,
    minWidth: 150,
    valueFormatter: (params) => new Date(params.value).toLocaleDateString(),
  },
  { 
    field: 'riskScore', 
    headerName: 'Risk Score', 
    flex: 1,
    minWidth: 150,
    renderCell: (params) => (
      <Box sx={{ width: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography variant="body2" fontWeight={600}>
            {params.value}/100
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {params.value < 20 ? 'Safe' : params.value < 50 ? 'Low' : params.value < 75 ? 'High' : 'Critical'}
          </Typography>
        </Box>
        <Box 
          sx={{
            height: 6,
            width: '100%',
            backgroundColor: (theme) => theme.palette.grey[200],
            borderRadius: 3,
            overflow: 'hidden',
          }}
        >
          <Box 
            sx={{
              height: '100%',
              width: `${params.value}%`,
              background: (theme) => {
                if (params.value < 20) return theme.palette.success.main;
                if (params.value < 50) return theme.palette.warning.main;
                if (params.value < 75) return '#FF7043';
                return theme.palette.error.main;
              },
              borderRadius: 3,
              transition: 'width 0.5s ease-in-out',
            }}
          />
        </Box>
      </Box>
    ),
  },
  { 
    field: 'status', 
    headerName: 'Status', 
    flex: 1,
    minWidth: 150,
    renderCell: (params) => (
      <RiskBadge severity={params.row.statusSeverity}>
        {params.value}
      </RiskBadge>
    ),
  },
];

const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [loading, setLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Hero Section */}
      <HeroSection>
        <Container>
          <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
            <Typography 
              variant="h3" 
              component="h1" 
              gutterBottom 
              sx={{ 
                fontWeight: 800, 
                mb: 2,
                background: 'linear-gradient(135deg, #D4AF37 0%, #FFD700 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontFamily: '"Playfair Display", serif',
              }}
            >
              Protecting Dreams, One Inspection at a Time
            </Typography>
            <Typography 
              variant="h6" 
              component="p" 
              sx={{ 
                maxWidth: 800, 
                mx: 'auto',
                color: 'rgba(255, 255, 255, 0.9)',
                mb: 4,
              }}
            >
              Advanced AI-powered building inspection system to identify safety hazards and prevent tragedies
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
              <Button 
                variant="contained" 
                size="large" 
                href="/new-inspection"
                startIcon={<CameraIcon />}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 600,
                }}
              >
                Start New Inspection
              </Button>
              <Button 
                variant="outlined" 
                size="large"
                color="inherit"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 600,
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  color: '#FFF8E1',
                  '&:hover': {
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                Learn More
              </Button>
            </Box>
          </Box>
        </Container>
      </HeroSection>

      {/* Stats Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.id}>
            <StatCard>
              <CardContent>
                <StatIconWrapper>
                  {stat.icon}
                </StatIconWrapper>
                <Typography 
                  variant="subtitle2" 
                  color="text.secondary" 
                  gutterBottom
                  sx={{ 
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                  }}
                >
                  {stat.title}
                </Typography>
                <StatValue variant="h4" component="div">
                  <CountUp end={stat.value} duration={2.5} separator="," />
                </StatValue>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: stat.trend.startsWith('+') ? theme.palette.success.main : theme.palette.error.main,
                    display: 'flex',
                    alignItems: 'center',
                    fontWeight: 600,
                  }}
                >
                  {stat.trend} from last month
                </Typography>
              </CardContent>
            </StatCard>
          </Grid>
        ))}
      </Grid>

      {/* Quick Actions */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
          Quick Actions
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="outlined"
              size="large"
              startIcon={<CameraIcon />}
              href="/new-inspection"
              sx={{
                py: 2.5,
                borderColor: 'divider',
                '&:hover': {
                  borderColor: 'primary.main',
                  backgroundColor: 'rgba(212, 175, 55, 0.04)',
                },
              }}
            >
              Start New Inspection
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="outlined"
              size="large"
              startIcon={<UploadIcon />}
              sx={{
                py: 2.5,
                borderColor: 'divider',
                '&:hover': {
                  borderColor: 'primary.main',
                  backgroundColor: 'rgba(212, 175, 55, 0.04)',
                },
              }}
            >
              Upload Batch Images
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="outlined"
              size="large"
              startIcon={<ChartIcon />}
              sx={{
                py: 2.5,
                borderColor: 'divider',
                '&:hover': {
                  borderColor: 'primary.main',
                  backgroundColor: 'rgba(212, 175, 55, 0.04)',
                },
              }}
            >
              Generate City Report
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="outlined"
              size="large"
              startIcon={<SettingsIcon />}
              sx={{
                py: 2.5,
                borderColor: 'divider',
                '&:hover': {
                  borderColor: 'primary.main',
                  backgroundColor: 'rgba(212, 175, 55, 0.04)',
                },
              }}
            >
              Settings
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Recent Inspections */}
      <Box sx={{ height: 500, width: '100%', mt: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
            Recent Inspections
          </Typography>
          <Button 
            variant="text" 
            color="primary" 
            size="small"
            href="/reports"
            sx={{ fontWeight: 600 }}
          >
            View All
          </Button>
        </Box>
        <Card sx={{ height: 'calc(100% - 48px)' }}>
          <DataGrid
            rows={recentInspections}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            loading={loading}
            disableSelectionOnClick
            sx={{
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: 'rgba(0, 0, 0, 0.02)',
                borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
              },
              '& .MuiDataGrid-cell': {
                borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
              },
              '& .MuiDataGrid-row:hover': {
                backgroundColor: 'rgba(212, 175, 55, 0.04)',
              },
            }}
          />
        </Card>
      </Box>
    </Container>
  );
};

export default HomePage;
