import Spline from '@splinetool/react-spline';
import Leaderboard from '../components/Leaderboard'

export default function App() {
  return (
    <div style={{ position: 'relative' }}>
      <Leaderboard/>
      <Spline scene="https://prod.spline.design/cAB2EgWqWcYhnHVa/scene.splinecode" />
    </div>
  );
}
