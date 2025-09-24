import styled from "styled-components";


export const Container = styled.div`
    margin-left: 40px; 
    overflow-x: hidden;
    

    .react-multi-carousel-list {
        overflow: visible;
    }

    .react-multiple-carousel__arrow--left {
        
        left: 15px;
        top: 10px;
    }

     .react-multiple-carousel__arrow--right {
        
        right: 60px;
        top: 10px;
    }
     
    padding-bottom: 40px;
`;

export const Title = styled.h2`
    font-size: 32px;
    font-weight: 800;
    color: ${(props) => props.theme.green};
    padding-bottom: 12px;
    position: relative;
    text-align: center;
    margin: 70px 0;

    &::after {
        content: "";
        position: absolute;
        bottom: 0;
        width: 56px;
        height: 4px;
        background-color: ${(props) => props.theme.green} ;
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
    padding: 20px 10px;
    width: 90%;
    height: 300px;
    border-radius: 20px;
    


    p {
        color: ${(props) => props.theme.white};
        background-color: rgba(0, 0, 0, 0.5);
        padding: 10px 30px;
        border-radius: 30px;
        font-size: 22.5px;
        font-weight: bold;
        margin-top: 80px;
        
        
    }
`





