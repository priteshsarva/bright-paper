import { useNavigate } from 'react-router-dom';
import { ArrowRight, Mail } from 'lucide-react';
import { useRef } from 'react';
import { motion, MotionConfig, useInView } from 'framer-motion';
import Button from '../Button';
import { slideIn } from '../../utils/animations';

export default function CTASection() {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 'some' });

  return (
    <MotionConfig reducedMotion="user">
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-[#E2752E] to-[#DB6619] overflow-hidden">
      <motion.div {...slideIn(-160, inView)} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <Mail className="text-white mx-auto mb-6" size={64} />
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl font-medium text-white mb-10 leading-relaxed">
            Contact us today for bulk orders, dealer partnerships, or to learn more about our premium paper products
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigate('/contact')}
              className="bg-white text-black hover:bg-neutral-100 hover:text-white shadow-lg"
            >
              Submit Inquiry
              <ArrowRight className="inline ml-2" size={20} />
            </Button>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigate('/products')}
              className="bg-white text-black hover:bg-neutral-100 hover:text-white shadow-lg"
            // className="border-white text-white hover:bg-white hover:text-black"
            >
              Browse Products
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
    </MotionConfig>
  );
}
