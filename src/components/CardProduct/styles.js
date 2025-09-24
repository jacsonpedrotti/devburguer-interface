import styled from "styled-components";

export const Container = styled.div `
    width: 90%;
    height: 190px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
    padding: 20px 10px;
    border-radius: 15px;
    background-color: ${(props) => props.theme.white};
    cursor: grab;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    position: relative;
    
    div {
        width: 90%;
        height: 100px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        
        
    }

    p {
        font-size: 18px;
        color: ${(props) => props.theme.orange};
        line-height: 20px;
        font-weight: 700;
        margin-top: 60px;
    }

    strong {
        font-size: 22px;
        color: ${(props) => props.theme.black};
        font-weight: 800;
        line-height: 20px;
        margin-top: 10px;
    }
`;

export const CardImage = styled.img `
    height: 100px;
    position: absolute;
    top: -50px;
`;