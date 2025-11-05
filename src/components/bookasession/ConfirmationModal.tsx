"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FormData {
  name: string;
  email: string;
  phone: string;
  houseType: string;
  location: string;
  appointmentDate: string;
  timeSlot: string;
}

interface SelectedCenter {
  id: string;
  name: string;
}

interface Colors {
  primary: string;
  secondary: string;
  light: string;
  darkText: string;
  lightText: string;
}

interface ConfirmationModalProps {
  formData: FormData;
  selectedCenter: SelectedCenter | undefined;
  onClose: () => void;
  colors: Colors;
}

const ConfirmationModal = ({
  formData,
  selectedCenter,
  onClose,
  colors,
}: ConfirmationModalProps) => {
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
          {/* Success Icon */}
          <motion.div
            className="flex justify-center mb-6"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${colors.primary}20` }}
            >
              <Check className="w-8 h-8" style={{ color: colors.primary }} />
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
            Booking Confirmed! 🎉
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className="text-center text-sm mb-6"
            style={{ color: colors.darkText }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Your free design consultation has been successfully scheduled.
          </motion.p>

          {/* Details Box */}
          <motion.div
            className="rounded-lg p-4 space-y-3 mb-6"
            style={{ backgroundColor: `${colors.light}60` }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex justify-between">
              <span 
                className="text-sm font-semibold"
                style={{ color: colors.primary }}
              >
                Name:
              </span>
              <span className="text-sm" style={{ color: colors.darkText }}>
                {formData.name}
              </span>
            </div>
            <div className="flex justify-between">
              <span 
                className="text-sm font-semibold"
                style={{ color: colors.primary }}
              >
                Email:
              </span>
              <span className="text-sm" style={{ color: colors.darkText }}>
                {formData.email}
              </span>
            </div>
            <div className="flex justify-between">
              <span 
                className="text-sm font-semibold"
                style={{ color: colors.primary }}
              >
                Phone:
              </span>
              <span className="text-sm" style={{ color: colors.darkText }}>
                {formData.phone}
              </span>
            </div>
            <div className="flex justify-between">
              <span 
                className="text-sm font-semibold"
                style={{ color: colors.primary }}
              >
                House Type:
              </span>
              <span className="text-sm capitalize" style={{ color: colors.darkText }}>
                {formData.houseType}
              </span>
            </div>
            <div className="flex justify-between">
              <span 
                className="text-sm font-semibold"
                style={{ color: colors.primary }}
              >
                Location:
              </span>
              <span className="text-sm" style={{ color: colors.darkText }}>
                {formData.location}
              </span>
            </div>
            {selectedCenter && (
              <>
                <div className="flex justify-between">
                  <span 
                    className="text-sm font-semibold"
                    style={{ color: colors.primary }}
                  >
                    Center:
                  </span>
                  <span className="text-sm" style={{ color: colors.darkText }}>
                    {selectedCenter.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span 
                    className="text-sm font-semibold"
                    style={{ color: colors.primary }}
                  >
                    Date:
                  </span>
                  <span className="text-sm" style={{ color: colors.darkText }}>
                    {formData.appointmentDate}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span 
                    className="text-sm font-semibold"
                    style={{ color: colors.primary }}
                  >
                    Time:
                  </span>
                  <span className="text-sm" style={{ color: colors.darkText }}>
                    {formData.timeSlot}
                  </span>
                </div>
              </>
            )}
          </motion.div>

          {/* Confirmation Message */}
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
            <p 
              className="text-sm"
              style={{ color: colors.primary }}
            >
              ✓ A confirmation email has been sent to{" "}
              <strong>{formData.email}</strong>
            </p>
          </motion.div>

          {/* Close Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <Button
              onClick={onClose}
              className="w-full rounded-2xl text-white font-semibold py-2"
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

export default ConfirmationModal;
