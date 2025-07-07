import React, { useState } from 'react';

const movies = [
  { id: 1, title: 'Điều Ước Cuối Cùng' },
  { id: 2, title: 'Siêu Sao Nguyên Thúy' },
];

const cinemas = [
  { id: 1, name: 'Beta Mỹ Đình' },
  { id: 2, name: 'CGV Vincom' },
];

const showtimes = [
  { id: 1, movieId: 1, cinemaId: 1, date: '2025-07-04', time: '19:00' },
  { id: 2, movieId: 1, cinemaId: 1, date: '2025-07-04', time: '21:00' },
  { id: 3, movieId: 1, cinemaId: 2, date: '2025-07-05', time: '20:00' },
  { id: 4, movieId: 2, cinemaId: 2, date: '2025-07-06', time: '18:00' },
];

const seats = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  label: `A${i + 1}`,
  sold: i % 7 === 0, // ghế đã bán mẫu
}));

const steps = ['Chọn phim', 'Chọn rạp', 'Chọn ngày', 'Chọn suất', 'Chọn ghế', 'Xác nhận'];

export default function BookingPage() {
  const [step, setStep] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const availableDates = Array.from(
    new Set(
      showtimes
        .filter(
          (s) =>
            (!selectedMovie || s.movieId === selectedMovie) &&
            (!selectedCinema || s.cinemaId === selectedCinema)
        )
        .map((s) => s.date)
    )
  );

  const availableShowtimes = showtimes.filter(
    (s) =>
      (!selectedMovie || s.movieId === selectedMovie) &&
      (!selectedCinema || s.cinemaId === selectedCinema) &&
      (!selectedDate || s.date === selectedDate)
  );

  // Stepper UI
  const Stepper = () => (
    <div className="relative mb-8 select-none">
      <div className="flex items-center justify-between">
        {steps.map((label, idx) => (
          <div key={label} className="flex-1 flex flex-col items-center group relative">
            <div
              className={`w-11 h-11 flex items-center justify-center rounded-full font-bold text-lg border-2 transition-all duration-300
                ${
                  idx < step
                    ? 'bg-gradient-to-br from-yellow-400 to-orange-400 text-white border-yellow-400 shadow-lg group-hover:border-yellow-500 group-hover:shadow-xl cursor-pointer'
                    : idx === step
                    ? 'bg-gray-900 text-yellow-400 border-yellow-400 scale-110 shadow-2xl ring-2 ring-yellow-300 z-10'
                    : 'bg-gray-700 text-gray-400 border-gray-500 opacity-70'
                }
              `}
              style={{ transition: 'all 0.3s cubic-bezier(.4,2,.6,1)' }}
              onClick={() => idx < step && setStep(idx)}
            >
              {idx + 1}
            </div>
            <span
              className={`mt-2 text-base font-semibold text-center ${
                idx === step ? 'text-yellow-400' : 'text-gray-400 group-hover:text-yellow-400'
              }`}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
      {/* Progress bar chia đoạn nhỏ */}
      <div className="flex absolute left-0 right-0 bottom-0 h-1 mt-3 gap-1 px-2">
        {steps.map((_, idx) => (
          <div
            key={idx}
            className={`flex-1 rounded-full transition-colors duration-500 ${
              idx < step ? 'bg-gradient-to-r from-yellow-400 to-orange-400' : 'bg-gray-600/40'
            }`}
            style={{ minWidth: 12, height: 4 }}
          ></div>
        ))}
      </div>
    </div>
  );

  // Step content
  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="animate-fade-in-up">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-6 text-yellow-400 drop-shadow-lg">
              Chọn phim
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {movies.map((movie) => (
                <button
                  key={movie.id}
                  className={`p-6 rounded-2xl border-2 font-semibold shadow-lg transition-all duration-200 text-xl flex items-center justify-center hover:scale-105
                    ${
                      selectedMovie === movie.id
                        ? 'bg-gradient-to-br from-yellow-400 to-orange-400 text-white border-yellow-400 scale-105 ring-2 ring-yellow-300'
                        : 'bg-white/80 dark:bg-gray-900/80 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100'
                    }
                  `}
                  onClick={() => setSelectedMovie(movie.id)}
                >
                  {movie.title}
                </button>
              ))}
            </div>
            <button
              className="mt-10 w-full py-4 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-400 text-white font-extrabold text-xl shadow-xl disabled:opacity-50"
              disabled={!selectedMovie}
              onClick={() => setStep(1)}
            >
              Tiếp tục
            </button>
          </div>
        );
      case 1:
        return (
          <div className="animate-fade-in-up">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-6 text-yellow-400 drop-shadow-lg">
              Chọn rạp
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cinemas.map((cinema) => (
                <button
                  key={cinema.id}
                  className={`p-6 rounded-2xl border-2 font-semibold shadow-lg transition-all duration-200 text-xl flex items-center justify-center hover:scale-105
                    ${
                      selectedCinema === cinema.id
                        ? 'bg-gradient-to-br from-yellow-400 to-orange-400 text-white border-yellow-400 scale-105 ring-2 ring-yellow-300'
                        : 'bg-white/80 dark:bg-gray-900/80 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100'
                    }
                  `}
                  onClick={() => setSelectedCinema(cinema.id)}
                >
                  {cinema.name}
                </button>
              ))}
            </div>
            <div className="flex gap-2 mt-10">
              <button
                className="w-1/2 py-4 rounded-2xl border-2 font-bold text-xl"
                onClick={() => setStep(0)}
              >
                Quay lại
              </button>
              <button
                className="w-1/2 py-4 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-400 text-white font-extrabold text-xl shadow-xl disabled:opacity-50"
                disabled={!selectedCinema}
                onClick={() => setStep(2)}
              >
                Tiếp tục
              </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="animate-fade-in-up">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-6 text-yellow-400 drop-shadow-lg">
              Chọn ngày chiếu
            </h2>
            <div className="flex flex-wrap gap-6">
              {availableDates.map((date) => (
                <button
                  key={date}
                  className={`px-8 py-4 rounded-2xl border-2 font-semibold shadow-lg transition-all duration-200 text-xl hover:scale-105
                    ${
                      selectedDate === date
                        ? 'bg-gradient-to-br from-yellow-400 to-orange-400 text-white border-yellow-400 scale-105 ring-2 ring-yellow-300'
                        : 'bg-white/80 dark:bg-gray-900/80 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100'
                    }
                  `}
                  onClick={() => setSelectedDate(date)}
                >
                  {date}
                </button>
              ))}
            </div>
            <div className="flex gap-2 mt-10">
              <button
                className="w-1/2 py-4 rounded-2xl border-2 font-bold text-xl"
                onClick={() => setStep(1)}
              >
                Quay lại
              </button>
              <button
                className="w-1/2 py-4 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-400 text-white font-extrabold text-xl shadow-xl disabled:opacity-50"
                disabled={!selectedDate}
                onClick={() => setStep(3)}
              >
                Tiếp tục
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="animate-fade-in-up">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-6 text-yellow-400 drop-shadow-lg">
              Chọn suất chiếu
            </h2>
            <div className="flex flex-wrap gap-6">
              {availableShowtimes.map((show) => (
                <button
                  key={show.id}
                  className={`px-8 py-4 rounded-2xl border-2 font-semibold shadow-lg transition-all duration-200 text-xl hover:scale-105
                    ${
                      selectedShowtime === show.id
                        ? 'bg-gradient-to-br from-yellow-400 to-orange-400 text-white border-yellow-400 scale-105 ring-2 ring-yellow-300'
                        : 'bg-white/80 dark:bg-gray-900/80 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100'
                    }
                  `}
                  onClick={() => setSelectedShowtime(show.id)}
                >
                  {show.time}
                </button>
              ))}
            </div>
            <div className="flex gap-2 mt-10">
              <button
                className="w-1/2 py-4 rounded-2xl border-2 font-bold text-xl"
                onClick={() => setStep(2)}
              >
                Quay lại
              </button>
              <button
                className="w-1/2 py-4 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-400 text-white font-extrabold text-xl shadow-xl disabled:opacity-50"
                disabled={!selectedShowtime}
                onClick={() => setStep(4)}
              >
                Tiếp tục
              </button>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="animate-fade-in-up">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-6 text-yellow-400 drop-shadow-lg">
              Chọn ghế
            </h2>
            <div className="flex flex-col items-center">
              <div className="relative w-full max-w-md mb-4">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-gray-400 dark:text-gray-500">
                  Màn hình
                </div>
                <div className="w-full h-3 rounded-b-3xl bg-gradient-to-r from-yellow-300 to-orange-400 mb-6 shadow-lg" />
              </div>
              <div className="grid grid-cols-6 gap-4 mb-4">
                {seats.map((seat) => (
                  <button
                    key={seat.id}
                    disabled={seat.sold}
                    className={`w-14 h-14 rounded-xl border-2 font-bold transition-all duration-200 text-lg shadow-lg
                      ${
                        seat.sold
                          ? 'bg-gray-400 dark:bg-gray-700 text-gray-200 border-gray-400 dark:border-gray-700 cursor-not-allowed'
                          : selectedSeats.includes(seat.id)
                          ? 'bg-gradient-to-br from-yellow-400 to-orange-400 text-white border-yellow-400 scale-110 ring-2 ring-yellow-300'
                          : 'bg-white/80 dark:bg-gray-900/80 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100 hover:scale-110 hover:border-yellow-400 hover:ring-2 hover:ring-yellow-200'
                      }
                    `}
                    onClick={() =>
                      setSelectedSeats((prev) =>
                        prev.includes(seat.id)
                          ? prev.filter((id) => id !== seat.id)
                          : [...prev, seat.id]
                      )
                    }
                  >
                    {seat.label}
                  </button>
                ))}
              </div>
              <div className="flex gap-4 text-xs mt-2">
                <div className="flex items-center gap-1">
                  <span className="w-4 h-4 rounded bg-gradient-to-br from-yellow-400 to-orange-400 inline-block border-2 border-yellow-400"></span>{' '}
                  Đã chọn
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-4 h-4 rounded bg-gray-400 dark:bg-gray-700 inline-block border-2 border-gray-400 dark:border-gray-700"></span>{' '}
                  Đã bán
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-4 h-4 rounded bg-white border-2 border-gray-300 dark:bg-gray-900 dark:border-gray-700 inline-block"></span>{' '}
                  Trống
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-10">
              <button
                className="w-1/2 py-4 rounded-2xl border-2 font-bold text-xl"
                onClick={() => setStep(3)}
              >
                Quay lại
              </button>
              <button
                className="w-1/2 py-4 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-400 text-white font-extrabold text-xl shadow-xl disabled:opacity-50"
                disabled={selectedSeats.length === 0}
                onClick={() => setStep(5)}
              >
                Tiếp tục
              </button>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="animate-fade-in-up">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-6 text-yellow-400 drop-shadow-lg">
              Xác nhận đặt vé
            </h2>
            <div className="mb-6 space-y-3 text-lg">
              <div>
                <b>Phim:</b> {movies.find((m) => m.id === selectedMovie)?.title}
              </div>
              <div>
                <b>Rạp:</b> {cinemas.find((c) => c.id === selectedCinema)?.name}
              </div>
              <div>
                <b>Ngày chiếu:</b> {selectedDate}
              </div>
              <div>
                <b>Suất chiếu:</b> {showtimes.find((s) => s.id === selectedShowtime)?.time}
              </div>
              <div>
                <b>Ghế:</b>{' '}
                {seats
                  .filter((s) => selectedSeats.includes(s.id))
                  .map((s) => s.label)
                  .join(', ')}
              </div>
            </div>
            <div className="flex gap-2 mt-10">
              <button
                className="w-1/2 py-4 rounded-2xl border-2 font-bold text-xl"
                onClick={() => setStep(4)}
              >
                Quay lại
              </button>
              <button
                className="w-1/2 py-4 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-400 text-white font-extrabold text-xl shadow-xl"
                onClick={() => alert('Đặt vé thành công!')}
              >
                Đặt vé
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Tổng tiền mẫu (giả sử 90k/vé)
  const total = selectedSeats.length * 90000;

  // Tóm tắt đặt vé
  const SummaryCard = () => (
    <div className="sticky top-8 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border-2 border-yellow-200 dark:border-yellow-900 min-w-[260px] max-w-xs mx-auto animate-fade-in-up">
      <h3 className="text-xl font-extrabold mb-6 text-yellow-400 drop-shadow-lg">Tóm tắt đặt vé</h3>
      <div className="space-y-3 text-lg">
        <div>
          <b>Phim:</b>{' '}
          {movies.find((m) => m.id === selectedMovie)?.title || (
            <span className="text-gray-400">Chưa chọn</span>
          )}
        </div>
        <div>
          <b>Rạp:</b>{' '}
          {cinemas.find((c) => c.id === selectedCinema)?.name || (
            <span className="text-gray-400">Chưa chọn</span>
          )}
        </div>
        <div>
          <b>Ngày:</b> {selectedDate || <span className="text-gray-400">Chưa chọn</span>}
        </div>
        <div>
          <b>Suất:</b>{' '}
          {showtimes.find((s) => s.id === selectedShowtime)?.time || (
            <span className="text-gray-400">Chưa chọn</span>
          )}
        </div>
        <div>
          <b>Ghế:</b>{' '}
          {selectedSeats.length > 0 ? (
            seats
              .filter((s) => selectedSeats.includes(s.id))
              .map((s) => s.label)
              .join(', ')
          ) : (
            <span className="text-gray-400">Chưa chọn</span>
          )}
        </div>
      </div>
      <div className="border-t-2 border-yellow-200 dark:border-yellow-800 my-6"></div>
      <div className="flex justify-between items-center text-xl font-extrabold">
        <span>Tổng:</span>
        <span className="text-red-500">{total.toLocaleString()}đ</span>
      </div>
      <button
        className="mt-8 w-full py-4 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-400 text-white font-extrabold text-xl shadow-xl disabled:opacity-50"
        disabled={step !== 5}
        onClick={() => step === 5 && alert('Đặt vé thành công!')}
      >
        Đặt vé
      </button>
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#232946] via-[#1a1a2e] to-[#ffe29f] dark:from-[#181A20] dark:via-[#23263a] dark:to-[#ffe29f] transition-colors duration-700">
      <div className="max-w-5xl mx-auto px-2 md:px-6 py-14 flex flex-col md:flex-row gap-10 min-h-[80vh]">
        <div className="flex-1 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl p-10 border-2 border-yellow-200 dark:border-yellow-900">
          <Stepper />
          {renderStep()}
        </div>
        <div className="w-full md:w-[340px]">
          <SummaryCard />
        </div>
      </div>
    </div>
  );
}
