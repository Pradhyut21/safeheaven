import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Card, 
  CardContent, 
  Grid, 
  TextField, 
  MenuItem, 
  Tabs, 
  Tab,
  Paper,
  Divider,
  IconButton,
  useTheme,
  useMediaQuery,
  List,
  Button
} from '@mui/material';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  ArrowBack as ArrowBackIcon,
  Download as DownloadIcon,
  FilterList as FilterListIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';

const cityData = [
  { name: 'Bengaluru', inspections: 2847, highRisk: 427, violations: 182, unsafe: 12 },
  { name: 'Mumbai', inspections: 3421, highRisk: 512, violations: 245, unsafe: 18 },
  { name: 'Delhi', inspections: 3987, highRisk: 678, violations: 321, unsafe: 25 },
  { name: 'Hyderabad', inspections: 2156, highRisk: 289, violations: 134, unsafe: 8 },
  { name: 'Chennai', inspections: 1876, highRisk: 256, violations: 98, unsafe: 5 },
];

const riskDistributionData = [
  { name: 'Safe', value: 45, color: '#4CAF50' },
  { name: 'Low Risk', value: 25, color: '#8BC34A' },
  { name: 'Medium Risk', value: 15, color: '#FFC107' },
  { name: 'High Risk', value: 10, color: '#FF9800' },
  { name: 'Critical', value: 5, color: '#F44336' },
];

const builderData = [
  { id: 1, name: 'Prestige Group', score: 92, projects: 234, highRisk: 5, status: 'Compliant' },
  { id: 2, name: 'Brigade Group', score: 88, projects: 156, highRisk: 8, status: 'Compliant' },
  { id: 3, name: 'Sobha Limited', score: 85, projects: 198, highRisk: 12, status: 'Compliant' },
  { id: 4, name: 'XYZ Builders', score: 45, projects: 67, highRisk: 18, status: 'Under Review' },
  { id: 5, name: 'ABC Construction', score: 28, projects: 89, highRisk: 34, status: 'Flagged' },
];

const trendingIssues = [
  { issue: 'Structural Cracks', currentMonth: 245, change: 12.5, trend: 'up' },
  { issue: 'Electrical Hazards', currentMonth: 198, change: 8.2, trend: 'up' },
  { issue: 'Plumbing Leaks', currentMonth: 167, change: -3.4, trend: 'down' },
  { issue: 'Fire Safety Violations', currentMonth: 132, change: 5.7, trend: 'up' },
  { issue: 'Ventilation Issues', currentMonth: 98, change: -2.1, trend: 'down' },
];

const RegulatorViewPage = () => {
  const [selectedCity, setSelectedCity] = useState('Bengaluru');
  const [tabValue, setTabValue] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleCityChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedCity(event.target.value as string);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const cityStats = cityData.find(city => city.name === selectedCity) || cityData[0];

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" component="h1">
          Regulator Dashboard
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <TextField
          select
          label="Select City"
          value={selectedCity}
          onChange={handleCityChange}
          size="small"
          sx={{ minWidth: 200, ml: 2 }}
        >
          {cityData.map((city) => (
            <MenuItem key={city.name} value={city.name}>
              {city.name}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 3 }}
      >
        <Tab label="Overview" />
        <Tab label="Builders" />
        <Tab label="Trending Issues" />
        <Tab label="Compliance" />
      </Tabs>

      {tabValue === 0 && (
        <Box>
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', height: '100%' }}>
                <CardContent>
                  <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                    Properties Inspected
                  </Typography>
                  <Typography variant="h4" component="div" sx={{ fontWeight: 700, color: 'primary.main' }}>
                    {cityStats.inspections.toLocaleString()}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    Last 30 days
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', height: '100%' }}>
                <CardContent>
                  <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                    High-Risk Properties
                  </Typography>
                  <Typography variant="h4" component="div" sx={{ fontWeight: 700, color: 'error.main' }}>
                    {cityStats.highRisk.toLocaleString()}
                    <Typography component="span" variant="body2" sx={{ ml: 1, color: 'error.main' }}>
                      ({(cityStats.highRisk / cityStats.inspections * 100).toFixed(1)}%)
                    </Typography>
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    Requires immediate attention
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', height: '100%' }}>
                <CardContent>
                  <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                    Code Violations
                  </Typography>
                  <Typography variant="h4" component="div" sx={{ fontWeight: 700, color: 'warning.main' }}>
                    {cityStats.violations.toLocaleString()}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    Identified in last inspection cycle
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', height: '100%' }}>
                <CardContent>
                  <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                    Unsafe Buildings
                  </Typography>
                  <Typography variant="h4" component="div" sx={{ fontWeight: 700, color: 'error.dark' }}>
                    {cityStats.unsafe}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    Evacuation recommended
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h6">Inspection Trends</Typography>
                    <Box>
                      <IconButton size="small" sx={{ mr: 1 }}>
                        <FilterListIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small">
                        <DownloadIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                  <Box sx={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[...cityData].sort((a, b) => b.inspections - a.inspections)}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="inspections" name="Total Inspections" fill="#D4AF37" />
                        <Bar dataKey="highRisk" name="High Risk" fill="#F44336" />
                      </BarChart>
                    </ResponsiveContainer>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Risk Distribution</Typography>
                  <Box sx={{ height: 300, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={riskDistributionData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={2}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {riskDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}

      {tabValue === 1 && (
        <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6">Builder Safety Ratings</Typography>
              <Box>
                <IconButton size="small" sx={{ mr: 1 }}>
                  <RefreshIcon fontSize="small" />
                </IconButton>
                <IconButton size="small">
                  <DownloadIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
            <Box sx={{ overflowX: 'auto' }}>
              <Box sx={{ minWidth: 800 }}>
                <Box sx={{ display: 'flex', borderBottom: '1px solid', borderColor: 'divider', py: 1, mb: 1, fontWeight: 600 }}>
                  <Box sx={{ width: '40%', px: 2 }}>Builder</Box>
                  <Box sx={{ width: '15%', textAlign: 'center' }}>Safety Score</Box>
                  <Box sx={{ width: '15%', textAlign: 'center' }}>Projects</Box>
                  <Box sx={{ width: '15%', textAlign: 'center' }}>High Risk</Box>
                  <Box sx={{ width: '15%', textAlign: 'center' }}>Status</Box>
                </Box>
                {builderData.map((builder) => (
                  <Box 
                    key={builder.id} 
                    sx={{ 
                      display: 'flex', 
                      py: 2, 
                      borderBottom: '1px solid', 
                      borderColor: 'divider',
                      '&:hover': {
                        backgroundColor: 'action.hover',
                      }
                    }}
                  >
                    <Box sx={{ width: '40%', px: 2, display: 'flex', alignItems: 'center' }}>
                      <Typography variant="body2" fontWeight={500}>
                        {builder.name}
                      </Typography>
                    </Box>
                    <Box sx={{ width: '15%', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontWeight: 'bold',
                          background: builder.score >= 80 ? '#4CAF50' : 
                                    builder.score >= 60 ? '#FFC107' : '#F44336'
                        }}
                      >
                        {builder.score}
                      </Box>
                    </Box>
                    <Box sx={{ width: '15%', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Typography variant="body2">
                        {builder.projects}
                      </Typography>
                    </Box>
                    <Box sx={{ width: '15%', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Typography variant="body2" color={builder.highRisk > 10 ? 'error.main' : 'text.primary'}>
                        {builder.highRisk}
                      </Typography>
                    </Box>
                    <Box sx={{ width: '15%', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Box
                        sx={{
                          px: 1.5,
                          py: 0.5,
                          borderRadius: 1,
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          ...(builder.status === 'Compliant' && {
                            bgcolor: 'success.light',
                            color: 'success.dark',
                          }),
                          ...(builder.status === 'Under Review' && {
                            bgcolor: 'warning.light',
                            color: 'warning.dark',
                          }),
                          ...(builder.status === 'Flagged' && {
                            bgcolor: 'error.light',
                            color: 'error.dark',
                          }),
                        }}
                      >
                        {builder.status}
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </CardContent>
        </Card>
      )}

      {tabValue === 2 && (
        <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6">Trending Issues</Typography>
              <Typography variant="body2" color="textSecondary">
                Last 30 days compared to previous period
              </Typography>
            </Box>
            <Grid container spacing={2}>
              {trendingIssues.map((issue, index) => (
                <Grid item xs={12} key={index}>
                  <Card variant="outlined">
                    <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                          <Typography variant="subtitle2">{issue.issue}</Typography>
                          <Typography variant="body2" color="textSecondary">
                            {issue.currentMonth} reported cases
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              color: issue.trend === 'up' ? 'error.main' : 'success.main',
                              fontWeight: 500,
                              mr: 1
                            }}
                          >
                            {issue.trend === 'up' ? '↑' : '↓'} {Math.abs(issue.change)}%
                          </Typography>
                          <Box
                            sx={{
                              width: 80,
                              height: 30,
                              bgcolor: issue.trend === 'up' ? 'error.light' : 'success.light',
                              borderRadius: 15,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <Typography 
                              variant="caption" 
                              sx={{ 
                                color: issue.trend === 'up' ? 'error.dark' : 'success.dark',
                                fontWeight: 600
                              }}
                            >
                              {issue.trend === 'up' ? 'Increasing' : 'Decreasing'}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      )}

      {tabValue === 3 && (
        <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>Compliance Status</Typography>
            <Typography color="textSecondary" paragraph>
              Monitor and manage compliance across different regions and building types.
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom>Compliance by Region</Typography>
                    <Box sx={{ height: 300, mt: 2 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          layout="vertical"
                          data={[...cityData].sort((a, b) => b.inspections - a.inspections)}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis type="number" />
                          <YAxis dataKey="name" type="category" width={100} />
                          <Tooltip />
                          <Bar dataKey="violations" name="Violations" fill="#D4AF37" />
                        </BarChart>
                      </ResponsiveContainer>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom>Action Required</Typography>
                    <List>
                      {[
                        { id: 1, text: 'Issue notices to 5 non-compliant builders', priority: 'High' },
                        { id: 2, text: 'Schedule safety audit for high-risk zones', priority: 'Medium' },
                        { id: 3, text: 'Review 12 pending inspection reports', priority: 'High' },
                        { id: 4, text: 'Update safety guidelines document', priority: 'Low' },
                        { id: 5, text: 'Conduct training for new inspectors', priority: 'Medium' },
                      ].map((item) => (
                        <Box 
                          key={item.id} 
                          sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            py: 1.5,
                            borderBottom: '1px solid',
                            borderColor: 'divider',
                            '&:last-child': { borderBottom: 'none' }
                          }}
                        >
                          <Box
                            sx={{
                              width: 8,
                              height: 8,
                              borderRadius: '50%',
                              bgcolor: item.priority === 'High' ? 'error.main' : 
                                      item.priority === 'Medium' ? 'warning.main' : 'success.main',
                              mr: 2,
                              flexShrink: 0
                            }}
                          />
                          <Typography variant="body2" sx={{ flexGrow: 1 }}>
                            {item.text}
                          </Typography>
                          <Button size="small" variant="outlined">
                            View
                          </Button>
                        </Box>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default RegulatorViewPage;
