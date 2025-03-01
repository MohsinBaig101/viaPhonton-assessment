import * as readline from 'readline';

export function maxNutsTransported(D: number, N: number, F: number, C: number): number {
    // Check if there are no nuts or cart capacity, return 0 because no transportation can occur
    if (N <= 0 || C <= 0) return 0;

    // If there is no fuel usage (F <= 0), all nuts can be transported, return N
    if (F <= 0) return N;

    // If fuel consumption per km is greater than or equal to cart capacity, no transport is possible
    if (F >= C) return 0;

    /**
     * Calculate the total number of trips required, where each trip can carry a max of C nuts.
     * We use Math.ceil to ensure we account for any remaining nuts that may require an additional trip.
     */
    const totalNumberOfTrips = Math.ceil(N / C);

    // Variables to track total transported nuts, remaining nuts, remaining trips, and total fuel consumption
    let totalTransportedNuts = 0;
    let remainingNuts = N;
    let remainingTrip = totalNumberOfTrips;
    let totalFuelConsumption = 0;

    // Loop through each trip while there are remaining trips to make
    while (remainingTrip > 0) {
        /**
         * Calculate the fuel consumption for the current trip.
         * In the first trips, the horse will travel forward and back (2 * F * D), 
         * but in the last trip, it will only travel forward (1 * F * D).
         */
        const fuelConsumptionInTrip = fuelConsumptionsInTrip(remainingTrip, F, D);

        // Add the fuel consumption of this trip to the total fuel consumption
        totalFuelConsumption += fuelConsumptionInTrip;

        // If the total fuel consumption exceeds the number of nuts, stop transporting (can't proceed)
        if (totalFuelConsumption > N) {
            totalTransportedNuts = 0; // Set to 0 because no transport can occur due to excessive fuel consumption
            break;
        }

        // Determine the number of nuts to transport in this trip (either cart capacity or remaining nuts)
        const nuts = Math.min(C, remainingNuts);

        // Calculate how many nuts are actually transported considering the fuel consumption
        let transportedNutsInTrip = nuts - fuelConsumptionInTrip;

        // Add the transported nuts of this trip to the total
        totalTransportedNuts += transportedNutsInTrip;

        // Decrease the number of remaining trips and remaining nuts
        remainingTrip -= 1;
        remainingNuts = remainingNuts - nuts;

        // Log the details for debugging: remaining nuts, total transported nuts, and nuts transported in the current trip
        console.log('Remaining Nuts', remainingNuts, 'totalTransportedNuts', totalTransportedNuts, 'transportedNutsInTrip', transportedNutsInTrip);
    }

    // Return the total number of nuts successfully transported
    return totalTransportedNuts;
}


function fuelConsumptionsInTrip(remainingTrip: number, F: number, D: number) {
    return Math.ceil(remainingTrip) === 1 ? (1 * F * D) : (2 * F * D);
}


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

export function processInput() {
    rl.question('Please enter D,N,F,C values (e.g., 100,1000,2,10):\n', (input) => {
        const lines = input.split('\n');

        lines.forEach(line => {
            const [D, N, F, C] = line.split(',').map(Number);

            if (isNaN(D) || isNaN(N) || isNaN(F) || isNaN(C)) {
                console.log('Invalid input! Please enter valid numbers.');
                return;
            }

            const result = maxNutsTransported(D, N, F, C);
            console.log(`For D=${D}, N=${N}, F=${F}, C=${C} -> Max Nuts: ${result.toFixed(2)}`);
        });

        rl.close();
    });
}

processInput();
