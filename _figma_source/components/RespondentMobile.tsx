import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Checkbox } from './ui/checkbox';
import { Progress } from './ui/progress';
import { Textarea } from './ui/textarea';
import { 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  Check, 
  X, 
  Menu,
  User,
  Home,
  BarChart3,
  Settings,
  MapPin,
  DollarSign,
  Clock,
  Shield,
  Mail,
  AlertCircle,
  Gift,
  Heart,
  Bell,
  PartyPopper,
  CheckCircle,
  Trophy,
  Sparkles,
  ThumbsUp,
  Save
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export function RespondentMobile() {
  const [currentStep, setCurrentStep] = useState(1);
  const [rating, setRating] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [mobileScreen, setMobileScreen] = useState('landing');
  const [zipCode, setZipCode] = useState('');
  const [screenerZip, setScreenerZip] = useState('');
  const [zipError, setZipError] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [surveyWillingness, setSurveyWillingness] = useState<string>('');
  const [notificationEmail, setNotificationEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [payoutEmail, setPayoutEmail] = useState('user@example.com'); // Pre-filled with registered email
  const [payoutEmailSaved, setPayoutEmailSaved] = useState(false);
  const [ageConsent, setAgeConsent] = useState(false);
  const [participationConsent, setParticipationConsent] = useState(false);
  const totalSteps = 5;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleOption = (option: string) => {
    setSelectedOptions(prev => 
      prev.includes(option) 
        ? prev.filter(item => item !== option)
        : [...prev, option]
    );
  };

  const handleScreenerZipChange = (value: string) => {
    setScreenerZip(value);
    setZipError('');
  };

  const validateZip = () => {
    if (!screenerZip) {
      setZipError('ZIP code is required');
      return false;
    }
    if (screenerZip.length !== 5) {
      setZipError('ZIP code must be 5 digits');
      return false;
    }
    if (!/^\d{5}$/.test(screenerZip)) {
      setZipError('ZIP code must contain only numbers');
      return false;
    }
    // Check if ZIP is in target districts
    const targetZips = ['19008', '19468', '19086', '54601', '54729', '54017'];
    if (!targetZips.includes(screenerZip)) {
      setZipError('Sorry, this survey is not available in your area');
      return false;
    }
    return true;
  };

  const handleScreenerNext = () => {
    if (validateZip()) {
      // Continue to next screener question
      console.log('ZIP validated, proceeding...');
    }
  };

  const toggleTopic = (topic: string) => {
    setSelectedTopics(prev => 
      prev.includes(topic) 
        ? prev.filter(item => item !== topic)
        : [...prev, topic]
    );
  };

  const handleTopicsNext = () => {
    if (selectedTopics.length > 0) {
      // Continue to next screener question
      console.log('Topics selected:', selectedTopics);
    }
  };

  const handleWillingnessChange = (value: string) => {
    setSurveyWillingness(value);
  };

  const handleScreenerComplete = () => {
    if (surveyWillingness === 'yes') {
      // Proceed to main survey
      console.log('Screener completed, proceeding to survey...');
    } else {
      // Handle "no" response (typically show thank you message)
      console.log('User declined survey participation');
    }
  };

  const handleEmailSubmit = () => {
    if (notificationEmail && notificationEmail.includes('@')) {
      setEmailSubmitted(true);
      console.log('Email submitted for future notifications:', notificationEmail);
    }
  };

  const handleCloseSession = () => {
    console.log('Session closed by user');
    // Would typically close the survey or redirect
  };

  const handleContinueToSurvey = () => {
    setMobileScreen('survey');
    console.log('Proceeding to main survey...');
  };

  const handleSavePayoutEmail = () => {
    if (payoutEmail && payoutEmail.includes('@')) {
      setPayoutEmailSaved(true);
      console.log('Payout email confirmed:', payoutEmail);
    }
  };

  const handleCompleteSurvey = () => {
    setMobileScreen('completion');
    console.log('Survey completed, showing completion screen');
  };

  const SurveyHeader = () => (
    <div className="bg-blue-500 text-white p-4">
      <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" size="sm" className="text-white hover:bg-blue-600 p-2">
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div className="fieldwork-label">Customer Survey</div>
        <Button variant="ghost" size="sm" className="text-white hover:bg-blue-600 p-2">
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="fieldwork-secondary">Question {currentStep} of {totalSteps}</span>
          <span className="fieldwork-secondary">{Math.round((currentStep / totalSteps) * 100)}%</span>
        </div>
        <Progress value={(currentStep / totalSteps) * 100} className="h-2 bg-blue-400" />
      </div>
    </div>
  );

  const Question1 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="fieldwork-h3 text-gray-900 mb-3">How would you rate our service overall?</h3>
        <p className="fieldwork-secondary text-gray-600">Please select a rating from 1 to 5 stars</p>
      </div>
      <div className="flex justify-center space-x-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            className="p-2"
          >
            <Star 
              className={`h-8 w-8 ${
                star <= rating 
                  ? 'text-yellow-400 fill-yellow-400' 
                  : 'text-gray-300'
              }`} 
            />
          </button>
        ))}
      </div>
      {rating > 0 && (
        <div className="text-center">
          <span className="fieldwork-body text-gray-600">
            You rated: {rating} star{rating !== 1 ? 's' : ''}
          </span>
        </div>
      )}
    </div>
  );

  const Question2 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="fieldwork-h3 text-gray-900 mb-3">Which features do you use most often?</h3>
        <p className="fieldwork-secondary text-gray-600">Select all that apply</p>
      </div>
      <div className="space-y-3">
        {[
          'Dashboard Analytics',
          'Survey Builder', 
          'Response Tracking',
          'Data Export',
          'Team Collaboration',
          'Mobile App'
        ].map((option) => (
          <div key={option} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
            <Checkbox 
              id={option}
              checked={selectedOptions.includes(option)}
              onCheckedChange={() => toggleOption(option)}
            />
            <Label htmlFor={option} className="flex-1 fieldwork-body">
              {option}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );

  const Question3 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="fieldwork-h3 text-gray-900 mb-3">How likely are you to recommend us?</h3>
        <p className="fieldwork-secondary text-gray-600">Scale from 0 (not likely) to 10 (very likely)</p>
      </div>
      <RadioGroup className="grid grid-cols-5 gap-2">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
          <div key={value} className="flex flex-col items-center space-y-2">
            <RadioGroupItem value={value.toString()} id={`nps-${value}`} />
            <Label htmlFor={`nps-${value}`} className="fieldwork-caption text-gray-600">
              {value}
            </Label>
          </div>
        ))}
      </RadioGroup>
      <div className="flex justify-between">
        <span className="fieldwork-caption text-gray-500">Not likely</span>
        <span className="fieldwork-caption text-gray-500">Very likely</span>
      </div>
    </div>
  );

  const Question4 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="fieldwork-h3 text-gray-900 mb-3">Tell us about your experience</h3>
        <p className="fieldwork-secondary text-gray-600">Share any additional feedback or suggestions</p>
      </div>
      <div className="space-y-3">
        <Label htmlFor="feedback">Your feedback</Label>
        <Textarea 
          id="feedback"
          placeholder="Type your feedback here..."
          className="min-h-[120px] resize-none"
        />
      </div>
    </div>
  );

  const Question5 = () => (
    <div className="space-y-6 text-center">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <Check className="h-8 w-8 text-green-600" />
      </div>
      <div>
        <h3 className="fieldwork-h3 text-gray-900 mb-3">Thank you for your feedback!</h3>
        <p className="fieldwork-body text-gray-600">
          Your responses have been submitted successfully. We appreciate you taking the time to help us improve.
        </p>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="fieldwork-secondary text-gray-600">
          Survey completed in 2 minutes and 34 seconds
        </p>
      </div>
    </div>
  );

  const renderCurrentQuestion = () => {
    switch (currentStep) {
      case 1: return <Question1 />;
      case 2: return <Question2 />;
      case 3: return <Question3 />;
      case 4: return <Question4 />;
      case 5: return <Question5 />;
      default: return <Question1 />;
    }
  };

  const MobileNavigation = () => (
    <div className="bg-white border-t border-gray-200 p-4">
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={handlePrev}
          disabled={currentStep === 1}
          className="flex-1 mr-2"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        <Button 
          onClick={handleNext}
          disabled={currentStep === totalSteps}
          className="flex-1 ml-2"
        >
          {currentStep === totalSteps ? 'Complete' : 'Next'}
          {currentStep !== totalSteps && <ChevronRight className="h-4 w-4 ml-2" />}
        </Button>
      </div>
    </div>
  );

  const LandingConsentScreen = () => (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Mobile Status Bar */}
      <div className="bg-gray-900 text-white text-center py-1">
        <span className="fieldwork-caption">9:41 AM</span>
      </div>
      
      {/* Content */}
      <div className="flex-1 p-4 space-y-6">
        {/* Header */}
        <div className="text-center space-y-4 pt-8 pb-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
            <DollarSign className="h-8 w-8 text-blue-600" />
          </div>
          <div>
            <h1 className="fieldwork-h2 text-gray-900 mb-2">
              Earn $15 for a 12–15 min survey
            </h1>
            <p className="fieldwork-body text-gray-600">
              Help us understand rising prices in your area
            </p>
          </div>
        </div>

        {/* Survey Details */}
        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
          <div className="flex items-center space-x-3">
            <Clock className="h-5 w-5 text-gray-500" />
            <div>
              <div className="fieldwork-body text-gray-900">12–15 minutes</div>
              <div className="fieldwork-secondary text-gray-500">Average completion time</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <DollarSign className="h-5 w-5 text-gray-500" />
            <div>
              <div className="fieldwork-body text-gray-900">$15 Amazon Gift Card</div>
              <div className="fieldwork-secondary text-gray-500">Sent via email after completion</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Shield className="h-5 w-5 text-gray-500" />
            <div>
              <div className="fieldwork-body text-gray-900">Confidential & Secure</div>
              <div className="fieldwork-secondary text-gray-500">Your responses are anonymous</div>
            </div>
          </div>
        </div>

        {/* ZIP Code Input */}
        <div className="space-y-3">
          <Label htmlFor="zip" className="fieldwork-label text-gray-900">
            ZIP Code *
          </Label>
          <div className="space-y-2">
            <Input
              id="zip"
              type="text"
              placeholder="Enter your ZIP code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              className="text-center"
              maxLength={5}
            />
            <Button variant="outline" size="sm" className="w-full">
              <MapPin className="h-4 w-4 mr-2" />
              Use my location
            </Button>
          </div>
        </div>

        {/* Consent Checkboxes */}
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Checkbox 
              id="age-consent"
              checked={ageConsent}
              onCheckedChange={setAgeConsent}
              className="mt-0.5"
            />
            <Label htmlFor="age-consent" className="fieldwork-body text-gray-900 leading-6">
              I am 18 years of age or older
            </Label>
          </div>
          <div className="flex items-start space-x-3">
            <Checkbox 
              id="participation-consent"
              checked={participationConsent}
              onCheckedChange={setParticipationConsent}
              className="mt-0.5"
            />
            <Label htmlFor="participation-consent" className="fieldwork-body text-gray-900 leading-6">
              I agree to participate and understand how my data will be used
            </Label>
          </div>
        </div>

        {/* Continue Button */}
        <div className="pt-4">
          <Button 
            className="w-full h-12"
            disabled={!zipCode || !ageConsent || !participationConsent || zipCode.length !== 5}
          >
            Continue
          </Button>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 p-4 text-center border-t border-gray-200">
        <div className="flex items-center justify-center space-x-4">
          <button className="fieldwork-secondary text-gray-600 hover:text-gray-900">
            Privacy
          </button>
          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
          <button className="fieldwork-secondary text-gray-600 hover:text-gray-900">
            Contact
          </button>
        </div>
      </div>
    </div>
  );

  const ScreenerQ1 = () => (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Mobile Status Bar */}
      <div className="bg-gray-900 text-white text-center py-1">
        <span className="fieldwork-caption">9:41 AM</span>
      </div>
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" className="p-2">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div className="fieldwork-label text-gray-900">Qualification Questions</div>
          <div className="w-10"></div> {/* Spacer for alignment */}
        </div>
        
        {/* Progress */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="fieldwork-secondary text-gray-500">Q1/3</span>
            <span className="fieldwork-secondary text-gray-500">33%</span>
          </div>
          <Progress value={33} className="h-2" />
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 p-4 space-y-6">
        {/* Question */}
        <div className="pt-6 space-y-4">
          <div>
            <h2 className="fieldwork-h3 text-gray-900 mb-3">
              What is your ZIP code?
            </h2>
            <p className="fieldwork-secondary text-gray-600">
              This helps us understand your local area
            </p>
          </div>
        </div>

        {/* ZIP Input */}
        <div className="space-y-3">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Enter 5-digit ZIP code"
              value={screenerZip}
              onChange={(e) => handleScreenerZipChange(e.target.value)}
              className={`text-center h-12 text-lg ${zipError ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
              maxLength={5}
            />
            
            {/* Validation Message */}
            {zipError && (
              <div className="flex items-center space-x-2 text-red-600">
                <AlertCircle className="h-4 w-4" />
                <span className="fieldwork-secondary">{zipError}</span>
              </div>
            )}
          </div>

          {/* Location Helper */}
          <Button variant="outline" size="sm" className="w-full">
            <MapPin className="h-4 w-4 mr-2" />
            Use my location
          </Button>
        </div>

        {/* Helper Text */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <div className="fieldwork-body text-blue-900">Your privacy is protected</div>
              <div className="fieldwork-secondary text-blue-700 mt-1">
                We only use your ZIP code to understand regional differences. Your exact location is never stored.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-t border-gray-200 p-4">
        <Button 
          className="w-full h-12"
          onClick={handleScreenerNext}
          disabled={!screenerZip || screenerZip.length !== 5}
        >
          Next
        </Button>
      </div>
    </div>
  );

  const ScreenerQ2 = () => (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Mobile Status Bar */}
      <div className="bg-gray-900 text-white text-center py-1">
        <span className="fieldwork-caption">9:41 AM</span>
      </div>
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" className="p-2">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div className="fieldwork-label text-gray-900">Qualification Questions</div>
          <div className="w-10"></div> {/* Spacer for alignment */}
        </div>
        
        {/* Progress */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="fieldwork-secondary text-gray-500">Q2/3</span>
            <span className="fieldwork-secondary text-gray-500">67%</span>
          </div>
          <Progress value={67} className="h-2" />
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 p-4 space-y-6">
        {/* Question */}
        <div className="pt-6 space-y-4">
          <div>
            <h2 className="fieldwork-h3 text-gray-900 mb-3">
              In the past 60 days, which topics have you looked up online?
            </h2>
            <p className="fieldwork-secondary text-gray-600">
              Select all that apply
            </p>
          </div>
        </div>

        {/* Topic Options */}
        <div className="space-y-3">
          {[
            'Housing costs',
            'Grocery prices', 
            'Tariffs or price changes',
            'Other'
          ].map((topic) => (
            <div key={topic} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Checkbox 
                id={topic}
                checked={selectedTopics.includes(topic)}
                onCheckedChange={() => toggleTopic(topic)}
              />
              <Label htmlFor={topic} className="flex-1 fieldwork-body text-gray-900 cursor-pointer">
                {topic}
              </Label>
            </div>
          ))}
        </div>

        {/* Selection Counter */}
        {selectedTopics.length > 0 && (
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-blue-600" />
              <span className="fieldwork-body text-blue-900">
                {selectedTopics.length} topic{selectedTopics.length !== 1 ? 's' : ''} selected
              </span>
            </div>
            <div className="mt-2">
              <div className="fieldwork-secondary text-blue-700">
                {selectedTopics.join(', ')}
              </div>
            </div>
          </div>
        )}

        {/* Helper Text */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="fieldwork-secondary text-gray-600">
            This helps us understand what economic topics are most relevant to people in your area.
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-t border-gray-200 p-4">
        <Button 
          className="w-full h-12"
          onClick={handleTopicsNext}
          disabled={selectedTopics.length === 0}
        >
          Next
        </Button>
      </div>
    </div>
  );

  const ScreenerQ3 = () => (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Mobile Status Bar */}
      <div className="bg-gray-900 text-white text-center py-1">
        <span className="fieldwork-caption">9:41 AM</span>
      </div>
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" className="p-2">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div className="fieldwork-label text-gray-900">Qualification Questions</div>
          <div className="w-10"></div> {/* Spacer for alignment */}
        </div>
        
        {/* Progress */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="fieldwork-secondary text-gray-500">Q3/3</span>
            <span className="fieldwork-secondary text-gray-500">100%</span>
          </div>
          <Progress value={100} className="h-2" />
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 p-4 space-y-6">
        {/* Question */}
        <div className="pt-6 space-y-4">
          <div>
            <h2 className="fieldwork-h3 text-gray-900 mb-3">
              Are you willing to complete a 12–15 minute survey for a $15 gift card?
            </h2>
            <p className="fieldwork-secondary text-gray-600">
              This is the final qualification question
            </p>
          </div>
        </div>

        {/* Incentive Highlight */}
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center space-x-3">
            <Gift className="h-6 w-6 text-green-600" />
            <div>
              <div className="fieldwork-body text-green-900 mb-1">$15 Amazon Gift Card</div>
              <div className="fieldwork-secondary text-green-700">
                Delivered within 24 hours of survey completion
              </div>
            </div>
          </div>
        </div>

        {/* Yes/No Options */}
        <div className="space-y-3">
          <div 
            onClick={() => handleWillingnessChange('yes')}
            className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-colors ${
              surveyWillingness === 'yes' 
                ? 'border-green-500 bg-green-50' 
                : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
              surveyWillingness === 'yes' 
                ? 'border-green-500 bg-green-500' 
                : 'border-gray-300'
            }`}>
              {surveyWillingness === 'yes' && (
                <div className="w-2 h-2 rounded-full bg-white"></div>
              )}
            </div>
            <Label className="flex-1 fieldwork-body text-gray-900 cursor-pointer">
              Yes, I'm willing to participate
            </Label>
            {surveyWillingness === 'yes' && (
              <Check className="h-5 w-5 text-green-600" />
            )}
          </div>

          <div 
            onClick={() => handleWillingnessChange('no')}
            className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-colors ${
              surveyWillingness === 'no' 
                ? 'border-red-500 bg-red-50' 
                : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
              surveyWillingness === 'no' 
                ? 'border-red-500 bg-red-500' 
                : 'border-gray-300'
            }`}>
              {surveyWillingness === 'no' && (
                <div className="w-2 h-2 rounded-full bg-white"></div>
              )}
            </div>
            <Label className="flex-1 fieldwork-body text-gray-900 cursor-pointer">
              No, I'm not interested
            </Label>
            {surveyWillingness === 'no' && (
              <X className="h-5 w-5 text-red-600" />
            )}
          </div>
        </div>

        {/* Survey Details */}
        <div className="bg-gray-50 p-4 rounded-lg space-y-3">
          <div className="fieldwork-label text-gray-900 mb-2">Survey Details</div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="fieldwork-secondary text-gray-600">12–15 minutes to complete</span>
            </div>
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4 text-gray-500" />
              <span className="fieldwork-secondary text-gray-600">Questions about local economy and costs</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-gray-500" />
              <span className="fieldwork-secondary text-gray-600">Your responses are anonymous and secure</span>
            </div>
          </div>
        </div>

        {/* Conditional Message */}
        {surveyWillingness === 'no' && (
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="fieldwork-body text-blue-900 mb-2">
              Thank you for your time!
            </div>
            <div className="fieldwork-secondary text-blue-700">
              We appreciate you taking the time to consider participating. If you change your mind, you can always return to this survey later.
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="bg-white border-t border-gray-200 p-4">
        <Button 
          className="w-full h-12"
          onClick={handleScreenerComplete}
          disabled={!surveyWillingness}
          variant={surveyWillingness === 'no' ? 'outline' : 'default'}
        >
          {surveyWillingness === 'no' ? 'End Session' : 'Continue'}
        </Button>
      </div>
    </div>
  );

  const DisqualifyScreen = () => (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Mobile Status Bar */}
      <div className="bg-gray-900 text-white text-center py-1">
        <span className="fieldwork-caption">9:41 AM</span>
      </div>
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" className="p-2">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div className="fieldwork-label text-gray-900">Survey Complete</div>
          <div className="w-10"></div> {/* Spacer for alignment */}
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 p-4 space-y-6">
        {/* Thank You Message */}
        <div className="pt-8 text-center space-y-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
            <Heart className="h-8 w-8 text-blue-600" />
          </div>
          
          <div>
            <h2 className="fieldwork-h3 text-gray-900 mb-3">
              Thanks for your interest!
            </h2>
            <p className="fieldwork-body text-gray-600 mb-2">
              You don't qualify this time.
            </p>
            <p className="fieldwork-body text-gray-900">
              Want invites to future studies?
            </p>
          </div>
        </div>

        {/* Benefits Card */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
          <div className="text-center space-y-3">
            <Bell className="h-6 w-6 text-blue-600 mx-auto" />
            <div>
              <div className="fieldwork-label text-blue-900 mb-1">Stay in the Loop</div>
              <div className="fieldwork-secondary text-blue-700">
                Get notified about new research opportunities that match your profile
              </div>
            </div>
          </div>
        </div>

        {!emailSubmitted ? (
          <>
            {/* Email Input */}
            <div className="space-y-3">
              <Label htmlFor="email" className="fieldwork-label text-gray-900">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={notificationEmail}
                onChange={(e) => setNotificationEmail(e.target.value)}
                className="h-12"
              />
            </div>

            {/* Privacy Note */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-gray-500 mt-0.5" />
                <div className="fieldwork-secondary text-gray-600">
                  <div className="mb-1">Your privacy matters</div>
                  <div>We'll only email you about relevant research opportunities. You can unsubscribe anytime.</div>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Success State */
          <div className="bg-green-50 p-6 rounded-lg border border-green-200 text-center space-y-3">
            <Check className="h-8 w-8 text-green-600 mx-auto" />
            <div>
              <div className="fieldwork-body text-green-900 mb-1">You're all set!</div>
              <div className="fieldwork-secondary text-green-700">
                We'll notify you when new studies become available that match your profile.
              </div>
            </div>
          </div>
        )}

        {/* Future Opportunities */}
        <div className="space-y-3">
          <div className="fieldwork-label text-gray-900">What to expect:</div>
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="fieldwork-secondary text-gray-600">New survey invitations 1-2 times per month</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="fieldwork-secondary text-gray-600">Studies that match your location and interests</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="fieldwork-secondary text-gray-600">Compensation ranging from $10-$50 per study</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-t border-gray-200 p-4 space-y-3">
        {!emailSubmitted ? (
          <>
            <Button 
              className="w-full h-12"
              onClick={handleEmailSubmit}
              disabled={!notificationEmail || !notificationEmail.includes('@')}
            >
              Notify Me
            </Button>
            <Button 
              variant="outline"
              className="w-full h-12"
              onClick={handleCloseSession}
            >
              Close
            </Button>
          </>
        ) : (
          <Button 
            className="w-full h-12"
            onClick={handleCloseSession}
          >
            Close
          </Button>
        )}
      </div>
    </div>
  );

  const QualifiedScreen = () => (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Mobile Status Bar */}
      <div className="bg-gray-900 text-white text-center py-1">
        <span className="fieldwork-caption">9:41 AM</span>
      </div>
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" className="p-2">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div className="fieldwork-label text-gray-900">Congratulations!</div>
          <div className="w-10"></div> {/* Spacer for alignment */}
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 p-4 space-y-6">
        {/* Success Message */}
        <div className="pt-8 text-center space-y-4">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <Trophy className="h-10 w-10 text-green-600" />
          </div>
          
          <div>
            <h2 className="fieldwork-h3 text-gray-900 mb-3">
              You qualify! Continue to survey.
            </h2>
            <p className="fieldwork-body text-gray-600">
              Great news! You meet all the requirements for this research study.
            </p>
          </div>
        </div>

        {/* Reward Confirmation */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
          <div className="text-center space-y-3">
            <Gift className="h-8 w-8 text-green-600 mx-auto" />
            <div>
              <div className="fieldwork-title text-green-900 mb-1">$15 Amazon Gift Card</div>
              <div className="fieldwork-body text-green-700 mb-2">
                Will be emailed within 3 days
              </div>
              <div className="fieldwork-secondary text-green-600">
                Sent to your registered email address after survey completion
              </div>
            </div>
          </div>
        </div>

        {/* Survey Preview */}
        <div className="bg-gray-50 p-6 rounded-lg space-y-4">
          <div className="fieldwork-label text-gray-900 mb-3">What's Next:</div>
          
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <div className="fieldwork-body text-gray-900 mb-1">Complete the survey</div>
                <div className="fieldwork-secondary text-gray-600">12-15 minutes of questions about local economy and costs</div>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <div className="fieldwork-body text-gray-900 mb-1">Submit your responses</div>
                <div className="fieldwork-secondary text-gray-600">All answers are anonymous and secure</div>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <div className="fieldwork-body text-gray-900 mb-1">Receive your gift card</div>
                <div className="fieldwork-secondary text-gray-600">Emailed within 3 business days</div>
              </div>
            </div>
          </div>
        </div>

        {/* Encouragement */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center space-x-3">
            <PartyPopper className="h-6 w-6 text-blue-600" />
            <div>
              <div className="fieldwork-body text-blue-900 mb-1">You're making a difference!</div>
              <div className="fieldwork-secondary text-blue-700">
                Your responses will help researchers better understand economic conditions in your area.
              </div>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="fieldwork-label text-gray-900 mb-2">Important Notes:</div>
          <div className="space-y-1">
            <div className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2"></div>
              <span className="fieldwork-secondary text-gray-600">Complete the survey in one session for best results</span>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2"></div>
              <span className="fieldwork-secondary text-gray-600">You can pause and resume if needed</span>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2"></div>
              <span className="fieldwork-secondary text-gray-600">Contact support if you encounter any issues</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-t border-gray-200 p-4">
        <Button 
          className="w-full h-12"
          onClick={handleContinueToSurvey}
        >
          Continue to Survey
        </Button>
      </div>
    </div>
  );

  const CompletionScreen = () => (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Mobile Status Bar */}
      <div className="bg-gray-900 text-white text-center py-1">
        <span className="fieldwork-caption">9:41 AM</span>
      </div>
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="w-10"></div> {/* Spacer */}
          <div className="fieldwork-label text-gray-900">Survey Complete</div>
          <div className="w-10"></div> {/* Spacer for alignment */}
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 p-4 space-y-6">
        {/* Success Message */}
        <div className="pt-8 text-center space-y-4">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto relative">
            <CheckCircle className="h-12 w-12 text-green-600" />
            <Sparkles className="h-6 w-6 text-green-500 absolute -top-1 -right-1" />
          </div>
          
          <div>
            <h2 className="fieldwork-h3 text-gray-900 mb-3">
              Thank you!
            </h2>
            <p className="fieldwork-body text-gray-600 mb-2">
              Your responses have been successfully submitted.
            </p>
            <p className="fieldwork-body text-gray-900">
              We'll email your $15 within 3 days.
            </p>
          </div>
        </div>

        {/* Reward Summary */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
          <div className="text-center space-y-3">
            <Gift className="h-8 w-8 text-green-600 mx-auto" />
            <div>
              <div className="fieldwork-title text-green-900 mb-1">$15 Amazon Gift Card</div>
              <div className="fieldwork-body text-green-700 mb-2">
                Delivered within 3 business days
              </div>
              <div className="fieldwork-secondary text-green-600">
                Check your email inbox and spam folder
              </div>
            </div>
          </div>
        </div>

        {/* Email Confirmation */}
        <div className="space-y-4">
          <div className="fieldwork-label text-gray-900">Confirm your payout email:</div>
          
          {!payoutEmailSaved ? (
            <>
              <div className="space-y-3">
                <Input
                  type="email"
                  placeholder="your.email@example.com"
                  value={payoutEmail}
                  onChange={(e) => setPayoutEmail(e.target.value)}
                  className="h-12"
                />
                <Button 
                  onClick={handleSavePayoutEmail}
                  disabled={!payoutEmail || !payoutEmail.includes('@')}
                  className="w-full h-12"
                >
                  <Save className="h-5 w-5 mr-2" />
                  Save Email
                </Button>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div className="fieldwork-secondary text-blue-700">
                    Make sure this email is correct - this is where we'll send your gift card.
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <div className="fieldwork-body text-green-900 mb-1">Email confirmed!</div>
                  <div className="fieldwork-secondary text-green-700 mb-2">
                    Your gift card will be sent to: <span className="font-medium">{payoutEmail}</span>
                  </div>
                  <div className="fieldwork-secondary text-green-600">
                    You can close this window safely now.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Impact Message */}
        <div className="bg-blue-50 p-6 rounded-lg">
          <div className="text-center space-y-3">
            <ThumbsUp className="h-8 w-8 text-blue-600 mx-auto" />
            <div>
              <div className="fieldwork-body text-blue-900 mb-2">Your contribution matters!</div>
              <div className="fieldwork-secondary text-blue-700">
                Your responses will help researchers better understand economic conditions and inform important policy decisions.
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="fieldwork-label text-gray-900 mb-3">What happens next:</div>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                <span className="fieldwork-caption text-blue-600 font-medium">1</span>
              </div>
              <div>
                <div className="fieldwork-body text-gray-900 mb-1">Processing (24-48 hours)</div>
                <div className="fieldwork-secondary text-gray-600">We review and validate your responses</div>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                <span className="fieldwork-caption text-blue-600 font-medium">2</span>
              </div>
              <div>
                <div className="fieldwork-body text-gray-900 mb-1">Gift card delivery (within 3 days)</div>
                <div className="fieldwork-secondary text-gray-600">Amazon gift card sent to your email</div>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                <span className="fieldwork-caption text-blue-600 font-medium">3</span>
              </div>
              <div>
                <div className="fieldwork-body text-gray-900 mb-1">Future opportunities</div>
                <div className="fieldwork-secondary text-gray-600">Keep an eye out for more research invitations</div>
              </div>
            </div>
          </div>
        </div>

        {/* Support Information */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="fieldwork-label text-gray-900 mb-2">Need help?</div>
          <div className="fieldwork-secondary text-gray-600">
            If you don't receive your gift card within 3 business days, or have any questions, 
            contact our support team at <span className="text-blue-600">support@fieldwork.com</span>
          </div>
        </div>
      </div>
    </div>
  );

  const SurveyApp = () => (
    <div className="bg-white">
      {/* Mobile Status Bar */}
      <div className="bg-gray-900 text-white text-center py-1">
        <span className="fieldwork-caption">9:41 AM</span>
      </div>
      
      <SurveyHeader />
      
      {/* Question Content */}
      <div className="p-4 min-h-[400px]">
        {renderCurrentQuestion()}
      </div>
      
      {/* Navigation */}
      {currentStep < totalSteps && <MobileNavigation />}
      
      {/* Bottom Tab Bar */}
      <div className="bg-gray-50 border-t border-gray-200 p-2">
        <div className="flex justify-around">
          <button className="flex flex-col items-center p-2 text-blue-500">
            <Home className="h-5 w-5" />
            <span className="fieldwork-caption mt-1">Home</span>
          </button>
          <button className="flex flex-col items-center p-2 text-gray-400">
            <BarChart3 className="h-5 w-5" />
            <span className="fieldwork-caption mt-1">Surveys</span>
          </button>
          <button className="flex flex-col items-center p-2 text-gray-400">
            <User className="h-5 w-5" />
            <span className="fieldwork-caption mt-1">Profile</span>
          </button>
          <button className="flex flex-col items-center p-2 text-gray-400">
            <Settings className="h-5 w-5" />
            <span className="fieldwork-caption mt-1">Settings</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderMobileScreen = () => {
    switch (mobileScreen) {
      case 'landing':
        return <LandingConsentScreen />;
      case 'screener1':
        return <ScreenerQ1 />;
      case 'screener2':
        return <ScreenerQ2 />;
      case 'screener3':
        return <ScreenerQ3 />;
      case 'disqualify':
        return <DisqualifyScreen />;
      case 'qualified':
        return <QualifiedScreen />;
      case 'survey':
        return <SurveyApp />;
      case 'completion':
        return <CompletionScreen />;
      default:
        return <LandingConsentScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 text-center">
          <h2 className="fieldwork-h2 text-gray-900 mb-2">Mobile Respondent Experience</h2>
          <p className="fieldwork-body text-gray-600">
            375px width with 16px padding • Optimized for mobile survey completion
          </p>
        </div>

        {/* Screen Selector */}
        <div className="mb-6">
          <Tabs value={mobileScreen} onValueChange={setMobileScreen} className="w-full">
            <TabsList className="grid w-full grid-cols-8">
              <TabsTrigger value="landing">Landing + Consent</TabsTrigger>
              <TabsTrigger value="screener1">Screener Q1</TabsTrigger>
              <TabsTrigger value="screener2">Screener Q2</TabsTrigger>
              <TabsTrigger value="screener3">Screener Q3</TabsTrigger>
              <TabsTrigger value="disqualify">Disqualify</TabsTrigger>
              <TabsTrigger value="qualified">Qualified</TabsTrigger>
              <TabsTrigger value="survey">Survey Experience</TabsTrigger>
              <TabsTrigger value="completion">Completion</TabsTrigger>
            </TabsList>
            
            <div className="mt-6 flex justify-center">
              <div className="w-full max-w-[375px]">
                {/* Mobile Frame */}
                <div className="bg-black rounded-[2rem] p-2 shadow-2xl">
                  <div className="bg-white rounded-[1.5rem] overflow-hidden">
                    {renderMobileScreen()}
                  </div>
                </div>
                
                {/* Mobile Specs */}
                <div className="mt-6 text-center">
                  <div className="inline-flex items-center space-x-4 bg-white rounded-lg p-3 border border-gray-200">
                    <div className="text-center">
                      <div className="fieldwork-caption text-gray-500">Width</div>
                      <div className="fieldwork-label text-gray-900">375px</div>
                    </div>
                    <div className="w-px h-8 bg-gray-200"></div>
                    <div className="text-center">
                      <div className="fieldwork-caption text-gray-500">Padding</div>
                      <div className="fieldwork-label text-gray-900">16px</div>
                    </div>
                    <div className="w-px h-8 bg-gray-200"></div>
                    <div className="text-center">
                      <div className="fieldwork-caption text-gray-500">
                        {mobileScreen === 'survey' ? 'Step' : 'Screen'}
                      </div>
                      <div className="fieldwork-label text-gray-900">
                        {mobileScreen === 'landing' ? 'Landing' : 
                         mobileScreen === 'screener1' ? 'Q1/3' : 
                         mobileScreen === 'screener2' ? 'Q2/3' :
                         mobileScreen === 'screener3' ? 'Q3/3' :
                         mobileScreen === 'disqualify' ? 'End' :
                         mobileScreen === 'qualified' ? 'Qualified' :
                         mobileScreen === 'completion' ? 'Complete' :
                         `${currentStep}/${totalSteps}`}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}