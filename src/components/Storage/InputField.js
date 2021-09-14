import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import SStorage from "./StyledComp";

const InputField = (props) => {
  const { type="string", defaultVal = "1", placeholder, postTask, ...rest } = props;
  const [inp, setInp] = useState(defaultVal);
  const handleInp = (e) => setInp(e.target.value);
  useEffect(() => {
    if (inp) {
      if (type=== "number") postTask(parseInt(inp));
      else postTask(inp);
    }
  }, [inp]);
  return <SStorage.InputField style={rest} placeholder={placeholder} value={inp} onChange={handleInp} />;
};

InputField.propTypes = {
  defaultVal: PropTypes.string,
  postTask: PropTypes.func.isRequired,
};

export { InputField };
