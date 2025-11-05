"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import VRConfirmationModal from "./VRConfirmationModal";

const steps = [
  { id: "room-config", title: "Space Config" },
  { id: "dimensions", title: "Dimensions" },
  { id: "style-settings", title: "Design & Lighting" },
];

interface VRFormData {
  bhkType: string;
  totalArea: string;
  furnishingStyle: string;
  roomPurpose: string;
  masterBedroomLength: string;
  masterBedroomWidth: string;
  masterBedroomHeight: string;
  bedroom2Length: string;
  bedroom2Width: string;
  bedroom2Height: string;
  bedroom3Length: string;
  bedroom3Width: string;
  bedroom3Height: string;
  kitchenLength: string;
  kitchenWidth: string;
  kitchenHeight: string;
  hallLength: string;
  hallWidth: string;
  hallHeight: string;
  wallColor: string;
  flooringType: string;
  lightingType: string;
  ceilingType: string;
  furnitureQuality: string;
  accessoriesLevel: string;
  additionalNotes: string;
}

interface ColorTheme {
  primary: string;
  secondary: string;
  light: string;
  darkText: string;
  lightText: string;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const contentVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, x: -50, transition: { duration: 0.2 } },
};

interface ViewOnVRFormProps {
  onBackToHome: () => void;
}

const ViewOnVRForm = ({ onBackToHome }: ViewOnVRFormProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState<VRFormData>({
    bhkType: "",
    totalArea: "",
    furnishingStyle: "",
    roomPurpose: "",
    masterBedroomLength: "",
    masterBedroomWidth: "",
    masterBedroomHeight: "",
    bedroom2Length: "",
    bedroom2Width: "",
    bedroom2Height: "",
    bedroom3Length: "",
    bedroom3Width: "",
    bedroom3Height: "",
    kitchenLength: "",
    kitchenWidth: "",
    kitchenHeight: "",
    hallLength: "",
    hallWidth: "",
    hallHeight: "",
    wallColor: "soft-white",
    flooringType: "premium-marble",
    lightingType: "warm-ambient",
    ceilingType: "false-ceiling",
    furnitureQuality: "premium",
    accessoriesLevel: "moderate",
    additionalNotes: "",
  });

  const colors: ColorTheme = {
    primary: "black",
    secondary: "black",
    light: "#ffe6a7",
    darkText: "#333333",
    lightText: "#ffffff",
  };

  const bhkOptions = ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "5 BHK", "6 BHK"];

  const furnishingStyles = [
    "Minimalist",
    "Modern",
    "Traditional",
    "Contemporary",
    "Industrial",
    "Scandinavian",
    "Mediterranean",
    "Bohemian",
    "Art Deco",
    "Rustic",
  ];

  const roomPurposes = [
    "Residential",
    "Commercial",
    "Office Space",
    "Retail Store",
    "Showroom",
    "Restaurant",
    "Hotel",
  ];

  const wallColorOptions = [
    { value: "soft-white", label: "Soft White", hex: "#F5F5F0" },
    { value: "warm-beige", label: "Warm Beige", hex: "#E8DCC8" },
    { value: "light-gray", label: "Light Gray", hex: "#D3D3D3" },
    { value: "sage-green", label: "Sage Green", hex: "#9CAF88" },
    { value: "dusty-blue", label: "Dusty Blue", hex: "#8B9DB5" },
    { value: "warm-taupe", label: "Warm Taupe", hex: "#A89968" },
    { value: "cream", label: "Cream", hex: "#FFFDD0" },
    { value: "light-pink", label: "Light Pink", hex: "#FFB6C1" },
    { value: "soft-yellow", label: "Soft Yellow", hex: "#FFFFE0" },
    { value: "pale-green", label: "Pale Green", hex: "#D9E8D9" },
  ];

  const flooringOptions = [
    "Premium Marble",
    "Italian Tiles",
    "Wooden Parquet",
    "Luxury Vinyl",
    "Granite",
    "Ceramic Tiles",
    "Polished Concrete",
    "Bamboo",
    "Cork",
    "Stone Finish",
  ];

  const lightingOptions = [
    "Warm Ambient",
    "Cool White",
    "Natural Daylight",
    "Accent Lighting",
    "Smart Lighting",
    "Pendant Lights",
    "Track Lighting",
    "Recessed Lighting",
    "Wall Sconces",
  ];

  const ceilingOptions = [
    "False Ceiling",
    "Wooden Ceiling",
    "Exposed Concrete",
    "Plaster Finish",
    "POP Design",
    "Coffered Ceiling",
    "Barrel Vault",
    "Standard Ceiling",
    "Decorative Ceiling",
  ];

  const furnitureQualityOptions = [
    "Budget-Friendly",
    "Mid-Range",
    "Premium",
    "Luxury",
    "Custom-Made",
  ];

  const accessoriesLevelOptions = [
    "Minimal",
    "Moderate",
    "Abundant",
    "Luxury Collection",
  ];

  const updateFormData = (field: keyof VRFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setShowConfirmation(true);
    }, 1500);
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
    setCurrentStep(0);
    setFormData({
      bhkType: "",
      totalArea: "",
      furnishingStyle: "",
      roomPurpose: "",
      masterBedroomLength: "",
      masterBedroomWidth: "",
      masterBedroomHeight: "",
      bedroom2Length: "",
      bedroom2Width: "",
      bedroom2Height: "",
      bedroom3Length: "",
      bedroom3Width: "",
      bedroom3Height: "",
      kitchenLength: "",
      kitchenWidth: "",
      kitchenHeight: "",
      hallLength: "",
      hallWidth: "",
      hallHeight: "",
      wallColor: "soft-white",
      flooringType: "premium-marble",
      lightingType: "warm-ambient",
      ceilingType: "false-ceiling",
      furnitureQuality: "premium",
      accessoriesLevel: "moderate",
      additionalNotes: "",
    });
    onBackToHome();
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return (
          formData.bhkType !== "" &&
          formData.totalArea.trim() !== "" &&
          formData.furnishingStyle !== "" &&
          formData.roomPurpose !== ""
        );
      case 1:
        return (
          formData.masterBedroomLength.trim() !== "" &&
          formData.masterBedroomWidth.trim() !== "" &&
          formData.masterBedroomHeight.trim() !== "" &&
          formData.kitchenLength.trim() !== "" &&
          formData.kitchenWidth.trim() !== "" &&
          formData.kitchenHeight.trim() !== "" &&
          formData.hallLength.trim() !== "" &&
          formData.hallWidth.trim() !== "" &&
          formData.hallHeight.trim() !== ""
        );
      case 2:
        return true;
      default:
        return true;
    }
  };

  const getBedrooms = () => {
    const bhk = parseInt(formData.bhkType);
    return bhk || 0;
  };

  const bedrooms = getBedrooms();
  const showBedroom2 = bedrooms >= 2;
  const showBedroom3 = bedrooms >= 3;

  const getWallColorHex = () => {
    return (
      wallColorOptions.find((c) => c.value === formData.wallColor)?.hex ||
      "#F5F5F0"
    );
  };

  return (
    <>
      <div
        className="w-full max-w-lg mx-auto py-8"
        style={{ backgroundColor: colors.light }}
      >
        {/* Progress indicator */}
        <motion.div
          className="mb-8 px-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between mb-2">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center"
                whileHover={{ scale: 1.1 }}
              >
                <motion.div
                  className="w-4 h-4 rounded-full cursor-pointer transition-colors duration-300"
                  style={{
                    backgroundColor:
                      index < currentStep
                        ? colors.primary
                        : index === currentStep
                          ? colors.primary
                          : "#e0e0e0",
                    boxShadow:
                      index === currentStep
                        ? `0 0 0 4px ${colors.primary}20`
                        : "none",
                  }}
                  onClick={() => {
                    if (index <= currentStep) {
                      setCurrentStep(index);
                    }
                  }}
                  whileTap={{ scale: 0.95 }}
                />
                <motion.span
                  className="text-xs mt-1.5 hidden sm:block font-medium"
                  style={{
                    color:
                      index === currentStep ? colors.primary : colors.darkText,
                  }}
                >
                  {step.title}
                </motion.span>
              </motion.div>
            ))}
          </div>
          <div
            className="w-full h-1.5 rounded-full overflow-hidden mt-2"
            style={{ backgroundColor: "#e0e0e0" }}
          >
            <motion.div
              className="h-full"
              style={{ backgroundColor: colors.primary }}
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>

        {/* Form card */}
        <motion.div
          className="px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card
            className="border shadow-md rounded-3xl overflow-hidden"
            style={{ borderColor: colors.secondary }}
          >
            <div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={contentVariants}
                >
                  {/* Step 1: Space Configuration */}
                  {currentStep === 0 && (
                    <>
                      <CardHeader style={{ backgroundColor: `${colors.light}40` }}>
                        <CardTitle style={{ color: colors.primary }}>
                          Space Configuration
                        </CardTitle>
                        <CardDescription style={{ color: colors.darkText }}>
                          Tell us about your space and vision
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4 pt-6">
                        <motion.div variants={fadeInUp} className="space-y-2">
                          <Label
                            htmlFor="bhkType"
                            style={{ color: colors.primary }}
                            className="font-semibold"
                          >
                            BHK Type
                          </Label>
                          <Select
                            value={formData.bhkType}
                            onValueChange={(value) =>
                              updateFormData("bhkType", value)
                            }
                          >
                            <SelectTrigger
                              id="bhkType"
                              className="transition-all duration-300 rounded-2xl"
                              style={{
                                borderColor: colors.secondary,
                              } as any}
                            >
                              <SelectValue placeholder="Select BHK type" />
                            </SelectTrigger>
                            <SelectContent>
                              {bhkOptions.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="space-y-2">
                          <Label
                            htmlFor="totalArea"
                            style={{ color: colors.primary }}
                            className="font-semibold"
                          >
                            Total House Area (sq ft)
                          </Label>
                          <Input
                            id="totalArea"
                            type="number"
                            placeholder="e.g., 1200"
                            value={formData.totalArea}
                            onChange={(e) =>
                              updateFormData("totalArea", e.target.value)
                            }
                            className="transition-all duration-300"
                            min="0"
                            style={{
                              borderColor: colors.secondary,
                            } as any}
                          />
                        </motion.div>

                        <motion.div variants={fadeInUp} className="space-y-2">
                          <Label
                            htmlFor="furnishing"
                            style={{ color: colors.primary }}
                            className="font-semibold"
                          >
                            Furnishing Style
                          </Label>
                          <Select
                            value={formData.furnishingStyle}
                            onValueChange={(value) =>
                              updateFormData("furnishingStyle", value)
                            }
                          >
                            <SelectTrigger
                              id="furnishing"
                              className="transition-all duration-300 rounded-2xl"
                              style={{
                                borderColor: colors.secondary,
                              } as any}
                            >
                              <SelectValue placeholder="Select style" />
                            </SelectTrigger>
                            <SelectContent>
                              {furnishingStyles.map((style) => (
                                <SelectItem key={style} value={style}>
                                  {style}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="space-y-2">
                          <Label
                            htmlFor="purpose"
                            style={{ color: colors.primary }}
                            className="font-semibold"
                          >
                            Space Purpose
                          </Label>
                          <Select
                            value={formData.roomPurpose}
                            onValueChange={(value) =>
                              updateFormData("roomPurpose", value)
                            }
                          >
                            <SelectTrigger
                              id="purpose"
                              className="transition-all duration-300 rounded-2xl"
                              style={{
                                borderColor: colors.secondary,
                              } as any}
                            >
                              <SelectValue placeholder="Select purpose" />
                            </SelectTrigger>
                            <SelectContent>
                              {roomPurposes.map((purpose) => (
                                <SelectItem key={purpose} value={purpose}>
                                  {purpose}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </motion.div>
                      </CardContent>
                    </>
                  )}

                  {/* Step 2: Dimensions */}
                  {currentStep === 1 && (
                    <>
                      <CardHeader style={{ backgroundColor: `${colors.light}40` }}>
                        <CardTitle style={{ color: colors.primary }}>
                          Room Dimensions
                        </CardTitle>
                        <CardDescription style={{ color: colors.darkText }}>
                          Enter length, width, and height in feet
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6 pt-6 max-h-96 overflow-y-auto">
                        {/* Master Bedroom */}
                        <motion.div variants={fadeInUp} className="space-y-3">
                          <h3
                            className="font-semibold text-sm"
                            style={{ color: colors.primary }}
                          >
                            Master Bedroom
                          </h3>
                          <div className="grid grid-cols-3 gap-2">
                            <div className="space-y-1">
                              <Label
                                className="text-xs"
                                style={{ color: colors.darkText }}
                              >
                                Length (ft)
                              </Label>
                              <Input
                                type="number"
                                placeholder="14"
                                value={formData.masterBedroomLength}
                                onChange={(e) =>
                                  updateFormData(
                                    "masterBedroomLength",
                                    e.target.value
                                  )
                                }
                                min="0"
                                step="0.1"
                                style={{
                                  borderColor: colors.secondary,
                                } as any}
                              />
                            </div>
                            <div className="space-y-1">
                              <Label
                                className="text-xs"
                                style={{ color: colors.darkText }}
                              >
                                Width (ft)
                              </Label>
                              <Input
                                type="number"
                                placeholder="12"
                                value={formData.masterBedroomWidth}
                                onChange={(e) =>
                                  updateFormData("masterBedroomWidth", e.target.value)
                                }
                                min="0"
                                step="0.1"
                                style={{
                                  borderColor: colors.secondary,
                                } as any}
                              />
                            </div>
                            <div className="space-y-1">
                              <Label
                                className="text-xs"
                                style={{ color: colors.darkText }}
                              >
                                Height (ft)
                              </Label>
                              <Input
                                type="number"
                                placeholder="10"
                                value={formData.masterBedroomHeight}
                                onChange={(e) =>
                                  updateFormData(
                                    "masterBedroomHeight",
                                    e.target.value
                                  )
                                }
                                min="0"
                                step="0.1"
                                style={{
                                  borderColor: colors.secondary,
                                } as any}
                              />
                            </div>
                          </div>
                        </motion.div>

                        {/* Bedroom 2 */}
                        {showBedroom2 && (
                          <motion.div variants={fadeInUp} className="space-y-3">
                            <h3
                              className="font-semibold text-sm"
                              style={{ color: colors.primary }}
                            >
                              Bedroom 2
                            </h3>
                            <div className="grid grid-cols-3 gap-2">
                              <div className="space-y-1">
                                <Label
                                  className="text-xs"
                                  style={{ color: colors.darkText }}
                                >
                                  Length (ft)
                                </Label>
                                <Input
                                  type="number"
                                  placeholder="12"
                                  value={formData.bedroom2Length}
                                  onChange={(e) =>
                                    updateFormData("bedroom2Length", e.target.value)
                                  }
                                  min="0"
                                  step="0.1"
                                  style={{
                                    borderColor: colors.secondary,
                                  } as any}
                                />
                              </div>
                              <div className="space-y-1">
                                <Label
                                  className="text-xs"
                                  style={{ color: colors.darkText }}
                                >
                                  Width (ft)
                                </Label>
                                <Input
                                  type="number"
                                  placeholder="10"
                                  value={formData.bedroom2Width}
                                  onChange={(e) =>
                                    updateFormData("bedroom2Width", e.target.value)
                                  }
                                  min="0"
                                  step="0.1"
                                  style={{
                                    borderColor: colors.secondary,
                                  } as any}
                                />
                              </div>
                              <div className="space-y-1">
                                <Label
                                  className="text-xs"
                                  style={{ color: colors.darkText }}
                                >
                                  Height (ft)
                                </Label>
                                <Input
                                  type="number"
                                  placeholder="10"
                                  value={formData.bedroom2Height}
                                  onChange={(e) =>
                                    updateFormData("bedroom2Height", e.target.value)
                                  }
                                  min="0"
                                  step="0.1"
                                  style={{
                                    borderColor: colors.secondary,
                                  } as any}
                                />
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {/* Bedroom 3 */}
                        {showBedroom3 && (
                          <motion.div variants={fadeInUp} className="space-y-3">
                            <h3
                              className="font-semibold text-sm"
                              style={{ color: colors.primary }}
                            >
                              Bedroom 3
                            </h3>
                            <div className="grid grid-cols-3 gap-2">
                              <div className="space-y-1">
                                <Label
                                  className="text-xs"
                                  style={{ color: colors.darkText }}
                                >
                                  Length (ft)
                                </Label>
                                <Input
                                  type="number"
                                  placeholder="10"
                                  value={formData.bedroom3Length}
                                  onChange={(e) =>
                                    updateFormData("bedroom3Length", e.target.value)
                                  }
                                  min="0"
                                  step="0.1"
                                  style={{
                                    borderColor: colors.secondary,
                                  } as any}
                                />
                              </div>
                              <div className="space-y-1">
                                <Label
                                  className="text-xs"
                                  style={{ color: colors.darkText }}
                                >
                                  Width (ft)
                                </Label>
                                <Input
                                  type="number"
                                  placeholder="9"
                                  value={formData.bedroom3Width}
                                  onChange={(e) =>
                                    updateFormData("bedroom3Width", e.target.value)
                                  }
                                  min="0"
                                  step="0.1"
                                  style={{
                                    borderColor: colors.secondary,
                                  } as any}
                                />
                              </div>
                              <div className="space-y-1">
                                <Label
                                  className="text-xs"
                                  style={{ color: colors.darkText }}
                                >
                                  Height (ft)
                                </Label>
                                <Input
                                  type="number"
                                  placeholder="10"
                                  value={formData.bedroom3Height}
                                  onChange={(e) =>
                                    updateFormData("bedroom3Height", e.target.value)
                                  }
                                  min="0"
                                  step="0.1"
                                  style={{
                                    borderColor: colors.secondary,
                                  } as any}
                                />
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {/* Kitchen */}
                        <motion.div variants={fadeInUp} className="space-y-3">
                          <h3
                            className="font-semibold text-sm"
                            style={{ color: colors.primary }}
                          >
                            Kitchen
                          </h3>
                          <div className="grid grid-cols-3 gap-2">
                            <div className="space-y-1">
                              <Label
                                className="text-xs"
                                style={{ color: colors.darkText }}
                              >
                                Length (ft)
                              </Label>
                              <Input
                                type="number"
                                placeholder="10"
                                value={formData.kitchenLength}
                                onChange={(e) =>
                                  updateFormData("kitchenLength", e.target.value)
                                }
                                min="0"
                                step="0.1"
                                style={{
                                  borderColor: colors.secondary,
                                } as any}
                              />
                            </div>
                            <div className="space-y-1">
                              <Label
                                className="text-xs"
                                style={{ color: colors.darkText }}
                              >
                                Width (ft)
                              </Label>
                              <Input
                                type="number"
                                placeholder="8"
                                value={formData.kitchenWidth}
                                onChange={(e) =>
                                  updateFormData("kitchenWidth", e.target.value)
                                }
                                min="0"
                                step="0.1"
                                style={{
                                  borderColor: colors.secondary,
                                } as any}
                              />
                            </div>
                            <div className="space-y-1">
                              <Label
                                className="text-xs"
                                style={{ color: colors.darkText }}
                              >
                                Height (ft)
                              </Label>
                              <Input
                                type="number"
                                placeholder="9"
                                value={formData.kitchenHeight}
                                onChange={(e) =>
                                  updateFormData("kitchenHeight", e.target.value)
                                }
                                min="0"
                                step="0.1"
                                style={{
                                  borderColor: colors.secondary,
                                } as any}
                              />
                            </div>
                          </div>
                        </motion.div>

                        {/* Hall */}
                        <motion.div variants={fadeInUp} className="space-y-3">
                          <h3
                            className="font-semibold text-sm"
                            style={{ color: colors.primary }}
                          >
                            Hall / Living Room
                          </h3>
                          <div className="grid grid-cols-3 gap-2">
                            <div className="space-y-1">
                              <Label
                                className="text-xs"
                                style={{ color: colors.darkText }}
                              >
                                Length (ft)
                              </Label>
                              <Input
                                type="number"
                                placeholder="18"
                                value={formData.hallLength}
                                onChange={(e) =>
                                  updateFormData("hallLength", e.target.value)
                                }
                                min="0"
                                step="0.1"
                                style={{
                                  borderColor: colors.secondary,
                                } as any}
                              />
                            </div>
                            <div className="space-y-1">
                              <Label
                                className="text-xs"
                                style={{ color: colors.darkText }}
                              >
                                Width (ft)
                              </Label>
                              <Input
                                type="number"
                                placeholder="16"
                                value={formData.hallWidth}
                                onChange={(e) =>
                                  updateFormData("hallWidth", e.target.value)
                                }
                                min="0"
                                step="0.1"
                                style={{
                                  borderColor: colors.secondary,
                                } as any}
                              />
                            </div>
                            <div className="space-y-1">
                              <Label
                                className="text-xs"
                                style={{ color: colors.darkText }}
                              >
                                Height (ft)
                              </Label>
                              <Input
                                type="number"
                                placeholder="10"
                                value={formData.hallHeight}
                                onChange={(e) =>
                                  updateFormData("hallHeight", e.target.value)
                                }
                                min="0"
                                step="0.1"
                                style={{
                                  borderColor: colors.secondary,
                                } as any}
                              />
                            </div>
                          </div>
                        </motion.div>
                      </CardContent>
                    </>
                  )}

                  {/* Step 3: Design & Lighting */}
                  {currentStep === 2 && (
                    <>
                      <CardHeader style={{ backgroundColor: `${colors.light}40` }}>
                        <CardTitle style={{ color: colors.primary }}>
                          Design & Lighting
                        </CardTitle>
                        <CardDescription style={{ color: colors.darkText }}>
                          Customize your VR environment
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4 pt-6 max-h-96 overflow-y-auto">
                        <motion.div variants={fadeInUp} className="space-y-2">
                          <Label
                            htmlFor="wallColor"
                            style={{ color: colors.primary }}
                            className="font-semibold"
                          >
                            Wall Color
                          </Label>
                          <div className="flex gap-2">
                            <Select
                              value={formData.wallColor}
                              onValueChange={(value) =>
                                updateFormData("wallColor", value)
                              }
                            >
                              <SelectTrigger
                                id="wallColor"
                                className="transition-all duration-300 rounded-2xl flex-1"
                                style={{
                                  borderColor: colors.secondary,
                                } as any}
                              >
                                <SelectValue placeholder="Select wall color" />
                              </SelectTrigger>
                              <SelectContent>
                                {wallColorOptions.map((color) => (
                                  <SelectItem
                                    key={color.value}
                                    value={color.value}
                                  >
                                    <div className="flex items-center gap-2">
                                      <div
                                        className="w-4 h-4 rounded border"
                                        style={{
                                          backgroundColor: color.hex,
                                          borderColor: colors.secondary,
                                        }}
                                      />
                                      {color.label}
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <div
                              className="w-12 h-10 rounded-lg border-2"
                              style={{
                                backgroundColor: getWallColorHex(),
                                borderColor: colors.secondary,
                              }}
                            />
                          </div>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="space-y-2">
                          <Label
                            htmlFor="flooring"
                            style={{ color: colors.primary }}
                            className="font-semibold"
                          >
                            Flooring Type
                          </Label>
                          <Select
                            value={formData.flooringType}
                            onValueChange={(value) =>
                              updateFormData("flooringType", value)
                            }
                          >
                            <SelectTrigger
                              id="flooring"
                              className="transition-all duration-300 rounded-2xl"
                              style={{
                                borderColor: colors.secondary,
                              } as any}
                            >
                              <SelectValue placeholder="Select flooring type" />
                            </SelectTrigger>
                            <SelectContent>
                              {flooringOptions.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="space-y-2">
                          <Label
                            htmlFor="lighting"
                            style={{ color: colors.primary }}
                            className="font-semibold"
                          >
                            Lighting Type
                          </Label>
                          <Select
                            value={formData.lightingType}
                            onValueChange={(value) =>
                              updateFormData("lightingType", value)
                            }
                          >
                            <SelectTrigger
                              id="lighting"
                              className="transition-all duration-300 rounded-2xl"
                              style={{
                                borderColor: colors.secondary,
                              } as any}
                            >
                              <SelectValue placeholder="Select lighting type" />
                            </SelectTrigger>
                            <SelectContent>
                              {lightingOptions.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="space-y-2">
                          <Label
                            htmlFor="ceiling"
                            style={{ color: colors.primary }}
                            className="font-semibold"
                          >
                            Ceiling Type
                          </Label>
                          <Select
                            value={formData.ceilingType}
                            onValueChange={(value) =>
                              updateFormData("ceilingType", value)
                            }
                          >
                            <SelectTrigger
                              id="ceiling"
                              className="transition-all duration-300 rounded-2xl"
                              style={{
                                borderColor: colors.secondary,
                              } as any}
                            >
                              <SelectValue placeholder="Select ceiling type" />
                            </SelectTrigger>
                            <SelectContent>
                              {ceilingOptions.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="space-y-2">
                          <Label
                            htmlFor="furniture"
                            style={{ color: colors.primary }}
                            className="font-semibold"
                          >
                            Furniture Quality
                          </Label>
                          <Select
                            value={formData.furnitureQuality}
                            onValueChange={(value) =>
                              updateFormData("furnitureQuality", value)
                            }
                          >
                            <SelectTrigger
                              id="furniture"
                              className="transition-all duration-300 rounded-2xl"
                              style={{
                                borderColor: colors.secondary,
                              } as any}
                            >
                              <SelectValue placeholder="Select furniture quality" />
                            </SelectTrigger>
                            <SelectContent>
                              {furnitureQualityOptions.map((quality) => (
                                <SelectItem key={quality} value={quality}>
                                  {quality}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="space-y-2">
                          <Label
                            htmlFor="accessories"
                            style={{ color: colors.primary }}
                            className="font-semibold"
                          >
                            Accessories Level
                          </Label>
                          <Select
                            value={formData.accessoriesLevel}
                            onValueChange={(value) =>
                              updateFormData("accessoriesLevel", value)
                            }
                          >
                            <SelectTrigger
                              id="accessories"
                              className="transition-all duration-300 rounded-2xl"
                              style={{
                                borderColor: colors.secondary,
                              } as any}
                            >
                              <SelectValue placeholder="Select accessories level" />
                            </SelectTrigger>
                            <SelectContent>
                              {accessoriesLevelOptions.map((level) => (
                                <SelectItem key={level} value={level}>
                                  {level}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="space-y-2">
                          <Label
                            htmlFor="notes"
                            style={{ color: colors.primary }}
                            className="font-semibold"
                          >
                            Additional Notes
                          </Label>
                          <Textarea
                            id="notes"
                            placeholder="Any special customizations or preferences for your VR experience..."
                            value={formData.additionalNotes}
                            onChange={(e) =>
                              updateFormData("additionalNotes", e.target.value)
                            }
                            className="min-h-20 transition-all duration-300 rounded-2xl"
                            style={{
                              borderColor: colors.secondary,
                            } as any}
                          />
                        </motion.div>
                      </CardContent>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>

              <CardFooter className="flex justify-between pt-6 pb-4 gap-2">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className="flex items-center gap-1 transition-all duration-300 rounded-2xl font-semibold"
                    style={{
                      borderColor: colors.secondary,
                      color: currentStep === 0 ? "#999" : colors.primary,
                    }}
                  >
                    <ChevronLeft className="h-4 w-4" /> Back
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    type="button"
                    onClick={
                      currentStep === steps.length - 1 ? handleSubmit : nextStep
                    }
                    disabled={!isStepValid() || isSubmitting}
                    className="flex items-center gap-1 transition-all duration-300 rounded-2xl font-semibold text-white"
                    style={{
                      backgroundColor: !isStepValid() || isSubmitting
                        ? "#ccc"
                        : colors.primary,
                      color: colors.lightText,
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Connecting...
                      </>
                    ) : (
                      <>
                        {currentStep === steps.length - 1
                          ? "Connect to VR"
                          : "Next"}
                        {currentStep === steps.length - 1 ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </>
                    )}
                  </Button>
                </motion.div>
              </CardFooter>
            </div>
          </Card>
        </motion.div>

        {/* Step indicator */}
        <motion.div
          className="mt-4 text-center text-sm"
          style={{ color: colors.darkText }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
        </motion.div>
      </div>

      {/* VR Confirmation Modal Component */}
      {showConfirmation && (
        <VRConfirmationModal
          formData={formData}
          onClose={handleConfirmationClose}
          colors={colors}
        />
      )}
    </>
  );
};

export default ViewOnVRForm;
