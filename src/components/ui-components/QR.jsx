import { QRCode } from 'react-qrcode-logo';

function SessionQRCode({ sessionName="جلسة2" ,size=250}) {
  return (
    <div className='flex items-center justify-center mt-50'>
   
      <QRCode value={sessionName} size={size} />
    </div>
  );
}

export default SessionQRCode;