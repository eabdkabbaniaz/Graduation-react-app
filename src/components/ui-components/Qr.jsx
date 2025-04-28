import { QRCode } from 'react-qrcode-logo';

function SessionQRCode({ sessionName }) {
  return (
    <div className='flex items-center justify-center mt-50'>
      <h2>{sessionName}</h2>
      <QRCode value={sessionName} size={200} />
    </div>
  );
}

export default SessionQRCode;
