import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const mockTickets = [
  {
    id: 'A123456',
    movie: 'Bão Máu',
    cinema: 'Beta Mỹ Đình',
    showtime: '2025-07-01 19:30',
    seat: 'D7, D8',
    price: 180000,
    status: 'Đã thanh toán',
  },
  {
    id: 'B654321',
    movie: 'Art Online',
    cinema: 'CGV Vincom',
    showtime: '2025-07-03 21:00',
    seat: 'B3',
    price: 90000,
    status: 'Đã thanh toán',
  },
  {
    id: 'C789012',
    movie: 'Tot Nghiep',
    cinema: 'Lotte Center',
    showtime: '2025-07-05 17:00',
    seat: 'F10, F11',
    price: 200000,
    status: 'Chưa thanh toán',
  },
];

const MyTickets = () => {
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    setTimeout(() => {
      setTickets(mockTickets);
      setLoading(false);
      if (mockTickets.length === 0) toast.info('Bạn chưa có vé nào!');
    }, 1200);
  }, []);

  // Đóng modal khi bấm ngoài hoặc nhấn ESC
  useEffect(() => {
    if (!selectedTicket) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') setSelectedTicket(null);
    };
    const handleClick = (e) => {
      if (e.target.classList.contains('modal-bg')) setSelectedTicket(null);
    };
    window.addEventListener('keydown', handleKey);
    window.addEventListener('mousedown', handleClick);
    return () => {
      window.removeEventListener('keydown', handleKey);
      window.removeEventListener('mousedown', handleClick);
    };
  }, [selectedTicket]);

  // Lọc vé theo search và trạng thái
  const filteredTickets = tickets.filter((t) => {
    const matchSearch =
      t.id.toLowerCase().includes(search.toLowerCase()) ||
      t.movie.toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      statusFilter === 'all'
        ? true
        : statusFilter === 'paid'
        ? t.status === 'Đã thanh toán'
        : t.status !== 'Đã thanh toán';
    return matchSearch && matchStatus;
  });

  return (
    <div className="max-w-4xl mx-auto p-6 mt-8 rounded-xl shadow-2xl min-h-[400px] bg-white dark:bg-[#181A20] border border-gray-200 dark:border-[#23263a]">
      <h1 className="text-3xl font-extrabold mb-8 text-red-500 dark:text-yellow-400 tracking-wide drop-shadow">
        Lịch sử đặt vé của bạn
      </h1>
      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
        <input
          type="text"
          placeholder="Tìm mã vé hoặc tên phim..."
          className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#23263a] text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full md:w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#23263a] text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full md:w-1/4"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="paid">Đã thanh toán</option>
          <option value="unpaid">Chưa thanh toán</option>
        </select>
      </div>
      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div
              key={idx}
              className="animate-pulse flex gap-4 items-center bg-gray-100 dark:bg-[#23263a] rounded-2xl p-4"
            >
              <div className="w-24 h-8 bg-gray-300 dark:bg-[#35395c] rounded" />
              <div className="flex-1 h-8 bg-gray-200 dark:bg-[#35395c] rounded" />
              <div className="w-20 h-8 bg-gray-300 dark:bg-[#35395c] rounded" />
              <div className="w-16 h-8 bg-gray-200 dark:bg-[#35395c] rounded" />
              <div className="w-24 h-8 bg-gray-300 dark:bg-[#35395c] rounded" />
            </div>
          ))}
        </div>
      ) : filteredTickets.length === 0 ? (
        <div className="text-center text-gray-500 py-12">Bạn chưa có vé nào.</div>
      ) : (
        <div className="overflow-x-auto scrollbar-hide">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-[#23263a] bg-white dark:bg-[#23263a] rounded-xl shadow-lg">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-base font-bold text-gray-600 dark:text-gray-300 uppercase">
                  MÃ VÉ
                </th>
                <th className="px-4 py-3 text-left text-base font-bold text-gray-600 dark:text-gray-300 uppercase">
                  PHIM
                </th>
                <th className="px-4 py-3 text-left text-base font-bold text-gray-600 dark:text-gray-300 uppercase">
                  RẠP
                </th>
                <th className="px-4 py-3 text-left text-base font-bold text-gray-600 dark:text-gray-300 uppercase">
                  SUẤT
                </th>
                <th className="px-4 py-3 text-left text-base font-bold text-gray-600 dark:text-gray-300 uppercase">
                  GHẾ
                </th>
                <th className="px-4 py-3 text-left text-base font-bold text-gray-600 dark:text-gray-300 uppercase">
                  GIÁ
                </th>
                <th className="px-4 py-3 text-left text-base font-bold text-gray-600 dark:text-gray-300 uppercase">
                  TRẠNG THÁI
                </th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.map((ticket) => (
                <tr
                  key={ticket.id}
                  className="hover:scale-[1.015] hover:shadow-2xl hover:z-10 transition-all duration-200 rounded-xl bg-white dark:bg-[#23263a] border-b border-gray-100 dark:border-[#23263a]"
                >
                  <td className="px-4 py-3 font-mono text-base text-blue-600 dark:text-blue-300 underline cursor-pointer">
                    {ticket.id}
                  </td>
                  <td className="px-4 py-3 font-bold text-lg text-gray-900 dark:text-white">
                    {ticket.movie}
                  </td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{ticket.cinema}</td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{ticket.showtime}</td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{ticket.seat}</td>
                  <td className="px-4 py-3 text-right text-gray-900 dark:text-yellow-300 font-semibold">
                    {ticket.price.toLocaleString()}đ
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-4 py-1 rounded-xl text-base font-bold shadow-md ${
                        ticket.status === 'Đã thanh toán'
                          ? 'bg-green-200/80 text-green-800 dark:bg-green-700/80 dark:text-green-100'
                          : 'bg-yellow-100/80 text-yellow-800 dark:bg-yellow-700/80 dark:text-yellow-100'
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-yellow-400 to-red-500 text-white font-bold shadow-lg hover:from-yellow-500 hover:to-red-600 transition-all duration-200 text-base focus:outline-none focus:ring-2 focus:ring-yellow-300"
                      onClick={() => setSelectedTicket(ticket)}
                    >
                      Xem chi tiết
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal chi tiết vé */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in modal-bg">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-8 max-w-md w-full relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl font-bold focus:outline-none"
              onClick={() => setSelectedTicket(null)}
              title="Đóng"
            >
              ×
            </button>
            <div className="flex flex-col items-center gap-3">
              <img
                src="https://cdn.galaxycine.vn/media/2024/6/7/1920x1080_1717738579647.jpg"
                alt="poster"
                className="w-32 h-44 object-cover rounded-xl shadow mb-2"
              />
              <div className="text-xl font-bold text-red-500 mb-1">{selectedTicket.movie}</div>
              <div className="text-gray-700 dark:text-gray-200 mb-1">
                Rạp: <span className="font-semibold">{selectedTicket.cinema}</span>
              </div>
              <div className="text-gray-700 dark:text-gray-200 mb-1">
                Suất: <span className="font-semibold">{selectedTicket.showtime}</span>
              </div>
              <div className="text-gray-700 dark:text-gray-200 mb-1">
                Ghế: <span className="font-semibold">{selectedTicket.seat}</span>
              </div>
              <div className="text-gray-700 dark:text-gray-200 mb-1">
                Mã vé: <span className="font-mono text-blue-600">{selectedTicket.id}</span>
              </div>
              <div className="text-gray-700 dark:text-gray-200 mb-1">
                Giá: <span className="font-semibold">{selectedTicket.price.toLocaleString()}đ</span>
              </div>
              <div className="text-gray-700 dark:text-gray-200 mb-1">
                Trạng thái:{' '}
                <span
                  className={`font-bold ${
                    selectedTicket.status === 'Đã thanh toán' ? 'text-green-600' : 'text-yellow-600'
                  }`}
                  title={
                    selectedTicket.status === 'Đã thanh toán'
                      ? 'Vé đã thanh toán, có thể sử dụng'
                      : 'Vé chưa thanh toán, vui lòng thanh toán trước khi sử dụng'
                  }
                >
                  {selectedTicket.status}
                </span>
              </div>
              {/* QR code giả lập */}
              <div
                className="mt-4 mb-2 flex flex-col items-center"
                title="Quét mã này tại rạp để kiểm tra vé"
              >
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${selectedTicket.id}`}
                  alt="QR code"
                  className="w-28 h-28 rounded bg-white border border-gray-200 shadow"
                />
                <span className="text-xs text-gray-400 mt-1">Quét mã để kiểm tra vé</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTickets;
