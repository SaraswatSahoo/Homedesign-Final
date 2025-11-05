"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

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

interface VRConfirmationModalProps {
  formData: VRFormData;
  onClose: () => void;
  colors: ColorTheme;
}

const wallColorMap: { [key: string]: string } = {
  "soft-white": "#F5F5F0",
  "warm-beige": "#E8DCC8",
  "light-gray": "#D3D3D3",
  "sage-green": "#9CAF88",
  "dusty-blue": "#8B9DB5",
  "warm-taupe": "#A89968",
  "cream": "#FFFDD0",
  "light-pink": "#FFB6C1",
  "soft-yellow": "#FFFFE0",
  "pale-green": "#D9E8D9",
};

const VRConfirmationModal = ({
  formData,
  onClose,
  colors,
}: VRConfirmationModalProps) => {
  const getWallColorHex = (colorValue: string): string => {
    return wallColorMap[colorValue] || "#F5F5F0";
  };

  const formatDimension = (length: string, width: string, height: string): string => {
    if (!length || !width || !height) return "Not specified";
    return `${length} × ${width} × ${height} ft`;
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
      >
        {/* Modal Content */}
        <div className="p-8">
          {/* VR Headset Animation */}
          <motion.div
            className="flex justify-center mb-6"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-4xl"
              style={{ backgroundColor: `${colors.primary}20` }}
            >
              🥽
            </div>
          </motion.div>

          {/* Title */}
          <motion.h2
            className="text-center text-2xl font-bold mb-2"
            style={{ color: colors.primary }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            VR Ready! 🎮
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className="text-center text-sm mb-6"
            style={{ color: colors.darkText }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Your space is loaded and ready for customization in VR.
          </motion.p>

          {/* Summary Box */}
          <motion.div
            className="rounded-lg p-4 space-y-3 mb-6 max-h-64 overflow-y-auto"
            style={{ backgroundColor: `${colors.light}60` }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {/* Row 1: Configuration */}
            <div className="flex justify-between items-center border-b pb-2" style={{ borderColor: `${colors.secondary}30` }}>
              <span
                className="text-sm font-semibold"
                style={{ color: colors.primary }}
              >
                Configuration:
              </span>
              <span className="text-sm font-medium" style={{ color: colors.darkText }}>
                {formData.bhkType || "Not selected"}
              </span>
            </div>

            {/* Row 2: Total Area */}
            <div className="flex justify-between items-center border-b pb-2" style={{ borderColor: `${colors.secondary}30` }}>
              <span
                className="text-sm font-semibold"
                style={{ color: colors.primary }}
              >
                Total Area:
              </span>
              <span className="text-sm font-medium" style={{ color: colors.darkText }}>
                {formData.totalArea ? `${formData.totalArea} sq ft` : "Not specified"}
              </span>
            </div>

            {/* Row 3: Furnishing Style */}
            <div className="flex justify-between items-center border-b pb-2" style={{ borderColor: `${colors.secondary}30` }}>
              <span
                className="text-sm font-semibold"
                style={{ color: colors.primary }}
              >
                Style:
              </span>
              <span className="text-sm font-medium" style={{ color: colors.darkText }}>
                {formData.furnishingStyle || "Not selected"}
              </span>
            </div>

            {/* Row 4: Room Purpose */}
            <div className="flex justify-between items-center border-b pb-2" style={{ borderColor: `${colors.secondary}30` }}>
              <span
                className="text-sm font-semibold"
                style={{ color: colors.primary }}
              >
                Purpose:
              </span>
              <span className="text-sm font-medium" style={{ color: colors.darkText }}>
                {formData.roomPurpose || "Not selected"}
              </span>
            </div>

            {/* Row 5: Master Bedroom Dimensions */}
            <div className="flex justify-between items-start border-b pb-2" style={{ borderColor: `${colors.secondary}30` }}>
              <span
                className="text-sm font-semibold"
                style={{ color: colors.primary }}
              >
                Master BR:
              </span>
              <span className="text-sm font-medium text-right" style={{ color: colors.darkText }}>
                {formatDimension(
                  formData.masterBedroomLength,
                  formData.masterBedroomWidth,
                  formData.masterBedroomHeight
                )}
              </span>
            </div>

            {/* Row 6: Kitchen Dimensions */}
            <div className="flex justify-between items-start border-b pb-2" style={{ borderColor: `${colors.secondary}30` }}>
              <span
                className="text-sm font-semibold"
                style={{ color: colors.primary }}
              >
                Kitchen:
              </span>
              <span className="text-sm font-medium text-right" style={{ color: colors.darkText }}>
                {formatDimension(
                  formData.kitchenLength,
                  formData.kitchenWidth,
                  formData.kitchenHeight
                )}
              </span>
            </div>

            {/* Row 7: Hall Dimensions */}
            <div className="flex justify-between items-start border-b pb-2" style={{ borderColor: `${colors.secondary}30` }}>
              <span
                className="text-sm font-semibold"
                style={{ color: colors.primary }}
              >
                Hall:
              </span>
              <span className="text-sm font-medium text-right" style={{ color: colors.darkText }}>
                {formatDimension(
                  formData.hallLength,
                  formData.hallWidth,
                  formData.hallHeight
                )}
              </span>
            </div>

            {/* Row 8: Flooring Type */}
            <div className="flex justify-between items-center border-b pb-2" style={{ borderColor: `${colors.secondary}30` }}>
              <span
                className="text-sm font-semibold"
                style={{ color: colors.primary }}
              >
                Flooring:
              </span>
              <span className="text-sm font-medium" style={{ color: colors.darkText }}>
                {formData.flooringType || "Not selected"}
              </span>
            </div>

            {/* Row 9: Lighting Type */}
            <div className="flex justify-between items-center border-b pb-2" style={{ borderColor: `${colors.secondary}30` }}>
              <span
                className="text-sm font-semibold"
                style={{ color: colors.primary }}
              >
                Lighting:
              </span>
              <span className="text-sm font-medium" style={{ color: colors.darkText }}>
                {formData.lightingType || "Not selected"}
              </span>
            </div>

            {/* Row 10: Ceiling Type */}
            <div className="flex justify-between items-center border-b pb-2" style={{ borderColor: `${colors.secondary}30` }}>
              <span
                className="text-sm font-semibold"
                style={{ color: colors.primary }}
              >
                Ceiling:
              </span>
              <span className="text-sm font-medium" style={{ color: colors.darkText }}>
                {formData.ceilingType || "Not selected"}
              </span>
            </div>

            {/* Row 11: Furniture Quality */}
            <div className="flex justify-between items-center border-b pb-2" style={{ borderColor: `${colors.secondary}30` }}>
              <span
                className="text-sm font-semibold"
                style={{ color: colors.primary }}
              >
                Furniture:
              </span>
              <span className="text-sm font-medium" style={{ color: colors.darkText }}>
                {formData.furnitureQuality || "Not selected"}
              </span>
            </div>

            {/* Row 12: Accessories Level */}
            <div className="flex justify-between items-center border-b pb-2" style={{ borderColor: `${colors.secondary}30` }}>
              <span
                className="text-sm font-semibold"
                style={{ color: colors.primary }}
              >
                Accessories:
              </span>
              <span className="text-sm font-medium" style={{ color: colors.darkText }}>
                {formData.accessoriesLevel || "Not selected"}
              </span>
            </div>

            {/* Row 13: Wall Color */}
            <div className="flex justify-between items-center">
              <span
                className="text-sm font-semibold"
                style={{ color: colors.primary }}
              >
                Wall Color:
              </span>
              <div className="flex items-center gap-2">
                <div
                  className="w-5 h-5 rounded border-2"
                  style={{
                    backgroundColor: getWallColorHex(formData.wallColor),
                    borderColor: colors.secondary,
                  }}
                />
                <span className="text-sm font-medium" style={{ color: colors.darkText }}>
                  {formData.wallColor
                    ? formData.wallColor.replace(/-/g, " ").toUpperCase()
                    : "Not selected"}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Additional Notes - if present */}
          {formData.additionalNotes && (
            <motion.div
              className="border rounded-lg p-3 mb-6"
              style={{
                backgroundColor: `${colors.primary}05`,
                borderColor: `${colors.secondary}30`,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65 }}
            >
              <p
                className="text-xs font-medium mb-1"
                style={{ color: colors.primary }}
              >
                📝 Notes:
              </p>
              <p
                className="text-xs"
                style={{ color: colors.darkText }}
              >
                {formData.additionalNotes}
              </p>
            </motion.div>
          )}

          {/* Instructions */}
          <motion.div
            className="border rounded-lg p-3 mb-6"
            style={{
              backgroundColor: `${colors.primary}10`,
              borderColor: colors.secondary,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p className="text-xs" style={{ color: colors.primary }}>
              ✓ Your VR environment is ready. Put on your headset to begin exploring and customizing your design!
            </p>
          </motion.div>

          {/* Buttons */}
          <motion.div
            className="flex flex-col gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <Button
              onClick={onClose}
              className="w-full rounded-2xl text-white font-semibold py-2 transition-all hover:opacity-90"
              style={{ backgroundColor: colors.primary }}
            >
              Back to Home
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default VRConfirmationModal;
