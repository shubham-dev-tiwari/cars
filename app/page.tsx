import { Hero, SearchBar, CustomFilter, CarCard } from '@components';

export default async function Home() {
  return (
    <main className="overflow-hidden">
      <Hero />
      
      <div className='mt-12 padding-x padding-y max-width' id='discover'>
        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'>Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>

        <div className='home__filters'>
          <SearchBar />

          <div className='home__filter-container'>
            <CustomFilter title='fuel' />
            <CustomFilter title='year' />
          </div>
        </div>

        <section>
          <div className='home__cars-wrapper'>
            {/* Cars will be displayed here */}
            <p>Loading cars...</p>
          </div>
        </section>
      </div>
    </main>
  )
}
