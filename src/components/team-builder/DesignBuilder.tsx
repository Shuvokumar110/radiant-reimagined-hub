import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Upload, Check, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTeamBuilder } from "@/context/TeamBuilderContext";
import { designTemplates, templateCategories, fontOptions, logoPlacementOptions } from "@/data/teamBuilderData";
import { useIsMobile } from "@/hooks/use-mobile";

export function DesignBuilder() {
  const { state, dispatch, nextStep, prevStep } = useTeamBuilder();
  const { designConfig, product } = state;
  const [selectedCategory, setSelectedCategory] = useState('all');
  const isMobile = useIsMobile();

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
      <div className="flex items-center gap-3 mb-4 md:mb-6">
        <Button variant="ghost" size="icon" onClick={prevStep} className="rounded-full shrink-0">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h2 className="text-xl md:text-2xl font-bold">Choose Your Design</h2>
          <p className="text-sm text-muted-foreground">Select a template and customize — these are sublimated designs</p>
        </div>
      </div>

      {/* Mobile: Stack layout, Desktop: Side by side */}
      <div className="flex flex-col lg:grid lg:grid-cols-5 gap-6 lg:gap-8">
        
        {/* Template Gallery */}
        <div className="lg:col-span-3 space-y-4">
          {/* Category Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
            {templateCategories.map((cat) => (
              <Button
                key={cat.id}
                size="sm"
                variant={selectedCategory === cat.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(cat.id)}
                className="rounded-full whitespace-nowrap text-xs px-3"
              >
                {cat.label}
              </Button>
            ))}
          </div>

          {/* Template Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {filteredTemplates.map((template) => (
              <motion.button
                key={template.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleTemplateSelect(template.id)}
                className={`relative aspect-square rounded-lg md:rounded-xl overflow-hidden border-2 transition-all ${
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
                  <div className="absolute top-2 right-2 w-5 h-5 md:w-6 md:h-6 bg-foreground text-background rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 md:w-4 md:h-4" />
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2 md:p-3">
                  <p className="text-white text-xs md:text-sm font-medium">{template.name}</p>
                  <div className="flex gap-1 mt-1">
                    <span className="w-3 h-3 rounded-full border border-white/30" style={{ background: template.primaryColor }} />
                    <span className="w-3 h-3 rounded-full border border-white/30" style={{ background: template.secondaryColor }} />
                    <span className="w-3 h-3 rounded-full border border-white/30" style={{ background: template.accentColor }} />
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
              className="bg-muted rounded-lg p-3 flex items-center gap-3"
            >
              <img
                src={selectedTemplate.image}
                alt={selectedTemplate.name}
                className="w-14 h-14 md:w-16 md:h-16 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm md:text-base">{selectedTemplate.name}</p>
                <p className="text-xs text-muted-foreground capitalize">{selectedTemplate.category} style</p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Customization Panel */}
        <motion.div
          initial={{ opacity: 0, x: isMobile ? 0 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2"
        >
          <Tabs defaultValue="logos" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-4 h-9">
              <TabsTrigger value="logos" className="text-xs">Logos</TabsTrigger>
              <TabsTrigger value="text" className="text-xs">Text</TabsTrigger>
              <TabsTrigger value="numbers" className="text-xs">Numbers</TabsTrigger>
              <TabsTrigger value="names" className="text-xs">Names</TabsTrigger>
            </TabsList>

            {/* Logos Tab */}
            <TabsContent value="logos" className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                <Upload className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                <p className="font-medium text-sm mb-1">Upload Logo</p>
                <p className="text-xs text-muted-foreground mb-2">PNG, SVG, or PDF up to 10MB</p>
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
                <div className="space-y-2">
                  <Label className="text-xs font-semibold">Uploaded Logos</Label>
                  {designConfig.logos.map((logo) => (
                    <div key={logo.id} className="flex items-center gap-2 p-2 bg-muted rounded-lg">
                      <img src={logo.url} alt="Logo" className="w-8 h-8 object-contain rounded" />
                      <select
                        value={logo.placement}
                        onChange={(e) => {
                          const updatedLogos = designConfig.logos.map(l =>
                            l.id === logo.id ? { ...l, placement: e.target.value } : l
                          );
                          updateDesign({ logos: updatedLogos });
                        }}
                        className="flex-1 p-1.5 rounded border bg-background text-xs"
                      >
                        {logoPlacementOptions.map((opt) => (
                          <option key={opt.id} value={opt.id}>{opt.label}</option>
                        ))}
                      </select>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => {
                          updateDesign({
                            logos: designConfig.logos.filter(l => l.id !== logo.id),
                          });
                        }}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Text Tab */}
            <TabsContent value="text" className="space-y-4">
              <div>
                <Label className="text-xs mb-1.5 block">Team Name</Label>
                <Input
                  value={designConfig.teamName}
                  onChange={(e) => updateDesign({ teamName: e.target.value })}
                  placeholder="Enter team name"
                  className="h-9"
                />
              </div>

              <div>
                <Label className="text-xs font-semibold mb-2 block">Font Style</Label>
                <RadioGroup
                  value={designConfig.teamNameFont}
                  onValueChange={(value) => updateDesign({ teamNameFont: value })}
                  className="grid grid-cols-2 gap-1.5"
                >
                  {fontOptions.map((font) => (
                    <div key={font.id} className="flex items-center">
                      <RadioGroupItem value={font.id} id={`font-${font.id}`} className="sr-only peer" />
                      <Label
                        htmlFor={`font-${font.id}`}
                        className="w-full p-2 rounded-lg border-2 border-border cursor-pointer transition-all peer-data-[state=checked]:border-foreground peer-data-[state=checked]:bg-foreground/5 text-center text-xs"
                      >
                        {font.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div>
                <Label className="text-xs mb-1.5 block">Text Color</Label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={designConfig.teamNameColor}
                    onChange={(e) => updateDesign({ teamNameColor: e.target.value })}
                    className="w-10 h-9 rounded-lg cursor-pointer"
                  />
                  <Input
                    value={designConfig.teamNameColor}
                    onChange={(e) => updateDesign({ teamNameColor: e.target.value })}
                    className="flex-1 h-9"
                  />
                </div>
              </div>
            </TabsContent>

            {/* Numbers Tab */}
            <TabsContent value="numbers" className="space-y-3">
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
                <Label className="text-xs font-semibold mb-2 block">Number Size</Label>
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
                        className="w-full p-2 rounded-lg border-2 border-border cursor-pointer transition-all peer-data-[state=checked]:border-foreground peer-data-[state=checked]:bg-foreground peer-data-[state=checked]:text-background capitalize text-center text-xs"
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
            <TabsContent value="names" className="space-y-3">
              <div>
                <Label className="text-xs font-semibold mb-2 block">Name Font</Label>
                <RadioGroup
                  value={designConfig.playerNameFont}
                  onValueChange={(value) => updateDesign({ playerNameFont: value })}
                  className="grid grid-cols-2 gap-1.5"
                >
                  {fontOptions.map((font) => (
                    <div key={font.id} className="flex items-center">
                      <RadioGroupItem value={font.id} id={`name-font-${font.id}`} className="sr-only peer" />
                      <Label
                        htmlFor={`name-font-${font.id}`}
                        className="w-full p-2 rounded-lg border-2 border-border cursor-pointer transition-all peer-data-[state=checked]:border-foreground peer-data-[state=checked]:bg-foreground/5 text-center text-xs"
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
          <div className="flex justify-end pt-4 mt-4 border-t border-border">
            <Button 
              size="lg" 
              onClick={nextStep} 
              className="gap-2 w-full sm:w-auto"
              disabled={!designConfig.selectedTemplateId}
            >
              Next: Style Options
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
