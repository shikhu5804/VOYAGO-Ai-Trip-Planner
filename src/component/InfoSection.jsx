import React, { useEffect, useState } from 'react';
import { SelectTravelList } from '../constant/option';  // Import the travel list

function InfoSection({ trip }) {
  const [photoUrl, setPhotoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const apiKey = import.meta.env.VITE_GOMAP_API_KEY;

  useEffect(() => {
    if (trip && trip.userSelection?.location) {
      GetPlaceImg();
    }
  }, [trip]);

  const GetPlaceImg = async () => {
    try {
      setIsLoading(true); // Set loading to true when fetching starts
      const placeDetailsUrl = `https://maps.gomaps.pro/maps/api/place/textsearch/json?query=${encodeURIComponent(trip.userSelection.location)}&key=${apiKey}`;
      
      const response = await fetch(placeDetailsUrl);
      const data = await response.json();

      if (data.results && data.results[0]?.photos) {
        const landscapePhoto = data.results[0].photos.find(
          (photo) => photo.width > photo.height
        );

        const photoRef = landscapePhoto
          ? landscapePhoto.photo_reference
          : data.results[0].photos[0].photo_reference;

        const photoUrl = `https://maps.gomaps.pro/maps/api/place/photo?photo_reference=${photoRef}&maxwidth=800&key=${apiKey}`;
        setPhotoUrl(photoUrl);
      } else {
        console.error('No photo found');
        setPhotoUrl('https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=1931&auto=format&fit=crop');
      }
    } catch (error) {
      console.error('Error fetching place photo:', error);
      setPhotoUrl('https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=1931&auto=format&fit=crop');
    } finally {
      setIsLoading(false); // Set loading to false when fetching is done
    }
  };

  const getTravelerCount = () => {
    const selectionTitle = trip?.userSelection?.people; 
    const match = SelectTravelList.find((item) => item.title === selectionTitle);
    return match ? match.people : selectionTitle;  
  };

  return (
    <div>
      {/* Image Section */}
      {isLoading ? (
        <div className='h-[40vh] md:h-[60vh] w-full bg-gray-200 animate-pulse rounded-xl'></div>
      ) : (
        <img
          src={photoUrl}
          className='h-[40vh] md:h-[60vh] w-full object-cover rounded-xl'
          alt='Place'
        />
      )}

      {/* Details Section */}
      <div className='flex justify-between items-center'>
        <div className='my-6 flex flex-col gap-2 w-full'>
          {/* Location Title */}
          {isLoading ? (
            <div className='h-8 w-48 bg-gray-200 animate-pulse rounded-full'></div>
          ) : (
            <h2 className='font-bold text-xl md:text-2xl'>{trip?.userSelection?.location}</h2>
          )}

          {/* Metadata Section */}
          <div className='flex flex-col md:flex-row gap-4 mt-4'>
            {isLoading ? (
              <>
                <div className='h-8 w-32 bg-gray-200 animate-pulse rounded-full'></div>
                <div className='h-8 w-48 bg-gray-200 animate-pulse rounded-full'></div>
                <div className='h-8 w-32 bg-gray-200 animate-pulse rounded-full'></div>
              </>
            ) : (
              <>
                <h2 className='bg-gray-200 font-medium text-gray-600 rounded-full p-1 px-4 text-sm md:text-md'>🗓️ {trip?.userSelection?.totalDays} Day</h2>
                <h2 className='bg-gray-200 font-medium text-gray-600 rounded-full p-1 px-4 text-sm md:text-md'>👩‍👧‍👦 Number of Travelers: {getTravelerCount()}</h2>
                <h2 className='bg-gray-200 font-medium text-gray-600 rounded-full p-1 px-4 text-sm md:text-md'>💵 {trip?.userSelection?.budget} Budget</h2>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoSection;