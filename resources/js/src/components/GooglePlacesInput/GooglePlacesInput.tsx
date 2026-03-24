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
      backgroundColor: isSelected && "#ffca1a",
      ":active": {
        ...styles[":active"],
        color: "white",
        backgroundColor: "#ffca1a",
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
    color: "#ffca1a",
  }),
  control: (provided) => ({
    ...provided,
    padding: "0px 20px",
    border: "1px solid #eae9e5",
    background: "#eae9e5",
    fontSize: 16,
    borderRadius: "40px",
    minWidth: "100%",
    boxShadow: "none !important",
    ":active": {
      border: "1px solid #ffca1a",
    },
    ":focus": {
      border: "1px solid #ffca1a",
    },
    ":hover": {
      border: "1px solid #ffca1a",
    },
  }),
  valueContainer: (provided) => ({
    ...provided,
    // display: "none",
    color: "#595855",
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
    fontSize: "18px",
    margin: 0,
    padding: 0,
    width: "100%",
    gridTemplateColumns: 0,
  }),
  placeholder: (base) => ({
    ...base,
    margin: 0,
    padding: 0,
    fontSize: "18px",
    width: "100%",
    ":placeholder": {
      fontSize: "18px",
      color: "red",
    },
  }),
};

export default GooglePlacesInput;
