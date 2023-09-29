import React from 'react';

function Comments({ name }) {
    return (
        <h1>{name ? 'hi' : 'nooo'}</h1>
    );
}

export default Comments;