export type AppConfig = {
  STREAM_URL: string;
  ROS_BRIDGE_URL: string;
};

declare global {
  interface Window { __APP_CONFIG__?: Partial<AppConfig>; }
}

const cfg = (window.__APP_CONFIG__ ?? {}) as Partial<AppConfig>;

export const RUNTIME_CONFIG: AppConfig = {
  STREAM_URL: cfg.STREAM_URL ?? 'http://127.0.0.1:8000/',
  ROS_BRIDGE_URL: cfg.ROS_BRIDGE_URL ?? 'ws://127.0.0.1:9090/',
};