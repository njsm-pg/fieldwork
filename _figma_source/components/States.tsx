import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Alert, AlertDescription } from './ui/alert';
import { Loader2, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

export function States() {
  const [loadingButton, setLoadingButton] = useState(false);
  const [switchStates, setSwitchStates] = useState({
    default: false,
    disabled: false
  });

  const handleLoadingDemo = () => {
    setLoadingButton(true);
    setTimeout(() => setLoadingButton(false), 3000);
  };

  const StateCard = ({ title, description, children }: { title: string; description: string; children: React.ReactNode }) => (
    <Card>
      <CardHeader>
        <CardTitle className="fieldwork-title">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {children}
      </CardContent>
    </Card>
  );

  const StateRow = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
      <Label className="fieldwork-label text-gray-700">{label}</Label>
      <div>{children}</div>
    </div>
  );

  return (
    <div className="p-6 space-y-8">
      {/* Page Header */}
      <div className="max-w-4xl">
        <h2 className="fieldwork-h2 text-gray-900 mb-2">Component States</h2>
        <p className="fieldwork-body text-gray-600">
          Comprehensive overview of all component states including default, hover, active, disabled, loading, and error states.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Button States */}
        <StateCard 
          title="Button States" 
          description="All button variants across different states"
        >
          <StateRow label="Default">
            <Button>Primary Button</Button>
          </StateRow>
          <StateRow label="Hover">
            <Button className="hover:bg-blue-600">Hover State</Button>
          </StateRow>
          <StateRow label="Active/Pressed">
            <Button className="bg-blue-700">Active State</Button>
          </StateRow>
          <StateRow label="Disabled">
            <Button disabled>Disabled Button</Button>
          </StateRow>
          <StateRow label="Loading">
            <Button onClick={handleLoadingDemo} disabled={loadingButton}>
              {loadingButton && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loadingButton ? 'Loading...' : 'Click for Loading'}
            </Button>
          </StateRow>
          <StateRow label="Secondary">
            <Button variant="secondary">Secondary</Button>
          </StateRow>
          <StateRow label="Outline">
            <Button variant="outline">Outline</Button>
          </StateRow>
          <StateRow label="Destructive">
            <Button variant="destructive">Destructive</Button>
          </StateRow>
        </StateCard>

        {/* Input States */}
        <StateCard 
          title="Input States" 
          description="Text input field variations"
        >
          <StateRow label="Default">
            <Input placeholder="Enter text..." className="w-48" />
          </StateRow>
          <StateRow label="Focused">
            <Input placeholder="Focused state" className="w-48 ring-2 ring-blue-500" />
          </StateRow>
          <StateRow label="Filled">
            <Input value="Filled with text" className="w-48" readOnly />
          </StateRow>
          <StateRow label="Disabled">
            <Input placeholder="Disabled input" disabled className="w-48" />
          </StateRow>
          <StateRow label="Error">
            <Input placeholder="Error state" className="w-48 border-red-500 ring-red-500" />
          </StateRow>
          <StateRow label="Success">
            <Input placeholder="Success state" className="w-48 border-green-500 ring-green-500" />
          </StateRow>
        </StateCard>

        {/* Checkbox States */}
        <StateCard 
          title="Checkbox States" 
          description="Checkbox component variations"
        >
          <StateRow label="Unchecked">
            <Checkbox id="checkbox-unchecked" />
          </StateRow>
          <StateRow label="Checked">
            <Checkbox id="checkbox-checked" defaultChecked />
          </StateRow>
          <StateRow label="Indeterminate">
            <div className="relative">
              <Checkbox id="checkbox-indeterminate" />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-2 h-0.5 bg-blue-500 rounded-sm"></div>
              </div>
            </div>
          </StateRow>
          <StateRow label="Disabled Unchecked">
            <Checkbox id="checkbox-disabled-unchecked" disabled />
          </StateRow>
          <StateRow label="Disabled Checked">
            <Checkbox id="checkbox-disabled-checked" disabled defaultChecked />
          </StateRow>
        </StateCard>

        {/* Radio Button States */}
        <StateCard 
          title="Radio Button States" 
          description="Radio button component variations"
        >
          <div className="space-y-3">
            <RadioGroup defaultValue="option2">
              <StateRow label="Unselected">
                <RadioGroupItem value="option1" id="radio1" />
              </StateRow>
              <StateRow label="Selected">
                <RadioGroupItem value="option2" id="radio2" />
              </StateRow>
            </RadioGroup>
            <RadioGroup disabled>
              <StateRow label="Disabled Unselected">
                <RadioGroupItem value="option3" id="radio3" />
              </StateRow>
            </RadioGroup>
            <RadioGroup defaultValue="option4" disabled>
              <StateRow label="Disabled Selected">
                <RadioGroupItem value="option4" id="radio4" />
              </StateRow>
            </RadioGroup>
          </div>
        </StateCard>

        {/* Switch States */}
        <StateCard 
          title="Switch States" 
          description="Toggle switch component variations"
        >
          <StateRow label="Off">
            <Switch 
              checked={switchStates.default} 
              onCheckedChange={(checked) => setSwitchStates({...switchStates, default: checked})}
            />
          </StateRow>
          <StateRow label="On">
            <Switch defaultChecked />
          </StateRow>
          <StateRow label="Disabled Off">
            <Switch disabled />
          </StateRow>
          <StateRow label="Disabled On">
            <Switch disabled defaultChecked />
          </StateRow>
        </StateCard>

        {/* Badge States */}
        <StateCard 
          title="Badge States" 
          description="Status badge variations"
        >
          <StateRow label="Default">
            <Badge>Default</Badge>
          </StateRow>
          <StateRow label="Secondary">
            <Badge variant="secondary">Secondary</Badge>
          </StateRow>
          <StateRow label="Destructive">
            <Badge variant="destructive">Destructive</Badge>
          </StateRow>
          <StateRow label="Outline">
            <Badge variant="outline">Outline</Badge>
          </StateRow>
          <StateRow label="Success">
            <Badge className="bg-green-500 hover:bg-green-600">Success</Badge>
          </StateRow>
          <StateRow label="Warning">
            <Badge className="bg-yellow-500 hover:bg-yellow-600 text-yellow-900">Warning</Badge>
          </StateRow>
        </StateCard>
      </div>

      {/* Progress States */}
      <StateCard 
        title="Progress Bar States" 
        description="Loading and progress indicators"
      >
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <Label>0% Progress</Label>
              <span className="fieldwork-secondary text-gray-600">0%</span>
            </div>
            <Progress value={0} />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <Label>25% Progress</Label>
              <span className="fieldwork-secondary text-gray-600">25%</span>
            </div>
            <Progress value={25} />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <Label>50% Progress</Label>
              <span className="fieldwork-secondary text-gray-600">50%</span>
            </div>
            <Progress value={50} />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <Label>75% Progress</Label>
              <span className="fieldwork-secondary text-gray-600">75%</span>
            </div>
            <Progress value={75} />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <Label>100% Complete</Label>
              <span className="fieldwork-secondary text-gray-600">100%</span>
            </div>
            <Progress value={100} />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <Label>Indeterminate</Label>
              <span className="fieldwork-secondary text-gray-600">Loading...</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full animate-pulse w-1/3"></div>
            </div>
          </div>
        </div>
      </StateCard>

      {/* Alert States */}
      <StateCard 
        title="Alert States" 
        description="Notification and feedback messages"
      >
        <div className="space-y-4">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              This is an informational alert message.
            </AlertDescription>
          </Alert>
          
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-700">
              Success! Your action was completed successfully.
            </AlertDescription>
          </Alert>
          
          <Alert className="border-yellow-200 bg-yellow-50">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-700">
              Warning: Please review your input before proceeding.
            </AlertDescription>
          </Alert>
          
          <Alert className="border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-700">
              Error: Something went wrong. Please try again.
            </AlertDescription>
          </Alert>
        </div>
      </StateCard>

      {/* Loading States */}
      <StateCard 
        title="Loading States" 
        description="Various loading and skeleton states"
      >
        <div className="space-y-4">
          <StateRow label="Spinner">
            <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
          </StateRow>
          <StateRow label="Button Loading">
            <Button disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </Button>
          </StateRow>
          <div>
            <Label className="fieldwork-label text-gray-700 mb-3 block">Skeleton Loading</Label>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
            </div>
          </div>
        </div>
      </StateCard>
    </div>
  );
}