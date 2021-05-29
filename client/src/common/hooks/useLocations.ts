import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import GeoNamesService from "../../services/geonames.service";
import { ISelectLabel } from "../../types/select-label.type";
import { useCancelToken } from "./useCancelToken";

export const useLocations = () => {
  const [queryLocation, setQueryLocation] = useState<string>("");
  const [locations, setLocations] = useState<ISelectLabel[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const cancelTokenController = useCancelToken();

  const searchLocation = (query: string) => {
    const tokenAxios = cancelTokenController.getAndSet();
    GeoNamesService.getCountryOrRegions(query, tokenAxios)
      .then((res) => {
        setIsLoading(false);
        setLocations(
          res.data.geonames.map((location, index) => ({
            key: index,
            label: location.name,
            value: location.name,
          }))
        );
      })
      .catch((err: AxiosError) => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    if (!queryLocation) {
      setLocations([]);
      return setIsLoading(false);
    }
    setIsLoading(true);
    const timeout = setTimeout(() => {
      searchLocation(queryLocation);
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [queryLocation]);

  return { isLoading, locations, setQueryLocation, queryLocation };
};
