import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledForm = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  flex-direction: column;
  padding: 10px;
  width: 400px;
  align-items: center;
  width: 100%;
`;

export const WrappedContainer = styled.div`
  border: 2px solid #2E2E2E;
  border-radius: 5px;
`;

export const ThumbnailImage = styled.div`
  width: 100%;
  height: 300px;
  background-color: #BBC4C2;
`;

export const StyledLink = styled(Link)`
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;
