import { useCallback, useState } from 'react';
import { Quote, Play } from 'lucide-react';
import { COMPANY_INFO } from '../../constants';
import AnimatedImage from '../AnimatedImage';
import VideoModal from '../VideoModal';
import LOGO from '../../assets/images/logo.png';

const MD_VIDEO = '/videos/bright-paper-video.mp4';
const MD_VIDEO_POSTER = '/videos/bright-paper-video-poster.jpg';
const MD_COVER = '/videos/md-cutout.webp';

export default function MDMessage() {
  const [videoOpen, setVideoOpen] = useState(false);
  const years = new Date().getFullYear() - COMPANY_INFO.establishedYear;
  const closeVideo = useCallback(() => setVideoOpen(false), []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <button
              type="button"
              onClick={() => setVideoOpen(true)}
              aria-label="Play message from our Managing Director"
              className="md-cover group relative block w-full aspect-[4/3] overflow-hidden rounded-2xl shadow-strong text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/50"
            >
              {/* Spotlight behind the MD */}
              <span className="md-cover-spot absolute bottom-0 left-[2%] h-[95%] w-[56%]" />

              {/* MD cut-out portrait */}
              <AnimatedImage
                src={MD_COVER}
                alt="Arun Asawa, Managing Director"
                containerClassName="absolute bottom-0 left-[3%] h-[96%] w-[52%]"
                className="md-cover-portrait h-full w-full object-contain object-bottom origin-bottom transition-transform duration-700 group-hover:scale-[1.03]"
                direction="up"
                delay={0.1}
              />

              {/* Years of excellence */}
              <span className="absolute right-[6%] top-[6%] flex w-[44%] flex-col items-center text-center">
                <span className="gold-3d block font-black leading-[0.85] text-[26cqw] tracking-tighter">
                  {years}
                </span>
                <span className="gold-3d block font-extrabold leading-none text-[9.5cqw] tracking-[0.08em]">
                  YEARS
                </span>
                <span className="gold-3d mt-[1.2cqw] block whitespace-nowrap font-extrabold leading-none text-[4.8cqw] tracking-wide">
                  OF EXCELLENCE
                </span>
                <span className="mt-[2.5cqw] block rounded-md bg-white px-[1.8cqw] py-[0.8cqw] shadow-medium">
                  <img src={LOGO} alt="Bright Paper" className="block h-[5.5cqw] w-auto" />
                </span>
              </span>

              {/* Play button with ripple rings */}
              <span className="absolute -bottom-[13cqw] -right-[13cqw] flex h-[40cqw] w-[40cqw] items-center justify-center">
                <span className="absolute inset-0 rounded-full bg-primary/15" />
                <span className="absolute inset-[14%] rounded-full bg-primary/20" />
                <span className="absolute inset-[30%] rounded-full bg-primary/40 animate-ping" />
                <span className="relative -translate-x-[4cqw] -translate-y-[4cqw] flex h-[13cqw] w-[13cqw] items-center justify-center rounded-full bg-primary text-white shadow-strong transition-transform duration-300 group-hover:scale-110">
                  <Play className="ml-[0.6cqw] h-[6cqw] w-[6cqw]" fill="currentColor" />
                </span>
              </span>            </button>
            <VideoModal
              open={videoOpen}
              onClose={closeVideo}
              src={MD_VIDEO}
              poster={MD_VIDEO_POSTER}
              title="Message from our Managing Director"
            />
          </div>

          <div>
            <Quote className="text-primary mb-6" size={48} />
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
              A Legacy of Trust and Quality
            </h2>
            <div className="space-y-4 text-lg text-neutral-700 leading-relaxed sm:text-justify">
              <p>
                For over {new Date().getFullYear() - COMPANY_INFO.establishedYear} years, {COMPANY_INFO.name} has been at the forefront of delivering premium paper products to industries across India.
              </p>
              <p>
                Our commitment to excellence, sustainable practices, and customer satisfaction has earned us the trust of {COMPANY_INFO.dealerCount} customers nationwide.
              </p>
              <p>
                As we continue to grow and innovate, we remain dedicated to our founding principles: quality, reliability, and environmental responsibility.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-neutral-200">
              <div className="font-semibold text-xl text-neutral-900">Leadership Team</div>
              <div className="text-neutral-600">{COMPANY_INFO.name}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
