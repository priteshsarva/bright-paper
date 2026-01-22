import { useState, FormEvent } from 'react';
import { MapPin, Mail, Phone, Clock, MessageSquare } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import SectionHeader from '../components/SectionHeader';
import Card from '../components/Card';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import { COMPANY_INFO, INQUIRY_TYPES } from '../constants';
import { supabase } from '../utils/supabase';
import { InquirySubmission } from '../types/database.types';
import backgroundImage from '../assets/images/bgOfAllheaders.jpeg';


export default function Contact() {
  const [formData, setFormData] = useState<InquirySubmission>({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
    inquiry_type: 'Bulk Order',
    product_interest: '',
    quantity: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    // Replace this with the URL you copied in Step 1
    const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbzmCWYyyViSwOgmS5vZJpaqsmxqtH9JsFXQsOPkG20POfmCqxSa4yG66uFf_Zi12vDjrg/exec';

    try {
      // 1. Save to Supabase (Existing logic)
      // const { error: insertError } = await supabase
      //   .from('inquiry_submissions')
      //   .insert([formData]);

      // if (insertError) throw insertError;

      // 2. Save to Google Sheets (Parallel logic)
      // Use 'no-cors' mode because Google Apps Script redirects cause CORS issues in browsers, 
      // but the data will still be sent successfully.
      await fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // 3. Success Handling
      setSuccess(true);
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        message: '',
        inquiry_type: 'Bulk Order',
        product_interest: '',
        quantity: ''
      });

      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error('Error submitting inquiry:', err);
      setError('Failed to submit inquiry. Please try again or contact us directly.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <section className="relative bg-gradient-to-br from-primary-50 to-white py-16 overflow-hidden">
        <img
          src={backgroundImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-100 blur-[0px] z-0"
        />
        <div className="relative z-10">
          <PageWrapper>
            <SectionHeader
              title="Contact Us"
              subtitle="Get in touch with us for inquiries, bulk orders, or partnership opportunities"
            />
          </PageWrapper>
        </div>
      </section>

      <PageWrapper>
        <section className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <Card hover>
              <MapPin className="text-primary mb-4" size={40} />
              <h3 className="text-xl font-bold text-neutral-900 mb-3">Address</h3>
              <p className="text-neutral-600">
                {COMPANY_INFO.address.street}<br />
                {COMPANY_INFO.address.city}, {COMPANY_INFO.address.state}<br />
                {COMPANY_INFO.address.country} - {COMPANY_INFO.address.pincode}
              </p>
            </Card>

            <Card hover>
              <Mail className="text-primary mb-4" size={40} />
              <h3 className="text-xl font-bold text-neutral-900 mb-3">Email</h3>
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="text-neutral-600 hover:text-primary transition-colors"
              >
                {COMPANY_INFO.email}
              </a>
              <p className="text-sm text-neutral-500 mt-2">
                We'll respond within 24 hours
              </p>
            </Card>

            <Card hover>
              <Phone className="text-primary mb-4" size={40} />
              <h3 className="text-xl font-bold text-neutral-900 mb-3">Phone</h3>
              <p className="text-neutral-600 mb-2">
                {COMPANY_INFO.phone}
              </p>
              <p className="text-sm text-neutral-500">
                WhatsApp: +{COMPANY_INFO.whatsapp}
              </p>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-neutral-900 mb-6">Send Us an Inquiry</h2>
              <p className="text-neutral-600 mb-8">
                Fill out the form below and our team will get back to you promptly with the information you need.
              </p>

              {success && (
                <div className="bg-secondary-50 border border-secondary-200 text-secondary-800 px-6 py-4 rounded-lg mb-6">
                  <p className="font-semibold">Thank you for your inquiry!</p>
                  <p className="text-sm mt-1">We'll get back to you within 24 hours.</p>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-lg mb-6">
                  <p className="font-semibold">Error</p>
                  <p className="text-sm mt-1">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <FormInput
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                />

                <FormInput
                  label="Company Name"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  placeholder="Your Company"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInput
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                  />

                  <FormInput
                    label="Phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+91-XXXXXXXXXX"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-neutral-700 font-medium mb-2">
                    Inquiry Type
                    <span className="text-primary ml-1">*</span>
                  </label>
                  <select
                    name="inquiry_type"
                    value={formData.inquiry_type}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    {INQUIRY_TYPES.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <FormInput
                  label="Product Interest"
                  name="product_interest"
                  value={formData.product_interest || ''}
                  onChange={handleChange}
                  placeholder="e.g., Duplex Board, Kraft Paper"
                />

                <FormInput
                  label="Estimated Quantity"
                  name="quantity"
                  value={formData.quantity || ''}
                  onChange={handleChange}
                  placeholder="e.g., 100 tons, 5000 units"
                />

                <FormInput
                  label="Message"
                  name="message"
                  as="textarea"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell us about your requirements..."
                  rows={5}
                />

                <Button
                  type="submit"
                  size="lg"
                  fullWidth
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Submit Inquiry'}
                </Button>
              </form>
            </div>

            <div className="space-y-8">
              <Card className="bg-gradient-to-br from-secondary-50 to-white">
                <Clock className="text-secondary mb-4" size={40} />
                <h3 className="text-xl font-bold text-neutral-900 mb-3">Business Hours</h3>
                <div className="space-y-2 text-neutral-700">
                  <p>{COMPANY_INFO.businessHours.weekdays}</p>
                  <p>{COMPANY_INFO.businessHours.sunday}</p>
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-primary-50 to-white">
                <MessageSquare className="text-primary mb-4" size={40} />
                <h3 className="text-xl font-bold text-neutral-900 mb-3">Quick Response</h3>
                <p className="text-neutral-700 mb-4">
                  For urgent inquiries or immediate assistance, please contact us directly:
                </p>
                <div className="space-y-2">
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="block text-primary hover:text-primary-600 font-semibold"
                  >
                    {COMPANY_INFO.email}
                  </a>
                  <p className="text-neutral-700">
                    WhatsApp: +{COMPANY_INFO.whatsapp}
                  </p>
                </div>
              </Card>

              <Card>
                <h3 className="text-xl font-bold text-neutral-900 mb-4">What Happens Next?</h3>
                <ol className="space-y-3 text-neutral-700">
                  <li className="flex items-start">
                    <span className="font-bold text-primary mr-3">1.</span>
                    <span>We receive your inquiry and review your requirements</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold text-primary mr-3">2.</span>
                    <span>Our team contacts you within 24 hours</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold text-primary mr-3">3.</span>
                    <span>We provide detailed information and quotes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold text-primary mr-3">4.</span>
                    <span>Start your partnership with Bright Paper</span>
                  </li>
                </ol>
              </Card>
            </div>
          </div>
        </section>
      </PageWrapper>
    </div>
  );
}
