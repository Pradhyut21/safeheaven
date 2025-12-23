import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Card, 
  CardContent, 
  Grid, 
  TextField, 
  MenuItem, 
  Button,
  Divider,
  Chip,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  useTheme,
  useMediaQuery,
  Avatar,
  LinearProgress,
  Tabs,
  Tab,
  Badge,
  Fab
} from '@mui/material';
import { Add as AddIcon, Upload as UploadIcon } from '@mui/icons-material';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Cell,
  Pie,
  PieChart
} from 'recharts';
import { 
  Home as HomeIcon,
  Apartment as ApartmentIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Download as DownloadIcon,
  Share as ShareIcon,
  Print as PrintIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon
} from '@mui/icons-material';

// Sample data for properties
const properties = [
  {
    id: 1,
    name: 'Sunrise Apartments',
    address: '123 Main St, Bengaluru',
    type: 'Apartment',
    yearBuilt: 2015,
    lastInspection: '2023-10-15',
    riskScore: 78,
    riskLevel: 'Medium',
    image: '/property1.jpg',
    issues: [
      { id: 1, type: 'Electrical', severity: 'High', description: 'Exposed wiring in common area', status: 'Open' },
      { id: 2, type: 'Structural', severity: 'Medium', description: 'Minor cracks in foundation', status: 'In Progress' },
      { id: 3, type: 'Plumbing', severity: 'Low', description: 'Leaking pipe in basement', status: 'Open' },
    ],
    rooms: [
      { name: 'Living Room', risk: 'Low', issues: 1 },
      { name: 'Kitchen', risk: 'Medium', issues: 2 },
      { name: 'Bathroom', risk: 'High', issues: 3 },
      { name: 'Bedroom', risk: 'Low', issues: 0 },
      { name: 'Balcony', risk: 'Medium', issues: 1 },
    ],
    summary: 'The property is in generally good condition but requires attention to electrical and plumbing issues. The foundation shows minor settling but is not an immediate concern.',
    estimatedCost: 125000,
    nextInspection: '2024-04-15',
    documents: [
      { id: 1, name: 'Full Inspection Report.pdf', date: '2023-10-15', size: '2.4 MB' },
      { id: 2, name: 'Structural Analysis.pdf', date: '2023-10-10', size: '1.8 MB' },
      { id: 3, name: 'Electrical Report.pdf', date: '2023-10-05', size: '1.2 MB' },
    ]
  },
  // Additional properties can be added here
];

// Sample data for risk distribution
const riskDistributionData = [
  { name: 'Critical', value: 2, color: '#F44336' },
  { name: 'High', value: 5, color: '#FF9800' },
  { name: 'Medium', value: 8, color: '#FFC107' },
  { name: 'Low', value: 12, color: '#4CAF50' },
];

const PropertyReportsPage = () => {
  const [selectedProperty, setSelectedProperty] = useState(properties[0]);
  const [tabValue, setTabValue] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(100);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handlePropertyChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const property = properties.find(p => p.id === event.target.value);
    if (property) setSelectedProperty(property);
  };

  const getRiskColor = (score: number) => {
    if (score >= 80) return '#4CAF50'; // Green
    if (score >= 60) return '#FFC107'; // Yellow
    if (score >= 40) return '#FF9800'; // Orange
    return '#F44336'; // Red
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'default';
    }
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 10, 150));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 10, 50));
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', mb: 3, gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <HomeIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h5" component="h1">
            Property Reports
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, width: isMobile ? '100%' : 'auto' }}>
          <TextField
            select
            label="Select Property"
            value={selectedProperty?.id || ''}
            onChange={handlePropertyChange}
            size="small"
            sx={{ minWidth: 200 }}
          >
            {properties.map((property) => (
              <MenuItem key={property.id} value={property.id}>
                {property.name}
              </MenuItem>
            ))}
          </TextField>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button variant="outlined" startIcon={<DownloadIcon />}>
              PDF
            </Button>
            <Button variant="outlined" startIcon={<ShareIcon />}>
              Share
            </Button>
            <Button variant="outlined" startIcon={<PrintIcon />}>
              Print
            </Button>
          </Box>
        </Box>
      </Box>

      {selectedProperty && (
        <Box>
          {/* Property Header */}
          <Card elevation={0} sx={{ mb: 3, border: '1px solid', borderColor: 'divider' }}>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography variant="h5" component="h2" sx={{ fontWeight: 700, mr: 2 }}>
                      {selectedProperty.name}
                    </Typography>
                    <Chip 
                      label={selectedProperty.type} 
                      size="small" 
                      color="primary" 
                      variant="outlined"
                      sx={{ mr: 1 }}
                    />
                    <Chip 
                      label={`Built: ${selectedProperty.yearBuilt}`} 
                      size="small" 
                      variant="outlined"
                    />
                  </Box>
                  <Typography color="textSecondary" paragraph sx={{ mb: 2 }}>
                    {selectedProperty.address}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
                    <Box>
                      <Typography variant="caption" color="textSecondary" display="block">
                        Last Inspection
                      </Typography>
                      <Typography variant="body2">
                        {new Date(selectedProperty.lastInspection).toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="textSecondary" display="block">
                        Next Inspection
                      </Typography>
                      <Typography variant="body2">
                        {new Date(selectedProperty.nextInspection).toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="textSecondary" display="block">
                        Total Issues
                      </Typography>
                      <Typography variant="body2">
                        {selectedProperty.issues.length} issues found
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card variant="outlined" sx={{ height: '100%' }}>
                    <CardContent sx={{ textAlign: 'center', py: 3 }}>
                      <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                        Overall Risk Score
                      </Typography>
                      <Box 
                        sx={{
                          position: 'relative',
                          width: 120,
                          height: 120,
                          margin: '0 auto',
                          mb: 2
                        }}
                      >
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 1
                          }}
                        >
                          <Typography 
                            variant="h4" 
                            component="div" 
                            sx={{ 
                              fontWeight: 700,
                              color: getRiskColor(selectedProperty.riskScore),
                              lineHeight: 1
                            }}
                          >
                            {selectedProperty.riskScore}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {selectedProperty.riskLevel} Risk
                          </Typography>
                        </Box>
                        <svg width="100%" height="100%" viewBox="0 0 36 36" className="donut">
                          <circle
                            cx="18"
                            cy="18"
                            r="15.91549430918952"
                            fill="none"
                            stroke="#f0f0f0"
                            strokeWidth="3"
                          />
                          <circle
                            cx="18"
                            cy="18"
                            r="15.91549430918952"
                            fill="none"
                            stroke={getRiskColor(selectedProperty.riskScore)}
                            strokeWidth="3"
                            strokeDasharray={`${selectedProperty.riskScore} ${100 - selectedProperty.riskScore}`}
                            strokeDashoffset="25"
                            strokeLinecap="round"
                            transform="rotate(-90 18 18)"
                          />
                        </svg>
                      </Box>
                      <Typography variant="body2" color="textSecondary">
                        Last updated: {new Date().toLocaleDateString()}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange} 
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
            >
              <Tab label="Overview" />
              <Tab label="Issues" />
              <Tab label="Rooms" />
              <Tab label="Documents" />
              <Tab label="History" />
            </Tabs>
          </Box>

          {/* Tab Content */}
          {tabValue === 0 && (
            <Grid container spacing={3}>
              {/* Risk Distribution */}
              <Grid item xs={12} md={6} lg={4}>
                <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>Risk Distribution</Typography>
                    <Box sx={{ height: 250, mt: 2 }}>
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
                          <Tooltip formatter={(value) => [`${value} issues`, 'Count']} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              {/* Critical Issues */}
              <Grid item xs={12} md={6} lg={4}>
                <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6">Critical Issues</Typography>
                      <Chip 
                        label={`${selectedProperty.issues.filter(i => i.severity === 'High').length} Issues`} 
                        color="error" 
                        size="small" 
                        variant="outlined"
                      />
                    </Box>
                    
                    <List dense sx={{ maxHeight: 250, overflow: 'auto' }}>
                      {selectedProperty.issues
                        .filter(issue => issue.severity === 'High')
                        .map((issue, index) => (
                          <ListItem 
                            key={issue.id} 
                            sx={{ 
                              borderLeft: '3px solid', 
                              borderColor: 'error.main',
                              mb: 1,
                              bgcolor: 'rgba(244, 67, 54, 0.05)'
                            }}
                          >
                            <ListItemIcon sx={{ minWidth: 40 }}>
                              <WarningIcon color="error" />
                            </ListItemIcon>
                            <ListItemText
                              primary={issue.description}
                              secondary={`${issue.type} • ${issue.status}`}
                              primaryTypographyProps={{ 
                                variant: 'body2',
                                fontWeight: 500 
                              }}
                              secondaryTypographyProps={{ variant: 'caption' }}
                            />
                          </ListItem>
                      ))}
                      {selectedProperty.issues.filter(i => i.severity === 'High').length === 0 && (
                        <Box sx={{ textAlign: 'center', py: 2 }}>
                          <CheckCircleIcon color="success" sx={{ fontSize: 40, opacity: 0.5, mb: 1 }} />
                          <Typography variant="body2" color="textSecondary">
                            No critical issues found
                          </Typography>
                        </Box>
                      )}
                    </List>
                  </CardContent>
                </Card>
              </Grid>

              {/* Property Summary */}
              <Grid item xs={12} lg={4}>
                <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>Property Summary</Typography>
                    <Typography variant="body2" paragraph>
                      {selectedProperty.summary}
                    </Typography>
                    
                    <Divider sx={{ my: 2 }} />
                    
                    <Typography variant="subtitle2" gutterBottom>Estimated Repair Cost</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6" color="primary" sx={{ fontWeight: 700, mr: 2 }}>
                        ₹{selectedProperty.estimatedCost.toLocaleString()}
                      </Typography>
                      <Chip 
                        label="Get Quote" 
                        size="small" 
                        color="primary" 
                        variant="outlined"
                        onClick={() => {}}
                        sx={{ cursor: 'pointer' }}
                      />
                    </Box>
                    
                    <Typography variant="caption" color="textSecondary" display="block" gutterBottom>
                      * Cost estimation based on average market rates
                    </Typography>
                    
                    <Button 
                      variant="contained" 
                      color="primary" 
                      fullWidth 
                      sx={{ mt: 2 }}
                      endIcon={<ArrowForwardIcon />}
                    >
                      View Detailed Report
                    </Button>
                  </CardContent>
                </Card>
              </Grid>

              {/* Room-by-Room Analysis */}
              <Grid item xs={12}>
                <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                      <Typography variant="h6">Room-by-Room Analysis</Typography>
                      <Box>
                        <IconButton size="small" onClick={handleZoomOut} disabled={zoomLevel <= 50}>
                          <ZoomOutIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" onClick={handleZoomIn} disabled={zoomLevel >= 150}>
                          <ZoomInIcon fontSize="small" />
                        </IconButton>
                        <Typography variant="caption" color="textSecondary" sx={{ ml: 1 }}>
                          {zoomLevel}%
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Box sx={{ overflowX: 'auto', py: 2 }}>
                      <Box sx={{ 
                        display: 'flex', 
                        gap: 2, 
                        minWidth: 'max-content',
                        transform: `scale(${zoomLevel / 100})`,
                        transformOrigin: '0 0',
                        width: `${(zoomLevel / 100) * 100}%`
                      }}>
                        {selectedProperty.rooms.map((room, index) => (
                          <Card 
                            key={index} 
                            variant="outlined" 
                            sx={{ 
                              minWidth: 200,
                              borderColor: room.risk === 'High' ? 'error.light' : 
                                         room.risk === 'Medium' ? 'warning.light' : 'divider',
                              '&:hover': {
                                boxShadow: 3,
                                transform: 'translateY(-4px)',
                                transition: 'all 0.3s ease-in-out'
                              }
                            }}
                          >
                            <CardContent sx={{ textAlign: 'center' }}>
                              <ApartmentIcon 
                                sx={{ 
                                  fontSize: 40, 
                                  color: room.risk === 'High' ? 'error.main' : 
                                         room.risk === 'Medium' ? 'warning.main' : 'success.main',
                                  mb: 1 
                                }} 
                              />
                              <Typography variant="subtitle1" gutterBottom>
                                {room.name}
                              </Typography>
                              <Chip 
                                label={`${room.risk} Risk`} 
                                size="small" 
                                color={room.risk === 'High' ? 'error' : room.risk === 'Medium' ? 'warning' : 'success'}
                                variant="outlined"
                                sx={{ mb: 1 }}
                              />
                              <Typography variant="body2" color="textSecondary">
                                {room.issues} {room.issues === 1 ? 'issue' : 'issues'} found
                              </Typography>
                              <Button 
                                size="small" 
                                sx={{ mt: 1 }}
                                onClick={() => setTabValue(1)}
                              >
                                View Details
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}

          {/* Issues Tab */}
          {tabValue === 1 && (
            <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6">All Issues</Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <TextField
                      select
                      size="small"
                      label="Filter by Severity"
                      defaultValue="all"
                      sx={{ minWidth: 150 }}
                    >
                      <MenuItem value="all">All Severities</MenuItem>
                      <MenuItem value="high">High</MenuItem>
                      <MenuItem value="medium">Medium</MenuItem>
                      <MenuItem value="low">Low</MenuItem>
                    </TextField>
                    <TextField
                      select
                      size="small"
                      label="Filter by Status"
                      defaultValue="all"
                      sx={{ minWidth: 150 }}
                    >
                      <MenuItem value="all">All Statuses</MenuItem>
                      <MenuItem value="open">Open</MenuItem>
                      <MenuItem value="in-progress">In Progress</MenuItem>
                      <MenuItem value="resolved">Resolved</MenuItem>
                    </TextField>
                  </Box>
                </Box>
                
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                  {selectedProperty.issues.map((issue, index) => (
                    <Box key={issue.id}>
                      <ListItem 
                        alignItems="flex-start"
                        sx={{
                          borderLeft: '3px solid',
                          borderColor: issue.severity === 'High' ? 'error.main' : 
                                      issue.severity === 'Medium' ? 'warning.main' : 'info.main',
                          mb: 1,
                          bgcolor: issue.severity === 'High' ? 'rgba(244, 67, 54, 0.05)' :
                                  issue.severity === 'Medium' ? 'rgba(255, 152, 0, 0.05)' :
                                  'rgba(33, 150, 243, 0.05)'
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          {issue.severity === 'High' ? 
                            <ErrorIcon color="error" /> : 
                            issue.severity === 'Medium' ? 
                            <WarningIcon color="warning" /> : 
                            <CheckCircleIcon color="info" />
                          }
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                              <Typography variant="subtitle2" component="span">
                                {issue.description}
                              </Typography>
                              <Chip 
                                label={issue.status} 
                                size="small" 
                                color={issue.status === 'Open' ? 'error' : 'primary'}
                                variant="outlined"
                                sx={{ ml: 1 }}
                              />
                            </Box>
                          }
                          secondary={
                            <>
                              <Typography
                                component="span"
                                variant="body2"
                                color="text.primary"
                                sx={{ display: 'inline' }}
                              >
                                {issue.type} • {issue.severity} Priority
                              </Typography>
                              <br />
                              <Typography variant="caption" color="text.secondary">
                                First reported on {new Date().toLocaleDateString()}
                              </Typography>
                            </>
                          }
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', ml: 2 }}>
                          <Button size="small" sx={{ mb: 1 }}>View Details</Button>
                          <Chip 
                            label="Add Note" 
                            size="small" 
                            variant="outlined" 
                            onClick={() => {}}
                            sx={{ cursor: 'pointer' }}
                          />
                        </Box>
                      </ListItem>
                      {index < selectedProperty.issues.length - 1 && <Divider variant="inset" component="li" />}
                    </Box>
                  ))}
                </List>
              </CardContent>
            </Card>
          )}

          {/* Documents Tab */}
          {tabValue === 3 && (
            <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Property Documents</Typography>
                <Typography variant="body2" color="textSecondary" paragraph>
                  All inspection reports and related documents for {selectedProperty.name}.
                </Typography>
                
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                  {selectedProperty.documents.map((doc, index) => (
                    <Box key={doc.id}>
                      <ListItem 
                        secondaryAction={
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <IconButton edge="end" size="small">
                              <DownloadIcon fontSize="small" />
                            </IconButton>
                            <IconButton edge="end" size="small">
                              <ShareIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        }
                        sx={{ py: 2 }}
                      >
                        <ListItemIcon>
                          <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.contrastText' }}>
                            PDF
                          </Avatar>
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography variant="subtitle2">
                              {doc.name}
                            </Typography>
                          }
                          secondary={
                            <>
                              <Typography variant="caption" display="block">
                                {doc.date} • {doc.size}
                              </Typography>
                              <LinearProgress 
                                variant="determinate" 
                                value={100} 
                                sx={{ 
                                  mt: 1, 
                                  height: 4, 
                                  borderRadius: 2,
                                  '& .MuiLinearProgress-bar': {
                                    backgroundColor: 'primary.main'
                                  }
                                }} 
                              />
                            </>
                          }
                        />
                      </ListItem>
                      {index < selectedProperty.documents.length - 1 && <Divider variant="inset" component="li" />}
                    </Box>
                  ))}
                </List>
                
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <Button 
                    variant="outlined" 
                    startIcon={<DownloadIcon />}
                    sx={{ mr: 1 }}
                  >
                    Download All
                  </Button>
                  <Button 
                    variant="contained" 
                    color="primary"
                    startIcon={<UploadIcon />}
                  >
                    Upload Document
                  </Button>
                </Box>
              </CardContent>
            </Card>
          )}
        </Box>
      )}
      
      {/* Floating Action Button for Mobile */}
      {isMobile && (
        <Box sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 1000 }}>
          <Fab color="primary" aria-label="add" onClick={() => {}}>
            <AddIcon />
          </Fab>
        </Box>
      )}
    </Container>
  );
};

export default PropertyReportsPage;
