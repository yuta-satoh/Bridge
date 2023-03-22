const Loading = ({ height }: { height: number }) => {
    return (
        <>
            <div className={`spinner mx-auto`}>
                <span>L</span>
                <span>O</span>
                <span>A</span>
                <span>D</span>
                <span>I</span>
                <span>N</span>
                <span>G</span>
            </div>
            <style jsx>{`
                .spinner {
                    height: ${height}px;
                    width: max-content;
                    font-size: 18px;
                    font-weight: 700;
                    font-family: monospace;
                    letter-spacing: 1em;
                    color: #000000;
                    filter: drop-shadow(0 0 10px);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                   
                .spinner span {
                    animation: loading 1.75s ease infinite;
                }
                
                .spinner span:nth-child(2) {
                    animation-delay: 0.25s;
                }
                
                .spinner span:nth-child(3) {
                    animation-delay: 0.5s;
                }
                
                .spinner span:nth-child(4) {
                    animation-delay: 0.75s;
                }
                
                .spinner span:nth-child(5) {
                    animation-delay: 1s;
                }
                
                .spinner span:nth-child(6) {
                    animation-delay: 1.25s;
                }
                
                .spinner span:nth-child(7) {
                    animation-delay: 1.5s;
                }
                
                @keyframes loading {
                    0%, 100% {
                        transform: translateY(0);
                    }
                
                    50% {
                        transform: translateY(-10px);
                    }
                }
            
            `}</style>
        </>
    )
}

export default Loading;
