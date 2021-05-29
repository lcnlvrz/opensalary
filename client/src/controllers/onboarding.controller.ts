import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useCancelToken } from "../common/hooks/useCancelToken";
import { CompaniesService } from "../services/companies.service";
import GeoNamesService from "../services/geonames.service";
import { occupations } from "../source-of-truth/occupations";
import { ISelectLabel } from "../types/select-label.type";

export const useOnboarding = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [positions, setPositions] = useState<ISelectLabel[]>([]);
  const [queryPosition, setQueryPosition] = useState<string>("");
  const [queryLocation, setQueryLocation] = useState<string>("");
  const [locations, setLocations] = useState<ISelectLabel[]>([]);

  const cancelTokenController = useCancelToken();

  const searchPosition = (query: string) => {
    const optionsLike: string[] = [];
    for (let i = 0; i < occupations.length; i++) {
      if (optionsLike.length > 10) {
        break;
      }
      const occupation = occupations[i];
      if (occupation.toLowerCase().match(query.toLowerCase()))
        optionsLike.push(occupation);
    }
    setPositions(
      optionsLike.map((option, index) => ({
        key: index,
        label: option,
        value: option,
      }))
    );
    setIsLoading(false);
  };

  const searchLocation = (query: string) => {
    const tokenAxios = cancelTokenController.getAndSet();
    GeoNamesService.getCountryOrRegions(query, tokenAxios)
      .then((res) => {
        setIsLoading(false);
        setLocations(
          res.data.geonames.map((location, index) => ({
            key: index,
            label: location.toponymName,
            value: location.toponymName,
          }))
        );
      })
      .catch((err: AxiosError) => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (!queryPosition) {
      setPositions([]);
      return setIsLoading(false);
    }
    setIsLoading(true);
    const timeout = setTimeout(() => {
      searchPosition(queryPosition);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [queryPosition]);

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

  return {
    setQueryPosition,
    isLoading,
    locations,
    positions,
    queryLocation,

    queryPosition,
    setQueryLocation,
  };
};
