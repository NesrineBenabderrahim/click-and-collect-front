    // pages/index.js
    import { getLatLongFromAddress } from '../utils/geocode';

    export default function Home() {
    const address = '80000'; // Replace with your desired address

    const handleGetLatLong = async () => {
        try {
        const { lat, lng } = await getLatLongFromAddress(address);
        console.log(`Latitude: ${lat}, Longitude: ${lng}`);
        } catch (error) {
        console.error(error.message);
        }
    };

    return (
        <div>
        <h1>Get LatLong from Address</h1>
        <button onClick={handleGetLatLong}>Get LatLong</button>
        </div>
    );
    }
