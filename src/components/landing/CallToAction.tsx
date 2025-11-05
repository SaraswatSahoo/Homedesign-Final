"use client";
import { useNavigate } from 'react-router';
import { ButtonColorful } from '../ui/button-colorful';
import { motion } from 'framer-motion';

export default function CallToAction() {

    const navigate = useNavigate();

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center bg-[#99582a]/10 rounded-3xl"
        >
            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-4xl sm:text-5xl font-bold text-[#99582a] mb-6"
            >
                Ready to Transform Your Dream Home?
            </motion.h2>
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-lg sm:text-xl text-[#99582a]/80 mb-10 max-w-2xl"
            >
                Take the first step towards creating your perfect living space. Our expert team is ready to bring your vision to life.
            </motion.p>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <ButtonColorful 
                    label="view in VR" 
                    size="xl"
                    className="shadow-lg shadow-[#99582a]/20 hover:shadow-xl hover:shadow-[#99582a]/30 transition-shadow"
                    onClick={() => navigate("/viewonvr")}
                />
            </motion.div>
        </motion.div>
    );
}