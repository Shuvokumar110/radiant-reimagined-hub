import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Plus, Trash2, Upload, Copy, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTeamBuilder, RosterEntry } from "@/context/TeamBuilderContext";
import { sizeOptions } from "@/data/teamBuilderData";
import { TeamInfoForm } from "./TeamInfoForm";

const MIN_ORDER_QTY = 18;

export function RosterBuilder() {
  const { state, dispatch, nextStep, prevStep, calculateTotal } = useTeamBuilder();
  const { roster, product, teamInfo } = state;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [sizeChartOpen, setSizeChartOpen] = useState(false);

  if (!product) return null;

  const totals = calculateTotal();

  const addEntry = () => {
    const newEntry: RosterEntry = {
      id: Date.now().toString(),
      playerName: '',
      jerseyNumber: '',
      size: 'M',
      quantity: 1,
      notes: '',
    };
    dispatch({ type: 'ADD_ROSTER_ENTRY', entry: newEntry });
  };

  const updateEntry = (id: string, updates: Partial<RosterEntry>) => {
    dispatch({ type: 'UPDATE_ROSTER_ENTRY', id, entry: updates });
  };

  const deleteEntry = (id: string) => {
    dispatch({ type: 'DELETE_ROSTER_ENTRY', id });
  };

  const duplicateEntry = (entry: RosterEntry) => {
    const newEntry: RosterEntry = {
      ...entry,
      id: Date.now().toString(),
      playerName: `${entry.playerName} (copy)`,
    };
    dispatch({ type: 'ADD_ROSTER_ENTRY', entry: newEntry });
  };

  const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const lines = text.split('\n').filter(line => line.trim());
      
      const startIndex = lines[0].toLowerCase().includes('name') ? 1 : 0;
      
      const newEntries: RosterEntry[] = [];
      for (let i = startIndex; i < lines.length; i++) {
        const [name, number, size, qty, notes] = lines[i].split(',').map(s => s.trim());
        if (name) {
          newEntries.push({
            id: Date.now().toString() + i,
            playerName: name,
            jerseyNumber: number || '',
            size: sizeOptions.includes(size?.toUpperCase()) ? size.toUpperCase() : 'M',
            quantity: parseInt(qty) || 1,
            notes: notes || '',
          });
        }
      }
      
      dispatch({ type: 'SET_ROSTER', roster: [...roster, ...newEntries] });
    };
    reader.readAsText(file);
  };

  const getSizeBreakdown = () => {
    const breakdown: Record<string, number> = {};
    roster.forEach(entry => {
      breakdown[entry.size] = (breakdown[entry.size] || 0) + entry.quantity;
    });
    return breakdown;
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={prevStep} className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Team Roster</h2>
            <p className="text-muted-foreground">Add your players and sizes</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Dialog open={sizeChartOpen} onOpenChange={setSizeChartOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <ExternalLink className="w-4 h-4" /> Size Chart
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Size Chart</DialogTitle>
              </DialogHeader>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Size</TableHead>
                      <TableHead>Chest (in)</TableHead>
                      <TableHead>Length (in)</TableHead>
                      <TableHead>Age Range</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow><TableCell>YXS</TableCell><TableCell>24-26</TableCell><TableCell>18</TableCell><TableCell>4-5</TableCell></TableRow>
                    <TableRow><TableCell>YS</TableCell><TableCell>26-28</TableCell><TableCell>20</TableCell><TableCell>6-7</TableCell></TableRow>
                    <TableRow><TableCell>YM</TableCell><TableCell>28-30</TableCell><TableCell>22</TableCell><TableCell>8-9</TableCell></TableRow>
                    <TableRow><TableCell>YL</TableCell><TableCell>30-32</TableCell><TableCell>24</TableCell><TableCell>10-12</TableCell></TableRow>
                    <TableRow><TableCell>YXL</TableCell><TableCell>32-34</TableCell><TableCell>26</TableCell><TableCell>12-14</TableCell></TableRow>
                    <TableRow><TableCell>S</TableCell><TableCell>34-36</TableCell><TableCell>28</TableCell><TableCell>Adult</TableCell></TableRow>
                    <TableRow><TableCell>M</TableCell><TableCell>38-40</TableCell><TableCell>29</TableCell><TableCell>Adult</TableCell></TableRow>
                    <TableRow><TableCell>L</TableCell><TableCell>42-44</TableCell><TableCell>30</TableCell><TableCell>Adult</TableCell></TableRow>
                    <TableRow><TableCell>XL</TableCell><TableCell>46-48</TableCell><TableCell>31</TableCell><TableCell>Adult</TableCell></TableRow>
                    <TableRow><TableCell>2XL</TableCell><TableCell>50-52</TableCell><TableCell>32</TableCell><TableCell>Adult</TableCell></TableRow>
                    <TableRow><TableCell>3XL</TableCell><TableCell>54-56</TableCell><TableCell>33</TableCell><TableCell>Adult</TableCell></TableRow>
                  </TableBody>
                </Table>
              </div>
            </DialogContent>
          </Dialog>
          <input
            type="file"
            ref={fileInputRef}
            accept=".csv"
            onChange={handleCSVUpload}
            className="hidden"
          />
          <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} className="gap-2">
            <Upload className="w-4 h-4" /> Upload CSV
          </Button>
        </div>
      </div>

      {/* Team Info Form */}
      <TeamInfoForm />

      {/* Roster Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border rounded-xl overflow-hidden mb-6"
      >
        <Table>
          <TableHeader>
            <TableRow className="bg-muted">
              <TableHead className="w-[200px]">Player Name</TableHead>
              <TableHead className="w-[100px]">Number</TableHead>
              <TableHead className="w-[120px]">Size</TableHead>
              <TableHead className="w-[80px]">Qty</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {roster.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                  No players added yet. Click "Add Player" to get started.
                </TableCell>
              </TableRow>
            ) : (
              roster.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>
                    <Input
                      value={entry.playerName}
                      onChange={(e) => updateEntry(entry.id, { playerName: e.target.value })}
                      placeholder="Player name"
                      className="border-0 bg-transparent p-0 h-auto focus-visible:ring-0"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={entry.jerseyNumber}
                      onChange={(e) => updateEntry(entry.id, { jerseyNumber: e.target.value })}
                      placeholder="#"
                      className="border-0 bg-transparent p-0 h-auto focus-visible:ring-0 w-16"
                    />
                  </TableCell>
                  <TableCell>
                    <Select
                      value={entry.size}
                      onValueChange={(value) => updateEntry(entry.id, { size: value })}
                    >
                      <SelectTrigger className="border-0 bg-transparent p-0 h-auto focus:ring-0 w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-background">
                        {sizeOptions.map((size) => (
                          <SelectItem key={size} value={size}>{size}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      min="1"
                      value={entry.quantity}
                      onChange={(e) => updateEntry(entry.id, { quantity: parseInt(e.target.value) || 1 })}
                      className="border-0 bg-transparent p-0 h-auto focus-visible:ring-0 w-12"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={entry.notes}
                      onChange={(e) => updateEntry(entry.id, { notes: e.target.value })}
                      placeholder="e.g., Captain, Goalkeeper"
                      className="border-0 bg-transparent p-0 h-auto focus-visible:ring-0"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => duplicateEntry(entry)}
                        className="h-8 w-8"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteEntry(entry.id)}
                        className="h-8 w-8 text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </motion.div>

      {/* Add Player Button */}
      <Button variant="outline" onClick={addEntry} className="gap-2 mb-8">
        <Plus className="w-4 h-4" /> Add Player
      </Button>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 bg-muted rounded-xl"
        >
          <Label className="text-sm text-muted-foreground">Total Quantity</Label>
          <p className="text-3xl font-bold">{totals.quantity}</p>
          <p className="text-xs text-muted-foreground mt-1">Min. {MIN_ORDER_QTY} units required</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 bg-muted rounded-xl"
        >
          <Label className="text-sm text-muted-foreground">Unit Price</Label>
          <p className="text-3xl font-bold">${totals.unitPrice}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 bg-foreground text-background rounded-xl"
        >
          <Label className="text-sm opacity-70">Estimated Total</Label>
          <p className="text-3xl font-bold">${totals.total.toFixed(2)}</p>
        </motion.div>
      </div>

      {/* Size Breakdown */}
      {roster.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 bg-muted rounded-xl mb-8"
        >
          <Label className="text-sm font-semibold mb-4 block">Size Breakdown</Label>
          <div className="flex flex-wrap gap-3">
            {Object.entries(getSizeBreakdown()).map(([size, count]) => (
              <div key={size} className="px-4 py-2 bg-background rounded-full">
                <span className="font-semibold">{size}:</span> {count}
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Missing Info Note */}
      {(!teamInfo.teamName.trim() || !teamInfo.coachName.trim() || !teamInfo.contactEmail.trim() || !teamInfo.logoPreview) && (
        <div className="p-4 bg-muted border border-border rounded-xl mb-8">
          <p className="text-sm text-muted-foreground">
            <strong>Required:</strong> Please fill in Team Name, Coach Name, Contact Email, and upload your Team Logo to proceed.
          </p>
        </div>
      )}

      {/* Minimum Order Note */}
      {totals.quantity > 0 && totals.quantity < MIN_ORDER_QTY && (
        <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-xl mb-8">
          <p className="text-sm text-destructive">
            <strong>Note:</strong> Minimum order is {MIN_ORDER_QTY} units. Add {MIN_ORDER_QTY - totals.quantity} more to proceed.
          </p>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={prevStep}>
          Back to Style Options
        </Button>
        <Button 
          size="lg" 
          onClick={nextStep} 
          disabled={totals.quantity < MIN_ORDER_QTY || !teamInfo.teamName.trim() || !teamInfo.coachName.trim() || !teamInfo.contactEmail.trim() || !teamInfo.logoPreview}
          className="gap-2"
        >
          Next: Review Order
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
