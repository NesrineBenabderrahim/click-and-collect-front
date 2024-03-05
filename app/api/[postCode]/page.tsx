"use client"

import { divider } from "@nextui-org/react";

    interface Iparams {
        postalCode?: any;
        }
    export default async function handler({ params }: { params: Iparams }) {
    const postalCode = params.postalCode
    const apiKey = 'AIzaSyCzLtvOy3djvSbWUEFLyKVKLpoCD2tIufc';

    try {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${postalCode}&key=${apiKey}`);
        const data = await response.json();

        if (data.results.length > 0) {
        const location = data.results[0].geometry.location;
        return({ postalCode, location });
        } else {
        return ({ error: 'Location not found' });
        }
    } catch (error) {
        console.error('Error:', error);
        return({ error: 'Internal server error' });
    }
    }

