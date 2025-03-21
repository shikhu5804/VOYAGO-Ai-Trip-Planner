export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Cheap",
    desc: "Stay conscious of costs",
    icon: "💵",
  },
  {
    id: 2,
    title: "Moderate",
    desc: "Keep cost on the average side",
    icon: "💰",
  },
  {
    id: 3,
    title: "Luxury",
    desc: "Don't worry about cost",
    icon: "💎",
  },
];

export const SelectTravelList = [
  {
    id: 1,
    title: "Just Me",
    desc: "A sole traveles",
    icon: "🙋🏾‍♀️",
    people: "1",
  },
  {
    id: 2,
    title: "A couple",
    desc: "Two travelers",
    icon: "👫🏾",
    people: "2",
  },
  {
    id: 3,
    title: "Family",
    desc: "A group of fun loving adv",
    icon: "🏡",
    people: "3 to 5 people",
  },
  {
    id: 4,
    title: "Friends",
    desc: "A bunch of thrill-seekers",
    icon: "👩‍👩‍👦‍👦",
    people: "5 to 12 people",
  },
];

export const AI_PROMPT = 
  "Generate a Travel Plan for Location: {location} for {totalDays} Days for {people} with a {budget} budget. Please ensure that all prices are mentioned in the respective local currency of {location}. Give me Hotel options list with HotelName, Hotel address, Price (in local currency), hotel image URL, geo coordinates, rating, descriptions. Also, suggest itinerary with placeName, Place Details, Place Image URL, Geo Coordinates, ticket Pricing (in local currency), rating, time to travel each of the locations for 3 days with each day plan and best time to visit — all in JSON format.";
