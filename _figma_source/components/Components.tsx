import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Switch } from './ui/switch';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Calendar, ChevronRight, Facebook, TrendingUp, Users, DollarSign, Activity } from 'lucide-react';

export function Components() {
  const [switchState, setSwitchState] = useState(false);
  const [progressValue, setProgressValue] = useState(65);

  // Multi-select chips component
  const MultiSelectChips = () => {
    const [selectedItems, setSelectedItems] = useState(['Option 1', 'Option 3']);
    const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];

    const toggleItem = (item: string) => {
      setSelectedItems(prev => 
        prev.includes(item) 
          ? prev.filter(i => i !== item)
          : [...prev, item]
      );
    };

    return (
      <div className="space-y-3">
        <Label>Multi-select with chips</Label>
        <div className="flex flex-wrap gap-2">
          {options.map(option => (
            <button
              key={option}
              onClick={() => toggleItem(option)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                selectedItems.includes(option)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Date range component
  const DateRange = () => (
    <div className="space-y-2">
      <Label>Date Range</Label>
      <div className="flex items-center space-x-2">
        <div className="relative">
          <Input type="date" className="pr-10" />
          <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>
        <span className="text-gray-400">to</span>
        <div className="relative">
          <Input type="date" className="pr-10" />
          <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>
      </div>
    </div>
  );

  // KPI Tile component
  const KPITile = ({ title, value, change, icon: Icon, trend }: any) => (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="fieldwork-secondary text-gray-600">{title}</p>
          <p className="fieldwork-h3 text-gray-900 mt-1">{value}</p>
          <div className="flex items-center mt-2">
            <TrendingUp className={`h-4 w-4 mr-1 ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`} />
            <span className={`fieldwork-caption ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {change}
            </span>
          </div>
        </div>
        <Icon className="h-8 w-8 text-gray-400" />
      </div>
    </Card>
  );

  // Table Row component
  const TableRow = ({ name, email, role, status }: any) => (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 hover:bg-gray-50">
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="fieldwork-label text-gray-600">{name.charAt(0)}</span>
        </div>
        <div>
          <div className="fieldwork-body text-gray-900">{name}</div>
          <div className="fieldwork-secondary text-gray-500">{email}</div>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <span className="fieldwork-secondary text-gray-600">{role}</span>
        <Badge variant={status === 'Active' ? 'default' : 'secondary'}>
          {status}
        </Badge>
      </div>
    </div>
  );

  // Channel Chip component
  const ChannelChip = ({ platform, icon: Icon, color }: any) => (
    <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg border ${color}`}>
      <Icon className="h-4 w-4" />
      <span className="fieldwork-label">{platform}</span>
    </div>
  );

  // Stepper component
  const Stepper = () => {
    const [currentStep, setCurrentStep] = useState(3);
    const totalSteps = 8;

    return (
      <div className="space-y-3">
        <Label>Progress Stepper (Step {currentStep} of {totalSteps})</Label>
        <div className="flex items-center space-x-2">
          {Array.from({ length: totalSteps }, (_, i) => (
            <React.Fragment key={i}>
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  i + 1 <= currentStep 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {i + 1}
              </div>
              {i < totalSteps - 1 && (
                <div className={`h-px w-8 ${i + 1 < currentStep ? 'bg-blue-500' : 'bg-gray-200'}`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-8">
      {/* Page Header */}
      <div className="max-w-4xl">
        <h2 className="fieldwork-h2 text-gray-900 mb-2">Components</h2>
        <p className="fieldwork-body text-gray-600">
          Complete component library with all variants and states for the Fieldwork v1 design system.
        </p>
      </div>

      {/* Button Variants */}
      <Card>
        <CardHeader>
          <CardTitle className="fieldwork-h3">Buttons</CardTitle>
          <CardDescription>Primary, secondary, tertiary, and destructive button variants</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button>Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="outline">Tertiary Button</Button>
            <Button variant="destructive">Destructive Button</Button>
            <Button disabled>Disabled Button</Button>
          </div>
        </CardContent>
      </Card>

      {/* Form Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="fieldwork-h3">Form Controls</CardTitle>
          <CardDescription>Input fields, selects, and form elements</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="text-input">Text Input</Label>
              <Input id="text-input" placeholder="Enter text here..." />
            </div>
            <div className="space-y-2">
              <Label>Select Dropdown</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Choose an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">Option 1</SelectItem>
                  <SelectItem value="option2">Option 2</SelectItem>
                  <SelectItem value="option3">Option 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <MultiSelectChips />
          <DateRange />
        </CardContent>
      </Card>

      {/* Selection Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="fieldwork-h3">Selection Controls</CardTitle>
          <CardDescription>Checkboxes, radio buttons, and switches</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label>Checkboxes</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="check1" defaultChecked />
                <Label htmlFor="check1">Option 1 (checked)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="check2" />
                <Label htmlFor="check2">Option 2</Label>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Label>Radio Group</Label>
            <RadioGroup defaultValue="radio1">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="radio1" id="radio1" />
                <Label htmlFor="radio1">Choice 1</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="radio2" id="radio2" />
                <Label htmlFor="radio2">Choice 2</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex items-center space-x-3">
            <Switch 
              checked={switchState} 
              onCheckedChange={setSwitchState}
              id="switch-demo" 
            />
            <Label htmlFor="switch-demo">Toggle Switch ({switchState ? 'On' : 'Off'})</Label>
          </div>
        </CardContent>
      </Card>

      {/* Data Display */}
      <Card>
        <CardHeader>
          <CardTitle className="fieldwork-h3">Data Display</CardTitle>
          <CardDescription>KPI tiles, progress bars, and status indicators</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <KPITile 
              title="Total Users" 
              value="12,847" 
              change="+12.5%" 
              trend="up" 
              icon={Users} 
            />
            <KPITile 
              title="Revenue" 
              value="$24,680" 
              change="+8.2%" 
              trend="up" 
              icon={DollarSign} 
            />
            <KPITile 
              title="Conversion" 
              value="3.42%" 
              change="-0.3%" 
              trend="down" 
              icon={Activity} 
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Progress Bar</Label>
              <span className="fieldwork-secondary text-gray-600">{progressValue}%</span>
            </div>
            <Progress value={progressValue} className="h-2" />
          </div>

          <div className="space-y-3">
            <Label>Status Badges</Label>
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Error</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Complex Components */}
      <Card>
        <CardHeader>
          <CardTitle className="fieldwork-h3">Complex Components</CardTitle>
          <CardDescription>Table rows, channel chips, and steppers</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label>Table Rows</Label>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <TableRow 
                name="John Doe" 
                email="john@example.com" 
                role="Admin" 
                status="Active" 
              />
              <TableRow 
                name="Jane Smith" 
                email="jane@example.com" 
                role="User" 
                status="Inactive" 
              />
              <TableRow 
                name="Bob Wilson" 
                email="bob@example.com" 
                role="Editor" 
                status="Active" 
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label>Channel Chips</Label>
            <div className="flex flex-wrap gap-3">
              <ChannelChip 
                platform="Meta" 
                icon={Facebook} 
                color="border-blue-200 bg-blue-50 text-blue-700"
              />
              <ChannelChip 
                platform="Google" 
                icon={TrendingUp} 
                color="border-green-200 bg-green-50 text-green-700"
              />
            </div>
          </div>

          <Stepper />
        </CardContent>
      </Card>
    </div>
  );
}