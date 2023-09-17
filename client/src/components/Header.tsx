import React from 'react';
import { Link } from 'react-router-dom';

export function Header ({views}) {
    return (
        <div>
            {views.map((view) => {
                return (
                    <Link to={view}>
                        {view}
                    </Link>
                )
            })}
        </div>
    )
}