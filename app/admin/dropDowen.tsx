import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import useCard from '../hooks/useCard';

interface DropDowenProps {
    categorie: boolean;
    plat: boolean;
    shop: boolean;
    user: boolean;
    setCayegorieFilter:Function;
}

const DropDowen: React.FC<DropDowenProps> = ({ categorie, plat, shop, user, setCayegorieFilter }) => {
    const { card } = useCard();

    // Fetch categories only if plat and card are truthy
    let categories: string[] = [];
    if (plat && card) {
        categories = card.categories.map((item: any) => item.title);
    }
    let restaurants: string[] = [];
    if (categorie && card) {
        restaurants = card.shoplist.map((item: any) => item.Company);
    }
    let users: string[] = [];
    if (user && card) {
        users = ["client","restaurant_owner","admin"]
    }

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const selectedCategory = event.target.value as string; // Assuming the value is a string
        setCayegorieFilter(selectedCategory); // Call the prop function with the selected category
    };

    return (
        <>
            {plat && card && (
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth sx={{ color: 'white' }}>
                        <InputLabel htmlFor="uncontrolled-native">
                            Catégorie
                        </InputLabel>
                        <NativeSelect
                            onChange={handleChange} // Handle change event
                            inputProps={{
                                name: 'Catégorie',
                                id: 'uncontrolled-native',
                            }}
                        >
                            <option aria-label="all" value="all">tout plat</option> {/* Default/select option */}
                            {categories.map((category: string, index: number) => (
                                <option key={index} value={category}>
                                    {category}
                                </option>
                            ))}
                        </NativeSelect>
                    </FormControl>
                </Box>
            )}
            {categorie && card && (
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth sx={{ color: 'white' }}>
                        <InputLabel htmlFor="uncontrolled-native">
                            Restaurant
                        </InputLabel>
                        <NativeSelect
                            onChange={handleChange} // Handle change event
                            inputProps={{
                                name: 'Restaurant',
                                id: 'uncontrolled-native',
                            }}
                        >
                            <option aria-label="all" value="all">tout restaurant</option> {/* Default/select option */}
                            {restaurants.map((restaurant: string, index: number) => (
                                <option key={index} value={restaurant}>
                                    {restaurant}
                                </option>
                            ))}
                        </NativeSelect>
                    </FormControl>
                </Box>
            )}
            {user && card && (
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth sx={{ color: 'white' }}>
                        <InputLabel htmlFor="uncontrolled-native">
                        Role
                        </InputLabel>
                        <NativeSelect
                            onChange={handleChange} // Handle change event
                            inputProps={{
                                name: 'Role',
                                id: 'uncontrolled-native',
                            }}
                        >
                            <option aria-label="all" value="all">tout utilisateur</option> {/* Default/select option */}
                            {users.map((role: string, index: number) => (
                                <option key={index} value={role}>
                                    {role}
                                </option>
                            ))}
                        </NativeSelect>
                    </FormControl>
                </Box>
            )}
        </>
    );
}

export default DropDowen;
