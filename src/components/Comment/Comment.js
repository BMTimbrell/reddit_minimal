import React from 'react';

function Comment({comment}) {
    return (
        <div>
            {
                comment.body
            }
        </div>
    );
}