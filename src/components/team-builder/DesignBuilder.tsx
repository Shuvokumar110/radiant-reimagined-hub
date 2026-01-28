import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Upload, Check, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTeamBuilder } from "@/context/TeamBuilderContext";
import { designTemplates, templateCategories, fontOptions, logoPlacementOptions } from "@/data/teamBuilderData";

export function DesignBuilder() {
  const { state, dispatch, nextStep, prevStep } = useTeamBuilder();
  const { designConfig, product } = state;
  const [selectedCategory, setSelectedCategory] = useState('all');

  if (!product) return null;

  const updateDesign = (updates: Partial<typeof designConfig>) => {
    dispatch({ type: 'SET_DESIGN_CONFIG', config: updates });
  };

  const handleTemplateSelect = (templateId: string) => {
    const template = designTemplates.find(t => t.id === templateId);
    if (template) {
      updateDesign({
        selectedTemplateId: templateId,
        primaryColor: template.primaryColor,
        secondaryColor: template.secondaryColor,
        accentColor: template.accentColor,
        pattern: template.category,
      });
    }
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

  const filteredTemplates = selectedCategory === 'all' 
    ? designTemplates 
    : designTemplates.filter(t => t.category === selectedCategory);

  const selectedTemplate = designTemplates.find(t => t.id === designConfig.selectedTemplateId);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={prevStep} className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Choose Your Design</h2>
            <p className="text-muted-foreground">Select a template and customize details</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        {/* Template Gallery - Left Side (3 cols) */}
        <div className="lg:col-span-3 space-y-6">
          {/* Category Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 text-muted-foreground" />
            {templateCategories.map((cat) => (
              <Button
                key={cat.id}
                size="sm"
                variant={selectedCategory === cat.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(cat.id)}
                className="rounded-full"
              >
                {cat.label}
              </Button>
            ))}
          </div>

          {/* Template Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {filteredTemplates.map((template) => (
              <motion.button
                key={template.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleTemplateSelect(template.id)}
                className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                  designConfig.selectedTemplateId === template.id
                    ? 'border-foreground ring-2 ring-foreground ring-offset-2'
                    : 'border-border hover:border-muted-foreground'
                }`}
              >
                <img
                  src={template.image}
                  alt={template.name}
                  className="w-full h-full object-cover"
                />
                {designConfig.selectedTemplateId === template.id && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-foreground text-background rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4" />
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                  <p className="text-white text-sm font-medium">{template.name}</p>
                  <div className="flex gap-1 mt-1">
                    <span className="w-4 h-4 rounded-full border border-white/30" style={{ background: template.primaryColor }} />
                    <span className="w-4 h-4 rounded-full border border-white/30" style={{ background: template.secondaryColor }} />
                    <span className="w-4 h-4 rounded-full border border-white/30" style={{ background: template.accentColor }} />
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Selected Template Preview */}
          {selectedTemplate && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-muted rounded-xl p-4 flex items-center gap-4"
            >
              <img
                src={selectedTemplate.image}
                alt={selectedTemplate.name}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex-1">
                <p className="font-semibold">{selectedTemplate.name}</p>
                <p className="text-sm text-muted-foreground capitalize">{selectedTemplate.category} style</p>
                <div className="flex gap-2 mt-2">
                  <span className="text-xs px-2 py-1 bg-background rounded-full">Primary: {selectedTemplate.primaryColor}</span>
                  <span className="text-xs px-2 py-1 bg-background rounded-full">Secondary: {selectedTemplate.secondaryColor}</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Customization Panel - Right Side (2 cols) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2"
        >
          <Tabs defaultValue="logos" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="logos">Logos</TabsTrigger>
              <TabsTrigger value="text">Text</TabsTrigger>
              <TabsTrigger value="numbers">Numbers</TabsTrigger>
              <TabsTrigger value="names">Names</TabsTrigger>
            </TabsList>

            {/* Logos Tab */}
            <TabsContent value="logos" className="space-y-6">
              <div className="border-2 border-dashed border-border rounded-xl p-6 text-center">
                <Upload className="w-8 h-8 mx-auto mb-3 text-muted-foreground" />
                <p className="font-medium mb-1">Upload Logo</p>
                <p className="text-xs text-muted-foreground mb-3">PNG, SVG, or PDF up to 10MB</p>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="logo-upload"
                />
                <Button asChild variant="outline" size="sm">
                  <label htmlFor="logo-upload" className="cursor-pointer">Choose File</label>
                </Button>
              </div>

              {designConfig.logos.length > 0 && (
                <div className="space-y-3">
                  <Label className="text-sm font-semibold">Uploaded Logos</Label>
                  {designConfig.logos.map((logo) => (
                    <div key={logo.id} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <img src={logo.url} alt="Logo" className="w-10 h-10 object-contain rounded" />
                      <select
                        value={logo.placement}
                        onChange={(e) => {
                          const updatedLogos = designConfig.logos.map(l =>
                            l.id === logo.id ? { ...l, placement: e.target.value } : l
                          );
                          updateDesign({ logos: updatedLogos });
                        }}
                        className="flex-1 p-2 rounded border bg-background text-sm"
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
                        ✕
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
                />
              </div>

              <div>
                <Label className="text-sm font-semibold mb-3 block">Font Style</Label>
                <RadioGroup
                  value={designConfig.teamNameFont}
                  onValueChange={(value) => updateDesign({ teamNameFont: value })}
                  className="grid grid-cols-2 gap-2"
                >
                  {fontOptions.map((font) => (
                    <div key={font.id} className="flex items-center">
                      <RadioGroupItem value={font.id} id={`font-${font.id}`} className="sr-only peer" />
                      <Label
                        htmlFor={`font-${font.id}`}
                        className="w-full p-2 rounded-lg border-2 border-border cursor-pointer transition-all peer-data-[state=checked]:border-foreground peer-data-[state=checked]:bg-foreground/5 text-center text-sm"
                      >
                        {font.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div>
                <Label className="text-sm mb-2 block">Text Color</Label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={designConfig.teamNameColor}
                    onChange={(e) => updateDesign({ teamNameColor: e.target.value })}
                    className="w-12 h-10 rounded-lg cursor-pointer"
                  />
                  <Input
                    value={designConfig.teamNameColor}
                    onChange={(e) => updateDesign({ teamNameColor: e.target.value })}
                    className="flex-1"
                  />
                </div>
              </div>
            </TabsContent>

            {/* Numbers Tab */}
            <TabsContent value="numbers" className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <Label className="font-medium text-sm">Front Number</Label>
                  <p className="text-xs text-muted-foreground">Display on front</p>
                </div>
                <Switch
                  checked={designConfig.frontNumber}
                  onCheckedChange={(checked) => updateDesign({ frontNumber: checked })}
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <Label className="font-medium text-sm">Back Number</Label>
                  <p className="text-xs text-muted-foreground">Display on back</p>
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
                  className="flex gap-2"
                >
                  {['small', 'medium', 'large'].map((size) => (
                    <div key={size} className="flex items-center flex-1">
                      <RadioGroupItem value={size} id={`size-${size}`} className="sr-only peer" />
                      <Label
                        htmlFor={`size-${size}`}
                        className="w-full p-2 rounded-lg border-2 border-border cursor-pointer transition-all peer-data-[state=checked]:border-foreground peer-data-[state=checked]:bg-foreground peer-data-[state=checked]:text-background capitalize text-center text-sm"
                      >
                        {size}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <Label className="font-medium text-sm">Number Outline</Label>
                  <p className="text-xs text-muted-foreground">Add outline effect</p>
                </div>
                <Switch
                  checked={designConfig.numberOutline}
                  onCheckedChange={(checked) => updateDesign({ numberOutline: checked })}
                />
              </div>
            </TabsContent>

            {/* Names Tab */}
            <TabsContent value="names" className="space-y-4">
              <div>
                <Label className="text-sm font-semibold mb-3 block">Name Font</Label>
                <RadioGroup
                  value={designConfig.playerNameFont}
                  onValueChange={(value) => updateDesign({ playerNameFont: value })}
                  className="grid grid-cols-2 gap-2"
                >
                  {fontOptions.map((font) => (
                    <div key={font.id} className="flex items-center">
                      <RadioGroupItem value={font.id} id={`name-font-${font.id}`} className="sr-only peer" />
                      <Label
                        htmlFor={`name-font-${font.id}`}
                        className="w-full p-2 rounded-lg border-2 border-border cursor-pointer transition-all peer-data-[state=checked]:border-foreground peer-data-[state=checked]:bg-foreground/5 text-center text-sm"
                      >
                        {font.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <Label className="font-medium text-sm">Uppercase Names</Label>
                  <p className="text-xs text-muted-foreground">Display in uppercase</p>
                </div>
                <Switch
                  checked={designConfig.playerNameUppercase}
                  onCheckedChange={(checked) => updateDesign({ playerNameUppercase: checked })}
                />
              </div>
            </TabsContent>
          </Tabs>

          {/* Navigation */}
          <div className="flex justify-end pt-6 mt-6 border-t border-border">
            <Button 
              size="lg" 
              onClick={nextStep} 
              className="gap-2"
              disabled={!designConfig.selectedTemplateId}
            >
              Next: Team Roster
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
