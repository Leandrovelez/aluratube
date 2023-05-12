import styled from "styled-components";

const StyledVideoPreview = styled.div`
        margin-top: 10px;
    iframe{
    }
`;

export default function videoPreview({url, width, height}) {
    
    var urlAlterada = url.split('watch?v=')[1];

    if(urlAlterada && urlAlterada.substr(0, urlAlterada.indexOf('&t=')) != ""){
        urlAlterada = urlAlterada.substr(0, urlAlterada.indexOf('&t='))
    }
    
    return (
        <StyledVideoPreview>
            <iframe 
                width={width} 
                height={height}
                src={`https://www.youtube.com/embed/${urlAlterada}`} 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen>
            </iframe>
        </StyledVideoPreview>
    )
    
}