import React, { useEffect, useState } from 'react';
import OptionField from '../../Components/Forms/OptionField';
import { rowsOptions } from '../../Assets/utils';
import { MdOutlineMailOutline } from 'react-icons/md';
import axios from 'axios';
import reqs from '../../Assets/requests';

const bookingTableHeads = [
  { title: 'S/N' },
  { title: 'Full Name' },
  { title: 'Phone' },
  { title: 'Email' },
  { title: 'Address' },
  { title: 'Property Associated' },
  { title: 'Date' },
];

const SingleHead = ({ title }) => (
  <th
    scope='col'
    className='text-sm font-medium text-primary-main px-3 py-2 text-left'
  >
    {title || 'thead'}
  </th>
);

const Bookings = () => {
  const [rowsPg, setRowsPg] = useState(20);
  const [bookingsCount, setBookingCount] = useState(100);
  const [pageNo, setPageNo] = useState(1);
  const [pages, setPages] = useState(Math.ceil(bookingsCount / rowsPg));
  const [targetProperty, setTargetProperty] = useState('all');
  const [allProperty, setAllProperty] = useState([
    { title: 'All', value: 'all' },
    { title: 'New Project', value: 'new-project-basundhara' },
    { title: 'Green Valley', value: 'green-valley-basundhara' },
  ]);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .post(
        reqs.GET_ALL_CLIENTS,
        {
          skip: pageNo * rowsPg - rowsPg,
          rowNum: rowsPg,
          propertyValue: targetProperty,
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.succeed) {
          setData(
            res.data.result.map((item) => {
              item.createdAt = new Date(item.createdAt).toDateString();
              return item;
            })
          );
          setBookingCount(res.data.totalCount);
          setPages(
            bookingsCount === 0 ? 1 : Math.ceil(res.data.totalCount / rowsPg)
          );
        }
      })
      .catch((err) => {
        alert(err?.response?.data.msg);
        console.error(err);
      });
  }, [pageNo, rowsPg, targetProperty]);

  return (
    <div className='max-h-screen h-full w-full grid grid-rows-[1fr,min-content]'>
      <div className='overflow-auto w-full'>
        <table className='min-w-[600px] w-full border shadow-md'>
          <thead className='bg-onPrimary-main border-b text-primary-main'>
            <tr>
              {bookingTableHeads.map((thead, key) => (
                <SingleHead key={key} title={thead.title} />
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.map((item, value) => (
              <tr key={value}>
                <td className='px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                  {value + 1}
                </td>
                <td className='text-sm text-gray-900  px-3 py-4 whitespace-nowrap'>
                  {item.fullName}
                </td>
                <td className='text-sm text-gray-900 px-3 py-4 whitespace-nowrap'>
                  <a
                    href={`tel:${item.email}`}
                    target='_blank'
                    onClick={() => {
                      navigator.clipboard.writeText(item.phone);
                    }}
                  >
                    {item.phone}
                  </a>
                </td>
                <td className='text-sm text-gray-900 px-3 py-4 whitespace-nowrap'>
                  <a
                    href={`mailto:${item.email}`}
                    target='_blank'
                    onClick={() => {
                      navigator.clipboard.writeText(item.email);
                    }}
                  >
                    <MdOutlineMailOutline className='text-xl' />
                  </a>
                </td>
                <td className='text-sm text-gray-900 px-3 py-4 whitespace-nowrap'>
                  {item.address}
                </td>
                <td className='text-sm text-gray-900 px-3 py-4 whitespace-nowrap'>
                  {item.properties.map((property, key) => (
                    <span
                      className={`${
                        targetProperty === property.value
                          ? 'font-bold text-tertiary-main'
                          : ''
                      }`}
                      key={key}
                    >
                      {property.heading}&nbsp;
                    </span>
                  ))}
                </td>
                <td className='text-sm text-gray-900 px-3 py-4 whitespace-nowrap'>
                  {item.createdAt}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='w-full min-h-[80px] p-2 flex gap-2 flex-row flex-wrap justify-around pb-4 items-start bg-primary-light shadow-lg rounded-md'>
        <div>
          <OptionField
            id={'Page'}
            label={'page'}
            setValue={(e) => {
              setPageNo(Number(e.target.value));
            }}
            name={'page'}
            optionsObjs={Array.from({ length: pages }, (v, i) => ({
              title: i + 1,
              value: i + 1,
            }))}
          />
        </div>
        <div>
          <OptionField
            id={'Rows'}
            label={'rows'}
            setValue={(e) => {
              setRowsPg(Number(e.target.value));
            }}
            name={'rows'}
            optionsObjs={[
              ...rowsOptions,
              { title: 'All', value: bookingsCount },
            ]}
          />
        </div>
        <div>
          <OptionField
            id={'Property'}
            label={'Property'}
            setValue={(e) => {
              setTargetProperty(e.target.value);
            }}
            name={'property'}
            optionsObjs={allProperty}
          />
        </div>
      </div>
    </div>
  );
};

export default Bookings;
