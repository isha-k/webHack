import Spline from '@splinetool/react-spline';
import logo from './logo.png';

export default function App() {
  return (
    <div>
      <div style={{
        position: 'fixed',
        top: 0,
        left: '50%',
        maxWidth: '10%',
        transform: 'translateX(-50%)',
        zIndex: 1000 // Ensures the logo stays on top
      }}>
        <img src={logo} alt="Logo" /> 
      </div>
      <Spline 
        scene="https://prod.spline.design/ZXXSJidIOfEfKttp/scene.splinecode" 
        style={{
          position: 'fixed',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0
        }}
      />
    </div>
  );
}