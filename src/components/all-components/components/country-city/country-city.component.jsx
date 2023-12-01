import CustomSelect from '@/common/components/custom-select/custom-select.component';
import useCountryCity from '@/common/hooks/use-country-city.hook';
import COUNTRIES from '@/common/constants/countries.constant';

export default function CountryCity() {
  const { cities, handleCountryChange } = useCountryCity();

  return (
    <>
      <CustomSelect
        label="Country"
        name="country"
        // options={getCountries()}
        options={COUNTRIES}
        placeholder="Select Country"
        onChange={handleCountryChange}
      />
      <CustomSelect label="City" name="city" options={cities} placeholder="Select City" />
    </>
  );
}
