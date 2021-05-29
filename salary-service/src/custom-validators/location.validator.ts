import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { GeonamesExternalApi } from 'src/external-apis/geonames/geonames.external-api';

@ValidatorConstraint({ name: 'location-validator', async: true })
export class LocationValidator implements ValidatorConstraintInterface {
  async validate(location: string): Promise<boolean> {
    try {
      const locations = await GeonamesExternalApi.getCountryOrRegions(location);

      return locations.data.geonames.some(
        (value) => value.name.toLowerCase() === location.toLowerCase(),
      );
    } catch (err) {
      return false;
    }
  }

  defaultMessage(args: ValidationArguments) {
    return "The location provided isn't valid";
  }
}
