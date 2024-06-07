import { chart as ChartJS, defaults } from 'chart.js/auto';
import { Bar, Line } from 'react-chartjs-2';
import RoundedRiseAnime from '../../Assets/Components/RoundedRiseAnimation/RoundedRiseAnime';

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = 'center';
defaults.plugins.title.font.size = 16;
defaults.plugins.title.color = '#3A1500';

const commonCSS = `rounded-lg shadow-lg p-4`;

const lineData = [
  {
    label: 'Jan',
    bookings: 10,
  },
  {
    label: 'Feb',
    bookings: 8,
  },
  {
    label: 'Mar',
    bookings: 9,
  },
  {
    label: 'Apr',
    bookings: 5,
  },
  {
    label: 'May',
    bookings: 15,
  },
  {
    label: 'Jun',
    bookings: 12,
  },
];

const Dashboard = () => {
  return (
    <div className='grid gap-3 min-h-screen py-2 grid-rows-3 md:grid-rows-2 grid-cols-1 md:grid-cols-[1.5fr,1fr] dashboard-container'>
      <div className={`${commonCSS}`} style={{ gridArea: 'd1' }}>
        <Line
          datasetIdKey='id1'
          data={{
            labels: lineData.map((data) => data.label),
            datasets: [
              {
                id: 1,
                label: 'Bookings',
                data: lineData.map((data) => data.bookings),
                backgroundColor: '#FFD700',
              },
            ],
          }}
          options={{
            elements: { line: { tension: 0.2 } },
            plugins: { title: { text: 'Monthly Bookings' } },
          }}
        />
      </div>
      <div className={`${commonCSS}`} style={{ gridArea: 'd2' }}>
        <Bar
          datasetIdKey='id2'
          data={{
            labels: [
              'Green Valley, Basundhara',
              'Project 2 (land project)',
              'Project 3',
            ],
            datasets: [
              {
                id: 1,
                label: 'Bookings',
                data: [7, 11, 2],
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
        <div>{<RoundedRiseAnime totalNumber={50} label={'Bookings'} />}</div>
        <div className='flex flex-col items-start justify-center gap-2'>
          <h3 className='text-tertiary-main'>
            <span className='font-bold text-secondary-main text-lg'>5+</span>{' '}
            Land Properties
          </h3>
          <h3 className='text-tertiary-main'>
            <span className='font-bold text-secondary-main text-lg'>10+</span>{' '}
            Appartment Projects
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
