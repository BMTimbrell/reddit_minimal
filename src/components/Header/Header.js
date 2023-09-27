import React from 'react';

function Header() {
    return (
        <header>
            <h1>Reddit Minimal</h1>
            <input type="text" placeholder={`Search posts`} />
        </header>
    );
}

export default Header;