import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { VariablesAndStyles } from './components/VariablesAndStyles';
import { Components } from './components/Components';
import { AdminScreens } from './components/AdminScreens';
import { RespondentMobile } from './components/RespondentMobile';
import { States } from './components/States';

export default function App() {
  const [activeTab, setActiveTab] = useState('variables');

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="fieldwork-h2 text-gray-900">Fieldwork v1</h1>
              <p className="fieldwork-secondary text-gray-500 mt-1">Design System & Component Library</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="fieldwork-secondary text-gray-600">Live System</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation & Content */}
      <div className="max-w-7xl mx-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="border-b border-gray-200 bg-gray-50">
            <TabsList className="bg-transparent h-auto p-0 w-full justify-start">
              <TabsTrigger 
                value="variables" 
                className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none border-b-2 border-transparent px-6 py-4 fieldwork-label"
              >
                00 Variables & Styles
              </TabsTrigger>
              <TabsTrigger 
                value="components"
                className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none border-b-2 border-transparent px-6 py-4 fieldwork-label"
              >
                01 Components
              </TabsTrigger>
              <TabsTrigger 
                value="admin"
                className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none border-b-2 border-transparent px-6 py-4 fieldwork-label"
              >
                02 Admin Screens
              </TabsTrigger>
              <TabsTrigger 
                value="mobile"
                className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none border-b-2 border-transparent px-6 py-4 fieldwork-label"
              >
                03 Respondent (Mobile)
              </TabsTrigger>
              <TabsTrigger 
                value="states"
                className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none border-b-2 border-transparent px-6 py-4 fieldwork-label"
              >
                04 States
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="bg-white">
            <TabsContent value="variables" className="m-0">
              <VariablesAndStyles />
            </TabsContent>
            <TabsContent value="components" className="m-0">
              <Components />
            </TabsContent>
            <TabsContent value="admin" className="m-0">
              <AdminScreens />
            </TabsContent>
            <TabsContent value="mobile" className="m-0">
              <RespondentMobile />
            </TabsContent>
            <TabsContent value="states" className="m-0">
              <States />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}