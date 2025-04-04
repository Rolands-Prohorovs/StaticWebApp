import { useState, useEffect } from 'react';
import './App.css';
import Chart from 'react-google-charts';
import Header from './Header';
import Footer from './Footer';

function App() {
  const [data, setData] = useState(null);

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

  const chartData = [
    ['Time', 'Temperature'],
    ...data?.map(item => {
      // Use 'time' field instead of 'timestamp'
      const time = item.time.split("T")[1]?.split(".")[0] || 'Invalid time';
      return [time, item.temperature];
    }) || []
  ];

  const options = {
    title: 'Temperature Over Time',
    curveType: 'function',
    legend: { position: 'bottom' },
    hAxis: {
      title: 'Time'
    },
    vAxis: {
      title: 'Temperature (°C)',
    },
  };

  return (
    <>
      <Header />
      <main>
        
          <Chart
            chartType="LineChart"
            width="800px"
            height="400px"
            data={chartData}
            options={options}
          />
       
      </main>
      <Footer />
    </>
  );
}

export default App;
