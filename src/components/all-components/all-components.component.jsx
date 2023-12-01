'use client';

// import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import Button from './components/button/button.component';
import Input from './components/input/input.component';
import Checkbox from './components/checkbox/checkbox.component';
import Switch from './components/switch/switch.component';
// import Radio from './components/radio/radio.component';
import ReactHookForm from './components/react-hook-form/react-hook-form.component';
import AllToaster from './components/toaster/toaster.component';
import FormModal from './components/form-modal/form-modal.component';
import Radio from './components/radio/radio.component';
import CountrySelect from '@/common/components/country-select/country-select.component';
import CountryCity from './components/country-city/country-city.component';

export default function AllComponents() {
  const { handleSubmit, control } = useForm();
  // useEffect(() => {
  // axios
  //   .get('https://ipapi.co/json/')
  //   .then((response) => {
  //     console.log(response);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // axios
  //   .get('http://ip-api.com/json')
  //   .then(function (response) {
  //     response.json().then((jsonData) => {
  //       console.log(jsonData);
  //     });
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
  // }, []);
  // console.log(errors);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <Button />
      <AllToaster />
      <Input />
      <CountryCity />
      <Checkbox />
      <Switch />
      {/* <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="radioField"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <RadioGroup {...field} aria-label="radioField">
              <FormControlLabel value="option1" control={<Radio />} label="Option 1" />
              <FormControlLabel value="option2" control={<Radio />} label="Option 2" />
              <FormControlLabel value="option3" control={<Radio />} label="Option 3" />
            </RadioGroup>
          )}
        />
        <button type="submit">Submit</button>
      </form> */}
      <Radio />
      <FormModal />
      <ReactHookForm />
      {/* <CountrySelect /> */}
    </>
  );
}
