const BASE_URL = 'http://localhost:3030';

const admin = {
  email: 'admin@abv.bg',
  password: 'admin'
};

const cars = [
  {
    brand: 'BMW',
    model: '320d',
    year: 2019,
    engineType: '2.0 TDI 190hp',
    initialMileage: 45000,
    fuelType: 'diesel',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/2019_BMW_320d_M_Sport_%28G20%29%2C_front_8.28.19.jpg/1280px-2019_BMW_320d_M_Sport_%28G20%29%2C_front_8.28.19.jpg'
  },
  {
    brand: 'Toyota',
    model: 'Yaris',
    year: 2021,
    engineType: '1.5 Hybrid 116hp',
    initialMileage: 12000,
    fuelType: 'hybrid',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/2020_Toyota_Yaris_Icon_1.5_Front.jpg/1280px-2020_Toyota_Yaris_Icon_1.5_Front.jpg'
  },
  {
    brand: 'Volkswagen',
    model: 'Golf',
    year: 2017,
    engineType: '1.6 TDI 115hp',
    initialMileage: 87000,
    fuelType: 'diesel',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/VW_Golf_VII_Facelift_front_MK1_Motor_Show_2017.jpg/1280px-VW_Golf_VII_Facelift_front_MK1_Motor_Show_2017.jpg'
  }
];

async function seed() {
  try {
    console.log('Logging in as admin...');
    const loginRes = await fetch(`${BASE_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(admin)
    });

    if (!loginRes.ok) {
      throw new Error(`Login failed: ${loginRes.status}`);
    }

    const { accessToken } = await loginRes.json();
    console.log('Login successful!');

    for (const car of cars) {
      const res = await fetch(`${BASE_URL}/data/cars`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': accessToken
        },
        body: JSON.stringify(car)
      });

      if (!res.ok) {
        throw new Error(`Failed to create car: ${res.status}`);
      }

      const created = await res.json();
      console.log(`Created: ${created.brand} ${created.model}`);
    }

    console.log('Seed completed!');
  } catch (err) {
    console.error('Error:', err.message);
  }
}

seed();
