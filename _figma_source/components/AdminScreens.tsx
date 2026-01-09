import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { 
  Search, 
  Filter, 
  Download, 
  Plus, 
  MoreHorizontal, 
  Users, 
  BarChart3, 
  Settings, 
  Bell,
  ChevronDown,
  TrendingUp,
  DollarSign,
  Activity,
  HelpCircle,
  Target,
  Library,
  CreditCard,
  Play,
  Pause,
  Eye,
  Edit,
  Trash2,
  AlertTriangle,
  MapPin,
  Facebook,
  Chrome,
  ExternalLink,
  CheckCircle,
  XCircle,
  Info,
  X,
  Plus,
  BarChart,
  Users2,
  Calculator,
  Smartphone,
  Eye,
  AlertCircle,
  CheckSquare,
  Shield,
  FileText,
  Mail,
  Users2,
  BarChart2,
  ChevronRight,
  ChevronDown,
  Shuffle,
  TrendingUp,
  RadioIcon as Radio,
  DollarSign,
  CreditCard,
  PaypalIcon as Paypal,
  Settings2,
  Calculator,
  Target,
  Globe,
  Megaphone,
  Link,
  Copy,
  ExternalLink,
  Zap,
  Search,
  Plus,
  Minus,
  ArrowLeft,
  Tag,
  Rocket,
  Eye,
  MousePointer,
  Zap as Lightning,
  Clock,
  Activity,
  TrendingUp,
  TrendingDown,
  MapPin,
  BarChart3,
  Filter,
  Download,
  RefreshCw,
  Play,
  Pause,
  MoreVertical,
  ExternalLink as ExternalLinkIcon,
  CreditCard,
  Send,
  Receipt,
  AlertCircle,
  FileCheck,
  Calendar,
  User
} from 'lucide-react';

export function AdminScreens() {
  const [districtFilter, setDistrictFilter] = useState('Both');
  const [metaConnected, setMetaConnected] = useState(false);
  const [googleConnected, setGoogleConnected] = useState(true);
  const [disclaimerEnabled, setDisclaimerEnabled] = useState(false);
  const [currentWizardStep, setCurrentWizardStep] = useState(1);
  const [objective, setObjective] = useState('online-survey');
  const [campaignName, setCampaignName] = useState('');
  const [surveyUrl, setSurveyUrl] = useState('');
  const [desiredCompletes, setDesiredCompletes] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedZips, setSelectedZips] = useState<string[]>([]);
  const [zipInput, setZipInput] = useState('');
  const [screenerZip, setScreenerZip] = useState('');
  const [screenerTopics, setScreenerTopics] = useState<string[]>([]);
  const [screenerWilling, setScreenerWilling] = useState<string>('');
  const [showDQMessage, setShowDQMessage] = useState(false);
  const [consentText, setConsentText] = useState('We are conducting research about local political issues and would like to invite you to participate in a survey. Your participation is voluntary and you may withdraw at any time without penalty. Your responses will be kept confidential and used only for research purposes.');
  const [privacyPolicyUrl, setPrivacyPolicyUrl] = useState('https://company.com/privacy');
  const [contactEmail, setContactEmail] = useState('research@company.com');
  const [consentAge, setConsentAge] = useState(false);
  const [consentParticipate, setConsentParticipate] = useState(false);
  const [consentWithdraw, setConsentWithdraw] = useState(false);
  const [districtQuotas, setDistrictQuotas] = useState({
    'PA-08': { target: 150, filled: 67, zipsExpanded: false },
    'WI-03': { target: 150, filled: 89, zipsExpanded: false }
  });
  const [overfillHandling, setOverfillHandling] = useState('stop');
  const [incentiveAmount, setIncentiveAmount] = useState(15.00);
  const [deliveryMethod, setDeliveryMethod] = useState('gift-card');
  const [collectEmail, setCollectEmail] = useState(true);
  const [completionDefinition, setCompletionDefinition] = useState('webhook');
  const [metaAdsEnabled, setMetaAdsEnabled] = useState(true);
  const [googleAdsEnabled, setGoogleAdsEnabled] = useState(true);
  const [pa08DailyBudget, setPa08DailyBudget] = useState(150);
  const [wi03DailyBudget, setWi03DailyBudget] = useState(150);
  const [optimizationEvent, setOptimizationEvent] = useState('qualified');
  const [utmSource, setUtmSource] = useState('{channel}');
  const [utmMedium, setUtmMedium] = useState('cpc');
  const [utmCampaign, setUtmCampaign] = useState('{name}');
  const [metaHeadline, setMetaHeadline] = useState('Paid research on prices');
  const [metaBody, setMetaBody] = useState('12–15 min survey • $15 gift card • Limited spots in your ZIP');
  const [finalUrl, setFinalUrl] = useState('https://survey.company.com/start');
  const [biddingStrategy, setBiddingStrategy] = useState('maximize-conversions');
  const [targetEvent, setTargetEvent] = useState('qualified');
  const [selectedDistrict, setSelectedDistrict] = useState('both');
  const [showEventLog, setShowEventLog] = useState(false);
  const [payoutsDistrictFilter, setPayoutsDistrictFilter] = useState('all');
  const [payoutsTab, setPayoutsTab] = useState('outstanding');
  const [selectedPayouts, setSelectedPayouts] = useState<string[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedRespondent, setSelectedRespondent] = useState<any>(null);
  
  const mockData = {
    users: [
      { id: 1, name: 'John Doe', email: 'john@company.com', role: 'Admin', status: 'Active', lastSeen: '2 min ago' },
      { id: 2, name: 'Jane Smith', email: 'jane@company.com', role: 'Editor', status: 'Active', lastSeen: '1 hour ago' },
      { id: 3, name: 'Bob Wilson', email: 'bob@company.com', role: 'User', status: 'Inactive', lastSeen: '2 days ago' },
      { id: 4, name: 'Alice Brown', email: 'alice@company.com', role: 'Editor', status: 'Active', lastSeen: '30 min ago' },
      { id: 5, name: 'Charlie Davis', email: 'charlie@company.com', role: 'User', status: 'Active', lastSeen: '5 min ago' },
    ],
    surveys: [
      { id: 1, title: 'Customer Satisfaction Q4', responses: 1247, status: 'Active', completion: 78 },
      { id: 2, title: 'Product Feedback Survey', responses: 892, status: 'Active', completion: 65 },
      { id: 3, title: 'Employee Engagement', responses: 156, status: 'Draft', completion: 0 },
      { id: 4, title: 'Market Research Study', responses: 2103, status: 'Completed', completion: 100 },
    ],
    campaigns: [
      {
        id: 1,
        name: 'Healthcare Access Survey',
        status: 'Active',
        districts: ['PA-08', 'WI-03'],
        channels: ['Meta', 'Google'],
        spend: '$2,847',
        completes: 135,
        cpi: '$21.09',
        fill: 67,
      },
      {
        id: 2,
        name: 'Economic Policy Polling',
        status: 'Paused',
        districts: ['PA-08'],
        channels: ['Meta'],
        spend: '$1,234',
        completes: 89,
        cpi: '$13.87',
        fill: 45,
      },
      {
        id: 3,
        name: 'Education Funding Research',
        status: 'Active',
        districts: ['WI-03'],
        channels: ['Google'],
        spend: '$3,456',
        completes: 198,
        cpi: '$17.45',
        fill: 82,
      },
    ]
  };

  const Dashboard = () => (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="fieldwork-secondary text-gray-600">Total Surveys</p>
                <p className="fieldwork-h2 text-gray-900 mt-1">24</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="fieldwork-caption text-green-600">+12% from last month</span>
                </div>
              </div>
              <BarChart3 className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="fieldwork-secondary text-gray-600">Total Responses</p>
                <p className="fieldwork-h2 text-gray-900 mt-1">12,847</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="fieldwork-caption text-green-600">+8.2% from last month</span>
                </div>
              </div>
              <Users className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="fieldwork-secondary text-gray-600">Avg Completion</p>
                <p className="fieldwork-h2 text-gray-900 mt-1">73.5%</p>
                <div className="flex items-center mt-2">
                  <Activity className="h-4 w-4 text-red-500 mr-1" />
                  <span className="fieldwork-caption text-red-600">-2.1% from last month</span>
                </div>
              </div>
              <Activity className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="fieldwork-secondary text-gray-600">Revenue</p>
                <p className="fieldwork-h2 text-gray-900 mt-1">$24,680</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="fieldwork-caption text-green-600">+15.3% from last month</span>
                </div>
              </div>
              <DollarSign className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="fieldwork-h3">Recent Surveys</CardTitle>
          <CardDescription>Your most recent survey activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockData.surveys.slice(0, 3).map((survey) => (
              <div key={survey.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <div className="fieldwork-body text-gray-900">{survey.title}</div>
                  <div className="fieldwork-secondary text-gray-500 mt-1">
                    {survey.responses} responses
                  </div>
                  <div className="mt-2">
                    <Progress value={survey.completion} className="h-2" />
                  </div>
                </div>
                <div className="ml-4 flex items-center space-x-3">
                  <Badge variant={survey.status === 'Active' ? 'default' : survey.status === 'Completed' ? 'secondary' : 'outline'}>
                    {survey.status}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const UsersManagement = () => (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="fieldwork-h3 text-gray-900">Users Management</h3>
          <p className="fieldwork-secondary text-gray-600 mt-1">Manage team members and permissions</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input placeholder="Search users..." className="pl-10" />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline">
              Role <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
            <Button variant="outline">
              Status <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-hidden">
            {/* Table Header */}
            <div className="bg-gray-50 border-b border-gray-200 px-6 py-3">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-4 fieldwork-label text-gray-900">User</div>
                <div className="col-span-2 fieldwork-label text-gray-900">Role</div>
                <div className="col-span-2 fieldwork-label text-gray-900">Status</div>
                <div className="col-span-3 fieldwork-label text-gray-900">Last Seen</div>
                <div className="col-span-1 fieldwork-label text-gray-900">Actions</div>
              </div>
            </div>
            {/* Table Rows */}
            {mockData.users.map((user) => (
              <div key={user.id} className="border-b border-gray-200 px-6 py-4 hover:bg-gray-50">
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-4 flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="fieldwork-caption text-gray-600">{user.name.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="fieldwork-body text-gray-900">{user.name}</div>
                      <div className="fieldwork-secondary text-gray-500">{user.email}</div>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <span className="fieldwork-secondary text-gray-600">{user.role}</span>
                  </div>
                  <div className="col-span-2">
                    <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>
                      {user.status}
                    </Badge>
                  </div>
                  <div className="col-span-3">
                    <span className="fieldwork-secondary text-gray-600">{user.lastSeen}</span>
                  </div>
                  <div className="col-span-1">
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const AdLauncherDashboard = () => (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Sidebar - Fixed */}
      <div className="w-64 bg-white border-r border-gray-200 flex-shrink-0">
        <div className="p-6 border-b border-gray-200">
          <div className="fieldwork-title text-gray-900">Ad Launcher</div>
        </div>
        <nav className="p-4 space-y-1">
          <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-blue-50 text-blue-700">
            <Target className="h-5 w-5" />
            <span className="fieldwork-body">Campaigns</span>
          </a>
          <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50">
            <Library className="h-5 w-5" />
            <span className="fieldwork-body">Library</span>
          </a>
          <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50">
            <Users className="h-5 w-5" />
            <span className="fieldwork-body">Respondents</span>
          </a>
          <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50">
            <CreditCard className="h-5 w-5" />
            <span className="fieldwork-body">Payouts</span>
          </a>
          <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50">
            <Settings className="h-5 w-5" />
            <span className="fieldwork-body">Settings</span>
          </a>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="fieldwork-title text-gray-900">Dashboard</div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <HelpCircle className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
              </Button>
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="fieldwork-caption text-white">JD</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex">
          {/* Main Dashboard Content */}
          <div className="flex-1 p-6 min-w-0">
            {/* Content Header with District Toggle */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="fieldwork-h2 text-gray-900">Campaign Overview</h2>
                <div className="flex rounded-lg border border-gray-200 bg-white">
                  {['PA-08', 'WI-03', 'Both'].map((district) => (
                    <button
                      key={district}
                      onClick={() => setDistrictFilter(district)}
                      className={`px-4 py-2 fieldwork-label transition-colors ${
                        districtFilter === district
                          ? 'bg-blue-500 text-white'
                          : 'text-gray-600 hover:bg-gray-50'
                      } ${district === 'PA-08' ? 'rounded-l-lg' : district === 'Both' ? 'rounded-r-lg' : ''}`}
                    >
                      {district}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* KPI Row */}
            <div className="grid grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="fieldwork-secondary text-gray-600">Completes</p>
                      <p className="fieldwork-h2 text-gray-900 mt-1">422</p>
                      <div className="fieldwork-caption text-gray-500 mt-2">
                        PA-08: 187 • WI-03: 235
                      </div>
                    </div>
                    <Target className="h-8 w-8 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="fieldwork-secondary text-gray-600">Spend</p>
                      <p className="fieldwork-h2 text-gray-900 mt-1">$7,537</p>
                      <div className="fieldwork-caption text-gray-500 mt-2">
                        PA-08: $3,081 • WI-03: $4,456
                      </div>
                    </div>
                    <DollarSign className="h-8 w-8 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="fieldwork-secondary text-gray-600">CPI</p>
                      <p className="fieldwork-h2 text-gray-900 mt-1">$17.86</p>
                      <div className="fieldwork-caption text-gray-500 mt-2">
                        PA-08: $16.48 • WI-03: $18.94
                      </div>
                    </div>
                    <BarChart3 className="h-8 w-8 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="fieldwork-secondary text-gray-600">Qual Rate</p>
                      <p className="fieldwork-h2 text-gray-900 mt-1">64.7%</p>
                      <div className="fieldwork-caption text-gray-500 mt-2">
                        PA-08: 61.2% • WI-03: 67.8%
                      </div>
                    </div>
                    <Activity className="h-8 w-8 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Active Campaigns Table */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="fieldwork-h3">Active Campaigns</CardTitle>
                    <CardDescription>Manage your running ad campaigns</CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    New Campaign
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  {/* Table Header */}
                  <div className="bg-gray-50 border-b border-gray-200 px-6 py-3">
                    <div className="grid grid-cols-12 gap-4 min-w-[800px]">
                      <div className="col-span-3 fieldwork-label text-gray-900">Name</div>
                      <div className="col-span-1 fieldwork-label text-gray-900">Status</div>
                      <div className="col-span-2 fieldwork-label text-gray-900">Districts</div>
                      <div className="col-span-2 fieldwork-label text-gray-900">Channels</div>
                      <div className="col-span-1 fieldwork-label text-gray-900">Spend</div>
                      <div className="col-span-1 fieldwork-label text-gray-900">Completes</div>
                      <div className="col-span-1 fieldwork-label text-gray-900">CPI</div>
                      <div className="col-span-1 fieldwork-label text-gray-900">Fill</div>
                    </div>
                  </div>
                  
                  {/* Table Rows */}
                  {mockData.campaigns.map((campaign) => (
                    <div key={campaign.id} className="border-b border-gray-200 px-6 py-4 hover:bg-gray-50">
                      <div className="grid grid-cols-12 gap-4 items-center min-w-[800px]">
                        <div className="col-span-3">
                          <div className="fieldwork-body text-gray-900">{campaign.name}</div>
                        </div>
                        <div className="col-span-1">
                          <Badge variant={campaign.status === 'Active' ? 'default' : 'secondary'}>
                            {campaign.status}
                          </Badge>
                        </div>
                        <div className="col-span-2">
                          <div className="flex flex-wrap gap-1">
                            {campaign.districts.map((district) => (
                              <Badge key={district} variant="outline" className="text-xs">
                                {district}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="col-span-2">
                          <div className="flex flex-wrap gap-1">
                            {campaign.channels.map((channel) => (
                              <div key={channel} className="flex items-center space-x-1">
                                {channel === 'Meta' ? (
                                  <Facebook className="h-3 w-3 text-blue-600" />
                                ) : (
                                  <Chrome className="h-3 w-3 text-green-600" />
                                )}
                                <Badge variant="outline" className="text-xs">
                                  {channel}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="col-span-1">
                          <span className="fieldwork-body text-gray-900">{campaign.spend}</span>
                        </div>
                        <div className="col-span-1">
                          <span className="fieldwork-body text-gray-900">{campaign.completes}</span>
                        </div>
                        <div className="col-span-1">
                          <span className="fieldwork-body text-gray-900">{campaign.cpi}</span>
                        </div>
                        <div className="col-span-1">
                          <div className="flex items-center space-x-2">
                            <div className="w-12">
                              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-blue-500 rounded-full"
                                  style={{ width: `${campaign.fill}%` }}
                                ></div>
                              </div>
                            </div>
                            <span className="fieldwork-caption text-gray-600">{campaign.fill}%</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-end space-x-2 mt-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          {campaign.status === 'Active' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Rail - 320px */}
          <div className="w-80 p-6 space-y-6 border-l border-gray-200 bg-white">
            {/* ZIP Choropleth Card */}
            <Card>
              <CardHeader>
                <CardTitle className="fieldwork-title">ZIP Choropleth</CardTitle>
                <CardDescription>Response density by location</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <p className="fieldwork-secondary text-gray-500">Interactive map</p>
                    <p className="fieldwork-caption text-gray-400">PA-08 & WI-03 districts</p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="fieldwork-secondary text-gray-600">High Density</span>
                    <div className="w-4 h-4 bg-blue-600 rounded"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="fieldwork-secondary text-gray-600">Medium Density</span>
                    <div className="w-4 h-4 bg-blue-400 rounded"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="fieldwork-secondary text-gray-600">Low Density</span>
                    <div className="w-4 h-4 bg-blue-200 rounded"></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Alerts Card */}
            <Card>
              <CardHeader>
                <CardTitle className="fieldwork-title">Alerts</CardTitle>
                <CardDescription>Recent notifications and warnings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                  <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="fieldwork-secondary text-yellow-800">Low fill rate</p>
                    <p className="fieldwork-caption text-yellow-600 mt-1">
                      Healthcare Access Survey is at 45% fill rate
                    </p>
                    <p className="fieldwork-caption text-yellow-500 mt-1">2 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                  <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="fieldwork-secondary text-red-800">Budget alert</p>
                    <p className="fieldwork-caption text-red-600 mt-1">
                      Economic Policy campaign has exceeded 90% of budget
                    </p>
                    <p className="fieldwork-caption text-red-500 mt-1">4 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                  <Bell className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="fieldwork-secondary text-blue-800">Campaign completed</p>
                    <p className="fieldwork-caption text-blue-600 mt-1">
                      Education Funding Research reached target completes
                    </p>
                    <p className="fieldwork-caption text-blue-500 mt-1">1 day ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );

  const SettingsAdAccounts = () => (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Sidebar - Fixed */}
      <div className="w-64 bg-white border-r border-gray-200 flex-shrink-0">
        <div className="p-6 border-b border-gray-200">
          <div className="fieldwork-title text-gray-900">Ad Launcher</div>
        </div>
        <nav className="p-4 space-y-1">
          <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50">
            <Target className="h-5 w-5" />
            <span className="fieldwork-body">Campaigns</span>
          </a>
          <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50">
            <Library className="h-5 w-5" />
            <span className="fieldwork-body">Library</span>
          </a>
          <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50">
            <Users className="h-5 w-5" />
            <span className="fieldwork-body">Respondents</span>
          </a>
          <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50">
            <CreditCard className="h-5 w-5" />
            <span className="fieldwork-body">Payouts</span>
          </a>
          <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-blue-50 text-blue-700">
            <Settings className="h-5 w-5" />
            <span className="fieldwork-body">Settings</span>
          </a>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="fieldwork-title text-gray-900">Ad Accounts</div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <HelpCircle className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
              </Button>
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="fieldwork-caption text-white">JD</span>
              </div>
            </div>
          </div>
        </div>

        {/* Settings Content */}
        <div className="flex-1 p-6">
          <div className="max-w-4xl space-y-6">
            {/* Page Header */}
            <div>
              <h2 className="fieldwork-h2 text-gray-900 mb-2">Ad Account Settings</h2>
              <p className="fieldwork-body text-gray-600">
                Configure your advertising platform connections and compliance settings.
              </p>
            </div>

            {/* Meta Ads Card */}
            <Card>
              <CardHeader className="flex flex-row items-center space-y-0 pb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Facebook className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="fieldwork-h3">Meta Ads</CardTitle>
                    <CardDescription>Connect your Meta advertising account</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Connection Status */}
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${metaConnected ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <div>
                      <div className="fieldwork-label text-gray-900">Connection Status</div>
                      <div className="fieldwork-secondary text-gray-600">
                        {metaConnected ? 'Connected to Meta Business Account' : 'Not connected'}
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant={metaConnected ? "outline" : "default"}
                    onClick={() => setMetaConnected(!metaConnected)}
                  >
                    {metaConnected ? 'Disconnect' : 'Connect with Meta'}
                  </Button>
                </div>

                {/* Compliance Settings */}
                <div className="space-y-4">
                  <div className="fieldwork-label text-gray-900">Compliance Settings</div>
                  
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Checkbox 
                        id="meta-disclaimer"
                        checked={disclaimerEnabled}
                        onCheckedChange={(checked) => setDisclaimerEnabled(checked as boolean)}
                      />
                      <div>
                        <Label htmlFor="meta-disclaimer" className="fieldwork-body text-gray-900">
                          Enable Issue/Election/Politics disclaimer
                        </Label>
                        <div className="fieldwork-secondary text-gray-600">
                          Required for political advertising content
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Set sponsor name
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Google Ads Card */}
            <Card>
              <CardHeader className="flex flex-row items-center space-y-0 pb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                    <Chrome className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="fieldwork-h3">Google Ads</CardTitle>
                    <CardDescription>Connect your Google Ads account</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Connection Status */}
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${googleConnected ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <div>
                      <div className="fieldwork-label text-gray-900">Connection Status</div>
                      <div className="fieldwork-secondary text-gray-600">
                        {googleConnected ? 'Connected to Google Ads Account' : 'Not connected'}
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant={googleConnected ? "outline" : "default"}
                    onClick={() => setGoogleConnected(!googleConnected)}
                  >
                    {googleConnected ? 'Disconnect' : 'Connect with Google'}
                  </Button>
                </div>

                {/* Conversion Tracking */}
                <div className="space-y-4">
                  <div className="fieldwork-label text-gray-900">Conversion Tracking</div>
                  
                  <div className="p-4 border border-gray-200 rounded-lg space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="fieldwork-body text-gray-900">Conversion Tag Status</div>
                        <Badge variant={googleConnected ? "default" : "secondary"} className="bg-green-100 text-green-800">
                          {googleConnected ? 'Verified' : 'Not installed'}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <div>
                          <div className="fieldwork-label text-gray-900">Tag verification</div>
                          <div className="fieldwork-secondary text-gray-600">Last verified 2 hours ago</div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Run test
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Compliance Note */}
                <div className="flex items-start space-x-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="fieldwork-label text-blue-900 mb-1">Compliance Guidelines</div>
                    <div className="fieldwork-secondary text-blue-800">
                      Use neutral recruitment language. Do not imply personal financial status.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="fieldwork-h3">General Settings</CardTitle>
                <CardDescription>Additional configuration options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <div className="fieldwork-label text-gray-900">Data Retention</div>
                    <div className="fieldwork-secondary text-gray-600">
                      Campaign data retention period
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <div className="fieldwork-label text-gray-900">Notification Preferences</div>
                    <div className="fieldwork-secondary text-gray-600">
                      Manage alert and notification settings
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );

  const WizardStepBasics = () => {
    const wizardSteps = [
      { number: 1, title: 'Basics', active: true },
      { number: 2, title: 'Targeting', active: false },
      { number: 3, title: 'Creative', active: false },
      { number: 4, title: 'Budget', active: false },
      { number: 5, title: 'Schedule', active: false },
      { number: 6, title: 'Compliance', active: false },
      { number: 7, title: 'Review', active: false },
      { number: 8, title: 'Launch', active: false },
    ];

    return (
      <div className="min-h-screen bg-gray-50 flex">
        {/* Left Stepper - Fixed */}
        <div className="w-80 bg-white border-r border-gray-200 flex-shrink-0">
          <div className="p-6 border-b border-gray-200">
            <div className="fieldwork-title text-gray-900">Campaign Wizard</div>
            <div className="fieldwork-secondary text-gray-600 mt-1">Create new campaign</div>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {wizardSteps.map((step, index) => (
                <div key={step.number} className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                        step.active 
                          ? 'bg-blue-500 border-blue-500 text-white' 
                          : index < currentWizardStep - 1
                          ? 'bg-green-500 border-green-500 text-white'
                          : 'border-gray-300 text-gray-400'
                      }`}
                    >
                      {index < currentWizardStep - 1 ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <span className="fieldwork-secondary">{step.number}</span>
                      )}
                    </div>
                    {index < wizardSteps.length - 1 && (
                      <div className={`w-0.5 h-8 ml-4 mt-2 ${
                        index < currentWizardStep - 1 ? 'bg-green-500' : 'bg-gray-200'
                      }`}></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className={`fieldwork-label ${
                      step.active ? 'text-blue-700' : index < currentWizardStep - 1 ? 'text-green-700' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Bar */}
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="fieldwork-title text-gray-900">Step 1: Campaign Basics</div>
                <Badge variant="outline">Draft</Badge>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Save as Template
                </Button>
                <Button variant="ghost" size="sm">
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="flex-1 p-6 pb-24 overflow-auto">
            <div className="max-w-2xl space-y-8">
              {/* Campaign Name */}
              <div className="space-y-2">
                <Label htmlFor="campaign-name" className="fieldwork-label text-gray-900">
                  Campaign name *
                </Label>
                <Input
                  id="campaign-name"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  placeholder="Enter campaign name"
                  className="w-full"
                />
              </div>

              {/* Objective */}
              <div className="space-y-3">
                <Label className="fieldwork-label text-gray-900">
                  Objective *
                </Label>
                <div className="flex rounded-lg border border-gray-200 bg-white">
                  <button
                    onClick={() => setObjective('online-survey')}
                    className={`flex-1 px-4 py-3 fieldwork-body transition-colors rounded-l-lg ${
                      objective === 'online-survey'
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    Online survey
                  </button>
                  <button
                    onClick={() => setObjective('focus-group')}
                    className={`flex-1 px-4 py-3 fieldwork-body transition-colors rounded-r-lg ${
                      objective === 'focus-group'
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    In-person focus group
                  </button>
                </div>
                <div className="flex items-start space-x-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <Info className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div className="fieldwork-secondary text-yellow-800">
                    Topics include cost-of-living and tariffs (Meta Issue Ads required).
                  </div>
                </div>
              </div>

              {/* Survey URL */}
              <div className="space-y-2">
                <Label htmlFor="survey-url" className="fieldwork-label text-gray-900">
                  Survey URL *
                </Label>
                <Input
                  id="survey-url"
                  type="url"
                  value={surveyUrl}
                  onChange={(e) => setSurveyUrl(e.target.value)}
                  placeholder="https://survey.example.com"
                  className="w-full"
                />
              </div>

              {/* Desired Completes */}
              <div className="space-y-2">
                <Label htmlFor="desired-completes" className="fieldwork-label text-gray-900">
                  Desired completes *
                </Label>
                <Input
                  id="desired-completes"
                  type="number"
                  value={desiredCompletes}
                  onChange={(e) => setDesiredCompletes(e.target.value)}
                  placeholder="500"
                  className="w-full"
                  min="1"
                />
                <div className="fieldwork-secondary text-gray-500">
                  Number of completed responses needed
                </div>
              </div>

              {/* Date Range */}
              <div className="space-y-4">
                <Label className="fieldwork-label text-gray-900">
                  Date range *
                </Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start-date" className="fieldwork-secondary text-gray-600">
                      Start date
                    </Label>
                    <Input
                      id="start-date"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-date" className="fieldwork-secondary text-gray-600">
                      End date
                    </Label>
                    <Input
                      id="end-date"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="fieldwork-label text-blue-900 mb-1">Campaign Requirements</div>
                    <ul className="fieldwork-secondary text-blue-800 space-y-1">
                      <li>• Political content requires Meta Issue Ads authorization</li>
                      <li>• Survey must be mobile-optimized for best response rates</li>
                      <li>• Minimum campaign duration: 7 days</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Footer */}
          <div className="border-t border-gray-200 bg-white px-6 py-4">
            <div className="flex items-center justify-between max-w-2xl">
              <Button variant="outline">
                Back
              </Button>
              <div className="flex items-center space-x-4">
                <div className="fieldwork-secondary text-gray-500">
                  Step 1 of 8
                </div>
                <Button 
                  disabled={!campaignName || !surveyUrl || !desiredCompletes || !startDate || !endDate}
                >
                  Next: Targeting
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const WizardStepAudienceGeo = () => {
    const wizardSteps = [
      { number: 1, title: 'Basics', active: false },
      { number: 2, title: 'Targeting', active: true },
      { number: 3, title: 'Creative', active: false },
      { number: 4, title: 'Budget', active: false },
      { number: 5, title: 'Schedule', active: false },
      { number: 6, title: 'Compliance', active: false },
      { number: 7, title: 'Review', active: false },
      { number: 8, title: 'Launch', active: false },
    ];

    // ZIP code data for districts
    const PA08_ZIPS = [
      '18847', '18711', '18709', '18708', '18707', '18706', '18705', '18704', '18702', '18701',
      '18661', '18651', '18644', '18643', '18642', '18641', '18640', '18634', '18621', '18618',
      '18615', '18612', '18610', '18602', '18519', '18518', '18517', '18512', '18510', '18509',
      '18508', '18507', '18505', '18504', '18503', '18472', '18471', '18470', '18469', '18466',
      '18465', '18464', '18463', '18462', '18461', '18460', '18458', '18456', '18455', '18453',
      '18452', '18451', '18447', '18446', '18445', '18444', '18443', '18440', '18439', '18438',
      '18437', '18436', '18435', '18434', '18433', '18431', '18428', '18427', '18426', '18425',
      '18424', '18421', '18420', '18419', '18417', '18415', '18414', '18411', '18407', '18405',
      '18403', '18372', '18371', '18370', '18360', '18357', '18355', '18354', '18353', '18352',
      '18350', '18349', '18347', '18346', '18344', '18342', '18340', '18337', '18336', '18335',
      '18334', '18332', '18331', '18330', '18328', '18327', '18326', '18325', '18324', '18322',
      '18321', '18302', '18301', '18255', '18249', '18234', '18224', '18223', '18222', '18221',
      '18210', '18202', '18201', '18058'
    ];

    const WI03_ZIPS = [
      '54984', '54981', '54977', '54966', '54943', '54930', '54921', '54909', '54773', '54772',
      '54770', '54769', '54768', '54767', '54765', '54763', '54762', '54761', '54760', '54759',
      '54758', '54757', '54756', '54755', '54754', '54751', '54750', '54749', '54747', '54742',
      '54741', '54740', '54739', '54738', '54737', '54736', '54734', '54730', '54729', '54728',
      '54727', '54726', '54725', '54724', '54723', '54722', '54721', '54720', '54703', '54701',
      '54670', '54669', '54667', '54666', '54665', '54664', '54661', '54660', '54659', '54658',
      '54657', '54656', '54655', '54654', '54653', '54652', '54651', '54650', '54648', '54646',
      '54645', '54644', '54642', '54639', '54638', '54637', '54636', '54635', '54634', '54632',
      '54631', '54630', '54629', '54628', '54627', '54626', '54625', '54624', '54623', '54622',
      '54621', '54619', '54618', '54616', '54615', '54614', '54613', '54612', '54611', '54610',
      '54603', '54601', '54495', '54494', '54489', '54482', '54481', '54475', '54473', '54469',
      '54467', '54457', '54455', '54454', '54443', '54423', '54412', '54410', '54407', '54406',
      '54022', '54021', '54014', '54013', '54011', '54005', '53968', '53965', '53964', '53959',
      '53952', '53950', '53948', '53944', '53942', '53941', '53937', '53936', '53934', '53929',
      '53924', '53920', '53910', '53827', '53826', '53825', '53821', '53820', '53818', '53817',
      '53816', '53813', '53812', '53811', '53810', '53809', '53808', '53807', '53806', '53805',
      '53804', '53801', '53588', '53584', '53581', '53573', '53569', '53556', '53554', '53543',
      '53540', '53518', '52157', '52001'
    ];

    const handleLoadDistrict = (district: 'PA08' | 'WI03' | 'BOTH') => {
      switch (district) {
        case 'PA08':
          setSelectedZips([...PA08_ZIPS]);
          break;
        case 'WI03':
          setSelectedZips([...WI03_ZIPS]);
          break;
        case 'BOTH':
          setSelectedZips([...PA08_ZIPS, ...WI03_ZIPS]);
          break;
      }
    };

    const handleAddZip = () => {
      const zip = zipInput.trim();
      if (zip && zip.length === 5 && /^\d{5}$/.test(zip) && !selectedZips.includes(zip)) {
        setSelectedZips([...selectedZips, zip]);
        setZipInput('');
      }
    };

    const handleRemoveZip = (zipToRemove: string) => {
      setSelectedZips(selectedZips.filter(zip => zip !== zipToRemove));
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleAddZip();
      }
    };

    return (
      <div className="min-h-screen bg-gray-50 flex">
        {/* Left Stepper - Fixed */}
        <div className="w-80 bg-white border-r border-gray-200 flex-shrink-0">
          <div className="p-6 border-b border-gray-200">
            <div className="fieldwork-title text-gray-900">Campaign Wizard</div>
            <div className="fieldwork-secondary text-gray-600 mt-1">Create new campaign</div>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {wizardSteps.map((step, index) => (
                <div key={step.number} className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                        step.active 
                          ? 'bg-blue-500 border-blue-500 text-white' 
                          : index < 1
                          ? 'bg-green-500 border-green-500 text-white'
                          : 'border-gray-300 text-gray-400'
                      }`}
                    >
                      {index < 1 ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <span className="fieldwork-secondary">{step.number}</span>
                      )}
                    </div>
                    {index < wizardSteps.length - 1 && (
                      <div className={`w-0.5 h-8 ml-4 mt-2 ${
                        index < 1 ? 'bg-green-500' : 'bg-gray-200'
                      }`}></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className={`fieldwork-label ${
                      step.active ? 'text-blue-700' : index < 1 ? 'text-green-700' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Bar */}
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="fieldwork-title text-gray-900">Step 2: Audience & Geo</div>
                <Badge variant="outline">Draft</Badge>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Save as Template
                </Button>
                <Button variant="ghost" size="sm">
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="flex-1 p-6 pb-24 overflow-auto">
            <div className="max-w-4xl space-y-8">
              {/* District Presets Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="fieldwork-h3">District Presets</CardTitle>
                  <CardDescription>Load ZIP codes for congressional districts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-3">
                    <Button 
                      variant="outline"
                      onClick={() => handleLoadDistrict('PA08')}
                      className="flex items-center space-x-2"
                    >
                      <span>Load PA-08 ZIPs</span>
                      <Badge variant="secondary" className="ml-2">{PA08_ZIPS.length}</Badge>
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => handleLoadDistrict('WI03')}
                      className="flex items-center space-x-2"
                    >
                      <span>Load WI-03 ZIPs</span>
                      <Badge variant="secondary" className="ml-2">{WI03_ZIPS.length}</Badge>
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => handleLoadDistrict('BOTH')}
                      className="flex items-center space-x-2"
                    >
                      <span>Load both</span>
                      <Badge variant="secondary" className="ml-2">{PA08_ZIPS.length + WI03_ZIPS.length}</Badge>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* ZIP Codes Management */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="fieldwork-h3">ZIP Codes</CardTitle>
                      <CardDescription>
                        {selectedZips.length} ZIPs loaded
                      </CardDescription>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedZips([])}
                      disabled={selectedZips.length === 0}
                    >
                      Clear all
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* ZIP Input */}
                  <div className="flex space-x-2">
                    <Input
                      value={zipInput}
                      onChange={(e) => setZipInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Enter 5-digit ZIP code"
                      className="flex-1"
                      maxLength={5}
                      pattern="[0-9]{5}"
                    />
                    <Button 
                      onClick={handleAddZip}
                      disabled={!zipInput || zipInput.length !== 5 || !/^\d{5}$/.test(zipInput)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* ZIP Chips */}
                  {selectedZips.length > 0 && (
                    <div className="max-h-40 overflow-y-auto border border-gray-200 rounded-lg p-3">
                      <div className="flex flex-wrap gap-2">
                        {selectedZips.map((zip) => (
                          <div
                            key={zip}
                            className="flex items-center space-x-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-md fieldwork-secondary"
                          >
                            <span>{zip}</span>
                            <button
                              onClick={() => handleRemoveZip(zip)}
                              className="hover:bg-blue-200 rounded p-0.5"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Map Placeholder */}
              <Card>
                <CardHeader>
                  <CardTitle className="fieldwork-h3">Geographic Coverage</CardTitle>
                  <CardDescription>Visual representation of selected ZIP codes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                      <p className="fieldwork-title text-gray-600">PA-08 + WI-03 ZIPs</p>
                      <p className="fieldwork-secondary text-gray-500 mt-1">
                        Interactive map visualization
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Reach Estimator */}
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <Calculator className="h-6 w-6 text-blue-600" />
                    <div className="fieldwork-title text-blue-900">
                      Reach, CPC, Qual rate (estimates)
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="fieldwork-h2 text-blue-900">~847K</div>
                      <div className="fieldwork-secondary text-blue-700">Estimated Reach</div>
                      <div className="fieldwork-caption text-blue-600 mt-1">
                        Adults 18+ in selected ZIPs
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="fieldwork-h2 text-blue-900">$2.34</div>
                      <div className="fieldwork-secondary text-blue-700">Estimated CPC</div>
                      <div className="fieldwork-caption text-blue-600 mt-1">
                        Cost per click (Meta avg)
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="fieldwork-h2 text-blue-900">12.8%</div>
                      <div className="fieldwork-secondary text-blue-700">Est. Qual Rate</div>
                      <div className="fieldwork-caption text-blue-600 mt-1">
                        Based on similar campaigns
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-blue-100 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div className="fieldwork-secondary text-blue-800">
                        Estimates based on historical data for similar political surveys in these districts. 
                        Actual performance may vary based on creative, targeting, and timing.
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sticky Footer */}
          <div className="border-t border-gray-200 bg-white px-6 py-4">
            <div className="flex items-center justify-between max-w-4xl">
              <Button variant="outline">
                Back: Basics
              </Button>
              <div className="flex items-center space-x-4">
                <div className="fieldwork-secondary text-gray-500">
                  Step 2 of 8
                </div>
                <Button 
                  disabled={selectedZips.length === 0}
                >
                  Next: Creative
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Hidden ZIP Reference Blocks for Copy/Paste */}
        <div className="hidden">
          <div id="zip-reference-pa08">
            <h3>ZIP Reference — PA-08</h3>
            <p>{PA08_ZIPS.join(', ')}</p>
          </div>
          <div id="zip-reference-wi03">
            <h3>ZIP Reference — WI-03</h3>
            <p>{WI03_ZIPS.join(', ')}</p>
          </div>
        </div>
      </div>
    );
  };

  const WizardStepScreener = () => {
    const wizardSteps = [
      { number: 1, title: 'Basics', active: false },
      { number: 2, title: 'Targeting', active: false },
      { number: 3, title: 'Creative', active: true },
      { number: 4, title: 'Budget', active: false },
      { number: 5, title: 'Schedule', active: false },
      { number: 6, title: 'Compliance', active: false },
      { number: 7, title: 'Review', active: false },
      { number: 8, title: 'Launch', active: false },
    ];

    const PA08_ZIPS = [
      '18847', '18711', '18709', '18708', '18707', '18706', '18705', '18704', '18702', '18701',
      '18661', '18651', '18644', '18643', '18642', '18641', '18640', '18634', '18621', '18618',
      '18615', '18612', '18610', '18602', '18519', '18518', '18517', '18512', '18510', '18509',
      '18508', '18507', '18505', '18504', '18503', '18472', '18471', '18470', '18469', '18466',
      '18465', '18464', '18463', '18462', '18461', '18460', '18458', '18456', '18455', '18453',
      '18452', '18451', '18447', '18446', '18445', '18444', '18443', '18440', '18439', '18438',
      '18437', '18436', '18435', '18434', '18433', '18431', '18428', '18427', '18426', '18425',
      '18424', '18421', '18420', '18419', '18417', '18415', '18414', '18411', '18407', '18405',
      '18403', '18372', '18371', '18370', '18360', '18357', '18355', '18354', '18353', '18352',
      '18350', '18349', '18347', '18346', '18344', '18342', '18340', '18337', '18336', '18335',
      '18334', '18332', '18331', '18330', '18328', '18327', '18326', '18325', '18324', '18322',
      '18321', '18302', '18301', '18255', '18249', '18234', '18224', '18223', '18222', '18221',
      '18210', '18202', '18201', '18058'
    ];

    const WI03_ZIPS = [
      '54984', '54981', '54977', '54966', '54943', '54930', '54921', '54909', '54773', '54772',
      '54770', '54769', '54768', '54767', '54765', '54763', '54762', '54761', '54760', '54759',
      '54758', '54757', '54756', '54755', '54754', '54751', '54750', '54749', '54747', '54742',
      '54741', '54740', '54739', '54738', '54737', '54736', '54734', '54730', '54729', '54728',
      '54727', '54726', '54725', '54724', '54723', '54722', '54721', '54720', '54703', '54701',
      '54670', '54669', '54667', '54666', '54665', '54664', '54661', '54660', '54659', '54658',
      '54657', '54656', '54655', '54654', '54653', '54652', '54651', '54650', '54648', '54646',
      '54645', '54644', '54642', '54639', '54638', '54637', '54636', '54635', '54634', '54632',
      '54631', '54630', '54629', '54628', '54627', '54626', '54625', '54624', '54623', '54622',
      '54621', '54619', '54618', '54616', '54615', '54614', '54613', '54612', '54611', '54610',
      '54603', '54601', '54495', '54494', '54489', '54482', '54481', '54475', '54473', '54469',
      '54467', '54457', '54455', '54454', '54443', '54423', '54412', '54410', '54407', '54406',
      '54022', '54021', '54014', '54013', '54011', '54005', '53968', '53965', '53964', '53959',
      '53952', '53950', '53948', '53944', '53942', '53941', '53937', '53936', '53934', '53929',
      '53924', '53920', '53910', '53827', '53826', '53825', '53821', '53820', '53818', '53817',
      '53816', '53813', '53812', '53811', '53810', '53809', '53808', '53807', '53806', '53805',
      '53804', '53801', '53588', '53584', '53581', '53573', '53569', '53556', '53554', '53543',
      '53540', '53518', '52157', '52001'
    ];

    const allValidZips = [...PA08_ZIPS, ...WI03_ZIPS];

    const topicOptions = [
      { id: 'housing', label: 'Housing costs', qualifies: true },
      { id: 'grocery', label: 'Grocery prices', qualifies: true },
      { id: 'tariffs', label: 'Tariffs or price changes', qualifies: true },
      { id: 'other', label: 'Other', qualifies: false }
    ];

    const handleTopicToggle = (topicId: string) => {
      if (screenerTopics.includes(topicId)) {
        setScreenerTopics(screenerTopics.filter(id => id !== topicId));
      } else {
        setScreenerTopics([...screenerTopics, topicId]);
      }
    };

    const handleWillingnessChange = (value: string) => {
      setScreenerWilling(value);
      if (value === 'no') {
        setShowDQMessage(true);
      } else {
        setShowDQMessage(false);
      }
    };

    const isZipValid = screenerZip.length === 5 && allValidZips.includes(screenerZip);
    const isZipInvalid = screenerZip.length === 5 && !allValidZips.includes(screenerZip);
    const doesQualifyTopics = screenerTopics.some(topic => 
      topicOptions.find(opt => opt.id === topic)?.qualifies
    );

    return (
      <div className="min-h-screen bg-gray-50 flex">
        {/* Left Stepper - Fixed */}
        <div className="w-80 bg-white border-r border-gray-200 flex-shrink-0">
          <div className="p-6 border-b border-gray-200">
            <div className="fieldwork-title text-gray-900">Campaign Wizard</div>
            <div className="fieldwork-secondary text-gray-600 mt-1">Create new campaign</div>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {wizardSteps.map((step, index) => (
                <div key={step.number} className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                        step.active 
                          ? 'bg-blue-500 border-blue-500 text-white' 
                          : index < 2
                          ? 'bg-green-500 border-green-500 text-white'
                          : 'border-gray-300 text-gray-400'
                      }`}
                    >
                      {index < 2 ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <span className="fieldwork-secondary">{step.number}</span>
                      )}
                    </div>
                    {index < wizardSteps.length - 1 && (
                      <div className={`w-0.5 h-8 ml-4 mt-2 ${
                        index < 2 ? 'bg-green-500' : 'bg-gray-200'
                      }`}></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className={`fieldwork-label ${
                      step.active ? 'text-blue-700' : index < 2 ? 'text-green-700' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Area - Split Layout */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Bar */}
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="fieldwork-title text-gray-900">Step 3: Screener Questions</div>
                <Badge variant="outline">Draft</Badge>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview Logic
                </Button>
                <Button variant="ghost" size="sm">
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Split Content */}
          <div className="flex-1 flex">
            {/* Left Editor */}
            <div className="flex-1 p-6 pb-24 overflow-auto border-r border-gray-200">
              <div className="max-w-2xl space-y-8">
                <div className="space-y-2">
                  <div className="fieldwork-h3 text-gray-900">Screener Configuration</div>
                  <div className="fieldwork-secondary text-gray-500">
                    Configure qualifying questions to filter respondents
                  </div>
                </div>

                {/* Question 1 - ZIP Code */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="fieldwork-title">Q1: ZIP Code Validation</CardTitle>
                      <Badge variant="secondary">Required</Badge>
                    </div>
                    <CardDescription>Validate against campaign targeting ZIP codes</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label className="fieldwork-label">Question Text</Label>
                      <Input 
                        value="What is your residential ZIP code?" 
                        readOnly
                        className="bg-gray-50"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="fieldwork-label">Validation Rules</Label>
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-start space-x-2">
                          <CheckSquare className="h-4 w-4 text-blue-600 mt-0.5" />
                          <div className="fieldwork-secondary text-blue-800">
                            Must match one of {allValidZips.length} loaded ZIP codes from PA-08 and WI-03 districts
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="fieldwork-label">Error Message</Label>
                      <Input 
                        value="Sorry, this study is only available in specific areas." 
                        readOnly
                        className="bg-gray-50"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Question 2 - Topics */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="fieldwork-title">Q2: Topic Interest</CardTitle>
                      <Badge variant="secondary">Multi-select</Badge>
                    </div>
                    <CardDescription>Qualify based on relevant topic engagement</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label className="fieldwork-label">Question Text</Label>
                      <Textarea 
                        value="In the past 60 days, which topics have you looked up online?" 
                        readOnly
                        className="bg-gray-50"
                        rows={2}
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <Label className="fieldwork-label">Answer Options</Label>
                      {topicOptions.map((option) => (
                        <div key={option.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Checkbox checked readOnly />
                            <span className="fieldwork-body">{option.label}</span>
                          </div>
                          <Badge variant={option.qualifies ? "default" : "secondary"}>
                            {option.qualifies ? "Qualifies" : "Neutral"}
                          </Badge>
                        </div>
                      ))}
                    </div>

                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <CheckSquare className="h-4 w-4 text-green-600 mt-0.5" />
                        <div className="fieldwork-secondary text-green-800">
                          Respondent qualifies if they select any of: Housing costs, Grocery prices, or Tariffs
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Question 3 - Willingness */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="fieldwork-title">Q3: Survey Participation</CardTitle>
                      <Badge variant="destructive">DQ if No</Badge>
                    </div>
                    <CardDescription>Final commitment check</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label className="fieldwork-label">Question Text</Label>
                      <Input 
                        value="Are you willing to complete a 12–15 minute survey for a $15 gift card?" 
                        readOnly
                        className="bg-gray-50"
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <Label className="fieldwork-label">Answer Options</Label>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-4 h-4 rounded-full border-2 border-gray-300 flex items-center justify-center">
                              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            </div>
                            <span className="fieldwork-body">Yes</span>
                          </div>
                          <Badge variant="default">Qualifies</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-4 h-4 rounded-full border-2 border-gray-300"></div>
                            <span className="fieldwork-body">No</span>
                          </div>
                          <Badge variant="destructive">Disqualifies</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label className="fieldwork-label">Disqualification Message</Label>
                      <Textarea 
                        value="Thanks! You don't qualify this time. Want invites to future studies?" 
                        readOnly
                        className="bg-gray-50"
                        rows={2}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Logic Summary */}
                <Card className="bg-gray-50 border-gray-200">
                  <CardHeader>
                    <CardTitle className="fieldwork-title text-gray-900">Qualification Logic</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center fieldwork-caption">1</div>
                        <div className="fieldwork-secondary text-gray-700">ZIP code must be in PA-08 or WI-03 districts</div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center fieldwork-caption">2</div>
                        <div className="fieldwork-secondary text-gray-700">Must have searched for housing, grocery prices, or tariffs</div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center fieldwork-caption">3</div>
                        <div className="fieldwork-secondary text-gray-700">Must be willing to complete 12-15 minute survey</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Right Mobile Preview */}
            <div className="w-96 bg-gray-100 p-6 flex flex-col">
              <div className="flex items-center space-x-3 mb-6">
                <Smartphone className="h-5 w-5 text-gray-600" />
                <div className="fieldwork-title text-gray-900">Mobile Preview</div>
                <Badge variant="outline" className="ml-auto">Live</Badge>
              </div>

              {/* Mobile Frame */}
              <div className="flex-1 flex justify-center">
                <div className="w-80 bg-white rounded-3xl shadow-lg border border-gray-300 overflow-hidden">
                  {/* Phone Header */}
                  <div className="h-6 bg-black rounded-t-3xl flex items-center justify-center">
                    <div className="w-16 h-1 bg-gray-600 rounded-full"></div>
                  </div>

                  {/* Screen Content */}
                  <div className="p-6 space-y-6 min-h-[600px]">
                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '20%' }}></div>
                      </div>
                      <div className="fieldwork-caption text-gray-500 text-center">Question 1 of 3</div>
                    </div>

                    {/* Question Content */}
                    {!showDQMessage ? (
                      <div className="space-y-6">
                        {/* Q1 - ZIP Code */}
                        <div className="space-y-3">
                          <div className="fieldwork-body text-gray-900">
                            What is your residential ZIP code?
                          </div>
                          <div className="space-y-2">
                            <Input
                              value={screenerZip}
                              onChange={(e) => setScreenerZip(e.target.value)}
                              placeholder="12345"
                              maxLength={5}
                              className={`text-center ${isZipInvalid ? 'border-red-500' : ''}`}
                            />
                            {isZipInvalid && (
                              <div className="flex items-center space-x-2 text-red-600">
                                <AlertCircle className="h-4 w-4" />
                                <div className="fieldwork-secondary">Sorry, this study is only available in specific areas.</div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Q2 - Topics (only show if ZIP valid) */}
                        {isZipValid && (
                          <div className="space-y-3">
                            <div className="fieldwork-body text-gray-900">
                              In the past 60 days, which topics have you looked up online?
                            </div>
                            <div className="space-y-2">
                              {topicOptions.map((option) => (
                                <div key={option.id} className="flex items-center space-x-3">
                                  <Checkbox
                                    checked={screenerTopics.includes(option.id)}
                                    onCheckedChange={() => handleTopicToggle(option.id)}
                                  />
                                  <span className="fieldwork-secondary">{option.label}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Q3 - Willingness (only show if qualified on topics) */}
                        {isZipValid && doesQualifyTopics && (
                          <div className="space-y-3">
                            <div className="fieldwork-body text-gray-900">
                              Are you willing to complete a 12–15 minute survey for a $15 gift card?
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center space-x-3">
                                <div 
                                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center cursor-pointer ${
                                    screenerWilling === 'yes' ? 'border-blue-500' : 'border-gray-300'
                                  }`}
                                  onClick={() => handleWillingnessChange('yes')}
                                >
                                  {screenerWilling === 'yes' && <div className="w-2 h-2 rounded-full bg-blue-500"></div>}
                                </div>
                                <span className="fieldwork-secondary">Yes</span>
                              </div>
                              <div className="flex items-center space-x-3">
                                <div 
                                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center cursor-pointer ${
                                    screenerWilling === 'no' ? 'border-blue-500' : 'border-gray-300'
                                  }`}
                                  onClick={() => handleWillingnessChange('no')}
                                >
                                  {screenerWilling === 'no' && <div className="w-2 h-2 rounded-full bg-blue-500"></div>}
                                </div>
                                <span className="fieldwork-secondary">No</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Next Button */}
                        <Button 
                          className="w-full mt-8"
                          disabled={!isZipValid || !doesQualifyTopics || !screenerWilling}
                        >
                          Continue
                        </Button>
                      </div>
                    ) : (
                      /* DQ Message */
                      <div className="text-center space-y-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto">
                          <X className="h-8 w-8 text-gray-500" />
                        </div>
                        <div className="fieldwork-title text-gray-900">
                          Thanks! You don't qualify this time.
                        </div>
                        <div className="fieldwork-secondary text-gray-600">
                          Want invites to future studies?
                        </div>
                        <div className="space-y-3 pt-4">
                          <Button className="w-full">
                            Yes, keep me updated
                          </Button>
                          <Button variant="outline" className="w-full">
                            No thanks
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Footer */}
          <div className="border-t border-gray-200 bg-white px-6 py-4">
            <div className="flex items-center justify-between">
              <Button variant="outline">
                Back: Audience & Geo
              </Button>
              <div className="flex items-center space-x-4">
                <div className="fieldwork-secondary text-gray-500">
                  Step 3 of 8
                </div>
                <Button>
                  Next: Budget
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const WizardStepConsent = () => {
    const wizardSteps = [
      { number: 1, title: 'Basics', active: false },
      { number: 2, title: 'Targeting', active: false },
      { number: 3, title: 'Screener', active: false },
      { number: 4, title: 'Consent', active: true },
      { number: 5, title: 'Budget', active: false },
      { number: 6, title: 'Schedule', active: false },
      { number: 7, title: 'Review', active: false },
      { number: 8, title: 'Launch', active: false },
    ];

    const allConsentsChecked = consentAge && consentParticipate && consentWithdraw;

    return (
      <div className="min-h-screen bg-gray-50 flex">
        {/* Left Stepper - Fixed */}
        <div className="w-80 bg-white border-r border-gray-200 flex-shrink-0">
          <div className="p-6 border-b border-gray-200">
            <div className="fieldwork-title text-gray-900">Campaign Wizard</div>
            <div className="fieldwork-secondary text-gray-600 mt-1">Create new campaign</div>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {wizardSteps.map((step, index) => (
                <div key={step.number} className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                        step.active 
                          ? 'bg-blue-500 border-blue-500 text-white' 
                          : index < 3
                          ? 'bg-green-500 border-green-500 text-white'
                          : 'border-gray-300 text-gray-400'
                      }`}
                    >
                      {index < 3 ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <span className="fieldwork-secondary">{step.number}</span>
                      )}
                    </div>
                    {index < wizardSteps.length - 1 && (
                      <div className={`w-0.5 h-8 ml-4 mt-2 ${
                        index < 3 ? 'bg-green-500' : 'bg-gray-200'
                      }`}></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className={`fieldwork-label ${
                      step.active ? 'text-blue-700' : index < 3 ? 'text-green-700' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Area - Split Layout */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Bar */}
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="fieldwork-title text-gray-900">Step 4: Consent & Privacy</div>
                <Badge variant="outline">Draft</Badge>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview Flow
                </Button>
                <Button variant="ghost" size="sm">
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Split Content */}
          <div className="flex-1 flex">
            {/* Left Editor */}
            <div className="flex-1 p-6 pb-24 overflow-auto border-r border-gray-200">
              <div className="max-w-2xl space-y-8">
                <div className="space-y-2">
                  <div className="fieldwork-h3 text-gray-900">Consent Configuration</div>
                  <div className="fieldwork-secondary text-gray-500">
                    Configure consent text and required acknowledgments
                  </div>
                </div>

                {/* Consent Text */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-gray-600" />
                      <div>
                        <CardTitle className="fieldwork-title">Consent Information</CardTitle>
                        <CardDescription>Study description and participant rights</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label className="fieldwork-label">Consent Text</Label>
                      <Textarea
                        value={consentText}
                        onChange={(e) => setConsentText(e.target.value)}
                        rows={6}
                        placeholder="Enter the consent information participants will see..."
                        className="min-h-[150px]"
                      />
                      <div className="fieldwork-caption text-gray-500">
                        Explain the study purpose, voluntary participation, and data use
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Required Acknowledgments */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <CheckSquare className="h-5 w-5 text-gray-600" />
                      <div>
                        <CardTitle className="fieldwork-title">Required Acknowledgments</CardTitle>
                        <CardDescription>Checkboxes participants must complete</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-start space-x-3">
                          <Checkbox checked readOnly className="mt-0.5" />
                          <div className="flex-1">
                            <div className="fieldwork-body text-gray-900">I am 18 years of age or older</div>
                            <div className="fieldwork-secondary text-gray-500 mt-1">Age verification requirement</div>
                          </div>
                          <Badge variant="destructive" className="ml-auto">Required</Badge>
                        </div>
                      </div>

                      <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-start space-x-3">
                          <Checkbox checked readOnly className="mt-0.5" />
                          <div className="flex-1">
                            <div className="fieldwork-body text-gray-900">I agree to participate and understand how my data will be used</div>
                            <div className="fieldwork-secondary text-gray-500 mt-1">Data use acknowledgment</div>
                          </div>
                          <Badge variant="destructive" className="ml-auto">Required</Badge>
                        </div>
                      </div>

                      <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-start space-x-3">
                          <Checkbox checked readOnly className="mt-0.5" />
                          <div className="flex-1">
                            <div className="fieldwork-body text-gray-900">I understand I may withdraw at any time</div>
                            <div className="fieldwork-secondary text-gray-500 mt-1">Withdrawal rights acknowledgment</div>
                          </div>
                          <Badge variant="destructive" className="ml-auto">Required</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <AlertCircle className="h-4 w-4 text-red-600 mt-0.5" />
                        <div className="fieldwork-secondary text-red-800">
                          All acknowledgments must be checked to proceed to the survey
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Information */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-gray-600" />
                      <div>
                        <CardTitle className="fieldwork-title">Contact & Legal</CardTitle>
                        <CardDescription>Privacy policy and contact information</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="fieldwork-label">Privacy Policy URL</Label>
                        <Input
                          value={privacyPolicyUrl}
                          onChange={(e) => setPrivacyPolicyUrl(e.target.value)}
                          placeholder="https://company.com/privacy"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="fieldwork-label">Contact Email</Label>
                        <Input
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          placeholder="research@company.com"
                          type="email"
                        />
                      </div>
                    </div>
                    <div className="fieldwork-caption text-gray-500">
                      These will be displayed as links in the consent form
                    </div>
                  </CardContent>
                </Card>

                {/* Preview Summary */}
                <Card className="bg-gray-50 border-gray-200">
                  <CardHeader>
                    <CardTitle className="fieldwork-title text-gray-900">Form Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="fieldwork-secondary text-gray-700">Consent text length</span>
                        <span className="fieldwork-secondary text-gray-900">{consentText.length} characters</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="fieldwork-secondary text-gray-700">Required checkboxes</span>
                        <span className="fieldwork-secondary text-gray-900">3 acknowledgments</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="fieldwork-secondary text-gray-700">Contact information</span>
                        <span className="fieldwork-secondary text-gray-900">Privacy policy + email</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Right Mobile Preview */}
            <div className="w-96 bg-gray-100 p-6 flex flex-col">
              <div className="flex items-center space-x-3 mb-6">
                <Smartphone className="h-5 w-5 text-gray-600" />
                <div className="fieldwork-title text-gray-900">Mobile Preview</div>
                <Badge variant="outline" className="ml-auto">Live</Badge>
              </div>

              {/* Mobile Frame */}
              <div className="flex-1 flex justify-center">
                <div className="w-80 bg-white rounded-3xl shadow-lg border border-gray-300 overflow-hidden">
                  {/* Phone Header */}
                  <div className="h-6 bg-black rounded-t-3xl flex items-center justify-center">
                    <div className="w-16 h-1 bg-gray-600 rounded-full"></div>
                  </div>

                  {/* Screen Content */}
                  <div className="p-6 space-y-6 min-h-[600px]">
                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '50%' }}></div>
                      </div>
                      <div className="fieldwork-caption text-gray-500 text-center">Consent & Privacy</div>
                    </div>

                    {/* Header */}
                    <div className="text-center space-y-2">
                      <Shield className="h-8 w-8 text-blue-500 mx-auto" />
                      <div className="fieldwork-title text-gray-900">Consent to Participate</div>
                    </div>

                    {/* Consent Text */}
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="fieldwork-secondary text-gray-700 leading-relaxed">
                          {consentText}
                        </div>
                      </div>

                      {/* Checkboxes */}
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <Checkbox
                            checked={consentAge}
                            onCheckedChange={(checked) => setConsentAge(!!checked)}
                            className="mt-0.5"
                          />
                          <span className="fieldwork-secondary text-gray-900 leading-relaxed">
                            I am 18 years of age or older
                          </span>
                        </div>

                        <div className="flex items-start space-x-3">
                          <Checkbox
                            checked={consentParticipate}
                            onCheckedChange={(checked) => setConsentParticipate(!!checked)}
                            className="mt-0.5"
                          />
                          <span className="fieldwork-secondary text-gray-900 leading-relaxed">
                            I agree to participate and understand how my data will be used
                          </span>
                        </div>

                        <div className="flex items-start space-x-3">
                          <Checkbox
                            checked={consentWithdraw}
                            onCheckedChange={(checked) => setConsentWithdraw(!!checked)}
                            className="mt-0.5"
                          />
                          <span className="fieldwork-secondary text-gray-900 leading-relaxed">
                            I understand I may withdraw at any time
                          </span>
                        </div>
                      </div>

                      {/* Contact Links */}
                      <div className="pt-4 border-t border-gray-200 space-y-2">
                        <div className="fieldwork-caption text-gray-500 text-center">
                          Questions? Contact us:
                        </div>
                        <div className="text-center space-y-1">
                          <div>
                            <a href={privacyPolicyUrl} className="fieldwork-caption text-blue-600 underline">
                              Privacy Policy
                            </a>
                          </div>
                          <div>
                            <a href={`mailto:${contactEmail}`} className="fieldwork-caption text-blue-600 underline">
                              {contactEmail}
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Continue Button */}
                      <Button 
                        className="w-full mt-6"
                        disabled={!allConsentsChecked}
                      >
                        Continue to Survey
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Footer */}
          <div className="border-t border-gray-200 bg-white px-6 py-4">
            <div className="flex items-center justify-between">
              <Button variant="outline">
                Back: Screener
              </Button>
              <div className="flex items-center space-x-4">
                <div className="fieldwork-secondary text-gray-500">
                  Step 4 of 8
                </div>
                <Button>
                  Next: Budget
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const WizardStepQuotas = () => {
    const wizardSteps = [
      { number: 1, title: 'Basics', active: false },
      { number: 2, title: 'Targeting', active: false },
      { number: 3, title: 'Screener', active: false },
      { number: 4, title: 'Consent', active: false },
      { number: 5, title: 'Quotas', active: true },
      { number: 6, title: 'Schedule', active: false },
      { number: 7, title: 'Review', active: false },
      { number: 8, title: 'Launch', active: false },
    ];

    // ZIP code data with mock filled/target data
    const PA08_ZIPS = [
      '18847', '18711', '18709', '18708', '18707', '18706', '18705', '18704', '18702', '18701',
      '18661', '18651', '18644', '18643', '18642', '18641', '18640', '18634', '18621', '18618',
      '18615', '18612', '18610', '18602', '18519', '18518', '18517', '18512', '18510', '18509',
      '18508', '18507', '18505', '18504', '18503', '18472', '18471', '18470', '18469', '18466',
      '18465', '18464', '18463', '18462', '18461', '18460', '18458', '18456', '18455', '18453',
      '18452', '18451', '18447', '18446', '18445', '18444', '18443', '18440', '18439', '18438',
      '18437', '18436', '18435', '18434', '18433', '18431', '18428', '18427', '18426', '18425',
      '18424', '18421', '18420', '18419', '18417', '18415', '18414', '18411', '18407', '18405',
      '18403', '18372', '18371', '18370', '18360', '18357', '18355', '18354', '18353', '18352',
      '18350', '18349', '18347', '18346', '18344', '18342', '18340', '18337', '18336', '18335',
      '18334', '18332', '18331', '18330', '18328', '18327', '18326', '18325', '18324', '18322',
      '18321', '18302', '18301', '18255', '18249', '18234', '18224', '18223', '18222', '18221',
      '18210', '18202', '18201', '18058'
    ];

    const WI03_ZIPS = [
      '54984', '54981', '54977', '54966', '54943', '54930', '54921', '54909', '54773', '54772',
      '54770', '54769', '54768', '54767', '54765', '54763', '54762', '54761', '54760', '54759',
      '54758', '54757', '54756', '54755', '54754', '54751', '54750', '54749', '54747', '54742',
      '54741', '54740', '54739', '54738', '54737', '54736', '54734', '54730', '54729', '54728',
      '54727', '54726', '54725', '54724', '54723', '54722', '54721', '54720', '54703', '54701',
      '54670', '54669', '54667', '54666', '54665', '54664', '54661', '54660', '54659', '54658',
      '54657', '54656', '54655', '54654', '54653', '54652', '54651', '54650', '54648', '54646',
      '54645', '54644', '54642', '54639', '54638', '54637', '54636', '54635', '54634', '54632',
      '54631', '54630', '54629', '54628', '54627', '54626', '54625', '54624', '54623', '54622',
      '54621', '54619', '54618', '54616', '54615', '54614', '54613', '54612', '54611', '54610',
      '54603', '54601', '54495', '54494', '54489', '54482', '54481', '54475', '54473', '54469',
      '54467', '54457', '54455', '54454', '54443', '54423', '54412', '54410', '54407', '54406',
      '54022', '54021', '54014', '54013', '54011', '54005', '53968', '53965', '53964', '53959',
      '53952', '53950', '53948', '53944', '53942', '53941', '53937', '53936', '53934', '53929',
      '53924', '53920', '53910', '53827', '53826', '53825', '53821', '53820', '53818', '53817',
      '53816', '53813', '53812', '53811', '53810', '53809', '53808', '53807', '53806', '53805',
      '53804', '53801', '53588', '53584', '53581', '53573', '53569', '53556', '53554', '53543',
      '53540', '53518', '52157', '52001'
    ];

    // Generate mock data for ZIP-level quotas
    const generateZipQuotas = (zips: string[], districtTarget: number) => {
      const baseQuota = Math.floor(districtTarget / zips.length);
      const remainder = districtTarget % zips.length;
      
      return zips.map((zip, index) => ({
        zip,
        target: baseQuota + (index < remainder ? 1 : 0),
        filled: Math.floor(Math.random() * (baseQuota + 2)),
        pauseAt: baseQuota + (index < remainder ? 1 : 0)
      }));
    };

    const pa08ZipQuotas = generateZipQuotas(PA08_ZIPS, districtQuotas['PA-08'].target);
    const wi03ZipQuotas = generateZipQuotas(WI03_ZIPS, districtQuotas['WI-03'].target);

    const toggleDistrictExpansion = (district: string) => {
      setDistrictQuotas(prev => ({
        ...prev,
        [district]: {
          ...prev[district as keyof typeof prev],
          zipsExpanded: !prev[district as keyof typeof prev].zipsExpanded
        }
      }));
    };

    const autoAllocate = (district: string) => {
      // Mock auto-allocation logic
      console.log(`Auto-allocating quotas for ${district}`);
    };

    const balanceByCPI = () => {
      // Mock CPI balancing logic
      console.log('Balancing quotas by CPI');
    };

    const totalTarget = districtQuotas['PA-08'].target + districtQuotas['WI-03'].target;
    const totalFilled = districtQuotas['PA-08'].filled + districtQuotas['WI-03'].filled;
    const completionRate = Math.round((totalFilled / totalTarget) * 100);

    return (
      <div className="min-h-screen bg-gray-50 flex">
        {/* Left Stepper - Fixed */}
        <div className="w-80 bg-white border-r border-gray-200 flex-shrink-0">
          <div className="p-6 border-b border-gray-200">
            <div className="fieldwork-title text-gray-900">Campaign Wizard</div>
            <div className="fieldwork-secondary text-gray-600 mt-1">Create new campaign</div>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {wizardSteps.map((step, index) => (
                <div key={step.number} className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                        step.active 
                          ? 'bg-blue-500 border-blue-500 text-white' 
                          : index < 4
                          ? 'bg-green-500 border-green-500 text-white'
                          : 'border-gray-300 text-gray-400'
                      }`}
                    >
                      {index < 4 ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <span className="fieldwork-secondary">{step.number}</span>
                      )}
                    </div>
                    {index < wizardSteps.length - 1 && (
                      <div className={`w-0.5 h-8 ml-4 mt-2 ${
                        index < 4 ? 'bg-green-500' : 'bg-gray-200'
                      }`}></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className={`fieldwork-label ${
                      step.active ? 'text-blue-700' : index < 4 ? 'text-green-700' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Bar */}
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="fieldwork-title text-gray-900">Step 5: Response Quotas</div>
                <Badge variant="outline">Draft</Badge>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  Quota Report
                </Button>
                <Button variant="ghost" size="sm">
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6 pb-24 overflow-auto">
            <div className="max-w-5xl space-y-8">
              <div className="space-y-2">
                <div className="fieldwork-h3 text-gray-900">District Quota Management</div>
                <div className="fieldwork-secondary text-gray-500">
                  Set response targets and manage quota allocation across districts
                </div>
              </div>

              {/* Overall Progress */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="fieldwork-title">Campaign Progress</CardTitle>
                      <CardDescription>Overall completion across both districts</CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="fieldwork-h2 text-gray-900">{totalFilled}</div>
                      <div className="fieldwork-secondary text-gray-500">of {totalTarget} target</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(completionRate, 100)}%` }}
                      ></div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="fieldwork-h3 text-blue-600">{completionRate}%</div>
                        <div className="fieldwork-secondary text-gray-500">Complete</div>
                      </div>
                      <div>
                        <div className="fieldwork-h3 text-gray-900">{totalTarget - totalFilled}</div>
                        <div className="fieldwork-secondary text-gray-500">Remaining</div>
                      </div>
                      <div>
                        <div className="fieldwork-h3 text-green-600">$18.42</div>
                        <div className="fieldwork-secondary text-gray-500">Avg CPI</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* District Targets */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="fieldwork-title">District Targets</CardTitle>
                      <CardDescription>Response quotas by congressional district</CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" onClick={balanceByCPI}>
                        <TrendingUp className="h-4 w-4 mr-2" />
                        Balance by CPI
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* PA-08 District */}
                  <div className="border border-gray-200 rounded-lg">
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleDistrictExpansion('PA-08')}
                            className="p-1"
                          >
                            {districtQuotas['PA-08'].zipsExpanded ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </Button>
                          <div>
                            <div className="fieldwork-title text-gray-900">PA-08</div>
                            <div className="fieldwork-secondary text-gray-500">{PA08_ZIPS.length} ZIP codes</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-6">
                          <div className="text-center">
                            <div className="fieldwork-body text-gray-900">{districtQuotas['PA-08'].filled}</div>
                            <div className="fieldwork-secondary text-gray-500">Filled</div>
                          </div>
                          <div className="text-center">
                            <Input
                              value={districtQuotas['PA-08'].target}
                              onChange={(e) => setDistrictQuotas(prev => ({
                                ...prev,
                                'PA-08': { ...prev['PA-08'], target: parseInt(e.target.value) || 0 }
                              }))}
                              className="w-20 text-center"
                            />
                            <div className="fieldwork-secondary text-gray-500 mt-1">Target</div>
                          </div>
                          <div className="w-24">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-500 h-2 rounded-full"
                                style={{ 
                                  width: `${Math.min((districtQuotas['PA-08'].filled / districtQuotas['PA-08'].target) * 100, 100)}%` 
                                }}
                              ></div>
                            </div>
                            <div className="fieldwork-caption text-gray-500 text-center mt-1">
                              {Math.round((districtQuotas['PA-08'].filled / districtQuotas['PA-08'].target) * 100)}%
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => autoAllocate('PA-08')}
                          >
                            <Shuffle className="h-4 w-4 mr-2" />
                            Auto-allocate
                          </Button>
                        </div>
                      </div>

                      {/* PA-08 ZIP Table */}
                      {districtQuotas['PA-08'].zipsExpanded && (
                        <div className="mt-4 border-t border-gray-200 pt-4">
                          <div className="max-h-64 overflow-y-auto">
                            <table className="w-full">
                              <thead className="bg-gray-50 sticky top-0">
                                <tr>
                                  <th className="px-3 py-2 text-left fieldwork-label text-gray-900">ZIP</th>
                                  <th className="px-3 py-2 text-center fieldwork-label text-gray-900">Target</th>
                                  <th className="px-3 py-2 text-center fieldwork-label text-gray-900">Filled</th>
                                  <th className="px-3 py-2 text-center fieldwork-label text-gray-900">Progress</th>
                                  <th className="px-3 py-2 text-center fieldwork-label text-gray-900">Pause-at</th>
                                </tr>
                              </thead>
                              <tbody>
                                {pa08ZipQuotas.slice(0, 15).map((zipQuota) => (
                                  <tr key={zipQuota.zip} className="border-b border-gray-100">
                                    <td className="px-3 py-2 fieldwork-secondary text-gray-900">{zipQuota.zip}</td>
                                    <td className="px-3 py-2 text-center">
                                      <Input
                                        value={zipQuota.target}
                                        className="w-16 text-center text-sm"
                                        size="sm"
                                      />
                                    </td>
                                    <td className="px-3 py-2 text-center fieldwork-secondary text-gray-900">{zipQuota.filled}</td>
                                    <td className="px-3 py-2 text-center">
                                      <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto">
                                        <div 
                                          className="h-full bg-blue-500 rounded-full"
                                          style={{ 
                                            width: `${Math.min((zipQuota.filled / zipQuota.target) * 100, 100)}%` 
                                          }}
                                        ></div>
                                      </div>
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                      <Input
                                        value={zipQuota.pauseAt}
                                        className="w-16 text-center text-sm"
                                        size="sm"
                                      />
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                            {pa08ZipQuotas.length > 15 && (
                              <div className="text-center py-2 fieldwork-secondary text-gray-500">
                                ... and {pa08ZipQuotas.length - 15} more ZIP codes
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* WI-03 District */}
                  <div className="border border-gray-200 rounded-lg">
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleDistrictExpansion('WI-03')}
                            className="p-1"
                          >
                            {districtQuotas['WI-03'].zipsExpanded ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </Button>
                          <div>
                            <div className="fieldwork-title text-gray-900">WI-03</div>
                            <div className="fieldwork-secondary text-gray-500">{WI03_ZIPS.length} ZIP codes</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-6">
                          <div className="text-center">
                            <div className="fieldwork-body text-gray-900">{districtQuotas['WI-03'].filled}</div>
                            <div className="fieldwork-secondary text-gray-500">Filled</div>
                          </div>
                          <div className="text-center">
                            <Input
                              value={districtQuotas['WI-03'].target}
                              onChange={(e) => setDistrictQuotas(prev => ({
                                ...prev,
                                'WI-03': { ...prev['WI-03'], target: parseInt(e.target.value) || 0 }
                              }))}
                              className="w-20 text-center"
                            />
                            <div className="fieldwork-secondary text-gray-500 mt-1">Target</div>
                          </div>
                          <div className="w-24">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-500 h-2 rounded-full"
                                style={{ 
                                  width: `${Math.min((districtQuotas['WI-03'].filled / districtQuotas['WI-03'].target) * 100, 100)}%` 
                                }}
                              ></div>
                            </div>
                            <div className="fieldwork-caption text-gray-500 text-center mt-1">
                              {Math.round((districtQuotas['WI-03'].filled / districtQuotas['WI-03'].target) * 100)}%
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => autoAllocate('WI-03')}
                          >
                            <Shuffle className="h-4 w-4 mr-2" />
                            Auto-allocate
                          </Button>
                        </div>
                      </div>

                      {/* WI-03 ZIP Table */}
                      {districtQuotas['WI-03'].zipsExpanded && (
                        <div className="mt-4 border-t border-gray-200 pt-4">
                          <div className="max-h-64 overflow-y-auto">
                            <table className="w-full">
                              <thead className="bg-gray-50 sticky top-0">
                                <tr>
                                  <th className="px-3 py-2 text-left fieldwork-label text-gray-900">ZIP</th>
                                  <th className="px-3 py-2 text-center fieldwork-label text-gray-900">Target</th>
                                  <th className="px-3 py-2 text-center fieldwork-label text-gray-900">Filled</th>
                                  <th className="px-3 py-2 text-center fieldwork-label text-gray-900">Progress</th>
                                  <th className="px-3 py-2 text-center fieldwork-label text-gray-900">Pause-at</th>
                                </tr>
                              </thead>
                              <tbody>
                                {wi03ZipQuotas.slice(0, 15).map((zipQuota) => (
                                  <tr key={zipQuota.zip} className="border-b border-gray-100">
                                    <td className="px-3 py-2 fieldwork-secondary text-gray-900">{zipQuota.zip}</td>
                                    <td className="px-3 py-2 text-center">
                                      <Input
                                        value={zipQuota.target}
                                        className="w-16 text-center text-sm"
                                        size="sm"
                                      />
                                    </td>
                                    <td className="px-3 py-2 text-center fieldwork-secondary text-gray-900">{zipQuota.filled}</td>
                                    <td className="px-3 py-2 text-center">
                                      <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto">
                                        <div 
                                          className="h-full bg-blue-500 rounded-full"
                                          style={{ 
                                            width: `${Math.min((zipQuota.filled / zipQuota.target) * 100, 100)}%` 
                                          }}
                                        ></div>
                                      </div>
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                      <Input
                                        value={zipQuota.pauseAt}
                                        className="w-16 text-center text-sm"
                                        size="sm"
                                      />
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                            {wi03ZipQuotas.length > 15 && (
                              <div className="text-center py-2 fieldwork-secondary text-gray-500">
                                ... and {wi03ZipQuotas.length - 15} more ZIP codes
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Overfill Handling */}
              <Card>
                <CardHeader>
                  <CardTitle className="fieldwork-title">Overfill Handling</CardTitle>
                  <CardDescription>Choose what happens when quotas are exceeded</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div 
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center cursor-pointer ${
                          overfillHandling === 'stop' ? 'border-blue-500' : 'border-gray-300'
                        }`}
                        onClick={() => setOverfillHandling('stop')}
                      >
                        {overfillHandling === 'stop' && <div className="w-2 h-2 rounded-full bg-blue-500"></div>}
                      </div>
                      <div className="flex-1">
                        <div className="fieldwork-body text-gray-900">Stop ads when quota reached</div>
                        <div className="fieldwork-secondary text-gray-500">Immediately pause recruitment for that ZIP/district</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div 
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center cursor-pointer ${
                          overfillHandling === 'allow' ? 'border-blue-500' : 'border-gray-300'
                        }`}
                        onClick={() => setOverfillHandling('allow')}
                      >
                        {overfillHandling === 'allow' && <div className="w-2 h-2 rounded-full bg-blue-500"></div>}
                      </div>
                      <div className="flex-1">
                        <div className="fieldwork-body text-gray-900">Allow +10% overfill</div>
                        <div className="fieldwork-secondary text-gray-500">Continue recruitment up to 110% of quota before stopping</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div 
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center cursor-pointer ${
                          overfillHandling === 'redirect' ? 'border-blue-500' : 'border-gray-300'
                        }`}
                        onClick={() => setOverfillHandling('redirect')}
                      >
                        {overfillHandling === 'redirect' && <div className="w-2 h-2 rounded-full bg-blue-500"></div>}
                      </div>
                      <div className="flex-1">
                        <div className="fieldwork-body text-gray-900">Redirect to unfilled areas</div>
                        <div className="fieldwork-secondary text-gray-500">Automatically redirect traffic to ZIP codes needing more responses</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <Info className="h-4 w-4 text-blue-600 mt-0.5" />
                      <div className="fieldwork-secondary text-blue-800">
                        Overfill settings apply to all ZIP codes and districts in this campaign
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sticky Footer */}
          <div className="border-t border-gray-200 bg-white px-6 py-4">
            <div className="flex items-center justify-between">
              <Button variant="outline">
                Back: Consent
              </Button>
              <div className="flex items-center space-x-4">
                <div className="fieldwork-secondary text-gray-500">
                  Step 5 of 8
                </div>
                <Button>
                  Next: Schedule
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const WizardStepIncentives = () => {
    const wizardSteps = [
      { number: 1, title: 'Basics', active: false },
      { number: 2, title: 'Targeting', active: false },
      { number: 3, title: 'Screener', active: false },
      { number: 4, title: 'Consent', active: false },
      { number: 5, title: 'Quotas', active: false },
      { number: 6, title: 'Incentives', active: true },
      { number: 7, title: 'Review', active: false },
      { number: 8, title: 'Launch', active: false },
    ];

    const totalTarget = districtQuotas['PA-08'].target + districtQuotas['WI-03'].target;
    const reserveBudget = totalTarget * incentiveAmount;

    return (
      <div className="min-h-screen bg-gray-50 flex">
        {/* Left Stepper - Fixed */}
        <div className="w-80 bg-white border-r border-gray-200 flex-shrink-0">
          <div className="p-6 border-b border-gray-200">
            <div className="fieldwork-title text-gray-900">Campaign Wizard</div>
            <div className="fieldwork-secondary text-gray-600 mt-1">Create new campaign</div>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {wizardSteps.map((step, index) => (
                <div key={step.number} className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                        step.active 
                          ? 'bg-blue-500 border-blue-500 text-white' 
                          : index < 5
                          ? 'bg-green-500 border-green-500 text-white'
                          : 'border-gray-300 text-gray-400'
                      }`}
                    >
                      {index < 5 ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <span className="fieldwork-secondary">{step.number}</span>
                      )}
                    </div>
                    {index < wizardSteps.length - 1 && (
                      <div className={`w-0.5 h-8 ml-4 mt-2 ${
                        index < 5 ? 'bg-green-500' : 'bg-gray-200'
                      }`}></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className={`fieldwork-label ${
                      step.active ? 'text-blue-700' : index < 5 ? 'text-green-700' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Bar */}
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="fieldwork-title text-gray-900">Step 6: Respondent Incentives</div>
                <Badge variant="outline">Draft</Badge>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm">
                  <Calculator className="h-4 w-4 mr-2" />
                  Budget Calculator
                </Button>
                <Button variant="ghost" size="sm">
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6 pb-24 overflow-auto">
            <div className="max-w-4xl space-y-8">
              <div className="space-y-2">
                <div className="fieldwork-h3 text-gray-900">Payment & Incentive Configuration</div>
                <div className="fieldwork-secondary text-gray-500">
                  Configure payment amounts and delivery methods for survey completion
                </div>
              </div>

              {/* Budget Overview */}
              <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <DollarSign className="h-6 w-6 text-green-600" />
                      <div>
                        <CardTitle className="fieldwork-title text-gray-900">Reserve Budget Estimate</CardTitle>
                        <CardDescription>Based on {totalTarget} target completions</CardDescription>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="fieldwork-h2 text-green-700">${reserveBudget.toLocaleString()}</div>
                      <div className="fieldwork-secondary text-gray-600">Total reserve needed</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="fieldwork-h3 text-gray-900">${incentiveAmount.toFixed(2)}</div>
                      <div className="fieldwork-secondary text-gray-500">Per completion</div>
                    </div>
                    <div className="text-center">
                      <div className="fieldwork-h3 text-gray-900">{totalTarget}</div>
                      <div className="fieldwork-secondary text-gray-500">Target responses</div>
                    </div>
                    <div className="text-center">
                      <div className="fieldwork-h3 text-green-600">+10%</div>
                      <div className="fieldwork-secondary text-gray-500">Safety buffer</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Amount */}
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <DollarSign className="h-5 w-5 text-gray-600" />
                    <div>
                      <CardTitle className="fieldwork-title">Incentive Amount</CardTitle>
                      <CardDescription>Payment per completed survey response</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="fieldwork-label">Incentive per Complete</Label>
                    <div className="flex items-center space-x-4">
                      <div className="relative flex-1 max-w-xs">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 fieldwork-body text-gray-500">$</span>
                        <Input
                          type="number"
                          value={incentiveAmount}
                          onChange={(e) => setIncentiveAmount(parseFloat(e.target.value) || 0)}
                          className="pl-8"
                          step="0.01"
                          min="0"
                        />
                      </div>
                      <div className="fieldwork-secondary text-gray-500">
                        Total budget: ${(incentiveAmount * totalTarget).toLocaleString()}
                      </div>
                    </div>
                    <div className="fieldwork-caption text-gray-500">
                      Standard political survey incentives range from $10-25 per completion
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Delivery Method */}
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <CreditCard className="h-5 w-5 text-gray-600" />
                    <div>
                      <CardTitle className="fieldwork-title">Delivery Method</CardTitle>
                      <CardDescription>How payments will be sent to respondents</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div 
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center cursor-pointer ${
                          deliveryMethod === 'gift-card' ? 'border-blue-500' : 'border-gray-300'
                        }`}
                        onClick={() => setDeliveryMethod('gift-card')}
                      >
                        {deliveryMethod === 'gift-card' && <div className="w-2 h-2 rounded-full bg-blue-500"></div>}
                      </div>
                      <div className="flex-1">
                        <div className="fieldwork-body text-gray-900">Gift Card</div>
                        <div className="fieldwork-secondary text-gray-500">Amazon or Visa gift cards (recommended)</div>
                      </div>
                      <Badge variant="outline" className="text-green-600 border-green-300">Recommended</Badge>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div 
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center cursor-pointer ${
                          deliveryMethod === 'paypal' ? 'border-blue-500' : 'border-gray-300'
                        }`}
                        onClick={() => setDeliveryMethod('paypal')}
                      >
                        {deliveryMethod === 'paypal' && <div className="w-2 h-2 rounded-full bg-blue-500"></div>}
                      </div>
                      <div className="flex-1">
                        <div className="fieldwork-body text-gray-900">PayPal</div>
                        <div className="fieldwork-secondary text-gray-500">Direct PayPal transfers (requires PayPal email)</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div 
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center cursor-pointer ${
                          deliveryMethod === 'manual' ? 'border-blue-500' : 'border-gray-300'
                        }`}
                        onClick={() => setDeliveryMethod('manual')}
                      >
                        {deliveryMethod === 'manual' && <div className="w-2 h-2 rounded-full bg-blue-500"></div>}
                      </div>
                      <div className="flex-1">
                        <div className="fieldwork-body text-gray-900">Manual Processing</div>
                        <div className="fieldwork-secondary text-gray-500">Review and process payments manually</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <Info className="h-4 w-4 text-blue-600 mt-0.5" />
                      <div className="fieldwork-secondary text-blue-800">
                        Gift cards have the highest completion rates and lowest fraud risk
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payout Information */}
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Settings2 className="h-5 w-5 text-gray-600" />
                    <div>
                      <CardTitle className="fieldwork-title">Payout Information Collection</CardTitle>
                      <CardDescription>What information to collect for payment processing</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        checked={collectEmail}
                        onCheckedChange={(checked) => setCollectEmail(!!checked)}
                      />
                      <div className="flex-1">
                        <div className="fieldwork-body text-gray-900">Email Address</div>
                        <div className="fieldwork-secondary text-gray-500">Required for all payment methods</div>
                      </div>
                      <Badge variant="destructive">Required</Badge>
                    </div>

                    {deliveryMethod === 'paypal' && (
                      <div className="ml-6 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                        <div className="fieldwork-secondary text-orange-800">
                          PayPal email will be collected automatically when this delivery method is selected
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Completion Definition */}
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <CheckSquare className="h-5 w-5 text-gray-600" />
                    <div>
                      <CardTitle className="fieldwork-title">Completion Definition</CardTitle>
                      <CardDescription>When to consider a response "complete" for payment</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div 
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center cursor-pointer ${
                          completionDefinition === 'webhook' ? 'border-blue-500' : 'border-gray-300'
                        }`}
                        onClick={() => setCompletionDefinition('webhook')}
                      >
                        {completionDefinition === 'webhook' && <div className="w-2 h-2 rounded-full bg-blue-500"></div>}
                      </div>
                      <div className="flex-1">
                        <div className="fieldwork-body text-gray-900">Reaches 'Complete' webhook from survey</div>
                        <div className="fieldwork-secondary text-gray-500">Automatic when survey platform sends completion webhook</div>
                      </div>
                      <Badge variant="outline" className="text-blue-600 border-blue-300">Recommended</Badge>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div 
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center cursor-pointer ${
                          completionDefinition === 'manual' ? 'border-blue-500' : 'border-gray-300'
                        }`}
                        onClick={() => setCompletionDefinition('manual')}
                      >
                        {completionDefinition === 'manual' && <div className="w-2 h-2 rounded-full bg-blue-500"></div>}
                      </div>
                      <div className="flex-1">
                        <div className="fieldwork-body text-gray-900">Manually verified</div>
                        <div className="fieldwork-secondary text-gray-500">Admin reviews and approves each completion manually</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <Info className="h-4 w-4 text-gray-600 mt-0.5" />
                      <div className="fieldwork-secondary text-gray-700">
                        Webhook completion is faster and reduces administrative overhead. Manual verification provides more control but requires ongoing review.
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle className="fieldwork-title">Payment Processing Timeline</CardTitle>
                  <CardDescription>Expected timeframes for incentive delivery</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="fieldwork-h3 text-green-600">Gift Cards</div>
                        <div className="fieldwork-secondary text-gray-600 mt-1">1-2 hours</div>
                        <div className="fieldwork-caption text-gray-500 mt-1">Automated delivery</div>
                      </div>
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="fieldwork-h3 text-blue-600">PayPal</div>
                        <div className="fieldwork-secondary text-gray-600 mt-1">2-4 hours</div>
                        <div className="fieldwork-caption text-gray-500 mt-1">API processing</div>
                      </div>
                      <div className="text-center p-4 bg-orange-50 rounded-lg">
                        <div className="fieldwork-h3 text-orange-600">Manual</div>
                        <div className="fieldwork-secondary text-gray-600 mt-1">1-3 days</div>
                        <div className="fieldwork-caption text-gray-500 mt-1">Manual review</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sticky Footer */}
          <div className="border-t border-gray-200 bg-white px-6 py-4">
            <div className="flex items-center justify-between">
              <Button variant="outline">
                Back: Quotas
              </Button>
              <div className="flex items-center space-x-4">
                <div className="fieldwork-secondary text-gray-500">
                  Step 6 of 8
                </div>
                <Button>
                  Next: Review
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const WizardStepChannelsBudget = () => {
    const wizardSteps = [
      { number: 1, title: 'Basics', active: false },
      { number: 2, title: 'Targeting', active: false },
      { number: 3, title: 'Screener', active: false },
      { number: 4, title: 'Consent', active: false },
      { number: 5, title: 'Quotas', active: false },
      { number: 6, title: 'Incentives', active: false },
      { number: 7, title: 'Channels', active: true },
      { number: 8, title: 'Launch', active: false },
    ];

    const pa08TotalBudget = pa08DailyBudget * 7; // Assuming 7-day campaign
    const wi03TotalBudget = wi03DailyBudget * 7;
    const totalDailyBudget = pa08DailyBudget + wi03DailyBudget;
    const totalCampaignBudget = pa08TotalBudget + wi03TotalBudget;

    const generateUTMUrl = () => {
      const baseUrl = 'https://survey.company.com/start';
      return `${baseUrl}?utm_source=${utmSource}&utm_medium=${utmMedium}&utm_campaign=${utmCampaign}&utm_content=meta_ad`;
    };

    return (
      <div className="min-h-screen bg-gray-50 flex">
        {/* Left Stepper - Fixed */}
        <div className="w-80 bg-white border-r border-gray-200 flex-shrink-0">
          <div className="p-6 border-b border-gray-200">
            <div className="fieldwork-title text-gray-900">Campaign Wizard</div>
            <div className="fieldwork-secondary text-gray-600 mt-1">Create new campaign</div>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {wizardSteps.map((step, index) => (
                <div key={step.number} className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                        step.active 
                          ? 'bg-blue-500 border-blue-500 text-white' 
                          : index < 6
                          ? 'bg-green-500 border-green-500 text-white'
                          : 'border-gray-300 text-gray-400'
                      }`}
                    >
                      {index < 6 ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <span className="fieldwork-secondary">{step.number}</span>
                      )}
                    </div>
                    {index < wizardSteps.length - 1 && (
                      <div className={`w-0.5 h-8 ml-4 mt-2 ${
                        index < 6 ? 'bg-green-500' : 'bg-gray-200'
                      }`}></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className={`fieldwork-label ${
                      step.active ? 'text-blue-700' : index < 6 ? 'text-green-700' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Bar */}
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="fieldwork-title text-gray-900">Step 7: Channels & Budget</div>
                <Badge variant="outline">Draft</Badge>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm">
                  <Target className="h-4 w-4 mr-2" />
                  Campaign Preview
                </Button>
                <Button variant="ghost" size="sm">
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6 pb-24 overflow-auto">
            <div className="max-w-5xl space-y-8">
              <div className="space-y-2">
                <div className="fieldwork-h3 text-gray-900">Advertising Channels & Budget Allocation</div>
                <div className="fieldwork-secondary text-gray-500">
                  Configure advertising platforms, budgets, and creative assets
                </div>
              </div>

              {/* Budget Overview */}
              <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <DollarSign className="h-6 w-6 text-blue-600" />
                      <div>
                        <CardTitle className="fieldwork-title text-gray-900">Total Campaign Budget</CardTitle>
                        <CardDescription>7-day campaign across both districts</CardDescription>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="fieldwork-h2 text-blue-700">${totalCampaignBudget.toLocaleString()}</div>
                      <div className="fieldwork-secondary text-gray-600">${totalDailyBudget}/day</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center p-4 bg-white rounded-lg border border-blue-100">
                      <div className="fieldwork-h3 text-gray-900">PA-08</div>
                      <div className="fieldwork-secondary text-gray-600 mt-1">${pa08TotalBudget} total</div>
                      <div className="fieldwork-caption text-gray-500">${pa08DailyBudget}/day</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg border border-blue-100">
                      <div className="fieldwork-h3 text-gray-900">WI-03</div>
                      <div className="fieldwork-secondary text-gray-600 mt-1">${wi03TotalBudget} total</div>
                      <div className="fieldwork-caption text-gray-500">${wi03DailyBudget}/day</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Advertising Channels */}
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Megaphone className="h-5 w-5 text-gray-600" />
                    <div>
                      <CardTitle className="fieldwork-title">Advertising Channels</CardTitle>
                      <CardDescription>Select and configure advertising platforms</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Meta Ads */}
                  <div className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg">
                    <Checkbox
                      checked={metaAdsEnabled}
                      onCheckedChange={(checked) => setMetaAdsEnabled(!!checked)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div className="fieldwork-title text-gray-900">Meta Ads</div>
                        <Badge variant="outline" className="text-blue-600 border-blue-300">Facebook & Instagram</Badge>
                      </div>
                      <div className="fieldwork-secondary text-gray-500 mt-1">
                        Reach voters through Facebook and Instagram advertising
                      </div>
                      <div className="mt-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                        <div className="flex items-start space-x-2">
                          <AlertCircle className="h-4 w-4 text-orange-600 mt-0.5" />
                          <div className="fieldwork-secondary text-orange-800">
                            <strong>Issue Ads disclaimer required:</strong> Political advertising regulations apply
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Google Ads */}
                  <div className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg">
                    <Checkbox
                      checked={googleAdsEnabled}
                      onCheckedChange={(checked) => setGoogleAdsEnabled(!!checked)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div className="fieldwork-title text-gray-900">Google Ads</div>
                        <Badge variant="outline" className="text-green-600 border-green-300">Search & Display</Badge>
                      </div>
                      <div className="fieldwork-secondary text-gray-500 mt-1 mb-3">
                        Target voters through Google Search and Display Network
                      </div>
                      <Button variant="outline" size="sm">
                        <Settings2 className="h-4 w-4 mr-2" />
                        Configure Keywords
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* District Budgets */}
              <Card>
                <CardHeader>
                  <CardTitle className="fieldwork-title">Budget Allocation by District</CardTitle>
                  <CardDescription>Daily and total budget limits for each congressional district</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    {/* PA-08 Budget */}
                    <div className="space-y-4 p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="fieldwork-title text-gray-900">PA-08</div>
                        <Badge variant="outline">150 target responses</Badge>
                      </div>
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <Label className="fieldwork-label">Daily Budget</Label>
                          <div className="flex items-center space-x-2">
                            <span className="fieldwork-body text-gray-500">$</span>
                            <Input
                              type="number"
                              value={pa08DailyBudget}
                              onChange={(e) => setPa08DailyBudget(parseInt(e.target.value) || 0)}
                              className="w-24"
                            />
                            <span className="fieldwork-secondary text-gray-500">/day</span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="fieldwork-secondary text-gray-600">Total Campaign</span>
                            <span className="fieldwork-body text-gray-900">${pa08TotalBudget}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="fieldwork-secondary text-gray-600">Est. CPC</span>
                            <span className="fieldwork-body text-gray-900">$7.00</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* WI-03 Budget */}
                    <div className="space-y-4 p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="fieldwork-title text-gray-900">WI-03</div>
                        <Badge variant="outline">150 target responses</Badge>
                      </div>
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <Label className="fieldwork-label">Daily Budget</Label>
                          <div className="flex items-center space-x-2">
                            <span className="fieldwork-body text-gray-500">$</span>
                            <Input
                              type="number"
                              value={wi03DailyBudget}
                              onChange={(e) => setWi03DailyBudget(parseInt(e.target.value) || 0)}
                              className="w-24"
                            />
                            <span className="fieldwork-secondary text-gray-500">/day</span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="fieldwork-secondary text-gray-600">Total Campaign</span>
                            <span className="fieldwork-body text-gray-900">${wi03TotalBudget}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="fieldwork-secondary text-gray-600">Est. CPC</span>
                            <span className="fieldwork-body text-gray-900">$7.00</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Optimization */}
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Zap className="h-5 w-5 text-gray-600" />
                    <div>
                      <CardTitle className="fieldwork-title">Campaign Optimization</CardTitle>
                      <CardDescription>Configure optimization targets and tracking</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="fieldwork-label">Optimization Event</Label>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                        <span className="fieldwork-body text-gray-900">Qualified</span>
                      </div>
                      <div className="fieldwork-secondary text-gray-500">
                        Optimize for respondents who pass screening questions
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* UTM Tracking */}
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Link className="h-5 w-5 text-gray-600" />
                    <div>
                      <CardTitle className="fieldwork-title">UTM Tracking Builder</CardTitle>
                      <CardDescription>Configure URL parameters for campaign tracking</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label className="fieldwork-label">Source</Label>
                      <Input
                        value={utmSource}
                        onChange={(e) => setUtmSource(e.target.value)}
                        placeholder="{channel}"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="fieldwork-label">Medium</Label>
                      <Input
                        value={utmMedium}
                        onChange={(e) => setUtmMedium(e.target.value)}
                        placeholder="cpc"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="fieldwork-label">Campaign</Label>
                      <Input
                        value={utmCampaign}
                        onChange={(e) => setUtmCampaign(e.target.value)}
                        placeholder="{name}"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="fieldwork-label">Preview URL</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        value={generateUTMUrl()}
                        readOnly
                        className="bg-gray-50"
                      />
                      <Button variant="outline" size="sm">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Meta Creative */}
              {metaAdsEnabled && (
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <Globe className="h-5 w-5 text-gray-600" />
                      <div>
                        <CardTitle className="fieldwork-title">Meta Ads Creative</CardTitle>
                        <CardDescription>Configure ad copy and messaging for Meta platforms</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="fieldwork-label">Headline</Label>
                        <Input
                          value={metaHeadline}
                          onChange={(e) => setMetaHeadline(e.target.value)}
                          placeholder="Enter ad headline..."
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="fieldwork-label">Body Text</Label>
                        <Textarea
                          value={metaBody}
                          onChange={(e) => setMetaBody(e.target.value)}
                          placeholder="Enter ad body text..."
                          rows={3}
                        />
                      </div>
                    </div>

                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
                        <div>
                          <div className="fieldwork-body text-yellow-800">Content Guidelines</div>
                          <div className="fieldwork-secondary text-yellow-700 mt-1">
                            Use neutral, non-personalizing language. Avoid targeting based on political affiliation, race, religion, or other sensitive categories.
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Creative Preview */}
                    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <div className="fieldwork-label text-gray-900 mb-3">Ad Preview</div>
                      <div className="bg-white border border-gray-200 rounded-lg p-4 max-w-md">
                        <div className="flex items-start space-x-3">
                          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white fieldwork-secondary">Co</span>
                          </div>
                          <div className="flex-1">
                            <div className="fieldwork-secondary text-gray-900">Company Research</div>
                            <div className="fieldwork-caption text-gray-500">Sponsored</div>
                          </div>
                        </div>
                        
                        <div className="mt-3">
                          <div className="fieldwork-body text-gray-900 mb-2">{metaHeadline}</div>
                          <div className="fieldwork-secondary text-gray-700">{metaBody}</div>
                        </div>

                        <div className="mt-3 p-2 bg-gray-100 rounded text-center">
                          <div className="fieldwork-caption text-gray-600">survey.company.com</div>
                        </div>

                        <Button className="w-full mt-3" size="sm">
                          Learn More
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Sticky Footer */}
          <div className="border-t border-gray-200 bg-white px-6 py-4">
            <div className="flex items-center justify-between">
              <Button variant="outline">
                Back: Incentives
              </Button>
              <div className="flex items-center space-x-4">
                <div className="fieldwork-secondary text-gray-500">
                  Step 7 of 8
                </div>
                <Button>
                  Next: Launch
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const WizardStepGoogleKeywords = () => {
    const wizardSteps = [
      { number: 1, title: 'Basics', active: false },
      { number: 2, title: 'Targeting', active: false },
      { number: 3, title: 'Screener', active: false },
      { number: 4, title: 'Consent', active: false },
      { number: 5, title: 'Quotas', active: false },
      { number: 6, title: 'Incentives', active: false },
      { number: 7, title: 'Channels', active: false },
      { number: 8, title: 'Launch', active: false },
    ];

    const coreKeywords = [
      { keyword: 'why are housing costs rising', type: 'exact' },
      { keyword: 'why are grocery costs rising', type: 'exact' },
      { keyword: 'tariffs making things more expensive', type: 'exact' }
    ];

    const relatedKeywords = [
      { keyword: 'tariffs prices', type: 'phrase' },
      { keyword: 'cost of living rising', type: 'phrase' },
      { keyword: 'inflation groceries', type: 'phrase' },
      { keyword: 'inflation housing', type: 'phrase' },
      { keyword: 'grocery price increases', type: 'phrase' },
      { keyword: 'housing price increases 2025', type: 'phrase' },
      { keyword: 'why are prices going up', type: 'phrase' }
    ];

    const negativeKeywords = [
      'free groceries', 'coupon', 'promo code', 'walmart weekly ad', 'aldi flyer', 
      'real estate agent', 'mortgage rates', 'buy house', 'cheap apartments', 
      'wholesale club', 'costco membership'
    ];

    const KeywordCard = ({ title, keywords, type, icon, description }) => (
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-3">
            {icon}
            <div>
              <CardTitle className="fieldwork-title">{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {type === 'negative' ? (
              <div className="space-y-2">
                {keywords.map((keyword, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline" className="text-red-600 border-red-300">
                        Negative
                      </Badge>
                      <span className="fieldwork-body text-gray-900">{keyword}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                      <Minus className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {keywords.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline" className={`${
                        item.type === 'exact' 
                          ? 'text-blue-600 border-blue-300' 
                          : 'text-green-600 border-green-300'
                      }`}>
                        {item.type === 'exact' ? '[Exact]' : '"Phrase"'}
                      </Badge>
                      <span className="fieldwork-body text-gray-900">
                        {item.type === 'exact' ? `[${item.keyword}]` : `"${item.keyword}"`}
                      </span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                      <Minus className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
            
            <Button variant="ghost" size="sm" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add {type === 'negative' ? 'Negative' : ''} Keyword
            </Button>
          </div>
        </CardContent>
      </Card>
    );

    return (
      <div className="min-h-screen bg-gray-50 flex">
        {/* Left Stepper - Fixed */}
        <div className="w-80 bg-white border-r border-gray-200 flex-shrink-0">
          <div className="p-6 border-b border-gray-200">
            <div className="fieldwork-title text-gray-900">Campaign Wizard</div>
            <div className="fieldwork-secondary text-gray-600 mt-1">Create new campaign</div>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {wizardSteps.map((step, index) => (
                <div key={step.number} className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                        index < 6
                        ? 'bg-green-500 border-green-500 text-white'
                        : index === 6
                        ? 'bg-blue-500 border-blue-500 text-white'
                        : 'border-gray-300 text-gray-400'
                      }`}
                    >
                      {index < 7 ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <span className="fieldwork-secondary">{step.number}</span>
                      )}
                    </div>
                    {index < wizardSteps.length - 1 && (
                      <div className={`w-0.5 h-8 ml-4 mt-2 ${
                        index < 6 ? 'bg-green-500' : index === 6 ? 'bg-blue-500' : 'bg-gray-200'
                      }`}></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className={`fieldwork-label ${
                      index === 6 ? 'text-blue-700' : index < 6 ? 'text-green-700' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Bar */}
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="fieldwork-title text-gray-900">Google Ads Keywords</div>
                <Badge variant="outline">Draft</Badge>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm">
                  <Search className="h-4 w-4 mr-2" />
                  Keyword Planner
                </Button>
                <Button variant="ghost" size="sm">
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6 pb-24 overflow-auto">
            <div className="max-w-5xl space-y-8">
              <div className="space-y-2">
                <div className="fieldwork-h3 text-gray-900">Keyword Configuration</div>
                <div className="fieldwork-secondary text-gray-500">
                  Configure targeting keywords for Google Ads campaigns
                </div>
              </div>

              {/* Campaign Settings Overview */}
              <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Target className="h-6 w-6 text-green-600" />
                      <div>
                        <CardTitle className="fieldwork-title text-gray-900">Campaign Settings</CardTitle>
                        <CardDescription>Google Ads configuration summary</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="fieldwork-h3 text-green-600">Maximize Conversions</div>
                      <div className="fieldwork-secondary text-gray-600">Bidding Strategy</div>
                    </div>
                    <div className="text-center">
                      <div className="fieldwork-h3 text-blue-600">Qualified</div>
                      <div className="fieldwork-secondary text-gray-600">Target Event</div>
                    </div>
                    <div className="text-center">
                      <div className="fieldwork-h3 text-gray-900">ZIP-based</div>
                      <div className="fieldwork-secondary text-gray-600">Location Targeting</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Keywords Sections */}
              <div className="space-y-6">
                <KeywordCard
                  title="Core Keywords (Exact Match)"
                  keywords={coreKeywords}
                  type="core"
                  icon={<Target className="h-5 w-5 text-blue-600" />}
                  description="High-intent keywords with exact match targeting"
                />

                <KeywordCard
                  title="Related Keywords (Phrase/Exact)"
                  keywords={relatedKeywords}
                  type="related"
                  icon={<Search className="h-5 w-5 text-green-600" />}
                  description="Broader related terms with phrase match targeting"
                />

                <KeywordCard
                  title="Negative Keywords (Broad)"
                  keywords={negativeKeywords}
                  type="negative"
                  icon={<Minus className="h-5 w-5 text-red-600" />}
                  description="Keywords to exclude from targeting"
                />
              </div>

              {/* Campaign Configuration */}
              <div className="grid grid-cols-2 gap-6">
                {/* Final URL */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <Link className="h-5 w-5 text-gray-600" />
                      <div>
                        <CardTitle className="fieldwork-title">Final URL</CardTitle>
                        <CardDescription>Landing page for ad clicks</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label className="fieldwork-label">Landing URL</Label>
                      <Input
                        value={finalUrl}
                        onChange={(e) => setFinalUrl(e.target.value)}
                        placeholder="https://survey.company.com/start"
                      />
                      <div className="fieldwork-caption text-gray-500">
                        UTM parameters will be automatically appended
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Bidding Strategy */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <DollarSign className="h-5 w-5 text-gray-600" />
                      <div>
                        <CardTitle className="fieldwork-title">Bidding Strategy</CardTitle>
                        <CardDescription>How Google optimizes your bids</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                        <div className="flex-1">
                          <div className="fieldwork-body text-gray-900">Maximize Conversions</div>
                          <div className="fieldwork-secondary text-gray-500">Target: Qualified events</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Location Targeting */}
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Globe className="h-5 w-5 text-gray-600" />
                    <div>
                      <CardTitle className="fieldwork-title">Location Targeting</CardTitle>
                      <CardDescription>Geographic targeting configuration</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                      <div>
                        <div className="fieldwork-body text-blue-900">Inherits ZIP Code List</div>
                        <div className="fieldwork-secondary text-blue-700">
                          Using ZIP codes from PA-08 and WI-03 districts configured in Step 2
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="fieldwork-label text-gray-900">PA-08 District</div>
                      <div className="fieldwork-secondary text-gray-600">45 ZIP codes</div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="fieldwork-label text-gray-900">WI-03 District</div>
                      <div className="fieldwork-secondary text-gray-600">38 ZIP codes</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Keyword Performance Preview */}
              <Card>
                <CardHeader>
                  <CardTitle className="fieldwork-title">Keyword Performance Estimates</CardTitle>
                  <CardDescription>Expected performance based on historical data</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="text-center">
                        <div className="fieldwork-h3 text-gray-900">$6.50</div>
                        <div className="fieldwork-secondary text-gray-600">Avg CPC</div>
                      </div>
                      <div className="text-center">
                        <div className="fieldwork-h3 text-gray-900">2.8%</div>
                        <div className="fieldwork-secondary text-gray-600">CTR</div>
                      </div>
                      <div className="text-center">
                        <div className="fieldwork-h3 text-gray-900">15.2%</div>
                        <div className="fieldwork-secondary text-gray-600">Conversion Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="fieldwork-h3 text-gray-900">$42.80</div>
                        <div className="fieldwork-secondary text-gray-600">Cost per Qualified</div>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <Info className="h-4 w-4 text-green-600 mt-0.5" />
                        <div className="fieldwork-secondary text-green-800">
                          Estimates based on similar political research campaigns. Actual performance may vary.
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sticky Footer */}
          <div className="border-t border-gray-200 bg-white px-6 py-4">
            <div className="flex items-center justify-between">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Channels
              </Button>
              <div className="flex items-center space-x-4">
                <Button variant="outline">
                  Save as Draft
                </Button>
                <Button>
                  <Tag className="h-4 w-4 mr-2" />
                  Save Keywords
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const WizardStepReviewLaunch = () => {
    const wizardSteps = [
      { number: 1, title: 'Basics', active: false },
      { number: 2, title: 'Targeting', active: false },
      { number: 3, title: 'Screener', active: false },
      { number: 4, title: 'Consent', active: false },
      { number: 5, title: 'Quotas', active: false },
      { number: 6, title: 'Incentives', active: false },
      { number: 7, title: 'Channels', active: false },
      { number: 8, title: 'Launch', active: true },
    ];

    const checklistItems = [
      { 
        title: 'Ad accounts connected', 
        status: 'complete', 
        description: 'Meta Ads and Google Ads accounts verified',
        icon: <CheckCircle className="h-5 w-5 text-green-500" />
      },
      { 
        title: 'District presets loaded: PA-08, WI-03', 
        status: 'complete', 
        description: '83 ZIP codes configured across both districts',
        icon: <CheckCircle className="h-5 w-5 text-green-500" />
      },
      { 
        title: 'Google keywords configured', 
        status: 'complete', 
        description: '3 core + 7 related keywords, 11 negative terms',
        icon: <CheckCircle className="h-5 w-5 text-green-500" />
      },
      { 
        title: 'Meta Issue Ads disclaimer set', 
        status: 'complete', 
        description: 'Sponsor: [Your Org] - Political advertising compliance',
        icon: <CheckCircle className="h-5 w-5 text-green-500" />
      },
      { 
        title: 'Consent configured (v1.0)', 
        status: 'complete', 
        description: 'Data use consent with mobile preview tested',
        icon: <CheckCircle className="h-5 w-5 text-green-500" />
      },
      { 
        title: 'Screener ready (3 questions)', 
        status: 'complete', 
        description: 'Age, district, and engagement qualification',
        icon: <CheckCircle className="h-5 w-5 text-green-500" />
      },
      { 
        title: 'Budgets by district (PA-08/WI-03)', 
        status: 'complete', 
        description: '$150/day each district, $2,100 total campaign',
        icon: <CheckCircle className="h-5 w-5 text-green-500" />
      }
    ];

    return (
      <div className="min-h-screen bg-gray-50 flex">
        {/* Left Stepper - Fixed */}
        <div className="w-80 bg-white border-r border-gray-200 flex-shrink-0">
          <div className="p-6 border-b border-gray-200">
            <div className="fieldwork-title text-gray-900">Campaign Wizard</div>
            <div className="fieldwork-secondary text-gray-600 mt-1">Create new campaign</div>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {wizardSteps.map((step, index) => (
                <div key={step.number} className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                        step.active 
                          ? 'bg-blue-500 border-blue-500 text-white' 
                          : 'bg-green-500 border-green-500 text-white'
                      }`}
                    >
                      {step.active ? (
                        <Rocket className="h-5 w-5" />
                      ) : (
                        <CheckCircle className="h-5 w-5" />
                      )}
                    </div>
                    {index < wizardSteps.length - 1 && (
                      <div className={`w-0.5 h-8 ml-4 mt-2 ${
                        step.active ? 'bg-blue-500' : 'bg-green-500'
                      }`}></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className={`fieldwork-label ${
                      step.active ? 'text-blue-700' : 'text-green-700'
                    }`}>
                      {step.title}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Bar */}
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="fieldwork-title text-gray-900">Step 8: Review & Launch</div>
                <Badge variant="outline" className="text-green-600 border-green-300">Ready to Launch</Badge>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm">
                  <Activity className="h-4 w-4 mr-2" />
                  Campaign Health
                </Button>
                <Button variant="ghost" size="sm">
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6 pb-24 overflow-auto">
            <div className="max-w-5xl space-y-8">
              <div className="space-y-2">
                <div className="fieldwork-h3 text-gray-900">Campaign Review & Launch</div>
                <div className="fieldwork-secondary text-gray-500">
                  Final review of all campaign settings before launch
                </div>
              </div>

              {/* Launch Ready Status */}
              <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Rocket className="h-6 w-6 text-green-600" />
                      <div>
                        <CardTitle className="fieldwork-title text-gray-900">Campaign Ready for Launch</CardTitle>
                        <CardDescription>All required configurations completed successfully</CardDescription>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="fieldwork-h3 text-green-600">100%</div>
                      <div className="fieldwork-secondary text-gray-600">Complete</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="fieldwork-h3 text-gray-900">7 Days</div>
                      <div className="fieldwork-secondary text-gray-600">Campaign Duration</div>
                    </div>
                    <div className="text-center">
                      <div className="fieldwork-h3 text-gray-900">300</div>
                      <div className="fieldwork-secondary text-gray-600">Target Responses</div>
                    </div>
                    <div className="text-center">
                      <div className="fieldwork-h3 text-gray-900">2 Districts</div>
                      <div className="fieldwork-secondary text-gray-600">PA-08, WI-03</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Configuration Checklist */}
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <CheckSquare className="h-5 w-5 text-gray-600" />
                    <div>
                      <CardTitle className="fieldwork-title">Configuration Checklist</CardTitle>
                      <CardDescription>All required settings have been configured</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {checklistItems.map((item, index) => (
                      <div key={index} className="flex items-start space-x-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex-shrink-0 mt-0.5">
                          {item.icon}
                        </div>
                        <div className="flex-1">
                          <div className="fieldwork-body text-gray-900">{item.title}</div>
                          <div className="fieldwork-secondary text-gray-600 mt-1">{item.description}</div>
                        </div>
                        <Badge variant="outline" className="text-green-600 border-green-300">
                          Complete
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Performance Estimates */}
              <Card>
                <CardHeader>
                  <CardTitle className="fieldwork-title">Performance Estimates</CardTitle>
                  <CardDescription>Expected campaign performance based on historical data</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-6">
                    {/* CPC */}
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <MousePointer className="h-5 w-5 text-blue-600" />
                        <div className="fieldwork-label text-blue-900">CPC (Cost per Click)</div>
                      </div>
                      <div className="fieldwork-h2 text-blue-700">$6.75</div>
                      <div className="fieldwork-secondary text-blue-600 mt-1">Blended average</div>
                      <div className="fieldwork-caption text-gray-500 mt-2">
                        Meta: $5.50 • Google: $8.00
                      </div>
                    </div>

                    {/* CPL-Qualified */}
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <Target className="h-5 w-5 text-green-600" />
                        <div className="fieldwork-label text-green-900">CPL-Qualified</div>
                      </div>
                      <div className="fieldwork-h2 text-green-700">$42.50</div>
                      <div className="fieldwork-secondary text-green-600 mt-1">Per qualified lead</div>
                      <div className="fieldwork-caption text-gray-500 mt-2">
                        15.9% qualification rate
                      </div>
                    </div>

                    {/* CPI */}
                    <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg text-center">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <Lightning className="h-5 w-5 text-purple-600" />
                        <div className="fieldwork-label text-purple-900">CPI (Cost per Interview)</div>
                      </div>
                      <div className="fieldwork-h2 text-purple-700">$57.00</div>
                      <div className="fieldwork-secondary text-purple-600 mt-1">Per completion</div>
                      <div className="fieldwork-caption text-gray-500 mt-2">
                        74.6% completion rate
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <div className="fieldwork-label text-gray-900 mb-2">Budget Allocation</div>
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span className="fieldwork-secondary text-gray-600">Media Spend</span>
                            <span className="fieldwork-body text-gray-900">$2,100</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="fieldwork-secondary text-gray-600">Incentives Reserve</span>
                            <span className="fieldwork-body text-gray-900">$4,500</span>
                          </div>
                          <div className="flex justify-between border-t border-gray-300 pt-1">
                            <span className="fieldwork-body text-gray-900">Total Campaign Cost</span>
                            <span className="fieldwork-title text-gray-900">$6,600</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="fieldwork-label text-gray-900 mb-2">Expected Outcomes</div>
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span className="fieldwork-secondary text-gray-600">Total Clicks</span>
                            <span className="fieldwork-body text-gray-900">~311</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="fieldwork-secondary text-gray-600">Qualified Responses</span>
                            <span className="fieldwork-body text-gray-900">~49</span>
                          </div>
                          <div className="flex justify-between border-t border-gray-300 pt-1">
                            <span className="fieldwork-body text-gray-900">Completed Interviews</span>
                            <span className="fieldwork-title text-gray-900">~37</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Launch Actions */}
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Rocket className="h-5 w-5 text-gray-600" />
                    <div>
                      <CardTitle className="fieldwork-title">Launch Actions</CardTitle>
                      <CardDescription>Final testing and campaign launch options</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <Button variant="outline" size="lg" className="h-auto p-4 flex flex-col items-center space-y-2">
                      <Eye className="h-6 w-6 text-blue-600" />
                      <div className="text-center">
                        <div className="fieldwork-body text-gray-900">Preview Landing</div>
                        <div className="fieldwork-secondary text-gray-500">Test respondent flow</div>
                      </div>
                    </Button>

                    <Button variant="outline" size="lg" className="h-auto p-4 flex flex-col items-center space-y-2">
                      <MousePointer className="h-6 w-6 text-green-600" />
                      <div className="text-center">
                        <div className="fieldwork-body text-gray-900">Send Test Click</div>
                        <div className="fieldwork-secondary text-gray-500">Validate tracking</div>
                      </div>
                    </Button>

                    <Button size="lg" className="h-auto p-4 flex flex-col items-center space-y-2 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                      <Rocket className="h-6 w-6 text-white" />
                      <div className="text-center">
                        <div className="fieldwork-body text-white">Launch Campaign</div>
                        <div className="fieldwork-secondary text-blue-100">Go live now</div>
                      </div>
                    </Button>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <div className="fieldwork-body text-blue-900">Campaign Schedule</div>
                        <div className="fieldwork-secondary text-blue-700 mt-1">
                          Launch immediately upon approval. Ads will begin serving within 2-4 hours pending platform review.
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sticky Footer */}
          <div className="border-t border-gray-200 bg-white px-6 py-4">
            <div className="flex items-center justify-between">
              <Button variant="outline">
                Back: Channels & Budget
              </Button>
              <div className="flex items-center space-x-4">
                <Button variant="outline">
                  Save as Draft
                </Button>
                <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                  <Rocket className="h-4 w-4 mr-2" />
                  Launch Campaign
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const CampaignDetailLive = () => {
    const districtOptions = [
      { value: 'pa08', label: 'PA-08' },
      { value: 'wi03', label: 'WI-03' },
      { value: 'both', label: 'Both' }
    ];

    const kpiData = {
      completes: { value: 37, goal: 300, percentage: 12.3 },
      spend: { value: 892, budget: 2100, percentage: 42.5 },
      cpi: { value: 24.11, benchmark: 57.00, trend: 'down' },
      qualRate: { value: 16.8, benchmark: 15.9, trend: 'up' }
    };

    const funnelData = [
      { stage: 'Clicks', count: 311, rate: 100, color: 'bg-blue-500' },
      { stage: 'LP Views', count: 289, rate: 92.9, color: 'bg-green-500' },
      { stage: 'Consented', count: 178, rate: 61.6, color: 'bg-yellow-500' },
      { stage: 'Qualified', count: 49, rate: 27.5, color: 'bg-purple-500' },
      { stage: 'Completes', count: 37, rate: 75.5, color: 'bg-pink-500' }
    ];

    const channelData = [
      { 
        channel: 'Meta Ads', 
        status: 'active', 
        budget: 150, 
        spent: 445, 
        cpi: 22.25, 
        qualified: 20,
        clicks: 162
      },
      { 
        channel: 'Google Ads', 
        status: 'active', 
        budget: 150, 
        spent: 447, 
        cpi: 25.97, 
        qualified: 17,
        clicks: 149
      }
    ];

    const zipQuotas = [
      { zip: '19008', district: 'PA-08', target: 15, completed: 8, rate: 53 },
      { zip: '19086', district: 'PA-08', target: 12, completed: 11, rate: 92 },
      { zip: '19468', district: 'PA-08', target: 18, completed: 6, rate: 33 },
      { zip: '54601', district: 'WI-03', target: 20, completed: 12, rate: 60 },
      { zip: '54729', district: 'WI-03', target: 16, completed: 0, rate: 0 },
      { zip: '54017', district: 'WI-03', target: 14, completed: 0, rate: 0 }
    ];

    const searchTerms = [
      { query: 'why are housing costs rising', clicks: 45, qualified: 8, cpl: 35.50, convRate: 17.8 },
      { query: 'inflation groceries', clicks: 38, qualified: 6, cpl: 42.10, convRate: 15.8 },
      { query: 'cost of living rising', clicks: 32, qualified: 3, cpl: 48.33, convRate: 9.4 },
      { query: 'tariffs making things expensive', clicks: 28, qualified: 5, cpl: 39.80, convRate: 17.9 },
      { query: 'grocery price increases', clicks: 22, qualified: 2, cpl: 55.00, convRate: 9.1 }
    ];

    const recentRespondents = [
      { time: '2 min ago', zip: '19008', channel: 'Meta', status: 'Qualified', payout: '$15.00', id: 'R2847' },
      { time: '5 min ago', zip: '54601', channel: 'Google', status: 'Complete', payout: '$15.00', id: 'R2846' },
      { time: '8 min ago', zip: '19086', channel: 'Meta', status: 'Screened Out', payout: '$0.00', id: 'R2845' },
      { time: '12 min ago', zip: '19468', channel: 'Google', status: 'Complete', payout: '$15.00', id: 'R2844' },
      { time: '15 min ago', zip: '54729', channel: 'Meta', status: 'Qualified', payout: '$15.00', id: 'R2843' }
    ];

    const eventLog = [
      { time: '14:32', event: 'Campaign optimization applied', details: 'Auto-bid adjustment +$0.50 CPC' },
      { time: '14:28', event: 'ZIP quota reached', details: '19086 (PA-08) hit 92% completion rate' },
      { time: '14:15', event: 'Ad creative approved', details: 'Meta creative #3 approved for PA-08' },
      { time: '13:45', event: 'Budget pacing alert', details: 'WI-03 spending 15% behind target' },
      { time: '13:20', event: 'Quality check passed', details: 'Response quality score: 8.7/10' }
    ];

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Top Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div>
                  <div className="fieldwork-h3 text-gray-900">Campaign: Housing & Inflation Research</div>
                  <div className="flex items-center space-x-4 mt-1">
                    <Badge className="bg-green-100 text-green-700 border-green-300">
                      <Activity className="h-3 w-3 mr-1" />
                      Live
                    </Badge>
                    <div className="fieldwork-secondary text-gray-500">
                      Started 2 days ago • Ends in 5 days
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* District Toggle */}
                <div className="flex items-center space-x-2">
                  <Label className="fieldwork-label text-gray-700">District:</Label>
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    {districtOptions.map(option => (
                      <Button
                        key={option.value}
                        variant={selectedDistrict === option.value ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setSelectedDistrict(option.value)}
                        className={`px-3 py-1 rounded-md ${
                          selectedDistrict === option.value 
                            ? 'bg-white shadow-sm' 
                            : 'hover:bg-white'
                        }`}
                      >
                        {option.label}
                      </Button>
                    ))}
                  </div>
                </div>

                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
                
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto p-6 space-y-6">
          {/* KPI Tiles */}
          <div className="grid grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="fieldwork-secondary text-gray-500">Completes/Goal</div>
                    <div className="fieldwork-h2 text-gray-900 mt-1">
                      {kpiData.completes.value}/{kpiData.completes.goal}
                    </div>
                    <div className="fieldwork-secondary text-green-600 mt-1">
                      {kpiData.completes.percentage}% complete
                    </div>
                  </div>
                  <Target className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="fieldwork-secondary text-gray-500">Spend</div>
                    <div className="fieldwork-h2 text-gray-900 mt-1">
                      ${kpiData.spend.value}
                    </div>
                    <div className="fieldwork-secondary text-gray-600 mt-1">
                      of ${kpiData.spend.budget} ({kpiData.spend.percentage}%)
                    </div>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="fieldwork-secondary text-gray-500">CPI (Cost per Interview)</div>
                    <div className="fieldwork-h2 text-gray-900 mt-1">
                      ${kpiData.cpi.value}
                    </div>
                    <div className="flex items-center space-x-1 mt-1">
                      <TrendingDown className="h-3 w-3 text-green-500" />
                      <div className="fieldwork-secondary text-green-600">
                        vs ${kpiData.cpi.benchmark} est.
                      </div>
                    </div>
                  </div>
                  <Lightning className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="fieldwork-secondary text-gray-500">Qual Rate</div>
                    <div className="fieldwork-h2 text-gray-900 mt-1">
                      {kpiData.qualRate.value}%
                    </div>
                    <div className="flex items-center space-x-1 mt-1">
                      <TrendingUp className="h-3 w-3 text-green-500" />
                      <div className="fieldwork-secondary text-green-600">
                        vs {kpiData.qualRate.benchmark}% est.
                      </div>
                    </div>
                  </div>
                  <CheckCircle className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Funnel and Channels Row */}
          <div className="grid grid-cols-2 gap-6">
            {/* Conversion Funnel */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <BarChart3 className="h-5 w-5 text-gray-600" />
                  <div>
                    <CardTitle className="fieldwork-title">Conversion Funnel</CardTitle>
                    <CardDescription>7-day performance overview</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {funnelData.map((stage, index) => (
                    <div key={stage.stage} className="flex items-center space-x-4">
                      <div className="w-24 fieldwork-label text-gray-700">{stage.stage}</div>
                      <div className="flex-1 bg-gray-200 rounded-full h-3 relative overflow-hidden">
                        <div 
                          className={`h-full ${stage.color} rounded-full transition-all duration-300`}
                          style={{ width: `${(stage.count / funnelData[0].count) * 100}%` }}
                        ></div>
                      </div>
                      <div className="w-16 text-right">
                        <div className="fieldwork-body text-gray-900">{stage.count}</div>
                      </div>
                      <div className="w-16 text-right">
                        <div className="fieldwork-secondary text-gray-500">{stage.rate}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Channel Performance */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Globe className="h-5 w-5 text-gray-600" />
                    <div>
                      <CardTitle className="fieldwork-title">Channel Performance</CardTitle>
                      <CardDescription>Real-time channel status</CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {channelData.map((channel, index) => (
                    <div key={channel.channel} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="fieldwork-body text-gray-900">{channel.channel}</div>
                          <Badge variant="outline" className="text-green-600 border-green-300">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                            Active
                          </Badge>
                        </div>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-4 text-center">
                        <div>
                          <div className="fieldwork-h3 text-gray-900">${channel.spent}</div>
                          <div className="fieldwork-secondary text-gray-500">Spent</div>
                        </div>
                        <div>
                          <div className="fieldwork-h3 text-gray-900">{channel.clicks}</div>
                          <div className="fieldwork-secondary text-gray-500">Clicks</div>
                        </div>
                        <div>
                          <div className="fieldwork-h3 text-gray-900">{channel.qualified}</div>
                          <div className="fieldwork-secondary text-gray-500">Qualified</div>
                        </div>
                        <div>
                          <div className="fieldwork-h3 text-gray-900">${channel.cpi}</div>
                          <div className="fieldwork-secondary text-gray-500">CPI</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ZIP Quotas and Map */}
          <div className="grid grid-cols-2 gap-6">
            {/* ZIP Quotas */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-gray-600" />
                    <div>
                      <CardTitle className="fieldwork-title">ZIP Code Quotas</CardTitle>
                      <CardDescription>Progress by geography</CardDescription>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {zipQuotas.map((zip, index) => (
                    <div key={zip.zip} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="fieldwork-body text-gray-900">{zip.zip}</div>
                        <Badge variant="outline" className={zip.district === 'PA-08' ? 'border-blue-300 text-blue-600' : 'border-purple-300 text-purple-600'}>
                          {zip.district}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="fieldwork-body text-gray-900">{zip.completed}/{zip.target}</div>
                          <div className="fieldwork-secondary text-gray-500">{zip.rate}%</div>
                        </div>
                        <div className="w-16">
                          <div className="bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                zip.rate >= 80 ? 'bg-green-500' : 
                                zip.rate >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${Math.min(zip.rate, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Map Placeholder */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Globe className="h-5 w-5 text-gray-600" />
                  <div>
                    <CardTitle className="fieldwork-title">Geographic Performance</CardTitle>
                    <CardDescription>Choropleth visualization</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="aspect-square bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <div className="fieldwork-body text-gray-500">District Choropleth Map</div>
                    <div className="fieldwork-secondary text-gray-400 mt-1">PA-08 & WI-03 Performance</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Google Search Terms */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Search className="h-5 w-5 text-gray-600" />
                  <div>
                    <CardTitle className="fieldwork-title">Google Search Terms (7d)</CardTitle>
                    <CardDescription>Top performing search queries</CardDescription>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <ExternalLinkIcon className="h-4 w-4 mr-2" />
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 fieldwork-label text-gray-700">Query</th>
                      <th className="text-right py-3 px-4 fieldwork-label text-gray-700">Clicks</th>
                      <th className="text-right py-3 px-4 fieldwork-label text-gray-700">Qualified</th>
                      <th className="text-right py-3 px-4 fieldwork-label text-gray-700">CPL</th>
                      <th className="text-right py-3 px-4 fieldwork-label text-gray-700">Conv Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchTerms.map((term, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="fieldwork-body text-gray-900">{term.query}</div>
                        </td>
                        <td className="text-right py-3 px-4">
                          <div className="fieldwork-body text-gray-900">{term.clicks}</div>
                        </td>
                        <td className="text-right py-3 px-4">
                          <div className="fieldwork-body text-gray-900">{term.qualified}</div>
                        </td>
                        <td className="text-right py-3 px-4">
                          <div className="fieldwork-body text-gray-900">${term.cpl}</div>
                        </td>
                        <td className="text-right py-3 px-4">
                          <div className={`fieldwork-body ${
                            term.convRate >= 15 ? 'text-green-600' : 
                            term.convRate >= 10 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {term.convRate}%
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Recent Respondents */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-gray-600" />
                  <div>
                    <CardTitle className="fieldwork-title">Recent Respondents</CardTitle>
                    <CardDescription>Last 24 hours activity</CardDescription>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <ExternalLinkIcon className="h-4 w-4 mr-2" />
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 fieldwork-label text-gray-700">Time</th>
                      <th className="text-left py-3 px-4 fieldwork-label text-gray-700">ZIP</th>
                      <th className="text-left py-3 px-4 fieldwork-label text-gray-700">Channel</th>
                      <th className="text-left py-3 px-4 fieldwork-label text-gray-700">Status</th>
                      <th className="text-right py-3 px-4 fieldwork-label text-gray-700">Payout</th>
                      <th className="text-right py-3 px-4 fieldwork-label text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentRespondents.map((respondent, index) => (
                      <tr key={respondent.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="fieldwork-body text-gray-900">{respondent.time}</div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="fieldwork-body text-gray-900">{respondent.zip}</div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="outline" className={
                            respondent.channel === 'Meta' ? 'border-blue-300 text-blue-600' : 'border-green-300 text-green-600'
                          }>
                            {respondent.channel}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="outline" className={
                            respondent.status === 'Complete' ? 'border-green-300 text-green-600' :
                            respondent.status === 'Qualified' ? 'border-blue-300 text-blue-600' :
                            'border-gray-300 text-gray-600'
                          }>
                            {respondent.status}
                          </Badge>
                        </td>
                        <td className="text-right py-3 px-4">
                          <div className="fieldwork-body text-gray-900">{respondent.payout}</div>
                        </td>
                        <td className="text-right py-3 px-4">
                          <Button variant="ghost" size="sm">
                            <ExternalLinkIcon className="h-3 w-3" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Event Log - Collapsible */}
          <Card>
            <CardHeader>
              <Button 
                variant="ghost" 
                onClick={() => setShowEventLog(!showEventLog)}
                className="w-full justify-between p-0 h-auto hover:bg-transparent"
              >
                <div className="flex items-center space-x-3">
                  <Activity className="h-5 w-5 text-gray-600" />
                  <div className="text-left">
                    <CardTitle className="fieldwork-title">Event Log</CardTitle>
                    <CardDescription>Campaign activity timeline</CardDescription>
                  </div>
                </div>
                <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${showEventLog ? 'rotate-180' : ''}`} />
              </Button>
            </CardHeader>
            {showEventLog && (
              <CardContent>
                <div className="space-y-3">
                  {eventLog.map((event, index) => (
                    <div key={index} className="flex items-start space-x-4 p-3 bg-gray-50 rounded-lg">
                      <div className="fieldwork-secondary text-gray-500 w-16">{event.time}</div>
                      <div className="flex-1">
                        <div className="fieldwork-body text-gray-900">{event.event}</div>
                        <div className="fieldwork-secondary text-gray-600 mt-1">{event.details}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    );
  };

  const PayoutsQueue = () => {
    const outstandingPayouts = [
      { 
        id: 'R2847', 
        name: 'Sarah M.', 
        email: 'sarah.m***@gmail.com', 
        zip: '19008', 
        district: 'PA-08', 
        amount: 15.00, 
        completedAt: '2024-01-15 14:32', 
        channel: 'Meta',
        status: 'Complete',
        consent: 'Granted',
        activity: [
          { time: '14:32', event: 'Survey completed', details: 'All questions answered, quality score: 9.2' },
          { time: '14:28', event: 'Screener passed', details: 'Age: 35, District: PA-08, Engagement: High' },
          { time: '14:25', event: 'Consent granted', details: 'Data use consent v1.0 accepted' },
          { time: '14:24', event: 'Landing page view', details: 'Source: Meta Ads, UTM: meta_pa08_prices' }
        ]
      },
      { 
        id: 'R2846', 
        name: 'Michael R.', 
        email: 'm.rodriguez***@yahoo.com', 
        zip: '54601', 
        district: 'WI-03', 
        amount: 15.00, 
        completedAt: '2024-01-15 14:27', 
        channel: 'Google',
        status: 'Complete',
        consent: 'Granted',
        activity: [
          { time: '14:27', event: 'Survey completed', details: 'All questions answered, quality score: 8.8' },
          { time: '14:22', event: 'Screener passed', details: 'Age: 42, District: WI-03, Engagement: Medium' },
          { time: '14:19', event: 'Consent granted', details: 'Data use consent v1.0 accepted' },
          { time: '14:18', event: 'Landing page view', details: 'Source: Google Ads, Search: "inflation groceries"' }
        ]
      },
      { 
        id: 'R2844', 
        name: 'Jennifer L.', 
        email: 'jen.lee***@hotmail.com', 
        zip: '19468', 
        district: 'PA-08', 
        amount: 15.00, 
        completedAt: '2024-01-15 14:12', 
        channel: 'Google',
        status: 'Complete',
        consent: 'Granted',
        activity: [
          { time: '14:12', event: 'Survey completed', details: 'All questions answered, quality score: 9.5' },
          { time: '14:08', event: 'Screener passed', details: 'Age: 28, District: PA-08, Engagement: High' },
          { time: '14:05', event: 'Consent granted', details: 'Data use consent v1.0 accepted' },
          { time: '14:04', event: 'Landing page view', details: 'Source: Google Ads, Search: "why are housing costs rising"' }
        ]
      }
    ];

    const sentPayouts = [
      { 
        id: 'R2840', 
        name: 'David K.', 
        email: 'davidk***@gmail.com', 
        zip: '54729', 
        district: 'WI-03', 
        amount: 15.00, 
        sentAt: '2024-01-15 10:45', 
        channel: 'Meta',
        status: 'Sent',
        method: 'Amazon Gift Card'
      },
      { 
        id: 'R2838', 
        name: 'Lisa T.', 
        email: 'lisa.thompson***@yahoo.com', 
        zip: '19086', 
        district: 'PA-08', 
        amount: 15.00, 
        sentAt: '2024-01-15 10:42', 
        channel: 'Google',
        status: 'Sent',
        method: 'Amazon Gift Card'
      }
    ];

    const failedPayouts = [
      { 
        id: 'R2835', 
        name: 'Robert C.', 
        email: 'rob.clark***@gmail.com', 
        zip: '54017', 
        district: 'WI-03', 
        amount: 15.00, 
        failedAt: '2024-01-15 09:30', 
        channel: 'Meta',
        status: 'Failed',
        error: 'Invalid email address'
      }
    ];

    const currentPayouts = 
      payoutsTab === 'outstanding' ? outstandingPayouts :
      payoutsTab === 'sent' ? sentPayouts : failedPayouts;

    const filteredPayouts = payoutsDistrictFilter === 'all' 
      ? currentPayouts 
      : currentPayouts.filter(p => p.district.toLowerCase().replace('-', '') === payoutsDistrictFilter);

    const summary = {
      outstanding: outstandingPayouts.length,
      totalOwed: outstandingPayouts.reduce((sum, p) => sum + p.amount, 0),
      sent: sentPayouts.length,
      failed: failedPayouts.length
    };

    const togglePayout = (id: string) => {
      setSelectedPayouts(prev => 
        prev.includes(id) 
          ? prev.filter(p => p !== id)
          : [...prev, id]
      );
    };

    const toggleAllPayouts = () => {
      setSelectedPayouts(prev => 
        prev.length === filteredPayouts.length 
          ? [] 
          : filteredPayouts.map(p => p.id)
      );
    };

    const openDrawer = (respondent: any) => {
      setSelectedRespondent(respondent);
      setDrawerOpen(true);
    };

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <div className="fieldwork-h3 text-gray-900">Payouts Queue</div>
                <div className="fieldwork-secondary text-gray-500 mt-1">
                  Manage respondent payments and incentives
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto p-6 space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="fieldwork-secondary text-gray-500">Outstanding</div>
                    <div className="fieldwork-h2 text-gray-900 mt-1">{summary.outstanding}</div>
                    <div className="fieldwork-secondary text-orange-600 mt-1">
                      Awaiting payment
                    </div>
                  </div>
                  <Receipt className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="fieldwork-secondary text-gray-500">Total Owed</div>
                    <div className="fieldwork-h2 text-gray-900 mt-1">${summary.totalOwed.toFixed(2)}</div>
                    <div className="fieldwork-secondary text-orange-600 mt-1">
                      Pending disbursement
                    </div>
                  </div>
                  <DollarSign className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="fieldwork-secondary text-gray-500">Sent Today</div>
                    <div className="fieldwork-h2 text-gray-900 mt-1">{summary.sent}</div>
                    <div className="fieldwork-secondary text-green-600 mt-1">
                      Successfully processed
                    </div>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="fieldwork-secondary text-gray-500">Failed</div>
                    <div className="fieldwork-h2 text-gray-900 mt-1">{summary.failed}</div>
                    <div className="fieldwork-secondary text-red-600 mt-1">
                      Requires attention
                    </div>
                  </div>
                  <AlertCircle className="h-8 w-8 text-red-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filter and Actions Bar */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* District Filter Chips */}
                  <div className="flex items-center space-x-2">
                    <Label className="fieldwork-label text-gray-700">District:</Label>
                    <div className="flex space-x-1">
                      {[
                        { value: 'all', label: 'All' },
                        { value: 'pa08', label: 'PA-08' },
                        { value: 'wi03', label: 'WI-03' }
                      ].map(option => (
                        <Button
                          key={option.value}
                          variant={payoutsDistrictFilter === option.value ? "default" : "outline"}
                          size="sm"
                          onClick={() => setPayoutsDistrictFilter(option.value)}
                          className="h-8"
                        >
                          {option.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bulk Actions */}
                {selectedPayouts.length > 0 && payoutsTab === 'outstanding' && (
                  <div className="flex items-center space-x-3">
                    <div className="fieldwork-secondary text-gray-600">
                      {selectedPayouts.length} selected
                    </div>
                    <Button>
                      <Send className="h-4 w-4 mr-2" />
                      Send All
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Payouts Table with Tabs */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <Button
                    variant={payoutsTab === 'outstanding' ? "default" : "ghost"}
                    onClick={() => setPayoutsTab('outstanding')}
                    className="h-auto p-3"
                  >
                    <Receipt className="h-4 w-4 mr-2" />
                    Outstanding ({summary.outstanding})
                  </Button>
                  <Button
                    variant={payoutsTab === 'sent' ? "default" : "ghost"}
                    onClick={() => setPayoutsTab('sent')}
                    className="h-auto p-3"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Sent ({summary.sent})
                  </Button>
                  <Button
                    variant={payoutsTab === 'failed' ? "default" : "ghost"}
                    onClick={() => setPayoutsTab('failed')}
                    className="h-auto p-3"
                  >
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Failed ({summary.failed})
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-hidden">
                {/* Table Header */}
                <div className="bg-gray-50 border-b border-gray-200 px-6 py-3">
                  <div className="grid grid-cols-12 gap-4 items-center">
                    {payoutsTab === 'outstanding' && (
                      <div className="col-span-1">
                        <Checkbox
                          checked={selectedPayouts.length === filteredPayouts.length && filteredPayouts.length > 0}
                          onCheckedChange={toggleAllPayouts}
                        />
                      </div>
                    )}
                    <div className={`${payoutsTab === 'outstanding' ? 'col-span-2' : 'col-span-3'} fieldwork-label text-gray-900`}>
                      Respondent
                    </div>
                    <div className="col-span-2 fieldwork-label text-gray-900">ZIP/District</div>
                    <div className="col-span-2 fieldwork-label text-gray-900">Channel</div>
                    <div className="col-span-1 fieldwork-label text-gray-900">Amount</div>
                    <div className="col-span-2 fieldwork-label text-gray-900">
                      {payoutsTab === 'outstanding' ? 'Completed' : 
                       payoutsTab === 'sent' ? 'Sent' : 'Failed'}
                    </div>
                    <div className="col-span-2 fieldwork-label text-gray-900">
                      {payoutsTab === 'failed' ? 'Error' : 'Status'}
                    </div>
                  </div>
                </div>

                {/* Table Rows */}
                {filteredPayouts.map((payout) => (
                  <div 
                    key={payout.id} 
                    className="border-b border-gray-100 px-6 py-4 hover:bg-gray-50 cursor-pointer"
                    onClick={() => openDrawer(payout)}
                  >
                    <div className="grid grid-cols-12 gap-4 items-center">
                      {payoutsTab === 'outstanding' && (
                        <div className="col-span-1" onClick={(e) => e.stopPropagation()}>
                          <Checkbox
                            checked={selectedPayouts.includes(payout.id)}
                            onCheckedChange={() => togglePayout(payout.id)}
                          />
                        </div>
                      )}
                      <div className={`${payoutsTab === 'outstanding' ? 'col-span-2' : 'col-span-3'}`}>
                        <div className="fieldwork-body text-gray-900">{payout.name}</div>
                        <div className="fieldwork-secondary text-gray-500">{payout.email}</div>
                        <div className="fieldwork-secondary text-gray-500">ID: {payout.id}</div>
                      </div>
                      <div className="col-span-2">
                        <div className="fieldwork-body text-gray-900">{payout.zip}</div>
                        <Badge variant="outline" className={
                          payout.district === 'PA-08' ? 'border-blue-300 text-blue-600' : 'border-purple-300 text-purple-600'
                        }>
                          {payout.district}
                        </Badge>
                      </div>
                      <div className="col-span-2">
                        <Badge variant="outline" className={
                          payout.channel === 'Meta' ? 'border-blue-300 text-blue-600' : 'border-green-300 text-green-600'
                        }>
                          {payout.channel}
                        </Badge>
                      </div>
                      <div className="col-span-1">
                        <div className="fieldwork-body text-gray-900">${payout.amount.toFixed(2)}</div>
                      </div>
                      <div className="col-span-2">
                        <div className="fieldwork-secondary text-gray-600">
                          {payoutsTab === 'outstanding' ? payout.completedAt :
                           payoutsTab === 'sent' ? payout.sentAt : payout.failedAt}
                        </div>
                      </div>
                      <div className="col-span-2">
                        {payoutsTab === 'failed' ? (
                          <div className="fieldwork-secondary text-red-600">{payout.error}</div>
                        ) : (
                          <Badge variant="outline" className={
                            payout.status === 'Complete' ? 'border-green-300 text-green-600' :
                            payout.status === 'Sent' ? 'border-blue-300 text-blue-600' :
                            'border-red-300 text-red-600'
                          }>
                            {payout.status}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Drawer - Respondent Details */}
        {drawerOpen && selectedRespondent && (
          <div className="fixed inset-0 z-50 flex">
            <div 
              className="flex-1 bg-black bg-opacity-50" 
              onClick={() => setDrawerOpen(false)}
            ></div>
            <div className="w-96 bg-white border-l border-gray-200 overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="fieldwork-title text-gray-900">Respondent Details</div>
                    <div className="fieldwork-secondary text-gray-500 mt-1">
                      ID: {selectedRespondent.id}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setDrawerOpen(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Respondent Info */}
                <div>
                  <div className="fieldwork-label text-gray-900 mb-3">Contact Information</div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <User className="h-4 w-4 text-gray-400" />
                      <div>
                        <div className="fieldwork-body text-gray-900">{selectedRespondent.name}</div>
                        <div className="fieldwork-secondary text-gray-500">{selectedRespondent.email}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <div>
                        <div className="fieldwork-body text-gray-900">{selectedRespondent.zip}</div>
                        <div className="fieldwork-secondary text-gray-500">{selectedRespondent.district}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Consent Record */}
                <div>
                  <div className="fieldwork-label text-gray-900 mb-3">Consent Record</div>
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <FileCheck className="h-4 w-4 text-green-600" />
                      <div className="fieldwork-body text-green-900">Consent Granted</div>
                    </div>
                    <div className="fieldwork-secondary text-green-700 mt-1">
                      Data use consent v1.0 accepted
                    </div>
                  </div>
                </div>

                {/* Payout Details */}
                <div>
                  <div className="fieldwork-label text-gray-900 mb-3">Payout Details</div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="fieldwork-secondary text-gray-600">Amount</span>
                      <span className="fieldwork-body text-gray-900">${selectedRespondent.amount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="fieldwork-secondary text-gray-600">Channel</span>
                      <Badge variant="outline" className={
                        selectedRespondent.channel === 'Meta' ? 'border-blue-300 text-blue-600' : 'border-green-300 text-green-600'
                      }>
                        {selectedRespondent.channel}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="fieldwork-secondary text-gray-600">Status</span>
                      <Badge variant="outline" className="border-green-300 text-green-600">
                        {selectedRespondent.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Activity Timeline */}
                {selectedRespondent.activity && (
                  <div>
                    <div className="fieldwork-label text-gray-900 mb-3">Activity Timeline</div>
                    <div className="space-y-4">
                      {selectedRespondent.activity.map((item, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div className="fieldwork-body text-gray-900">{item.event}</div>
                              <div className="fieldwork-secondary text-gray-500">{item.time}</div>
                            </div>
                            <div className="fieldwork-secondary text-gray-600 mt-1">{item.details}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                {payoutsTab === 'outstanding' && (
                  <div className="pt-4 border-t border-gray-200">
                    <Button className="w-full">
                      <Send className="h-4 w-4 mr-2" />
                      Send Payout
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-6 space-y-8">
      {/* Page Header */}
      <div className="max-w-4xl">
        <h2 className="fieldwork-h2 text-gray-900 mb-2">Admin Screens</h2>
        <p className="fieldwork-body text-gray-600">
          Desktop administration interfaces with proper layout constraints and navigation patterns.
        </p>
      </div>

      <Tabs defaultValue="ad-launcher" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="ad-launcher">Ad Launcher Dashboard</TabsTrigger>
          <TabsTrigger value="wizard">Wizard - Step 1 Basics</TabsTrigger>
          <TabsTrigger value="wizard-step2">Wizard - Step 2 Audience & Geo</TabsTrigger>
          <TabsTrigger value="wizard-step3">Wizard - Step 3 Screener</TabsTrigger>
          <TabsTrigger value="wizard-step4">Wizard - Step 4 Consent</TabsTrigger>
          <TabsTrigger value="wizard-step5">Wizard - Step 5 Quotas</TabsTrigger>
          <TabsTrigger value="wizard-step6">Wizard - Step 6 Incentives</TabsTrigger>
          <TabsTrigger value="wizard-step7">Wizard - Step 7 Channels</TabsTrigger>
          <TabsTrigger value="wizard-step7b">Wizard - Step 7b Keywords</TabsTrigger>
          <TabsTrigger value="wizard-step8">Wizard - Step 8 Launch</TabsTrigger>
          <TabsTrigger value="campaign-live">Campaign Detail - Live</TabsTrigger>
          <TabsTrigger value="payouts">Payouts Queue</TabsTrigger>
          <TabsTrigger value="settings">Settings - Ad Accounts</TabsTrigger>
          <TabsTrigger value="legacy">Legacy Dashboard</TabsTrigger>
          <TabsTrigger value="users">Users Management</TabsTrigger>
        </TabsList>

        <TabsContent value="ad-launcher" className="m-0">
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <AdLauncherDashboard />
          </div>
        </TabsContent>

        <TabsContent value="wizard" className="m-0">
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <WizardStepBasics />
          </div>
        </TabsContent>

        <TabsContent value="wizard-step2" className="m-0">
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <WizardStepAudienceGeo />
          </div>
        </TabsContent>

        <TabsContent value="wizard-step3" className="m-0">
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <WizardStepScreener />
          </div>
        </TabsContent>

        <TabsContent value="wizard-step4" className="m-0">
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <WizardStepConsent />
          </div>
        </TabsContent>

        <TabsContent value="wizard-step5" className="m-0">
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <WizardStepQuotas />
          </div>
        </TabsContent>

        <TabsContent value="wizard-step6" className="m-0">
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <WizardStepIncentives />
          </div>
        </TabsContent>

        <TabsContent value="wizard-step7" className="m-0">
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <WizardStepChannelsBudget />
          </div>
        </TabsContent>

        <TabsContent value="wizard-step7b" className="m-0">
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <WizardStepGoogleKeywords />
          </div>
        </TabsContent>

        <TabsContent value="wizard-step8" className="m-0">
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <WizardStepReviewLaunch />
          </div>
        </TabsContent>

        <TabsContent value="campaign-live" className="m-0">
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <CampaignDetailLive />
          </div>
        </TabsContent>

        <TabsContent value="payouts" className="m-0">
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <PayoutsQueue />
          </div>
        </TabsContent>

        <TabsContent value="settings" className="m-0">
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <SettingsAdAccounts />
          </div>
        </TabsContent>

        <TabsContent value="legacy">
          <div className="min-h-screen bg-gray-50">
            <div className="w-full max-w-[1440px] mx-auto bg-white">
              <div className="border-b border-gray-200 bg-white">
                <div className="max-w-[1200px] mx-auto px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-8">
                      <div className="fieldwork-title text-gray-900">Fieldwork Admin</div>
                      <nav className="flex items-center space-x-6">
                        <a href="#" className="fieldwork-body text-gray-600 hover:text-gray-900">Dashboard</a>
                        <a href="#" className="fieldwork-body text-gray-600 hover:text-gray-900">Surveys</a>
                        <a href="#" className="fieldwork-body text-gray-600 hover:text-gray-900">Analytics</a>
                        <a href="#" className="fieldwork-body text-gray-600 hover:text-gray-900">Users</a>
                      </nav>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Button variant="ghost" size="sm">
                        <Bell className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="fieldwork-caption text-white">JD</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="max-w-[1200px] mx-auto px-6 py-8">
                <Dashboard />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="users">
          <div className="min-h-screen bg-gray-50">
            <div className="w-full max-w-[1440px] mx-auto bg-white">
              <div className="max-w-[1200px] mx-auto px-6 py-8">
                <UsersManagement />
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}