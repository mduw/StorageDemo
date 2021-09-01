import styled, { keyframes } from "styled-components";
import SDefault from "../DefaultStyledComp";

const SStorage = {};

SStorage.Wrapper = styled.div`
    margin: 4px;
    padding: 24px;
`;

SStorage.Btn = styled(SDefault.Btn)`
    margin: 20px;
    text-align: center;
    outline: none;
`;

SStorage.Value = styled.span`
    font-size: 1.2em;
    font-weight: bold;
`;

SStorage.Section = styled.section`
    border-top: 1px solid black;
    margin: 20px auto;
`;


export default SStorage;
