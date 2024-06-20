export default function Arrow({from, to}) {
    const leftMost = to.x > from.x ? from : to;
    const topMost = to.y > from.y ? from : to;
    return (
        <>
            <svg width={Math.abs(from.x - to.x) + (to === leftMost ? 0 : 9)}
             height={Math.abs(from.y - to.y) + (to === leftMost ? 0 : 8)}
             style={{position: 'absolute', left: `${leftMost.x}px`, top: `${topMost.y}px`}}>
                <defs>
                    <marker id="arrow" markerWidth="13" markerHeight="13" refX="2" refY="6" orient="auto">
                        <path d="M2,2 L2,11 L10,6 L2,2" style={{fill: 'red'}}/>
                    </marker>
                </defs>

                <path d={`M${leftMost === from ? 0 : (from.x - to.x)},${topMost === from ? 0 : (from.y - to.y)}
                         L${leftMost === to ? 9 : (to.x - from.x)},
                         ${topMost === to ? (leftMost === to ? 8 : 0) : (to.y - from.y)}`}
                 style={{
                        stroke: 'red', strokeWidth: '1.25px',
                        fill: 'none', markerEnd: 'url(#arrow)'
                    }}/>
            </svg>
        </>
    )
}