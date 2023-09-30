import React from 'react';
import './Subreddit.css';

function Subreddit({ name, icon }) {
    return (
        <div className="subreddit">
            {
                !icon && <img
                    src="https://styles.redditmedia.com/t5_5s5qbl/styles/communityIcon_hkq7zlki8ug81.png"
                />
            }
            {
                icon && <img src={icon} />
            }
            {name}
        </div>
    );
}

export default Subreddit;