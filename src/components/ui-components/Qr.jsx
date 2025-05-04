import { QRCode } from 'react-qrcode-logo';

function SessionQRCode({ sessionName="جلسة2" ,size=250}) {
  return (
    <div className='flex items-center justify-center mt-50'>
   
      <QRCode value={sessionName} size={size} />
    </div>
  );
}

export default SessionQRCode;

// function SessionQRCode({ sessionName, size = 200 }) {
//   return (
//     <div className='flex items-center justify-center mt-10'>
//       <div className="text-center">
//         <h2 className="mb-4 font-semibold">{sessionName}</h2>
//         <QRCode value={sessionName} size={size} />
//       </div>
//     </div>
//   );
// }
