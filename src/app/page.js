'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Heart, Star, Moon, Sun, Calendar, Users, TrendingUp, Home, DollarSign, Baby, Briefcase } from 'lucide-react';
import data from '../../data/data.json';
import AIChatbot from '../components/AIChatbot';

export default function AstrologicalReport() {
  const [activeSection, setActiveSection] = useState('overview');

  const compatibilityColors = {
    90: 'bg-gradient-to-r from-pink-500 to-rose-500',
    80: 'bg-gradient-to-r from-purple-500 to-pink-500',
    70: 'bg-gradient-to-r from-indigo-500 to-purple-500',
    60: 'bg-gradient-to-r from-blue-500 to-indigo-500',
  };

  const getColorForScore = (score) => {
    if (score >= 90) return compatibilityColors[90];
    if (score >= 80) return compatibilityColors[80];
    if (score >= 70) return compatibilityColors[70];
    return compatibilityColors[60];
  };

  const formatScore = (score) => `${score}%`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-rose-50">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-pink-500 via-purple-600 to-rose-500 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container mx-auto px-4 py-16 text-center">
          <div className="flex justify-center mb-6">
            <Heart className="h-16 w-16 text-pink-200 animate-pulse" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-pink-200 to-rose-200 bg-clip-text text-transparent">
            {data.reportTitle}
          </h1>
          <p className="text-xl md:text-2xl text-pink-100 max-w-3xl mx-auto leading-relaxed">
            {data.executiveSummary}
          </p>
          <div className="flex justify-center items-center mt-8 space-x-8">
            <div className="text-center">
              <div className="text-3xl font-bold">{data.basicInfo.person1.name}</div>
              <div className="text-pink-200">{data.basicInfo.person1.birthDate}</div>
            </div>
            <Heart className="h-8 w-8 text-pink-200" />
            <div className="text-center">
              <div className="text-3xl font-bold">{data.basicInfo.person2.name}</div>
              <div className="text-pink-200">{data.basicInfo.person2.birthDate}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-2 h-auto p-2 bg-white/70 backdrop-blur-sm rounded-xl">
            <TabsTrigger value="overview" className="flex flex-col items-center p-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-rose-500 data-[state=active]:text-white">
              <Heart className="h-4 w-4 mb-1" />
              <span className="text-xs">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="individual" className="flex flex-col items-center p-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-rose-500 data-[state=active]:text-white">
              <Users className="h-4 w-4 mb-1" />
              <span className="text-xs">Individual</span>
            </TabsTrigger>
            <TabsTrigger value="synastry" className="flex flex-col items-center p-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-rose-500 data-[state=active]:text-white">
              <Star className="h-4 w-4 mb-1" />
              <span className="text-xs">Synastry</span>
            </TabsTrigger>
            <TabsTrigger value="intimacy" className="flex flex-col items-center p-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-rose-500 data-[state=active]:text-white">
              <Moon className="h-4 w-4 mb-1" />
              <span className="text-xs">Intimacy</span>
            </TabsTrigger>
            <TabsTrigger value="lifestyle" className="flex flex-col items-center p-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-rose-500 data-[state=active]:text-white">
              <Home className="h-4 w-4 mb-1" />
              <span className="text-xs">Lifestyle</span>
            </TabsTrigger>
            <TabsTrigger value="career" className="flex flex-col items-center p-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-rose-500 data-[state=active]:text-white">
              <Briefcase className="h-4 w-4 mb-1" />
              <span className="text-xs">Career</span>
            </TabsTrigger>
            <TabsTrigger value="forecast" className="flex flex-col items-center p-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-rose-500 data-[state=active]:text-white">
              <TrendingUp className="h-4 w-4 mb-1" />
              <span className="text-xs">Forecast</span>
            </TabsTrigger>
            <TabsTrigger value="conclusion" className="flex flex-col items-center p-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-rose-500 data-[state=active]:text-white">
              <Sun className="h-4 w-4 mb-1" />
              <span className="text-xs">Summary</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Compatibility Scores */}
              <Card className="bg-white/80 backdrop-blur-sm border-pink-200 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl text-purple-800">
                    <Heart className="mr-2 h-6 w-6 text-pink-500" />
                    Compatibility Scores
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(data.compatibilityScores).map(([key, score]) => (
                    key !== 'overall' && (
                      <div key={key} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700 capitalize font-medium">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                          <span className="text-purple-700 font-bold">{formatScore(score)}</span>
                        </div>
                        <Progress 
                          value={score} 
                          className="h-3 bg-gray-200"
                          style={{
                            background: `linear-gradient(to right, ${score >= 90 ? '#ec4899' : score >= 80 ? '#a855f7' : score >= 70 ? '#6366f1' : '#3b82f6'} 0%, ${score >= 90 ? '#f43f5e' : score >= 80 ? '#ec4899' : score >= 70 ? '#a855f7' : '#6366f1'} 100%)`
                          }}
                        />
                      </div>
                    )
                  ))}
                </CardContent>
              </Card>

              {/* Overall Compatibility */}
              <Card className="bg-gradient-to-br from-pink-500 to-purple-600 text-white shadow-xl">
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl">Overall Compatibility</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-8xl font-bold mb-4">{data.compatibilityScores.overall}</div>
                  <div className="text-2xl mb-4">Exceptional Match</div>
                  <div className="text-pink-100 text-lg">
                    Your relationship has extraordinary potential for both individual growth and lasting partnership.
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Basic Info */}
            <Card className="mt-6 bg-white/80 backdrop-blur-sm border-pink-200 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-purple-800">Birth Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="text-center p-6 bg-gradient-to-r from-pink-100 to-rose-100 rounded-xl">
                    <h3 className="text-2xl font-bold text-purple-800 mb-2">{data.basicInfo.person1.name}</h3>
                    <p className="text-gray-700"><Calendar className="inline h-4 w-4 mr-1" />{data.basicInfo.person1.birthDate}</p>
                    <p className="text-gray-700">{data.basicInfo.person1.birthTime} - {data.basicInfo.person1.location}</p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl">
                    <h3 className="text-2xl font-bold text-purple-800 mb-2">{data.basicInfo.person2.name}</h3>
                    <p className="text-gray-700"><Calendar className="inline h-4 w-4 mr-1" />{data.basicInfo.person2.birthDate}</p>
                    <p className="text-gray-700">{data.basicInfo.person2.birthTime} - {data.basicInfo.person2.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Individual Analysis Tab */}
          <TabsContent value="individual" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Hunç's Analysis */}
              <Card className="bg-white/80 backdrop-blur-sm border-pink-200 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl text-purple-800">{data.individualAnalysis.hunc.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {Object.entries(data.individualAnalysis.hunc.planetaryPositions).map(([planet, info]) => (
                      <div key={planet} className="p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold text-purple-800 capitalize">{planet}</span>
                          <span className="text-gray-600">{info.sign}</span>
                        </div>
                        <p className="text-sm text-gray-700">{info.description}</p>
                      </div>
                    ))}
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-semibold text-purple-800 mb-2">Key Characteristics</h4>
                    <p className="text-gray-700 leading-relaxed">{data.individualAnalysis.hunc.keyCharacteristics}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Seren's Analysis */}
              <Card className="bg-white/80 backdrop-blur-sm border-pink-200 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl text-purple-800">{data.individualAnalysis.seren.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {Object.entries(data.individualAnalysis.seren.planetaryPositions).map(([planet, info]) => (
                      <div key={planet} className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold text-purple-800 capitalize">{planet}</span>
                          <span className="text-gray-600">{info.sign}</span>
                        </div>
                        <p className="text-sm text-gray-700">{info.description}</p>
                      </div>
                    ))}
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-semibold text-purple-800 mb-2">Key Characteristics</h4>
                    <p className="text-gray-700 leading-relaxed">{data.individualAnalysis.seren.keyCharacteristics}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Synastry Tab */}
          <TabsContent value="synastry" className="mt-8">
            <div className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm border-pink-200 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl text-purple-800">{data.synastryAnalysis.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg">
                      <h4 className="font-semibold text-purple-800 mb-2">Sun-Moon Connections</h4>
                      <div className="space-y-3">
                        <div>
                          <p className="font-medium text-gray-800">{data.synastryAnalysis.sunMoonConnections.huncSunSerenMoon.aspect}</p>
                          <p className="text-sm text-gray-700">{data.synastryAnalysis.sunMoonConnections.huncSunSerenMoon.analysis}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{data.synastryAnalysis.sunMoonConnections.serenSunHuncMoon.aspect}</p>
                          <p className="text-sm text-gray-700">{data.synastryAnalysis.sunMoonConnections.serenSunHuncMoon.analysis}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                      <h4 className="font-semibold text-purple-800 mb-2">Ascendant Harmony</h4>
                      <div className="text-center">
                        <div className="text-4xl font-bold text-purple-600 mb-2">{data.synastryAnalysis.ascendantHarmony.compatibility}%</div>
                        <p className="text-sm text-gray-700">{data.synastryAnalysis.ascendantHarmony.analysis}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-pink-200 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl text-purple-800">Composite Chart</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700">{data.compositeChart.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg text-center">
                      <Sun className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                      <h4 className="font-semibold text-purple-800">Composite Sun</h4>
                      <p className="text-sm text-gray-600">{data.compositeChart.compositeSun.position}</p>
                      <p className="text-xs text-gray-700 mt-1">{data.compositeChart.compositeSun.meaning}</p>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg text-center">
                      <Moon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <h4 className="font-semibold text-purple-800">Composite Moon</h4>
                      <p className="text-sm text-gray-600">{data.compositeChart.compositeMoon.position}</p>
                      <p className="text-xs text-gray-700 mt-1">{data.compositeChart.compositeMoon.meaning}</p>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-lg text-center">
                      <Heart className="h-8 w-8 text-pink-500 mx-auto mb-2" />
                      <h4 className="font-semibold text-purple-800">Composite Venus</h4>
                      <p className="text-sm text-gray-600">{data.compositeChart.compositeVenus.position}</p>
                      <p className="text-xs text-gray-700 mt-1">{data.compositeChart.compositeVenus.meaning}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Intimacy Tab */}
          <TabsContent value="intimacy" className="mt-8">
            <div className="space-y-6">
              <Card className="bg-gradient-to-br from-pink-500 to-purple-600 text-white shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <Heart className="mr-2 h-6 w-6" />
                    {data.intimateCompatibility.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-white/20 rounded-lg">
                      <div className="text-3xl font-bold mb-2">{data.compatibilityScores.intimacy}%</div>
                      <div className="text-pink-100">Intimacy Score</div>
                    </div>
                    <div className="text-center p-4 bg-white/20 rounded-lg">
                      <div className="text-3xl font-bold mb-2">{data.compatibilityScores.physical}%</div>
                      <div className="text-pink-100">Physical Connection</div>
                    </div>
                    <div className="text-center p-4 bg-white/20 rounded-lg">
                      <div className="text-3xl font-bold mb-2">{data.compatibilityScores.emotional}%</div>
                      <div className="text-pink-100">Emotional Bond</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-white/80 backdrop-blur-sm border-pink-200 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-xl text-purple-800">Passionate Foundation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">{data.intimateCompatibility.passionateFoundation}</p>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm border-pink-200 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-xl text-purple-800">Complementary Styles</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">{data.intimateCompatibility.complementaryStyles}</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-white/80 backdrop-blur-sm border-pink-200 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-xl text-purple-800">Love Languages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg">
                      <h4 className="font-semibold text-purple-800 mb-2">{data.basicInfo.person1.name}'s Love Language</h4>
                      <p className="text-gray-700 mb-2"><strong>Primary:</strong> {data.loveLanguagesCommunication.huncLoveLanguage.primary}</p>
                      <p className="text-gray-700"><strong>Secondary:</strong> {data.loveLanguagesCommunication.huncLoveLanguage.secondary}</p>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                      <h4 className="font-semibold text-purple-800 mb-2">{data.basicInfo.person2.name}'s Love Language</h4>
                      <p className="text-gray-700 mb-2"><strong>Primary:</strong> {data.loveLanguagesCommunication.serenLoveLanguage.primary}</p>
                      <p className="text-gray-700"><strong>Secondary:</strong> {data.loveLanguagesCommunication.serenLoveLanguage.secondary}</p>
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">Compatibility</h4>
                    <p className="text-gray-700">{data.loveLanguagesCommunication.compatibility}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Lifestyle Tab */}
          <TabsContent value="lifestyle" className="mt-8">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-white/80 backdrop-blur-sm border-pink-200 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-xl text-purple-800 flex items-center">
                      <DollarSign className="mr-2 h-5 w-5" />
                      Financial Compatibility
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600 mb-2">{data.compatibilityScores.financial}%</div>
                      <p className="text-gray-600">Financial Harmony</p>
                    </div>
                    <div className="space-y-3">
                      <div className="p-3 bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg">
                        <h4 className="font-semibold text-purple-800 mb-1">{data.basicInfo.person1.name}'s Approach</h4>
                        <p className="text-sm text-gray-700">{data.financialCompatibility.huncApproach}</p>
                      </div>
                      <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                        <h4 className="font-semibold text-purple-800 mb-1">{data.basicInfo.person2.name}'s Approach</h4>
                        <p className="text-sm text-gray-700">{data.financialCompatibility.serenApproach}</p>
                      </div>
                      <div className="p-3 bg-gradient-to-r from-rose-50 to-pink-50 rounded-lg">
                        <h4 className="font-semibold text-purple-800 mb-1">Combined Strength</h4>
                        <p className="text-sm text-gray-700">{data.financialCompatibility.combinedStrength}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm border-pink-200 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-xl text-purple-800 flex items-center">
                      <Home className="mr-2 h-5 w-5" />
                      Home & Family Life
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600 mb-2">{data.compatibilityScores.domestic}%</div>
                      <p className="text-gray-600">Domestic Harmony</p>
                    </div>
                    <div className="space-y-3">
                      <div className="p-3 bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg">
                        <h4 className="font-semibold text-purple-800 mb-1">Domestic Harmony</h4>
                        <p className="text-sm text-gray-700">{data.familyHomeLife.domesticHarmony}</p>
                      </div>
                      <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                        <h4 className="font-semibold text-purple-800 mb-1">Parenting Potential</h4>
                        <p className="text-sm text-gray-700">{data.familyHomeLife.parentingPotential}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Career Tab */}
          <TabsContent value="career" className="mt-8">
            <Card className="bg-white/80 backdrop-blur-sm border-pink-200 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-purple-800 flex items-center">
                  <Briefcase className="mr-2 h-6 w-6" />
                  {data.careerCompatibility.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-600 mb-2">{data.compatibilityScores.career}%</div>
                  <p className="text-gray-600">Career Compatibility</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">{data.basicInfo.person1.name}'s Career Path</h4>
                    <p className="text-gray-700">{data.careerCompatibility.huncCareerPath}</p>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">{data.basicInfo.person2.name}'s Career Path</h4>
                    <p className="text-gray-700">{data.careerCompatibility.serenCareerPath}</p>
                  </div>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">Mutual Support</h4>
                  <p className="text-gray-700">{data.careerCompatibility.mutualSupport}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Forecast Tab */}
          <TabsContent value="forecast" className="mt-8">
            <Card className="bg-white/80 backdrop-blur-sm border-pink-200 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-purple-800 flex items-center">
                  <TrendingUp className="mr-2 h-6 w-6" />
                  {data.longTermForecast.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {data.longTermForecast.phases.map((phase, index) => (
                    <div key={index} className="p-6 bg-gradient-to-r from-pink-50 via-purple-50 to-rose-50 rounded-xl border border-pink-200">
                      <h4 className="text-xl font-semibold text-purple-800 mb-3 flex items-center">
                        <Calendar className="mr-2 h-5 w-5" />
                        {phase.period}
                      </h4>
                      <p className="text-gray-700 leading-relaxed">{phase.focus}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6 bg-white/80 backdrop-blur-sm border-pink-200 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl text-purple-800">Challenges & Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-purple-800 mb-3">Challenges</h4>
                    <div className="space-y-3">
                      {data.challengesGrowth.challenges.map((challenge, index) => (
                        <div key={index} className="p-3 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium text-gray-800">{challenge.name}</span>
                            <span className="text-sm text-gray-600">{challenge.level}%</span>
                          </div>
                          <Progress value={challenge.level} className="mb-2 h-2" />
                          <p className="text-sm text-gray-700">{challenge.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-purple-800 mb-3">Growth Opportunities</h4>
                    <div className="space-y-3">
                      {data.challengesGrowth.growthOpportunities.map((opportunity, index) => (
                        <div key={index} className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                          <h5 className="font-medium text-gray-800 mb-1">{opportunity.area}</h5>
                          <p className="text-sm text-gray-700">{opportunity.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Conclusion Tab */}
          <TabsContent value="conclusion" className="mt-8">
            <div className="space-y-6">
              <Card className="bg-gradient-to-br from-pink-500 to-purple-600 text-white shadow-xl">
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl flex items-center justify-center">
                    <Heart className="mr-2 h-8 w-8" />
                    {data.conclusion.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-xl text-pink-100 leading-relaxed">
                    {data.conclusion.finalWisdom}
                  </p>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-white/80 backdrop-blur-sm border-pink-200 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-xl text-purple-800">Key Strengths</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {data.conclusion.keyStrengths.map((strength, index) => (
                        <li key={index} className="flex items-start">
                          <Heart className="h-4 w-4 text-pink-500 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm border-pink-200 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-xl text-purple-800">Success Strategies</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {data.conclusion.successStrategies.map((strategy, index) => (
                        <div key={index} className="p-3 bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg">
                          <h5 className="font-semibold text-purple-800 mb-1">{strategy.strategy}</h5>
                          <p className="text-sm text-gray-700">{strategy.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

             {/* Footer */}
       <div className="bg-gradient-to-r from-pink-500 via-purple-600 to-rose-500 text-white py-8 mt-12">
         <div className="container mx-auto px-4 text-center">
           <Heart className="h-8 w-8 text-pink-200 mx-auto mb-4 animate-pulse" />
           <p className="text-pink-100">
             Created with love for Hunç & Seren's cosmic journey together ✨
           </p>
         </div>
       </div>
       
       {/* AI Chatbot */}
       <AIChatbot />
    </div>
  );
}
