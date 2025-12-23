import { useState } from 'react';
import { 
  Box, Typography, Container, Stepper, Step, StepLabel, 
  Button, Grid, TextField, Card, CardContent, FormControl, 
  InputLabel, Select, MenuItem, Divider, IconButton, 
  useTheme, useMediaQuery, FormControlLabel, Checkbox, List, ListItem, ListItemIcon
} from '@mui/material';
import { 
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  CloudUpload as CloudUploadIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Home as HomeIcon,
  Apartment as ApartmentIcon,
  Description as DescriptionIcon,
  Assessment as AssessmentIcon,
  FiberManualRecord as FiberManualRecordIcon
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useNavigate } from 'react-router-dom';

// Constants
const propertyTypes = ['Residential House', 'Apartment', 'Commercial Building', 'Industrial', 'Other'];
const constructionTypes = ['Concrete', 'Steel', 'Wood', 'Masonry', 'Mixed', 'Other'];
const inspectionAreas = ['Foundation', 'Roof', 'Exterior', 'Plumbing', 'Electrical', 'HVAC', 'Interior'];
const severityLevels = [
  { value: 'low', label: 'Low', color: 'success' },
  { value: 'medium', label: 'Medium', color: 'warning' },
  { value: 'high', label: 'High', color: 'error' },
  { value: 'critical', label: 'Critical', color: 'error' },
];

// Initial form state
const initialFormData = {
  propertyInfo: {
    propertyName: '',
    propertyType: '',
    constructionType: '',
    yearBuilt: null,
    address: '',
    city: '',
    state: '',
    zipCode: '',
    ownerName: '',
    ownerContact: '',
    ownerEmail: '',
  },
  inspectionDetails: {
    inspectionDate: new Date(),
    inspectorName: '',
    inspectionType: 'Full',
    areasToInspect: [],
    specialInstructions: '',
  },
  issues: [{
    id: 1,
    area: '',
    description: '',
    severity: 'medium',
    recommendedAction: '',
    estimatedCost: '',
    images: [],
    requiresFollowUp: false,
    followUpDate: null,
  }],
};

const NewInspectionPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState(initialFormData);
  const steps = ['Property Info', 'Inspection Details', 'Document Issues', 'Review & Submit'];

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleInputChange = (step, field, value) => {
    setFormData(prev => ({
      ...prev,
      [step]: {
        ...prev[step],
        [field]: value
      }
    }));
  };

  const handleIssueChange = (index, field, value) => {
    const updatedIssues = [...formData.issues];
    updatedIssues[index] = {
      ...updatedIssues[index],
      [field]: value
    };
    setFormData(prev => ({ ...prev, issues: updatedIssues }));
  };

  const addNewIssue = () => {
    const newIssue = {
      id: formData.issues.length + 1,
      area: '',
      description: '',
      severity: 'medium',
      recommendedAction: '',
      estimatedCost: '',
      images: [],
      requiresFollowUp: false,
      followUpDate: null,
    };
    setFormData(prev => ({ ...prev, issues: [...prev.issues, newIssue] }));
  };

  const removeIssue = (index) => {
    if (formData.issues.length === 1) return;
    const updatedIssues = formData.issues.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, issues: updatedIssues }));
  };

  const handleImageUpload = (issueIndex, event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map(file => URL.createObjectURL(file));
    const updatedIssues = [...formData.issues];
    updatedIssues[issueIndex].images = [...updatedIssues[issueIndex].images, ...newImages];
    setFormData(prev => ({ ...prev, issues: updatedIssues }));
  };

  const removeImage = (issueIndex, imageIndex) => {
    const updatedIssues = [...formData.issues];
    updatedIssues[issueIndex].images.splice(imageIndex, 1);
    setFormData(prev => ({ ...prev, issues: updatedIssues }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Navigate to reports or show success message
    // navigate('/reports');
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0: return renderPropertyInfo();
      case 1: return renderInspectionDetails();
      case 2: return renderDocumentIssues();
      case 3: return renderReview();
      default: return null;
    }
  };

  const renderPropertyInfo = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Typography variant="h6" gutterBottom>Property Details</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Property Name"
              value={formData.propertyInfo.propertyName}
              onChange={(e) => handleInputChange('propertyInfo', 'propertyName', e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Property Type</InputLabel>
              <Select
                value={formData.propertyInfo.propertyType}
                label="Property Type"
                onChange={(e) => handleInputChange('propertyInfo', 'propertyType', e.target.value)}
              >
                {propertyTypes.map((type) => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Construction Type</InputLabel>
              <Select
                value={formData.propertyInfo.constructionType}
                label="Construction Type"
                onChange={(e) => handleInputChange('propertyInfo', 'constructionType', e.target.value)}
              >
                {constructionTypes.map((type) => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Year Built"
              type="number"
              value={formData.propertyInfo.yearBuilt || ''}
              onChange={(e) => handleInputChange('propertyInfo', 'yearBuilt', parseInt(e.target.value) || '')}
              inputProps={{ min: '1800', max: new Date().getFullYear() }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h6" gutterBottom>Owner Information</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Owner Name"
              value={formData.propertyInfo.ownerName}
              onChange={(e) => handleInputChange('propertyInfo', 'ownerName', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Contact Number"
              value={formData.propertyInfo.ownerContact}
              onChange={(e) => handleInputChange('propertyInfo', 'ownerContact', e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={formData.propertyInfo.ownerEmail}
              onChange={(e) => handleInputChange('propertyInfo', 'ownerEmail', e.target.value)}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );

  const renderInspectionDetails = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Typography variant="h6" gutterBottom>Inspection Details</Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Inspection Date"
            value={formData.inspectionDetails.inspectionDate}
            onChange={(date) => handleInputChange('inspectionDetails', 'inspectionDate', date)}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </LocalizationProvider>
        <TextField
          fullWidth
          label="Inspector Name"
          value={formData.inspectionDetails.inspectorName}
          onChange={(e) => handleInputChange('inspectionDetails', 'inspectorName', e.target.value)}
          margin="normal"
          required
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Inspection Type</InputLabel>
          <Select
            value={formData.inspectionDetails.inspectionType}
            label="Inspection Type"
            onChange={(e) => handleInputChange('inspectionDetails', 'inspectionType', e.target.value)}
          >
            <MenuItem value="Full">Full Inspection</MenuItem>
            <MenuItem value="Partial">Partial Inspection</MenuItem>
            <MenuItem value="Reinspection">Reinspection</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Areas to Inspect</InputLabel>
          <Select
            multiple
            value={formData.inspectionDetails.areasToInspect}
            onChange={(e) => handleInputChange('inspectionDetails', 'areasToInspect', e.target.value)}
            renderValue={(selected) => selected.join(', ')}
          >
            {inspectionAreas.map((area) => (
              <MenuItem key={area} value={area}>
                <Checkbox checked={formData.inspectionDetails.areasToInspect.indexOf(area) > -1} />
                {area}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );

  const renderDocumentIssues = () => (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">Document Issues</Typography>
        <Button variant="outlined" startIcon={<AddIcon />} onClick={addNewIssue}>
          Add Issue
        </Button>
      </Box>
      {formData.issues.map((issue, index) => (
        <Card key={index} sx={{ mb: 3, borderLeft: '4px solid', 
          borderColor: issue.severity === 'critical' ? 'error.main' : 
                      issue.severity === 'high' ? 'error.light' : 
                      issue.severity === 'medium' ? 'warning.main' : 'success.main'
        }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="subtitle1">Issue #{index + 1}</Typography>
              {formData.issues.length > 1 && (
                <IconButton size="small" onClick={() => removeIssue(index)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              )}
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                  <InputLabel>Area</InputLabel>
                  <Select
                    value={issue.area}
                    label="Area"
                    onChange={(e) => handleIssueChange(index, 'area', e.target.value)}
                  >
                    {inspectionAreas.map((area) => (
                      <MenuItem key={area} value={area}>{area}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                  <InputLabel>Severity</InputLabel>
                  <Select
                    value={issue.severity}
                    label="Severity"
                    onChange={(e) => handleIssueChange(index, 'severity', e.target.value)}
                  >
                    {severityLevels.map((level) => (
                      <MenuItem key={level.value} value={level.value}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {level.value === 'critical' && <ErrorIcon color="error" fontSize="small" sx={{ mr: 1 }} />}
                          {level.value === 'high' && <WarningIcon color="warning" fontSize="small" sx={{ mr: 1 }} />}
                          {level.value === 'medium' && <WarningIcon color="warning" fontSize="small" sx={{ mr: 1 }} />}
                          {level.value === 'low' && <CheckCircleIcon color="success" fontSize="small" sx={{ mr: 1 }} />}
                          {level.label}
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  size="small"
                  label="Estimated Cost (₹)"
                  type="number"
                  value={issue.estimatedCost}
                  onChange={(e) => handleIssueChange(index, 'estimatedCost', e.target.value)}
                  sx={{ mb: 2 }}
                  InputProps={{
                    startAdornment: '₹ ',
                  }}
                />
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={issue.requiresFollowUp}
                      onChange={(e) => handleIssueChange(index, 'requiresFollowUp', e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Requires Follow-up"
                />
                {issue.requiresFollowUp && (
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Follow-up Date"
                      value={issue.followUpDate}
                      onChange={(date) => handleIssueChange(index, 'followUpDate', date)}
                      renderInput={(params) => (
                        <TextField 
                          {...params} 
                          fullWidth 
                          size="small" 
                          sx={{ mt: 1 }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Issue Description"
                  multiline
                  rows={4}
                  value={issue.description}
                  onChange={(e) => handleIssueChange(index, 'description', e.target.value)}
                  placeholder="Describe the issue in detail..."
                  sx={{ mb: 2 }}
                />
                <Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Attach Photos ({issue.images.length}/10)
                  </Typography>
                  <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id={`upload-image-${index}`}
                    type="file"
                    multiple
                    onChange={(e) => handleImageUpload(index, e)}
                  />
                  <label htmlFor={`upload-image-${index}`}>
                    <Button 
                      variant="outlined" 
                      component="span" 
                      size="small" 
                      startIcon={<CloudUploadIcon />}
                      disabled={issue.images.length >= 10}
                    >
                      Upload Images
                    </Button>
                  </label>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                    {issue.images.map((img, imgIndex) => (
                      <Box 
                        key={imgIndex} 
                        sx={{ 
                          position: 'relative',
                          width: 80, 
                          height: 80,
                          borderRadius: 1,
                          overflow: 'hidden',
                          '&:hover .remove-btn': {
                            opacity: 1,
                          }
                        }}
                      >
                        <Box
                          component="img"
                          src={img}
                          alt={`Issue ${index + 1} - Image ${imgIndex + 1}`}
                          sx={{ 
                            width: '100%', 
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                        <IconButton
                          size="small"
                          color="error"
                          className="remove-btn"
                          onClick={() => removeImage(index, imgIndex)}
                          sx={{
                            position: 'absolute',
                            top: 4,
                            right: 4,
                            bgcolor: 'rgba(255, 255, 255, 0.8)',
                            opacity: 0,
                            transition: 'opacity 0.2s',
                            '&:hover': {
                              bgcolor: 'rgba(255, 255, 255, 0.9)',
                            }
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
    </Box>
  );

  const renderReview = () => {
    const totalCost = formData.issues.reduce((sum, issue) => 
      sum + (parseFloat(issue.estimatedCost) || 0), 0
    );
    
    return (
      <Box>
        <Typography variant="h6" gutterBottom>Review Your Inspection</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card variant="outlined" sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <HomeIcon color="primary" sx={{ mr: 1 }} />
                  Property Information
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">Property Name</Typography>
                    <Typography variant="body1" gutterBottom>{formData.propertyInfo.propertyName || '-'}</Typography>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>Property Type</Typography>
                    <Typography variant="body1" gutterBottom>{formData.propertyInfo.propertyType || '-'}</Typography>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>Construction Type</Typography>
                    <Typography variant="body1" gutterBottom>{formData.propertyInfo.constructionType || '-'}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">Address</Typography>
                    <Typography variant="body1" gutterBottom>
                      {formData.propertyInfo.address ? (
                        <>
                          {formData.propertyInfo.address}<br />
                          {formData.propertyInfo.city}, {formData.propertyInfo.state} {formData.propertyInfo.zipCode}
                        </>
                      ) : '-'}
                    </Typography>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>Year Built</Typography>
                    <Typography variant="body1">{formData.propertyInfo.yearBuilt || '-'}</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card variant="outlined" sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <DescriptionIcon color="primary" sx={{ mr: 1 }} />
                  Inspection Details
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">Inspection Date</Typography>
                    <Typography variant="body1" gutterBottom>
                      {formData.inspectionDetails.inspectionDate?.toLocaleDateString() || '-'}
                    </Typography>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>Inspection Type</Typography>
                    <Typography variant="body1" gutterBottom>
                      {formData.inspectionDetails.inspectionType || '-'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">Inspector</Typography>
                    <Typography variant="body1" gutterBottom>
                      {formData.inspectionDetails.inspectorName || '-'}
                    </Typography>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>Areas to Inspect</Typography>
                    <Typography variant="body1">
                      {formData.inspectionDetails.areasToInspect.length > 0 
                        ? formData.inspectionDetails.areasToInspect.join(', ')
                        : 'No areas selected'}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <AssessmentIcon color="primary" sx={{ mr: 1 }} />
                  Issues Summary
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Total Issues Found:</Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {formData.issues.length}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <FiberManualRecordIcon color="error" fontSize="small" sx={{ mr: 0.5 }} />
                      <Typography variant="body2">Critical:</Typography>
                    </Box>
                    <Typography variant="body1" fontWeight="medium">
                      {formData.issues.filter(i => i.severity === 'critical').length}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <FiberManualRecordIcon color="warning" fontSize="small" sx={{ mr: 0.5 }} />
                      <Typography variant="body2">High:</Typography>
                    </Box>
                    <Typography variant="body1" fontWeight="medium">
                      {formData.issues.filter(i => i.severity === 'high').length}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <FiberManualRecordIcon sx={{ color: '#ffc107', fontSize: '1rem', mr: 0.5 }} />
                      <Typography variant="body2">Medium:</Typography>
                    </Box>
                    <Typography variant="body1" fontWeight="medium">
                      {formData.issues.filter(i => i.severity === 'medium').length}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <FiberManualRecordIcon color="success" fontSize="small" sx={{ mr: 0.5 }} />
                      <Typography variant="body2">Low:</Typography>
                    </Box>
                    <Typography variant="body1" fontWeight="medium">
                      {formData.issues.filter(i => i.severity === 'low').length}
                    </Typography>
                  </Box>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body1" fontWeight="medium">Estimated Total Cost:</Typography>
                    <Typography variant="h6" color="primary" fontWeight="bold">
                      ₹{totalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    );
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          New Property Inspection
        </Typography>
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        
        <Box sx={{ mb: 4 }}>
          {renderStepContent(activeStep)}
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 2 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            startIcon={<ArrowBackIcon />}
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
            endIcon={activeStep === steps.length - 1 ? null : <ArrowForwardIcon />}
          >
            {activeStep === steps.length - 1 ? 'Submit Inspection' : 'Next'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default NewInspectionPage;
