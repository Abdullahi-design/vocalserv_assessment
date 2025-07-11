import { Employee, GradeLevel } from '../types';

export const getAvatarColor = (name: string): string => {
    const colors = [
        'bg-gradient-to-br from-purple-500 to-pink-500',
        'bg-gradient-to-br from-blue-500 to-cyan-500',
        'bg-gradient-to-br from-green-500 to-emerald-500',
        'bg-gradient-to-br from-orange-500 to-red-500',
        'bg-gradient-to-br from-indigo-500 to-purple-500',
        'bg-gradient-to-br from-teal-500 to-green-500'
    ];
    return colors[name.length % colors.length];
};

export const saveToLocalStorage = (employeeData?: Employee[], gradeLevelData?: GradeLevel[]): void => {
    try {
        if (employeeData) {
            localStorage.setItem('staff_directory_employees', JSON.stringify(employeeData));
        }
        if (gradeLevelData) {
            localStorage.setItem('staff_directory_grade_levels', JSON.stringify(gradeLevelData));
        }
    } catch (error) {
        console.error('Error saving data:', error);
    }
};

export const loadFromLocalStorage = () => {
    try {
        const savedEmployees = localStorage.getItem('staff_directory_employees');
        const savedGradeLevels = localStorage.getItem('staff_directory_grade_levels');
        
        return {
            employees: savedEmployees ? JSON.parse(savedEmployees) : [],
            gradeLevels: savedGradeLevels ? JSON.parse(savedGradeLevels) : null
        };
    } catch (error) {
        console.error('Error loading data:', error);
        return { employees: [], gradeLevels: null };
    }
};

export const fetchCountriesFromAPI = async (): Promise<string[]> => {
    try {
        const response = await fetch('https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json');
        const data = await response.json();
        
        const uniqueCountries: any = [...new Set(data.map((city: any) => city.country))].sort();
        return uniqueCountries;
    } catch (error) {
        console.error('Error fetching countries:', error);
        return ['Nigeria', 'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France', 'Japan', 'Nigeria', 'India', 'Brazil'];
    }
};

export const getDefaultGradeLevels = (): GradeLevel[] => [
    { id: 1, name: 'LVL1', description: 'Entry Level' },
    { id: 2, name: 'LVL2', description: 'Junior Level' },
    { id: 3, name: 'LVL3', description: 'Mid Level' },
    { id: 4, name: 'LVL4', description: 'Senior Level' },
    { id: 5, name: 'LVL5', description: 'Lead Level' }
];