import axios from 'axios';
import React, { useEffect, useState } from 'react';
import reqs from '../../Assets/requests';
import { MdOutlineMailOutline } from 'react-icons/md';
import ValuedInput from '../../Components/Forms/ValuedInput';
import ReplyForm from '../../Components/Admin/Contact/ReplyForm';

const ContactTableHeads = [
  { title: 'S/N' },
  { title: 'Full Name' },
  { title: 'Phone' },
  { title: 'Email' },
  { title: 'Address' },
  { title: 'Message' },
  { title: 'Reply' },
  { title: 'Status' },
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

const ContactMsg = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(reqs.GET_ALL_MESSAGES, { withCredentials: true })
      .then((res) => {
        if (res.data.succeed) {
          setData(res.data.result);
        } else {
          alert(res.data.msg);
        }
      })
      .catch((err) => {
        // console.log(err);
        alert(err.response.data.msg);
      });
  }, []);

  const handleReplySubmit = (text, email, id, name, setLoading) => {
    setLoading(true);
    axios
      .post(
        `${reqs.SEND_EMAIL_TO_CLIENT}/contact`,
        { text, email, name, id },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.succeed) {
          setData((data) => {
            return data.map((item) => {
              if (item.id === id) {
                item.replyMsg = res.data.text;
                item.replied = true;
              }
              return item;
            });
          });
          setLoading(false);
        } else {
          alert(res.data.msg);
          setLoading(false);
        }
      })
      .catch((err) => {
        // console.log(err);
        setLoading(false);
        alert(err.response.data.msg);
      });
  };

  return (
    <div>
      <table className='min-w-[600px] w-full border shadow-md'>
        <thead className='bg-onPrimary-main border-b text-primary-main'>
          <tr>
            {ContactTableHeads.map((thead, key) => (
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
                {item.name}
              </td>
              <td className='text-sm text-gray-900 px-3 py-4 max-w-[200px]'>
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
              <td className='text-sm text-gray-900 px-3 py-4 '>
                <p className='max-w-[200px]'>{item.address}</p>
              </td>
              <td className='text-sm text-gray-900 px-3 py-4'>
                <p className='max-w-[200px]'>{item.message}</p>
              </td>
              <td className='text-sm text-gray-900 px-3 py-4 max-w-[220px]'>
                {item.replied ? (
                  item.replyMsg || 'Reply message from admin'
                ) : (
                  <ReplyForm
                    id={item.id}
                    email={item.email}
                    name={item.name}
                    handleSubmit={handleReplySubmit}
                  />
                )}
              </td>
              <td className='text-sm text-gray-900 px-3 py-4 whitespace-nowrap'>
                {item.replied ? 'replied' : 'pending'}
              </td>
              <td className='text-sm text-gray-900 px-3 py-4 whitespace-nowrap'>
                {new Date(item.createdAt).toDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactMsg;
