import { Quote } from 'lucide-react';
import Card from '../Card';
import { COMPANY_INFO } from '../../constants';
import MDSIR from '../../assets/images/1520152901291.jpg'

export default function MDMessage() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="aspect-square from-neutral-200 to-neutral-300 rounded-2xl flex items-center justify-center" >

              <img src={MDSIR} alt="" style={{
                width: "100%",
                // height: "100%",
                objectFit: "cover",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }} />

              {/* <div className="text-center">
                <div className="w-32 h-32 bg-neutral-400 rounded-full mx-auto mb-4"></div>
                <div className="text-neutral-600 font-medium">Managing Director</div>
              </div> */}
            </div>
          </div>

          <div>
            <Quote className="text-primary mb-6" size={48} />
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
              A Legacy of Trust and Quality
            </h2>
            <div className="space-y-4 text-lg text-neutral-700 leading-relaxed">
              <p>
                For over {new Date().getFullYear() - COMPANY_INFO.establishedYear} years, {COMPANY_INFO.name} has been at the forefront of delivering premium paper products to industries across India.
              </p>
              <p>
                Our commitment to excellence, sustainable practices, and customer satisfaction has earned us the trust of over {COMPANY_INFO.dealerCount} customers nationwide.
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
