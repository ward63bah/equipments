import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { Button } from '@mui/material';
import Iconify from '../../../components/Iconify';

export default function EquipmentScan(props) {
  const [data, setData] = useState('No result');
  const [scan, setScan] = useState(false);

  return (
    <>
      {scan === false ? (
        <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => setScan(true)}>
          Scan
        </Button>
      ) : (
        <>
          <QrReader
            facingMode="environment"
            onResult={(result, error) => {
              if (!result) {
                setData(result?.text);
                console.log('scan', result);
              }

              if (!error) {
                console.info(error);
              }
            }}
            // style={{ width: '100%' }}
            style={{ width: '200px', heigth: '100px' }}
          />
          <p>{data}</p>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => setScan(false)}>
            Close
          </Button>
        </>
      )}
    </>
  );
}
