import { Link } from "react-router-dom";
import styled from "styled-components";

const SDefault = {};

SDefault.Btn = styled.button`
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : "#0096ff"};
  color: ${(props) => (props.color ? props.color : "white")};
  padding: ${(props) => (props.padding ? props.padding : "10px 20px")};
  width: ${(props) => (props.width ? props.width : "auto")};
  font-size: ${(props) => (props.fontSize ? props.fontSize : "1em")};
  border-radius: 4px;
  height: auto;
  box-shadow: none;
  border: none;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  outline: none;
  &:hover {
    cursor: pointer;
  }
`;

SDefault.InputField = styled.input`
  display: block;
  width: auto;
  padding: 10px;
  font-size: ${(props) => (props.fontSize ? props.fontSize : "1em")};
  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

SDefault.Link = styled(Link)`
  position: absolute;
  text-decoration: none;
  padding: 10px;
  color: block;
  font-weight: bold;
  font-size: 1.2em;
  color:white;
  background-color: #008fe5;
`;

export default SDefault;
