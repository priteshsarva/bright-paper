import { TrendingUp, Users, MapPin, Award } from 'lucide-react';
import Card from '../Card';
import { COMPANY_INFO } from '../../constants';

export default function MetricsSection() {
  const metrics = [
    {
      icon: TrendingUp,
      value: COMPANY_INFO.turnover,
      label: 'Annual Turnover',
      color: 'text-primary'
    },
    {
      icon: Users,
      value: COMPANY_INFO.dealerCount,
      label: 'Active Clients',
      color: 'text-secondary'
    },
    {
      icon: MapPin,
      value: `Cities`,
      label: 'Across India',
      color: 'text-primary'
    },
    {
      icon: Award,
      value: `${new Date().getFullYear() - COMPANY_INFO.establishedYear}+`,
      label: 'Years of Excellence',
      color: 'text-secondary'
    }
  ];

  return (
    <section className="pb-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <Card key={index} hover className="text-center">
              <metric.icon className={`${metric.color} mx-auto mb-4`} size={48} />
              <div className="text-4xl font-bold text-neutral-900 mb-2">
                {metric.value}
              </div>
              <div className="text-neutral-600">{metric.label}</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
