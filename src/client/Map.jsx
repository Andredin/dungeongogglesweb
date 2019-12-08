import React, { useState } from 'react';

import { useParams } from "react-router-dom";

export const Map = () => {
    const { dmId } = useParams();

    return (
        <div>
            Id do dm { dmId }
        </div>
    );
}