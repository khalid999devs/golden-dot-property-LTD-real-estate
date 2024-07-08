import { chart as ChartJS, defaults } from 'chart.js/auto';
import { Bar, Line } from 'react-chartjs-2';
import RoundedRiseAnime from '../../Assets/Components/RoundedRiseAnimation/RoundedRiseAnime';
import { useEffect, useState } from 'react';
import axios from 'axios';
import reqs from '../../Assets/requests';

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = 'center';
defaults.plugins.title.font.size = 16;
defaults.plugins.title.color = '#3A1500';

const commonCSS = `rounded-lg shadow-lg p-4`;

const Dashboard = () => {
  const [analytics, setAnalytics] = useState({});

  useEffect(() => {
    axios
      .get(reqs.ALL_ANALYTICS, { withCredentials: true })
      .then((res) => {
        if (res.data.succeed) {
          setAnalytics(res.data.result);
        }
      })
      .catch((err) => {
        alert(err.response.data.msg);
      });
  }, []);

  return (
    <div className='grid gap-3 min-h-screen py-2 grid-rows-3 md:grid-rows-2 grid-cols-1 md:grid-cols-[1.5fr,1fr] dashboard-container'>
      <div className={`${commonCSS}`} style={{ gridArea: 'd1' }}>
        <Line
          datasetIdKey='id1'
          data={{
            labels: analytics?.last12MonthBooking?.map((item) => item.label),
            datasets: [
              {
                id: 1,
                label: 'Bookings',
                data: analytics?.last12MonthBooking?.map(
                  (item) => item.bookings
                ),
                backgroundColor: '#FFD700',
              },
            ],
          }}
          options={{
            elements: { line: { tension: 0.2 } },
            plugins: { title: { text: 'Monthly Appointment Bookings' } },
          }}
        />
      </div>
      <div className={`${commonCSS}`} style={{ gridArea: 'd2' }}>
        <Bar
          datasetIdKey='id2'
          data={{
            labels: analytics?.propertyBasedBookings?.labels,
            datasets: [
              {
                id: 1,
                label: 'Bookings',
                data: analytics?.propertyBasedBookings?.data,
                backgroundColor: ['#005246', '#FFD700', '#B5A26D'],
                borderRadius: 5,
              },
            ],
          }}
          options={{
            plugins: { title: { text: 'Property Bookings' } },
          }}
        />
      </div>
      <div
        className={`${commonCSS} grid grid-cols-1 md:grid-cols-[1.5fr,1fr] gap-2 place-items-center`}
        style={{ gridArea: 'd3' }}
      >
        <div>
          {
            <RoundedRiseAnime
              totalNumber={analytics?.allBookingsCount}
              label={'Appointments'}
            />
          }
        </div>
        <div className='flex flex-col items-start justify-center gap-2'>
          {analytics?.categoryBasedCounts?.map((cat, key) => {
            return (
              <h3 className='text-tertiary-main' key={key}>
                <span className='font-bold text-secondary-main text-lg'>
                  {cat.count}+
                </span>{' '}
                {cat.categoryValue}
              </h3>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
