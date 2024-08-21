import React, { useEffect, useState } from 'react';
import { faArrowRight, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import config from '../../utils/config';
import Aos from 'aos';
import 'aos/dist/aos.css';
import Footer from './footer';
import axios, { all } from 'axios';

const Home = () => {
  const [berita25, setBerita25] = useState([]);
  const [berita1, setBerita1] = useState({});
  const [berita6, setBerita6] = useState({});
  const [potentials, setPotentials] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  const getBerita = async () => {
    const response = await axios.get(`${config.BASE_URL}/posts`);
    const allData = response.data.data;

    if (allData.length >= 6) {
      // Jika data lebih dari atau sama dengan 6
      const firstData = allData.slice(0, 1)[0];
      const twoFiveData = allData.slice(1, 5);
      const lastData = allData.slice(5, 6)[0];

      setBerita1(firstData);
      setBerita25(twoFiveData);
      setBerita6(lastData);
    } else {
      // Jika data kurang dari 6, ambil semua data
      setBerita1(allData[0] || {});
      setBerita25(allData.length > 1 ? allData.slice(1) : []);
      setBerita6(allData[allData.length - 1] || {});
    }
  };

  const getPotentials = async () => {
    const response = await axios.get(`${config.BASE_URL}/potentials`);

    const allData = response.data.data;

    const Data = allData.slice(0, 5);

    setPotentials(Data);
  };

  const getAnnouncements = async () => {
    const response = await axios.get(`${config.BASE_URL}/announcements`);

    const allData = response.data.data;

    const Data = allData.slice(0, 7);

    setAnnouncements(Data);
  };

  useEffect(() => {
    Aos.init();
  }, []);

  useEffect(() => {
    getBerita();
    getPotentials();
    getAnnouncements();
  }, []);

  return (
    <div className="home">
      <div className="welcome">
        <p>
          "Selamat datang di Desa Kajoran, sebuah desa yang penuh dengan potensi dan semangat kebersamaan. Masyarakat Desa Kajoran dikenal akan keramahannya dan kerja kerasnya dalam mengembangkan berbagai usaha kecil dan menengah yang
          menjadi tulang punggung perekonomian desa. Bersama-sama, mari kita wujudkan Desa Kajoran yang lebih maju dan sejahtera, di mana tradisi dan kemajuan berjalan beriringan."
        </p>
      </div>

      <div className="news">
        <h1>Berita</h1>
        <h3>Kisah tentang warga, kegiatan, dan inovasi desa.</h3>
        <div className="box">
          <Link className="card double" data-aos="fade-up" data-aos-once="true" to={`/berita/${berita1._id}`}>
            <div className="img">
              <img src={berita1.imageUrl} alt="kajoran" />
            </div>
            <div className="write">
              <h1>{berita1.title}</h1>
              <p>{berita1.formattedDate}</p>
              <div className="more">
                <p>
                  Baca Selengkapnya <FontAwesomeIcon className="icon" icon={faChevronRight} />
                </p>
              </div>
            </div>
          </Link>
          {berita25.map((item) => (
            <Link className="card" data-aos="fade-up" data-aos-once="true" to={`/berita/${item._id}`}>
              <div className="img">
                <img src={item.imageUrl} alt="kajoran" />
              </div>
              <div className="write">
                <h1>{item.title}</h1>
                <p>{item.formattedDate}</p>
                <div className="more">
                  <p>
                    Baca Selengkapnya <FontAwesomeIcon className="icon" icon={faChevronRight} />
                  </p>
                </div>
              </div>
            </Link>
          ))}
          {berita25.length >= 4 && (
            <Link className="card double" data-aos="fade-up" data-aos-once="true" to={`/berita/${berita6._id}`}>
              <div className="img">
                <img src={berita6.imageUrl} alt="kajoran" />
              </div>
              <div className="write">
                <h1>{berita6.title}</h1>
                <p>{berita6.formattedDate}</p>
                <div className="more">
                  <p>
                    Baca Selengkapnya <FontAwesomeIcon className="icon" icon={faChevronRight} />
                  </p>
                </div>
              </div>
            </Link>
          )}
        </div>
        <Link to="/berita" className="btnMore">
          Lihat Selengkapnya
        </Link>
      </div>
      <div className="potential">
        <h1>Potensi</h1>
        <h3>Keunggulan alam, ekonomi, dan budaya desa kami.</h3>
        <div className="box">
          {potentials.length > 0 ? (
            potentials.map((item) => (
              <Link key={item._id} className="card" data-aos="zoom-in-down" data-aos-once="true" to={`/potensi/${item._id}`}>
                <img src={item.imageUrl} alt="kajoran" />
                <div className="write">
                  <h2>{item.title}</h2>
                  <h3>{item.category}</h3>
                  <div className="bottom">
                    <div className="btn">
                      <Link>
                        <FontAwesomeIcon className="icon" icon={faArrowRight} />
                      </Link>
                    </div>
                    <p>Baca Selengkapnya</p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p style="color: #fff">Tidak Ada Data</p>
          )}
        </div>
        <Link to="/potensi" className="btnMore">
          Lihat Selengkapnya
        </Link>
      </div>
      <div className="announce">
        <h1>Pengumuman</h1>
        <h3>Informasi dan pemberitahuan penting untuk warga desa.</h3>
        <div className="box">
          {announcements.length > 0 ? (
            announcements.map((item) => (
              <Link key={item._id} className="card" data-aos="fade-up" data-aos-once="true" to={`/pengumuman/${item._id}`}>
                <h2>{item.title}</h2>
                <p>{item.formattedDate}</p>
              </Link>
            ))
          ) : (
            <p>Tidak Ada Data</p>
          )}
        </div>
        <Link to="/pengumuman" className="btnMore">
          Lihat Selengkapnya
        </Link>
      </div>
      <div className="maps">
        <h1>Peta</h1>
        <h3>Lokasi dan batas wilayah desa.</h3>
        <div className="box">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11345.429786477596!2d110.58084666891318!3d-7.747485664332437!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a45b5b8a800fb%3A0xd529fe941b7e787e!2sKajoran%2C%20Klaten%20Selatan%2C%20Klaten%20Regency%2C%20Central%20Java!5e1!3m2!1sen!2sid!4v1723094928061!5m2!1sen!2sid"
            width="600"
            height="450"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
          <div className="batas">
            <table>
              <tr>
                <th>Nomor Kode Wilayah</th>
                <td>: 33.10.26.2001</td>
              </tr>
              <tr>
                <th>Kode Pos</th>
                <td>: 57426</td>
              </tr>
              <tr>
                <th>Kecamatan</th>
                <td>: Klaten Selatan</td>
              </tr>
              <tr>
                <th>Kabupaten/Kota</th>
                <td>: Klaten</td>
              </tr>
              <tr>
                <th>Provinsi</th>
                <td>: Jawa Tengah</td>
              </tr>
              <tr>
                <th>Luas Wilayah</th>
                <td>: 90,5585 Ha</td>
              </tr>
              <tr>
                <th>Batas Sebelah Utara</th>
                <td>: Desa Glodogan</td>
              </tr>
              <tr>
                <th>Batas Sebelah Selatan</th>
                <td>: Desa Sukorejo</td>
              </tr>
              <tr>
                <th>Batas Sebelah Barat</th>
                <td>: Desa Pandes</td>
              </tr>
              <tr>
                <th>Batas Sebelah Timur</th>
                <td>: Desa Jimbung</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
