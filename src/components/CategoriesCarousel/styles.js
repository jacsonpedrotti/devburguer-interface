import { Link } from "react-router-dom";
import styled from "styled-components";


export const Container = styled.div`
    
    margin-left: 40px;  
    cursor: grab;
`;

export const Title = styled.h2`
    font-size: 32px;
    font-weight: 800;
    color: ${(props) => props.theme.purple};
    padding-bottom: 12px;
    position: relative;
    text-align: center;
    margin-bottom: 40px;

    &::after {
        content: "";
        position: absolute;
        bottom: 0;
        width: 56px;
        height: 4px;
        background-color: #9758a6 ;
        left: calc(50% - 28px);
    }
`

export const ContainerItems = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'imageUrl' && prop !== '$imageUrl',
})`
    background: url("${(props) => props.$imageUrl}");
    background-position: center;
    background-size: cover;

    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 10px;
    width: 90%;
    height: 300px;
    border-radius: 20px;

`
export const CategoryButton = styled(Link)`
  color: ${(props) => props.theme.white};
  background-color: rgba(31, 31, 31, 0.7);
  padding: 10px 30px;
  border-radius: 30px;
  font-size: 22.5px;
  font-weight: bold;
  margin-top: 250px;
  margin-left: 0;
  text-decoration: none;
  box-shadow: 0 2px 8px rgba(151, 88, 166, 0.25);
  transition: filter 0.2s, background-color 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.secondDarkPurple};
    filter: brightness(1.1);
  }
`;




