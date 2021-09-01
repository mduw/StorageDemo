import React from 'react';
import {Link} from 'react-router-dom';
import styled from "styled-components";
const SHome = {}

SHome.StyledLink = styled(Link)`
    display: block;
    margin: 20px auto;
    text-decoration: none;
    padding: 10px;
    color: white;
    background-color: #0096ff;
    opacity: 0.8;
    &:hover {
       opacity: 1;       
    }

`;


export default SHome;

