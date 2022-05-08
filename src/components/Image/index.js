import React from 'react';
import clsx from 'clsx';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function Image(props) {

    const mystyle = {
        width: props.width,
        maxWidth: props.maxWidth,
        border: "1px solid gray",
        padding: "0px",
        marginBottom: '15px'
      };
    return (
        // <img src={require('@site/static/img/docs/empower-all-team.png').default} />
        <img src={useBaseUrl(props.src)}
             style={mystyle} />
    );
}
