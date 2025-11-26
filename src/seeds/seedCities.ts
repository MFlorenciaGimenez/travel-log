import { log } from 'console';
import cities from './cities.json';
import { City } from 'src/city/entity/city.entity';
import { connectionSource } from 'src/config/typeOrm';

async function seedCities() {
  try {
    await connectionSource.initialize();

    const cityRepo = connectionSource.getRepository(City);

    for (const c of cities) {
      const exists = await cityRepo.findOne({
        where: { name: c.name, country: c.country },
      });

      if (!exists) {
        const city = cityRepo.create({
          name: c.name,
          country: c.country,
          state: c.state ?? undefined,
          lat: c.lat ?? undefined,
          lon: c.lon ?? undefined,
        });
        await cityRepo.save(city);
      }
    }

    console.log('Cities loaded');
  } catch (err) {
    console.log('error seeding cities', err);
  } finally {
    await connectionSource.destroy();
    process.exit(0);
  }
}

seedCities();
