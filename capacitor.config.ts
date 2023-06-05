import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'ocalm-gestion',
  webDir: 'dist/ocalm_gestion',
  server: {
    androidScheme: 'https'
  }
};

export default config;
