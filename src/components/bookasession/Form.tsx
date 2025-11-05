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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import ConfirmationModal from "./ConfirmationModal";

const steps = [
  { id: "house-details", title: "House Details" },
  { id: "contact-info", title: "Contact Info" },
  { id: "preferences", title: "Preferences" },
  { id: "schedule", title: "Schedule Visit" },
];

interface FormData {
  // Step 1: House Details
  houseType: string;
  location: string;
  budgetRange: string;
  area: string;
  // Step 2: Contact Info
  name: string;
  email: string;
  phone: string;
  // Step 3: Preferences
  preferredStyles: string[];
  preferences: string;
  // Step 4: Schedule
  experienceCenter: string;
  appointmentDate: string;
  timeSlot: string;
  specialRequirements: string;
}

interface LocationData {
  city: string;
  state: string;
  latitude: number;
  longitude: number;
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

const BookFreeSessionForm = ({ onBackToHome }: { onBackToHome: () => void }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [detectedLocation, setDetectedLocation] = useState<LocationData | null>(
    null
  );
  const [formData, setFormData] = useState<FormData>({
    houseType: "",
    location: "",
    budgetRange: "",
    area: "",
    name: "",
    email: "",
    phone: "",
    preferredStyles: [],
    preferences: "",
    experienceCenter: "",
    appointmentDate: "",
    timeSlot: "",
    specialRequirements: "",
  });

  const colors = {
    primary: "black", // Primary brown
    secondary: "black", // Secondary brown
    light: "#ffe6a7", // Light cream
    darkText: "#333333",
    lightText: "#ffffff",
  };

  const houseStyles = [
    "Modern",
    "Traditional",
    "Contemporary",
    "Minimalist",
    "Industrial",
    "Scandinavian",
    "Mediterranean",
    "Bohemian",
  ];

  const budgetRanges = [
    "Under ₹5 Lakhs",
    "₹5 - 10 Lakhs",
    "₹10 - 20 Lakhs",
    "₹20 - 50 Lakhs",
    "Above ₹50 Lakhs",
  ];

  const timeSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
  ];

  const experienceCenters = [
    {
      id: "1",
      name: "Downtown Experience Center",
      address: "123 Main Street, Downtown",
      distance: "2.5 km",
      city: "New York",
      state: "NY",
      latitude: 40.7128,
      longitude: -74.006,
    },
    {
      id: "2",
      name: "Uptown Design Hub",
      address: "456 Fashion Avenue, Uptown",
      distance: "4.8 km",
      city: "New York",
      state: "NY",
      latitude: 40.7282,
      longitude: -73.9942,
    },
    {
      id: "3",
      name: "Westside Studio",
      address: "789 Creative Lane, West District",
      distance: "6.2 km",
      city: "Boston",
      state: "MA",
      latitude: 42.3601,
      longitude: -71.0589,
    },
    {
      id: "4",
      name: "Riverside Gallery",
      address: "321 Park Road, Riverside",
      distance: "8.1 km",
      city: "Los Angeles",
      state: "CA",
      latitude: 34.0522,
      longitude: -118.2437,
    },
  ];

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleStyle = (style: string) => {
    setFormData((prev) => {
      const styles = [...prev.preferredStyles];
      if (styles.includes(style)) {
        return {
          ...prev,
          preferredStyles: styles.filter((s) => s !== style),
        };
      } else {
        return { ...prev, preferredStyles: [...styles, style] };
      }
    });
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

  // Reverse geocoding function
  const reverseGeocode = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      const data = await response.json();

      const city = data.address?.city || data.address?.town || "Unknown City";
      const state =
        data.address?.state || data.address?.county || "Unknown State";

      return { city, state, latitude, longitude };
    } catch (error) {
      console.error("Reverse geocoding failed:", error);
      return null;
    }
  };

  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const locationData = await reverseGeocode(latitude, longitude);

          if (locationData) {
            setDetectedLocation(locationData);
            updateFormData("location", `${locationData.city}, ${locationData.state}`);
            toast.success(
              `Location detected: ${locationData.city}, ${locationData.state}`
            );
          } else {
            toast.error("Could not determine city/state from coordinates");
          }
        },
        () => {
          toast.error("Unable to detect location");
        }
      );
    } else {
      toast.error("Geolocation not supported");
    }
  };

  // Calculate nearest centers based on detected location
  const getNearestCenters = () => {
    if (!detectedLocation) return experienceCenters;

    return [...experienceCenters].sort((a, b) => {
      const distanceA = Math.sqrt(
        Math.pow(a.latitude - detectedLocation.latitude, 2) +
          Math.pow(a.longitude - detectedLocation.longitude, 2)
      );
      const distanceB = Math.sqrt(
        Math.pow(b.latitude - detectedLocation.latitude, 2) +
          Math.pow(b.longitude - detectedLocation.longitude, 2)
      );
      return distanceA - distanceB;
    });
  };

  const handleSubmit = () => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowConfirmation(true);
    }, 1500);
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
    // Reset form
    setCurrentStep(0);
    setFormData({
      houseType: "",
      location: "",
      budgetRange: "",
      area: "",
      name: "",
      email: "",
      phone: "",
      preferredStyles: [],
      preferences: "",
      experienceCenter: "",
      appointmentDate: "",
      timeSlot: "",
      specialRequirements: "",
    });
    setDetectedLocation(null);
    // Redirect to home
    onBackToHome();
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return (
          formData.houseType !== "" &&
          formData.location.trim() !== "" &&
          formData.budgetRange !== "" &&
          formData.area.trim() !== ""
        );
      case 1:
        return (
          formData.name.trim() !== "" &&
          formData.email.trim() !== "" &&
          formData.phone.trim() !== ""
        );
      case 2:
        return formData.preferredStyles.length > 0;
      case 3:
        return (
          formData.experienceCenter !== "" &&
          formData.appointmentDate !== "" &&
          formData.timeSlot !== ""
        );
      default:
        return true;
    }
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  const selectedCenter = experienceCenters.find(
    (c) => c.id === formData.experienceCenter
  );

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
                  {/* Step 1: House Details */}
                  {currentStep === 0 && (
                    <>
                      <CardHeader style={{ backgroundColor: `${colors.light}40` }}>
                        <CardTitle style={{ color: colors.primary }}>
                          Tell us about your space
                        </CardTitle>
                        <CardDescription style={{ color: colors.darkText }}>
                          Help us understand your home better
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4 pt-6">
                        <motion.div variants={fadeInUp} className="space-y-2">
                          <Label style={{ color: colors.primary }} className="font-semibold">
                            What type of house do you have?
                          </Label>
                          <RadioGroup
                            value={formData.houseType}
                            onValueChange={(value) =>
                              updateFormData("houseType", value)
                            }
                            className="space-y-2"
                          >
                            {[
                              { value: "apartment", label: "Apartment" },
                              { value: "villa", label: "Villa" },
                              {
                                value: "independent",
                                label: "Independent House",
                              },
                            ].map((type, index) => (
                              <motion.div
                                key={type.value}
                                className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer transition-colors hover:bg-orange-50"
                                style={{
                                  borderColor:
                                    formData.houseType === type.value
                                      ? colors.primary
                                      : "#ddd",
                                  backgroundColor:
                                    formData.houseType === type.value
                                      ? `${colors.light}60`
                                      : "transparent",
                                }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ duration: 0.2 }}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{
                                  opacity: 1,
                                  x: 0,
                                  transition: {
                                    delay: 0.1 * index,
                                    duration: 0.3,
                                  },
                                }}
                              >
                                <RadioGroupItem
                                  value={type.value}
                                  id={`house-${index}`}
                                  style={{ color: colors.primary }}
                                />
                                <Label
                                  htmlFor={`house-${index}`}
                                  className="cursor-pointer w-full"
                                  style={{ color: colors.darkText }}
                                >
                                  {type.label}
                                </Label>
                              </motion.div>
                            ))}
                          </RadioGroup>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="space-y-2">
                          <Label htmlFor="location" style={{ color: colors.primary }} className="font-semibold">
                            Your Location
                          </Label>
                          <div className="flex gap-2">
                            <Input
                              id="location"
                              placeholder="Enter your city or area"
                              value={formData.location}
                              onChange={(e) =>
                                updateFormData("location", e.target.value)
                              }
                              className="transition-all duration-300 flex-1"
                              style={{
                                borderColor: colors.secondary,
                                "--tw-ring-color": colors.primary,
                              } as any}
                            />
                            <Button
                              type="button"
                              variant="outline"
                              onClick={detectLocation}
                              className="rounded-2xl font-semibold"
                              style={{
                                borderColor: colors.secondary,
                                color: colors.primary,
                              }}
                            >
                              📍 Detect
                            </Button>
                          </div>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="space-y-2">
                          <Label htmlFor="budget" style={{ color: colors.primary }} className="font-semibold">
                            Your Budget Range
                          </Label>
                          <Select
                            value={formData.budgetRange}
                            onValueChange={(value) =>
                              updateFormData("budgetRange", value)
                            }
                          >
                            <SelectTrigger
                              id="budget"
                              className="transition-all duration-300 rounded-2xl"
                              style={{
                                borderColor: colors.secondary,
                                "--tw-ring-color": colors.primary,
                              } as any}
                            >
                              <SelectValue placeholder="Select budget range" />
                            </SelectTrigger>
                            <SelectContent>
                              {budgetRanges.map((range) => (
                                <SelectItem key={range} value={range}>
                                  {range}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="space-y-2">
                          <Label htmlFor="area" style={{ color: colors.primary }} className="font-semibold">
                            Total Area (sq ft)
                          </Label>
                          <Input
                            id="area"
                            type="number"
                            placeholder="Enter total area"
                            value={formData.area}
                            onChange={(e) =>
                              updateFormData("area", e.target.value)
                            }
                            className="transition-all duration-300"
                            style={{
                              borderColor: colors.secondary,
                              "--tw-ring-color": colors.primary,
                            } as any}
                          />
                        </motion.div>
                      </CardContent>
                    </>
                  )}

                  {/* Step 2: Contact Info */}
                  {currentStep === 1 && (
                    <>
                      <CardHeader style={{ backgroundColor: `${colors.light}40` }}>
                        <CardTitle style={{ color: colors.primary }}>
                          Your Contact Information
                        </CardTitle>
                        <CardDescription style={{ color: colors.darkText }}>
                          How can we reach you?
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4 pt-6">
                        <motion.div variants={fadeInUp} className="space-y-2">
                          <Label htmlFor="name" style={{ color: colors.primary }} className="font-semibold">
                            Full Name
                          </Label>
                          <Input
                            id="name"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={(e) =>
                              updateFormData("name", e.target.value)
                            }
                            className="transition-all duration-300"
                            style={{
                              borderColor: colors.secondary,
                              "--tw-ring-color": colors.primary,
                            } as any}
                          />
                        </motion.div>

                        <motion.div variants={fadeInUp} className="space-y-2">
                          <Label htmlFor="email" style={{ color: colors.primary }} className="font-semibold">
                            Email Address
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={(e) =>
                              updateFormData("email", e.target.value)
                            }
                            className="transition-all duration-300"
                            style={{
                              borderColor: colors.secondary,
                              "--tw-ring-color": colors.primary,
                            } as any}
                          />
                        </motion.div>

                        <motion.div variants={fadeInUp} className="space-y-2">
                          <Label htmlFor="phone" style={{ color: colors.primary }} className="font-semibold">
                            Phone Number
                          </Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="Enter your 10-digit phone number"
                            value={formData.phone}
                            onChange={(e) =>
                              updateFormData("phone", e.target.value)
                            }
                            className="transition-all duration-300"
                            style={{
                              borderColor: colors.secondary,
                              "--tw-ring-color": colors.primary,
                            } as any}
                          />
                        </motion.div>
                      </CardContent>
                    </>
                  )}

                  {/* Step 3: Design Preferences */}
                  {currentStep === 2 && (
                    <>
                      <CardHeader style={{ backgroundColor: `${colors.light}40` }}>
                        <CardTitle style={{ color: colors.primary }}>
                          Design Preferences
                        </CardTitle>
                        <CardDescription style={{ color: colors.darkText }}>
                          Select your preferred styles
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4 pt-6">
                        <motion.div variants={fadeInUp} className="space-y-2">
                          <Label style={{ color: colors.primary }} className="font-semibold">
                            Preferred Design Styles
                          </Label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {houseStyles.map((style, index) => (
                              <motion.div
                                key={style}
                                className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer transition-colors"
                                style={{
                                  borderColor:
                                    formData.preferredStyles.includes(style)
                                      ? colors.primary
                                      : "#ddd",
                                  backgroundColor:
                                    formData.preferredStyles.includes(style)
                                      ? `${colors.light}60`
                                      : "transparent",
                                }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ duration: 0.2 }}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{
                                  opacity: 1,
                                  y: 0,
                                  transition: {
                                    delay: 0.05 * index,
                                    duration: 0.3,
                                  },
                                }}
                                onClick={() => toggleStyle(style)}
                              >
                                <Checkbox
                                  id={`style-${style}`}
                                  checked={formData.preferredStyles.includes(
                                    style
                                  )}
                                  onCheckedChange={() => toggleStyle(style)}
                                  style={{
                                    borderColor: colors.primary,
                                  }}
                                />
                                <Label
                                  htmlFor={`style-${style}`}
                                  className="cursor-pointer w-full"
                                  style={{ color: colors.darkText }}
                                >
                                  {style}
                                </Label>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="space-y-2">
                          <Label htmlFor="preferences" style={{ color: colors.primary }} className="font-semibold">
                            Any other preferences or requirements?
                          </Label>
                          <Textarea
                            id="preferences"
                            placeholder="Tell us about any specific requirements..."
                            value={formData.preferences}
                            onChange={(e) =>
                              updateFormData("preferences", e.target.value)
                            }
                            className="min-h-20 transition-all duration-300"
                            style={{
                              borderColor: colors.secondary,
                              "--tw-ring-color": colors.primary,
                            } as any}
                          />
                        </motion.div>
                      </CardContent>
                    </>
                  )}

                  {/* Step 4: Schedule Visit */}
                  {currentStep === 3 && (
                    <>
                      <CardHeader style={{ backgroundColor: `${colors.light}40` }}>
                        <CardTitle style={{ color: colors.primary }}>
                          Schedule Your Visit
                        </CardTitle>
                        <CardDescription style={{ color: colors.darkText }}>
                          Choose your preferred experience center and time
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4 pt-6">
                        <motion.div variants={fadeInUp} className="space-y-2">
                          <Label htmlFor="center" style={{ color: colors.primary }} className="font-semibold">
                            Select Nearest Experience Center
                          </Label>
                          <Select
                            value={formData.experienceCenter}
                            onValueChange={(value) =>
                              updateFormData("experienceCenter", value)
                            }
                          >
                            <SelectTrigger
                              id="center"
                              className="transition-all duration-300 rounded-2xl"
                              style={{
                                borderColor: colors.secondary,
                                "--tw-ring-color": colors.primary,
                              } as any}
                            >
                              <SelectValue placeholder="Select experience center" />
                            </SelectTrigger>
                            <SelectContent>
                              {getNearestCenters().map((center) => (
                                <SelectItem key={center.id} value={center.id}>
                                  <div className="flex flex-col">
                                    <span>{center.name}</span>
                                    <span className="text-xs text-muted-foreground">
                                      {center.distance} • {center.city},{" "}
                                      {center.state}
                                    </span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {selectedCenter && (
                            <div 
                              className="p-3 rounded-md border"
                              style={{
                                backgroundColor: `${colors.light}60`,
                                borderColor: colors.secondary,
                              }}
                            >
                              <p 
                                className="font-medium text-sm"
                                style={{ color: colors.primary }}
                              >
                                {selectedCenter.name}
                              </p>
                              <p className="text-xs" style={{ color: colors.darkText }}>
                                {selectedCenter.address}
                              </p>
                              <p className="text-xs" style={{ color: colors.darkText }}>
                                📍 {selectedCenter.distance}
                              </p>
                            </div>
                          )}
                        </motion.div>

                        <motion.div variants={fadeInUp} className="space-y-2">
                          <Label htmlFor="date" style={{ color: colors.primary }} className="font-semibold">
                            Preferred Appointment Date
                          </Label>
                          <Input
                            id="date"
                            type="date"
                            value={formData.appointmentDate}
                            onChange={(e) =>
                              updateFormData("appointmentDate", e.target.value)
                            }
                            min={getMinDate()}
                            className="transition-all duration-300"
                            style={{
                              borderColor: colors.secondary,
                              "--tw-ring-color": colors.primary,
                            } as any}
                          />
                        </motion.div>

                        <motion.div variants={fadeInUp} className="space-y-2">
                          <Label htmlFor="time" style={{ color: colors.primary }} className="font-semibold">
                            Preferred Time Slot
                          </Label>
                          <Select
                            value={formData.timeSlot}
                            onValueChange={(value) =>
                              updateFormData("timeSlot", value)
                            }
                          >
                            <SelectTrigger
                              id="time"
                              className="transition-all duration-300 rounded-2xl"
                              style={{
                                borderColor: colors.secondary,
                                "--tw-ring-color": colors.primary,
                              } as any}
                            >
                              <SelectValue placeholder="Select time slot" />
                            </SelectTrigger>
                            <SelectContent>
                              {timeSlots.map((slot) => (
                                <SelectItem key={slot} value={slot}>
                                  {slot}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="space-y-2">
                          <Label htmlFor="special" style={{ color: colors.primary }} className="font-semibold">
                            Special Requirements
                          </Label>
                          <Textarea
                            id="special"
                            placeholder="Any special requirements or accessibility needs..."
                            value={formData.specialRequirements}
                            onChange={(e) =>
                              updateFormData(
                                "specialRequirements",
                                e.target.value
                              )
                            }
                            className="min-h-20 transition-all duration-300"
                            style={{
                              borderColor: colors.secondary,
                              "--tw-ring-color": colors.primary,
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
                      backgroundColor: !isStepValid() || isSubmitting ? "#ccc" : colors.primary,
                      color: colors.lightText,
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Submitting...
                      </>
                    ) : (
                      <>
                        {currentStep === steps.length - 1
                          ? "Confirm Booking"
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

      {/* Confirmation Modal Component */}
      {showConfirmation && (
        <ConfirmationModal
          formData={formData}
          selectedCenter={selectedCenter}
          onClose={handleConfirmationClose}
          colors={colors}
        />
      )}
    </>
  );
};

export default BookFreeSessionForm;
