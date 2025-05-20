import { QRCode } from 'react-qrcode-logo';
import { useEffect, useState } from "react";
import { attend } from '../../api/session';

export default function SessionQRCode({ sessionName, code, size = 500 }) {

  const [message , setMessage] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await attend(code);
        setMessage(data.message)
      } catch (error) {
        setError("An error occurred while loading the data😥");
      }
    };
    getData();
  }, []);

  return (
    <div className='flex items-center justify-center mt-[100px]'>
      <QRCode value={`${message} في الجلسة ${sessionName}`} size={size} />
    </div>
  );
}