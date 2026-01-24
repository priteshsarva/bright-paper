import { TrendingUp, Users, MapPin, Award, Target, CheckCircle } from 'lucide-react';
import Card from '../Card';
import { COMPANY_INFO } from '../../constants';
import AnimatedNumber from '../AnimatedNumber';

export default function MetricsSection() {
  const metrics = [
    {
      icon: TrendingUp,
      value: COMPANY_INFO.turnover,
      label: 'Annual Turnover',
      color: 'text-primary',
      // Manual override for animation
      animate: {
        end: 50000,
        suffix: ' Tons'
      }
    },
    {
      icon: Users,
      value: COMPANY_INFO.dealerCount,
      label: 'Active Clients',
      color: 'text-primary',
      animate: {
        end: 500,
        suffix: '+'
      }
    },
    {
      icon: MapPin,
      value: `${COMPANY_INFO.citiesServed} Cities`,
      label: 'Across India',
      color: 'text-primary',
      animate: {
        end: 28,
        suffix: ' Cities'
      }
    },
    {
      icon: Award,
      value: `${new Date().getFullYear() - COMPANY_INFO.establishedYear}+`,
      label: 'Years of Excellence',
      color: 'text-primary',
      animate: {
        end: new Date().getFullYear() - COMPANY_INFO.establishedYear,
        suffix: '+'
      }
    }
  ];

  const achievements = [
    {
      icon: Award,
      label: 'Years of Excellence',
      animate: {
        end: new Date().getFullYear() - COMPANY_INFO.establishedYear,
        suffix: ''
      }
    },
    {
      icon: Users,
      label: 'Customers',
      animate: {
        end: 500,
        suffix: '+'
      }
    },
    {
      icon: CheckCircle,
      label: 'Across India',
      animate: {
        end: 28, // Using hardcoded value or calculate if possible, but 28 matches Metrics
        suffix: ' Cities'
      }
    },
    {
      icon: Target,
      label: 'Annual Turnover',
      animate: {
        end: 50000,
        suffix: ' Tons'
      }
    }
  ];

  return (
    <section className="pb-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">


          {achievements.map((achievement, index) => (
            <Card key={index} className=" bg-gradient-to-br from-[#F4FAF1] to-white text-center ">
              <achievement.icon className="text-primary mx-auto mb-4" size={48} />
              <div className="text-4xl font-bold text-[#5A8F2E] mb-2">
                <AnimatedNumber
                  end={achievement.animate.end}
                  duration={2500}
                  suffix={achievement.animate.suffix}
                  separator=","
                />
              </div>
              <div className="text-neutral-600">{achievement.label}</div>
            </Card>
          ))}



          {/* {metrics.map((metric, index) => (
            <Card key={index} hover className="bg-gradient-to-br from-[#F4FAF1] to-white text-center ">
              <metric.icon className={`${metric.color} mx-auto mb-4`} size={48} />
              <div className="text-4xl font-bold text-[#5A8F2E] mb-2">
                <AnimatedNumber
                  end={metric.animate.end}
                  duration={2500}
                  suffix={metric.animate.suffix}
                  separator=","
                />
              </div>
              <div className="text-neutral-600">{metric.label}</div>
            </Card>
          ))} */}
        </div>
      </div>
    </section>
  );
}
