
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Award } from "lucide-react";

interface PointsRedemptionProps {
  availablePoints: number;
  maxPointsValue: number;
  pointsToUse: number;
  onPointsChange: (points: number) => void;
}

const PointsRedemption = ({ 
  availablePoints,
  maxPointsValue,
  pointsToUse,
  onPointsChange
}: PointsRedemptionProps) => {
  const [sliderValue, setSliderValue] = useState<number[]>([pointsToUse]);
  const pointsWorth = (pointsToUse / 100).toFixed(2);
  const maxPoints = Math.min(availablePoints, maxPointsValue);

  // Handle slider changes
  const handleSliderChange = (value: number[]) => {
    const newValue = value[0];
    setSliderValue([newValue]);
    onPointsChange(newValue);
  };

  // Ensure slider gets updated if props change
  useEffect(() => {
    setSliderValue([pointsToUse]);
  }, [pointsToUse]);

  if (availablePoints <= 0) {
    return null;
  }

  return (
    <div className="space-y-4 rounded-md bg-gray-900/40 p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <Award className="h-5 w-5 text-brand-yellow mr-2" />
          <span className="font-medium">Use Your Points</span>
        </div>
        <Badge variant="points" className="text-xs">
          {availablePoints} available
        </Badge>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span>Amount to redeem</span>
          <span className="font-medium">{pointsToUse} points (${pointsWorth})</span>
        </div>
        
        <Slider
          value={sliderValue}
          max={maxPoints}
          step={5}
          onValueChange={handleSliderChange}
          className="my-4"
        />
        
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>0 points</span>
          <span>{maxPoints} points</span>
        </div>
      </div>

      <div className="text-xs text-muted-foreground mt-2">
        <p>100 points = $1.00 discount</p>
      </div>
    </div>
  );
};

export default PointsRedemption;
