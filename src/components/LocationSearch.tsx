import { FC, FormEvent, Fragment, useState } from "react";

import type { Place } from "../api/Place";
import { search } from "../api/search";

interface LocationSearchProps {
  onPlaceClick: (place: Place) => void;
}

const LocationSearch: FC<LocationSearchProps> = ({ onPlaceClick }) => {
  const [term, setTerm] = useState("");
  const [places, setPlaces] = useState<Place[]>([]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await search(term);
    setPlaces(res);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label className="font-bold" htmlFor="term">
          Search
        </label>
        <input
          id="term"
          className="border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 px-4 py-2 w-full"
          type="text"
          placeholder="Search for a place"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
      </form>
      <h1 className="mt-4 text-xl font-bold">Found Locations</h1>
      <div className="mt-4 grid grid-cols-[1fr_40px] gap-2 items-center">
        {places.map((place) => (
          <Fragment key={place.id}>
            <p className="text-sm">{place.name}</p>
            <button
              className="bg-blue-500 text-xs text-white font-bold py-1 px-1 rounded"
              onClick={() => onPlaceClick(place)}
            >
              Go
            </button>
            <div className="border-b w-full col-span-2" />
          </Fragment>
        ))}
      </div>
    </>
  );
};

export default LocationSearch;
