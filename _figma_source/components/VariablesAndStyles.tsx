import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

export function VariablesAndStyles() {
  const primaryColors = [
    { name: 'Primary', value: '#4F46E5', css: 'var(--fieldwork-primary)' },
    { name: 'Primary Hover', value: '#4338CA', css: 'var(--fieldwork-primary-hover)' },
    { name: 'Accent', value: '#14B8A6', css: 'var(--fieldwork-accent)' },
  ];

  const grayScale = [
    { name: 'Gray 900', value: '#0F172A', css: 'var(--fieldwork-gray-900)' },
    { name: 'Gray 800', value: '#1F2937', css: 'var(--fieldwork-gray-800)' },
    { name: 'Gray 700', value: '#374151', css: 'var(--fieldwork-gray-700)' },
    { name: 'Gray 600', value: '#4B5563', css: 'var(--fieldwork-gray-600)' },
    { name: 'Gray 500', value: '#6B7280', css: 'var(--fieldwork-gray-500)' },
    { name: 'Gray 400', value: '#9CA3AF', css: 'var(--fieldwork-gray-400)' },
    { name: 'Gray 300', value: '#D1D5DB', css: 'var(--fieldwork-gray-300)' },
    { name: 'Gray 200', value: '#E5E7EB', css: 'var(--fieldwork-gray-200)' },
    { name: 'Gray 100', value: '#F3F4F6', css: 'var(--fieldwork-gray-100)' },
    { name: 'Gray 50', value: '#F9FAFB', css: 'var(--fieldwork-gray-50)' },
  ];

  const semanticColors = [
    { name: 'Success', value: '#16A34A', css: 'var(--fieldwork-success)' },
    { name: 'Warning', value: '#D97706', css: 'var(--fieldwork-warning)' },
    { name: 'Danger', value: '#DC2626', css: 'var(--fieldwork-danger)' },
    { name: 'Info', value: '#0284C7', css: 'var(--fieldwork-info)' },
  ];

  const typographySpecs = [
    { name: 'H2', size: '24px', lineHeight: '32px', weight: '600', className: 'fieldwork-h2' },
    { name: 'H3', size: '20px', lineHeight: '28px', weight: '600', className: 'fieldwork-h3' },
    { name: 'Title', size: '18px', lineHeight: '26px', weight: '600', className: 'fieldwork-title' },
    { name: 'Body', size: '16px', lineHeight: '24px', weight: '400', className: 'fieldwork-body' },
    { name: 'Secondary', size: '14px', lineHeight: '20px', weight: '400', className: 'fieldwork-secondary' },
    { name: 'Label', size: '14px', lineHeight: '20px', weight: '500', className: 'fieldwork-label' },
    { name: 'Caption', size: '12px', lineHeight: '16px', weight: '400', className: 'fieldwork-caption' },
  ];

  const ColorSwatch = ({ name, value, css }: { name: string; value: string; css: string }) => (
    <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 bg-white">
      <div 
        className="w-12 h-12 rounded-lg border border-gray-200 flex-shrink-0"
        style={{ backgroundColor: value }}
      ></div>
      <div className="flex-1 min-w-0">
        <div className="fieldwork-label text-gray-900">{name}</div>
        <div className="fieldwork-caption text-gray-500 font-mono">{value}</div>
        <div className="fieldwork-caption text-gray-400 font-mono">{css}</div>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-8">
      {/* Page Header */}
      <div className="max-w-4xl">
        <h2 className="fieldwork-h2 text-gray-900 mb-2">Variables & Styles</h2>
        <p className="fieldwork-body text-gray-600">
          Core design tokens including color palette, typography system, and spacing guidelines for the Fieldwork v1 design system.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Color System */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="fieldwork-h3">Primary Colors</CardTitle>
              <CardDescription>Main brand colors for primary actions and accents</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {primaryColors.map((color) => (
                <ColorSwatch key={color.name} {...color} />
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="fieldwork-h3">Semantic Colors</CardTitle>
              <CardDescription>Status and feedback colors</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {semanticColors.map((color) => (
                <ColorSwatch key={color.name} {...color} />
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Gray Scale */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="fieldwork-h3">Gray Scale</CardTitle>
              <CardDescription>Neutral colors for text, borders, and backgrounds</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {grayScale.map((color) => (
                <ColorSwatch key={color.name} {...color} />
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Typography System */}
      <Card>
        <CardHeader>
          <CardTitle className="fieldwork-h3">Typography System</CardTitle>
          <CardDescription>Inter font family with defined scales and weights</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {typographySpecs.map((spec) => (
              <div key={spec.name} className="flex items-start justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <div className={spec.className} style={{ color: 'var(--fieldwork-gray-900)' }}>
                    The quick brown fox jumps over the lazy dog
                  </div>
                  <div className="fieldwork-caption text-gray-500 mt-2">
                    {spec.name} • {spec.size}/{spec.lineHeight} • Weight {spec.weight}
                  </div>
                </div>
                <div className="ml-4 text-right">
                  <div className="fieldwork-caption text-gray-400 font-mono">.{spec.className}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Layout Presets */}
      <Card>
        <CardHeader>
          <CardTitle className="fieldwork-h3">Layout Presets</CardTitle>
          <CardDescription>Standard frame sizes and content constraints</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="fieldwork-label text-gray-900 mb-2">Desktop Frame</div>
              <div className="fieldwork-body text-gray-600 mb-3">
                1440px width • Content max 1200px • 24px gutters
              </div>
              <div className="bg-gray-100 h-20 rounded border-2 border-dashed border-gray-300 flex items-center justify-center">
                <span className="fieldwork-caption text-gray-500">1440px Desktop Layout</span>
              </div>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="fieldwork-label text-gray-900 mb-2">Mobile Frame</div>
              <div className="fieldwork-body text-gray-600 mb-3">
                375px width • 16px padding
              </div>
              <div className="bg-gray-100 h-20 rounded border-2 border-dashed border-gray-300 flex items-center justify-center max-w-sm">
                <span className="fieldwork-caption text-gray-500">375px Mobile Layout</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}