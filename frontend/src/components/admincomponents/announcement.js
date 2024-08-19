import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/AdminStyle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPenSquare, faTrashAlt, faCamera, faFileLines } from '@fortawesome/free-solid-svg-icons';
import { useTable, usePagination, useSortBy, useGlobalFilter } from 'react-table';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import config from '../../utils/config';

const Announcements = () => {
  const [announcement, setAnnouncement] = useState([]);
  const [idAnnouncement, setIdAnnouncement] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [aktif, setAktif] = useState(false);
  const [hapus, setHapus] = useState(false);
  const navigate = useNavigate();

  const resetVariable = () => {
    setTitle('');
    setDesc('');
  };

  const getAnnouncement = async () => {
    try {
      const response = await axios.get(`${config.BASE_URL}/announcements`);
      setAnnouncement(response.data.data);
      console.log(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteData = async () => {
    try {
      await axios.delete(`${config.BASE_URL}/announcements/${idAnnouncement}`);
      setIdAnnouncement('');
      setAktif(false);
      getAnnouncement();
    } catch (error) {
      console.log(error);
    }
  };

  const addNews = () => {
    navigate(`/admin/pengumuman/add`);
  };

  const editNews = (id) => {
    navigate(`/admin/pengumuman/edit/${id}`);
  };

  const showModal = () => {
    setAktif(true);
    if (!hapus) {
      setHapus(false);
    }
  };

  const closeModal = () => {
    setAktif(false);
    setHapus(false);
    resetVariable();
  };

  const showEditModal = (id) => {
    showModal();
    setIdAnnouncement(id);
  };

  const hapusModal = (id) => {
    showModal();
    setHapus(true);
    setIdAnnouncement(id);
  };

  const handleModal = () => {
    const modal = document.querySelector('.modal');
    const box = document.querySelector('.modal .box');
    const boxTwoSide = document.querySelector('.modal .box.twoSide');

    if (aktif) {
      modal.classList.add('show');
    } else {
      modal.classList.remove('show');
    }

    if (hapus) {
      box.style.marginTop = '-18rem';
      boxTwoSide.style.width = '25rem';
    } else {
      box.style.marginTop = '1rem';
      boxTwoSide.style.width = '36rem';
    }
  };

  useEffect(() => {
    getAnnouncement();
  }, []);

  useEffect(() => {
    handleModal();
  }, [handleModal]);

  const data = useMemo(
    () =>
      announcement.map((item) => ({
        _id: item._id,
        title: item.title,
        desc: item.desc,
        fileUrl: item.fileUrl,
      })),
    [announcement]
  );
  const columns = useMemo(
    () => [
      {
        Header: 'Nomor',
        accessor: 'uuid',
        Cell: ({ row }) => {
          return <div>{row.index + 1}</div>;
        },
      },
      {
        Header: 'Judul',
        accessor: 'title',
      },
      {
        Header: 'Deskripsi',
        accessor: 'desc',
      },
      {
        Header: 'File',
        accessor: 'fileUrl',
        Cell: ({ value }) => <iframe src={value} width="200" height="300" allow="autoplay"></iframe>,
      },
      {
        Header: 'Aksi',
        Cell: ({ row }) => (
          <div className="aksi">
            <button onClick={() => hapusModal(row.original._id)}>
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  return (
    <div>
      <div className="judul">
        <h1>Pengumuman</h1>
        <p>Atur ketersediaan pengumumanmu!</p>
      </div>
      <div className="konten">
        <div className="tambah">
          <div className="table-controls">
            <label htmlFor="cari">Search : </label>
            <input type="text" value={globalFilter || ''} onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Cari..." id="cari" />
          </div>
          <button onClick={() => addNews()}>
            <FontAwesomeIcon className="icon" icon={faPlus} />
            Tambah
          </button>
        </div>

        <table border="1" className="tbl" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    <span className="sorted">{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="pgInfo">
          <span>
            Halaman{' '}
            <strong>
              {pageIndex + 1} dari {pageOptions.length}
            </strong>{' '}
          </span>
          <div className="pagination">
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
              Previous
            </button>
            <button onClick={() => nextPage()} disabled={!canNextPage}>
              Next
            </button>
          </div>
        </div>
      </div>
      <div className="modal">
        <div className="overlay">
          <div className="box twoSide">
            <div className="hapusModal">
              <h2 className="yakin">Apakah Anda yakin ingin menghapus?</h2>
              <div className="hapusButton">
                <button type="button" onClick={deleteData}>
                  Hapus
                </button>
                <button type="button" onClick={closeModal}>
                  Batal
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Announcements;
