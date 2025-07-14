import React from 'react';

const carData = [
  {
    id: 1,
    image:
      'https://robbreport.com/wp-content/uploads/2024/08/temerario01.jpg?w=800',
    price: 'AED 120.2120',
    title: 'BYD.HAN.Extend',
    details: '2015.15Km',
  },
  {
    id: 2,
    image:
      'https://robbreport.com/wp-content/uploads/2024/08/temerario01.jpg?w=800',
    price: 'AED 150.0000',
    title: 'BYD.DYNASTY',
    details: '2020.25Km',
  },
  {
    id: 3,
    image:
      'https://robbreport.com/wp-content/uploads/2024/08/temerario01.jpg?w=800',
    price: 'AED 180.5000',
    title: 'BYD.TANG',
    details: '2018.30Km',
  },
];

function RecommendedListings() {
  return (
    <div className="px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Recommended Listings
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {carData.map((car) => (
          <div
            key={car.id}
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
          >
            <img
              src={car.image}
              alt={car.title}
              className="w-full rounded-lg mb-4"
            />
            <div className="text-start">
              <p className="text-blue-600 font-bold text-xl mb-2">
                {car.price}
              </p>
              <p className="text-gray-800 font-medium text-lg mb-2">
                {car.title}
              </p>
              <p className="text-gray-500 text-sm">{car.details}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecommendedListings;
