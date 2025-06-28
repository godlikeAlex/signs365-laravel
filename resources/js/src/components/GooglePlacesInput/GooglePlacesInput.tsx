import React from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

interface Props {
  // error?: string;
  // disabled: boolean;
  onChange: () => void;
  value: any;
}

export const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

const GooglePlacesInput: React.FC<Props> = ({ onChange, value }: Props) => {
  return (
    <GooglePlacesAutocomplete
      apiKey={GOOGLE_MAPS_API_KEY}
      apiOptions={{ language: "en", region: "us" }}
      autocompletionRequest={{
        componentRestrictions: {
          country: ["us"],
        },
      }}
      selectProps={{
        onChange,
        value,
        placeholder: (
          <div style={{ color: "#595855", fontSize: 14 }}>Address</div>
        ),
        styles: customStyles,
      }}
    />
  );
};

export const customStyles = {
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isSelected && "#FD8D27",
      ":active": {
        ...styles[":active"],
        color: "white",
        backgroundColor: "#FD8D27",
      },
    };
  },
  container: (provided) => ({
    ...provided,
    fontSize: "18px",
    width: "100%",
    // none of react-select's styles are passed to <Control />
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    display: "none",
  }),
  loadingIndicator: (base) => ({
    ...base,
    display: "none",
  }),
  indicatorsContainer: () => ({
    // position: "absolute",
    // background: "red",
    // right: 0,
    // height: "100%",
    // top: 0,
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
    // width: "80px",
    // backgroundColor: "#ED0598",
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: "#FD8D27",
  }),
  control: (provided) => ({
    ...provided,
    padding: "10px 20px",
    border: "none",
    background: "#f0f2f5",
    fontSize: 16,
    borderRadius: "40px",
    minWidth: "100%",
  }),
  valueContainer: (provided) => ({
    ...provided,
    // display: "none",
    color: "red",
    margin: 0,
    padding: 0,
  }),
  singleValue: (provided) => ({
    ...provided,
    margin: 0,
    color: "#595855",
    padding: 0,
  }),
  input: (base) => ({
    ...base,
    color: "#595855",
    fontSize: "16px",
    margin: 0,
    padding: 0,
    width: "100%",
    gridTemplateColumns: 0,
  }),
  placeholder: (base) => ({
    ...base,
    margin: 0,
    padding: 0,
    width: "100%",
  }),
};

export default GooglePlacesInput;
