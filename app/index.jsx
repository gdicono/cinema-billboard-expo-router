// import Dashboard from '../components/Dashboard';
import { Redirect } from 'expo-router';

export default function Index() {
  //return <Dashboard />;

  return <Redirect href="/(tabs)" />;
}
