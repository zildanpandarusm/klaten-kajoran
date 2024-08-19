import React from 'react';
import config from '../../utils/config';

const HalamanUtama = () => {
  return (
    <div className="dashboard">
      <div className="konten">
        <h1>Selamat Datang di Dashboard Admin Website Desa Kajoran!</h1>
        <img src={`${config.IMAGE_BASE_URL}/kajoran2.JPG`} className="banner" alt="logo" />
        <p>
          Website ini dirancang untuk memudahkan pengelolaan informasi dan pelayanan kepada masyarakat Desa Kajoran. Kami berharap, dengan adanya platform ini, komunikasi dan koordinasi antarwarga dan pemerintah desa dapat semakin baik,
          serta informasi penting dapat tersampaikan dengan cepat dan akurat. Terima kasih atas dukungan dan partisipasinya!
        </p>
      </div>
    </div>
  );
};

export default HalamanUtama;
