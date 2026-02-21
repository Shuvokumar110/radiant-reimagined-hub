import { useRef } from "react";
import { motion } from "framer-motion";
import { Upload, X, Shield } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTeamBuilder } from "@/context/TeamBuilderContext";

const seasonOptions = [
  "Spring 2025",
  "Summer 2025",
  "Fall 2025",
  "Winter 2025",
  "Spring 2026",
  "Summer 2026",
  "Fall 2026",
  "Winter 2026",
  "Year-Round",
];

export function TeamInfoForm() {
  const { state, dispatch } = useTeamBuilder();
  const { teamInfo } = state;
  const logoInputRef = useRef<HTMLInputElement>(null);

  const updateInfo = (updates: Partial<typeof teamInfo>) => {
    dispatch({ type: "SET_TEAM_INFO", info: updates });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      updateInfo({
        logoFile: file,
        logoPreview: event.target?.result as string,
      });
    };
    reader.readAsDataURL(file);
  };

  const removeLogo = () => {
    updateInfo({ logoFile: null, logoPreview: "" });
    if (logoInputRef.current) logoInputRef.current.value = "";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border rounded-xl p-6 mb-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <Shield className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Team Information</h3>
        <span className="text-xs text-muted-foreground ml-auto">* Required</span>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Logo Upload */}
        <div className="md:row-span-2">
          <Label className="text-sm font-medium mb-2 block">
            Team Logo <span className="text-destructive">*</span>
          </Label>
          <input
            type="file"
            ref={logoInputRef}
            accept="image/png,image/jpeg,image/svg+xml,image/webp"
            onChange={handleLogoUpload}
            className="hidden"
          />
          {teamInfo.logoPreview ? (
            <div className="relative group w-full aspect-square max-w-[200px] rounded-xl border-2 border-dashed border-primary/30 overflow-hidden bg-muted">
              <img
                src={teamInfo.logoPreview}
                alt="Team logo"
                className="w-full h-full object-contain p-4"
              />
              <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => logoInputRef.current?.click()}
                >
                  Replace
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  className="h-9 w-9"
                  onClick={removeLogo}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => logoInputRef.current?.click()}
              className="w-full aspect-square max-w-[200px] rounded-xl border-2 border-dashed border-muted-foreground/30 hover:border-primary/50 transition-colors flex flex-col items-center justify-center gap-3 bg-muted/50 cursor-pointer"
            >
              <Upload className="w-8 h-8 text-muted-foreground" />
              <div className="text-center">
                <p className="text-sm font-medium text-muted-foreground">Upload Logo</p>
                <p className="text-xs text-muted-foreground/70 mt-1">
                  PNG, JPG, SVG or WebP
                </p>
                <p className="text-xs text-muted-foreground/70">Max 5MB</p>
              </div>
            </button>
          )}
        </div>

        {/* Team Name */}
        <div className="space-y-2">
          <Label htmlFor="teamName">
            Team Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="teamName"
            value={teamInfo.teamName}
            onChange={(e) => updateInfo({ teamName: e.target.value })}
            placeholder="e.g., Thunder FC"
            maxLength={50}
          />
        </div>

        {/* Organization */}
        <div className="space-y-2">
          <Label htmlFor="orgName">Organization / Club</Label>
          <Input
            id="orgName"
            value={teamInfo.organizationName}
            onChange={(e) => updateInfo({ organizationName: e.target.value })}
            placeholder="e.g., Metro Youth Soccer League"
            maxLength={100}
          />
        </div>

        {/* Coach / Contact */}
        <div className="space-y-2">
          <Label htmlFor="coachName">
            Coach / Contact Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="coachName"
            value={teamInfo.coachName}
            onChange={(e) => updateInfo({ coachName: e.target.value })}
            placeholder="Full name"
            maxLength={80}
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="contactEmail">
            Contact Email <span className="text-destructive">*</span>
          </Label>
          <Input
            id="contactEmail"
            type="email"
            value={teamInfo.contactEmail}
            onChange={(e) => updateInfo({ contactEmail: e.target.value })}
            placeholder="coach@example.com"
            maxLength={255}
          />
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="contactPhone">Contact Phone</Label>
          <Input
            id="contactPhone"
            type="tel"
            value={teamInfo.contactPhone}
            onChange={(e) => updateInfo({ contactPhone: e.target.value })}
            placeholder="+1 (555) 000-0000"
            maxLength={20}
          />
        </div>

        {/* League */}
        <div className="space-y-2">
          <Label htmlFor="league">League / Division</Label>
          <Input
            id="league"
            value={teamInfo.league}
            onChange={(e) => updateInfo({ league: e.target.value })}
            placeholder="e.g., U-14 Premier Division"
            maxLength={80}
          />
        </div>

        {/* Season */}
        <div className="space-y-2">
          <Label htmlFor="season">Season</Label>
          <Select
            value={teamInfo.season}
            onValueChange={(value) => updateInfo({ season: value })}
          >
            <SelectTrigger id="season">
              <SelectValue placeholder="Select season" />
            </SelectTrigger>
            <SelectContent className="bg-background">
              {seasonOptions.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </motion.div>
  );
}
