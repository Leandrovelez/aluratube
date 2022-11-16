import styled from "styled-components";

const StyledVideoPreview = styled.div`
    margin-top: 20px;
    iframe{
        margin-top: 10px;
    }
`;

export default function videoPreview({url}) {
    
    var urlAlterada = url.split('watch?v=')[1];

    if(urlAlterada && urlAlterada.substr(0, urlAlterada.indexOf('&t=')) != ""){
        urlAlterada = urlAlterada.substr(0, urlAlterada.indexOf('&t='))
    }
    
    return (
        <StyledVideoPreview>
            <h2>Preview</h2>
            <iframe 
                width="290" 
                height="175" 
                src={`https://www.youtube.com/embed/${urlAlterada}`} 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen>
            </iframe>
        </StyledVideoPreview>
    )
    
}