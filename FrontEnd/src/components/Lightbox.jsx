import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard } from 'swiper/modules';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Lightbox = ({ images, initialIndex = 0, onClose }) => {
  useEffect(() => {
    // Lock body scroll when open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer"
        aria-label="Close Lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-5xl h-[80vh] px-4 flex items-center justify-center relative"
      >
        <Swiper
          initialSlide={initialIndex}
          modules={[Navigation, Pagination, Keyboard]}
          navigation
          pagination={{ clickable: true, type: 'fraction' }}
          keyboard={{ enabled: true }}
          className="w-full h-full rounded-sm overflow-hidden"
        >
          {images.map((img, idx) => (
            <SwiperSlide key={idx} className="flex items-center justify-center bg-black/40">
              <img
                src={img}
                alt={`Property Image ${idx + 1}`}
                className="max-w-full max-h-full object-contain select-none"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </div>
  );
};

export default Lightbox;
