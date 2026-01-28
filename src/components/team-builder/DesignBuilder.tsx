import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Upload, Save, Share2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTeamBuilder } from "@/context/TeamBuilderContext";
import { patternOptions, fontOptions, logoPlacementOptions } from "@/data/teamBuilderData";

const colorPresets = [
  { primary: '#000000', secondary: '#FFFFFF', accent: '#808080', name: 'Classic' },
  { primary: '#1E3A8A', secondary: '#FFFFFF', accent: '#FBBF24', name: 'Navy Gold' },
  { primary: '#DC2626', secondary: '#000000', accent: '#FFFFFF', name: 'Red Black' },
  { primary: '#059669', secondary: '#FFFFFF', accent: '#000000', name: 'Forest' },
  { primary: '#7C3AED', secondary: '#FFFFFF', accent: '#F59E0B', name: 'Purple' },
  { primary: '#F97316', secondary: '#000000', accent: '#FFFFFF', name: 'Orange' },
];

export function DesignBuilder() {
  const { state, dispatch, nextStep, prevStep } = useTeamBuilder();
  const { designConfig, product } = state;
  const [previewSide, setPreviewSide] = useState<'front' | 'back'>('front');

  if (!product) return null;

  const updateDesign = (updates: Partial<typeof designConfig>) => {
    dispatch({ type: 'SET_DESIGN_CONFIG', config: updates });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newLogo = {
          id: Date.now().toString(),
          placement: 'left_chest',
          url: reader.result as string,
          size: 50,
        };
        updateDesign({
          logos: [...designConfig.logos, newLogo],
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={prevStep} className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Design Builder</h2>
            <p className="text-muted-foreground">Customize your team's look</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Save className="w-4 h-4" /> Save
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Share2 className="w-4 h-4" /> Share
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Preview Panel */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:sticky lg:top-24"
        >
          <div 
            className="aspect-square rounded-2xl overflow-hidden relative"
            style={{
              background: `linear-gradient(135deg, ${designConfig.primaryColor} 0%, ${designConfig.secondaryColor} 100%)`,
            }}
          >
            {/* Mock Jersey Preview */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-64 h-80 flex flex-col items-center justify-center">
                {/* Jersey Shape */}
                <svg viewBox="0 0 200 240" className="w-full h-full">
                  <path
                    d="M40 40 L60 20 L100 30 L140 20 L160 40 L180 80 L160 90 L160 220 L40 220 L40 90 L20 80 Z"
                    fill={designConfig.primaryColor}
                    stroke={designConfig.accentColor}
                    strokeWidth="3"
                  />
                  {/* Collar */}
                  <path
                    d="M80 30 L100 35 L120 30"
                    fill="none"
                    stroke={designConfig.secondaryColor}
                    strokeWidth="4"
                  />
                  {/* Pattern overlay */}
                  {designConfig.pattern === 'stripes' && (
                    <>
                      <line x1="70" y1="40" x2="70" y2="220" stroke={designConfig.secondaryColor} strokeWidth="8" opacity="0.5" />
                      <line x1="130" y1="40" x2="130" y2="220" stroke={designConfig.secondaryColor} strokeWidth="8" opacity="0.5" />
                    </>
                  )}
                </svg>
                
                {/* Team Name */}
                {designConfig.teamName && previewSide === 'front' && (
                  <div 
                    className="absolute top-1/3 left-1/2 -translate-x-1/2 text-center"
                    style={{ color: designConfig.teamNameColor }}
                  >
                    <span className="text-lg font-bold uppercase tracking-wider">
                      {designConfig.teamName}
                    </span>
                  </div>
                )}

                {/* Number */}
                {((previewSide === 'front' && designConfig.frontNumber) || 
                  (previewSide === 'back' && designConfig.backNumber)) && (
                  <div 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4"
                    style={{ color: designConfig.secondaryColor }}
                  >
                    <span 
                      className={`font-bold ${
                        designConfig.numberSize === 'small' ? 'text-4xl' :
                        designConfig.numberSize === 'medium' ? 'text-6xl' : 'text-8xl'
                      }`}
                      style={{
                        WebkitTextStroke: designConfig.numberOutline ? `2px ${designConfig.accentColor}` : 'none',
                      }}
                    >
                      23
                    </span>
                  </div>
                )}

                {/* Player Name (back only) */}
                {previewSide === 'back' && (
                  <div 
                    className="absolute top-1/4 left-1/2 -translate-x-1/2"
                    style={{ color: designConfig.secondaryColor }}
                  >
                    <span className={`font-bold text-lg ${designConfig.playerNameUppercase ? 'uppercase' : ''}`}>
                      PLAYER
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* View Toggle */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              <Button
                size="sm"
                variant={previewSide === 'front' ? 'default' : 'outline'}
                onClick={() => setPreviewSide('front')}
              >
                Front
              </Button>
              <Button
                size="sm"
                variant={previewSide === 'back' ? 'default' : 'outline'}
                onClick={() => setPreviewSide('back')}
              >
                Back
              </Button>
              <Button size="sm" variant="outline" className="gap-1">
                <RotateCcw className="w-3 h-3" /> 3D
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Design Controls */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Tabs defaultValue="colors" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-6">
              <TabsTrigger value="colors">Colors</TabsTrigger>
              <TabsTrigger value="logos">Logos</TabsTrigger>
              <TabsTrigger value="text">Text</TabsTrigger>
              <TabsTrigger value="numbers">Numbers</TabsTrigger>
              <TabsTrigger value="names">Names</TabsTrigger>
            </TabsList>

            {/* Colors Tab */}
            <TabsContent value="colors" className="space-y-6">
              <div>
                <Label className="text-sm font-semibold mb-3 block">Color Presets</Label>
                <div className="grid grid-cols-3 gap-3">
                  {colorPresets.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => updateDesign({
                        primaryColor: preset.primary,
                        secondaryColor: preset.secondary,
                        accentColor: preset.accent,
                      })}
                      className="p-3 rounded-xl border-2 border-border hover:border-foreground transition-all"
                    >
                      <div className="flex gap-1 mb-2">
                        <div className="w-6 h-6 rounded-full" style={{ background: preset.primary }} />
                        <div className="w-6 h-6 rounded-full" style={{ background: preset.secondary }} />
                        <div className="w-6 h-6 rounded-full" style={{ background: preset.accent }} />
                      </div>
                      <span className="text-xs">{preset.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm mb-2 block">Primary</Label>
                  <input
                    type="color"
                    value={designConfig.primaryColor}
                    onChange={(e) => updateDesign({ primaryColor: e.target.value })}
                    className="w-full h-12 rounded-lg cursor-pointer"
                  />
                </div>
                <div>
                  <Label className="text-sm mb-2 block">Secondary</Label>
                  <input
                    type="color"
                    value={designConfig.secondaryColor}
                    onChange={(e) => updateDesign({ secondaryColor: e.target.value })}
                    className="w-full h-12 rounded-lg cursor-pointer"
                  />
                </div>
                <div>
                  <Label className="text-sm mb-2 block">Accent</Label>
                  <input
                    type="color"
                    value={designConfig.accentColor}
                    onChange={(e) => updateDesign({ accentColor: e.target.value })}
                    className="w-full h-12 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm font-semibold mb-3 block">Pattern</Label>
                <RadioGroup
                  value={designConfig.pattern}
                  onValueChange={(value) => updateDesign({ pattern: value })}
                  className="flex flex-wrap gap-3"
                >
                  {patternOptions.map((pattern) => (
                    <div key={pattern.id} className="flex items-center">
                      <RadioGroupItem value={pattern.id} id={pattern.id} className="sr-only peer" />
                      <Label
                        htmlFor={pattern.id}
                        className="px-4 py-2 rounded-full border-2 border-border cursor-pointer transition-all peer-data-[state=checked]:border-foreground peer-data-[state=checked]:bg-foreground peer-data-[state=checked]:text-background"
                      >
                        {pattern.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </TabsContent>

            {/* Logos Tab */}
            <TabsContent value="logos" className="space-y-6">
              <div className="border-2 border-dashed border-border rounded-xl p-8 text-center">
                <Upload className="w-10 h-10 mx-auto mb-4 text-muted-foreground" />
                <p className="font-medium mb-2">Upload Logo</p>
                <p className="text-sm text-muted-foreground mb-4">PNG, SVG, or PDF up to 10MB</p>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="logo-upload"
                />
                <Button asChild variant="outline">
                  <label htmlFor="logo-upload" className="cursor-pointer">Choose File</label>
                </Button>
              </div>

              {designConfig.logos.length > 0 && (
                <div className="space-y-3">
                  <Label className="text-sm font-semibold">Uploaded Logos</Label>
                  {designConfig.logos.map((logo) => (
                    <div key={logo.id} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <img src={logo.url} alt="Logo" className="w-12 h-12 object-contain rounded" />
                      <select
                        value={logo.placement}
                        onChange={(e) => {
                          const updatedLogos = designConfig.logos.map(l =>
                            l.id === logo.id ? { ...l, placement: e.target.value } : l
                          );
                          updateDesign({ logos: updatedLogos });
                        }}
                        className="flex-1 p-2 rounded border bg-background"
                      >
                        {logoPlacementOptions.map((opt) => (
                          <option key={opt.id} value={opt.id}>{opt.label}</option>
                        ))}
                      </select>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          updateDesign({
                            logos: designConfig.logos.filter(l => l.id !== logo.id),
                          });
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Text Tab */}
            <TabsContent value="text" className="space-y-6">
              <div>
                <Label className="text-sm mb-2 block">Team Name</Label>
                <Input
                  value={designConfig.teamName}
                  onChange={(e) => updateDesign({ teamName: e.target.value })}
                  placeholder="Enter team name"
                  className="text-lg"
                />
              </div>

              <div>
                <Label className="text-sm font-semibold mb-3 block">Font Style</Label>
                <RadioGroup
                  value={designConfig.teamNameFont}
                  onValueChange={(value) => updateDesign({ teamNameFont: value })}
                  className="grid grid-cols-2 gap-3"
                >
                  {fontOptions.map((font) => (
                    <div key={font.id} className="flex items-center">
                      <RadioGroupItem value={font.id} id={`font-${font.id}`} className="sr-only peer" />
                      <Label
                        htmlFor={`font-${font.id}`}
                        className="w-full p-3 rounded-xl border-2 border-border cursor-pointer transition-all peer-data-[state=checked]:border-foreground peer-data-[state=checked]:bg-foreground/5 text-center"
                      >
                        {font.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div>
                <Label className="text-sm mb-2 block">Text Color</Label>
                <input
                  type="color"
                  value={designConfig.teamNameColor}
                  onChange={(e) => updateDesign({ teamNameColor: e.target.value })}
                  className="w-full h-12 rounded-lg cursor-pointer"
                />
              </div>
            </TabsContent>

            {/* Numbers Tab */}
            <TabsContent value="numbers" className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
                <div>
                  <Label className="font-medium">Front Number</Label>
                  <p className="text-sm text-muted-foreground">Display number on front</p>
                </div>
                <Switch
                  checked={designConfig.frontNumber}
                  onCheckedChange={(checked) => updateDesign({ frontNumber: checked })}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
                <div>
                  <Label className="font-medium">Back Number</Label>
                  <p className="text-sm text-muted-foreground">Display number on back</p>
                </div>
                <Switch
                  checked={designConfig.backNumber}
                  onCheckedChange={(checked) => updateDesign({ backNumber: checked })}
                />
              </div>

              <div>
                <Label className="text-sm font-semibold mb-3 block">Number Size</Label>
                <RadioGroup
                  value={designConfig.numberSize}
                  onValueChange={(value) => updateDesign({ numberSize: value as 'small' | 'medium' | 'large' })}
                  className="flex gap-3"
                >
                  {['small', 'medium', 'large'].map((size) => (
                    <div key={size} className="flex items-center">
                      <RadioGroupItem value={size} id={`size-${size}`} className="sr-only peer" />
                      <Label
                        htmlFor={`size-${size}`}
                        className="px-6 py-3 rounded-xl border-2 border-border cursor-pointer transition-all peer-data-[state=checked]:border-foreground peer-data-[state=checked]:bg-foreground peer-data-[state=checked]:text-background capitalize"
                      >
                        {size}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
                <div>
                  <Label className="font-medium">Number Outline</Label>
                  <p className="text-sm text-muted-foreground">Add outline to numbers</p>
                </div>
                <Switch
                  checked={designConfig.numberOutline}
                  onCheckedChange={(checked) => updateDesign({ numberOutline: checked })}
                />
              </div>
            </TabsContent>

            {/* Names Tab */}
            <TabsContent value="names" className="space-y-6">
              <div>
                <Label className="text-sm font-semibold mb-3 block">Name Font</Label>
                <RadioGroup
                  value={designConfig.playerNameFont}
                  onValueChange={(value) => updateDesign({ playerNameFont: value })}
                  className="grid grid-cols-2 gap-3"
                >
                  {fontOptions.map((font) => (
                    <div key={font.id} className="flex items-center">
                      <RadioGroupItem value={font.id} id={`name-font-${font.id}`} className="sr-only peer" />
                      <Label
                        htmlFor={`name-font-${font.id}`}
                        className="w-full p-3 rounded-xl border-2 border-border cursor-pointer transition-all peer-data-[state=checked]:border-foreground peer-data-[state=checked]:bg-foreground/5 text-center"
                      >
                        {font.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
                <div>
                  <Label className="font-medium">Uppercase Names</Label>
                  <p className="text-sm text-muted-foreground">Display names in uppercase</p>
                </div>
                <Switch
                  checked={designConfig.playerNameUppercase}
                  onCheckedChange={(checked) => updateDesign({ playerNameUppercase: checked })}
                />
              </div>
            </TabsContent>
          </Tabs>

          {/* Navigation */}
          <div className="flex justify-end pt-8">
            <Button size="lg" onClick={nextStep} className="gap-2">
              Next: Team Roster
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
