import React, {lazy, Suspense} from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { createTheme, Paper } from '@mui/material';
import Topbar from './components/Topbar';
import LoadingScreen from './components/LoadingScreen';
import Footer from './components/Footer';
import useChangePage from './hooks/useChangePage';
// Routes to lazy load
const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));
const Contact = lazy(() => import('./routes/Contact'));
const Reserveer = lazy(() => import('./routes/Reserveer'));

function App() {
	const [In, changePage] = useChangePage();
	const theme = createTheme({
		palette: {
			mode: 'dark',
			primary: {
				main: '#5F19D2'
			},
			secondary: {
				main: '#ffffff'
			},
			background: {
				paper: '#161727',
				default: '#161727'
			}
		}
	});
	return (
		<ThemeProvider theme={theme}>
			
			<Paper sx={{
				minHeight: '100vh',
				borderRadius: 0
			}}>
				<Topbar changePage={changePage} />
				<Routes>
					<Route path='/' element={<Suspense fallback={<LoadingScreen />}><Home changePage={changePage} In={In} /></Suspense>} />
					<Route path='/about' element={<Suspense fallback={<LoadingScreen />}><About In={In} /></Suspense>} />
					<Route path='/contact' element={<Suspense fallback={<LoadingScreen />}><Contact In={In} /></Suspense>} />
					<Route path='/reserveer' element={<Suspense fallback={<LoadingScreen />}><Reserveer  In={In} /></Suspense>} />
					<Route path='/reserveer/:id' element={<Suspense fallback={<LoadingScreen />}><Reserveer In={In} /></Suspense>} />
				</Routes>	
				<Footer/>
			</Paper>

		</ThemeProvider>
	);
}

export default App;
