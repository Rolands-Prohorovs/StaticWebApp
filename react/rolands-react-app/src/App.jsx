import { useState, useEffect } from 'react';
import './App.css';
import Chart from 'react-google-charts';
import Header from './Header';
import Footer from './Footer';

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('https://rolands-web-app.azurewebsites.net/temp')
      .then(response => {
        if (!response.ok) {
          throw new Error('API error');
        }
        return response.json();
      })
      .then(data => setData(data))
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Could not load temperature data. Please try again later.');
      });
  }, []);

  // Prepare chart data using index as X-axis
  const temperatureChartData = [
    ['Entry', 'Temperature (°C)'],
    ...data.map((item, index) => [index + 1, item.temperature])
  ];

  const humidityChartData = [
    ['Entry', 'Humidity (%)'],
    ...data.map((item, index) => [index + 1, item.humidity])
  ];

  const commonOptions = {
    curveType: 'function',
    legend: { position: 'bottom' },
    hAxis: { title: 'Entry (index)' },
  };

  return (
    <>
      <Header />
      <main>
        {error ? (
          <p>{error}</p>
        ) : (
          <>
            <Chart
              chartType="LineChart"
              width="800px"
              height="400px"
              data={temperatureChartData}
              options={{ ...commonOptions, title: 'Temperature Over Entries', vAxis: { title: 'Temperature (°C)' } }}
            />
            <Chart
              chartType="LineChart"
              width="800px"
              height="400px"
              data={humidityChartData}
              options={{ ...commonOptions, title: 'Humidity Over Entries', vAxis: { title: 'Humidity (%)' } }}
            />
          </>
        )}
      </main>
      <Footer />
    </>
  );
}

export default App;
