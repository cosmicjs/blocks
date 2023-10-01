export interface VideoProps {
  node: {
    children: {
      properties: {
        src: string;
        type: string;
      };
    }[];
  };
  width?: string | number;
  height?: string | number;
  controls?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  poster?: string;
  preload?: 'none' | 'metadata' | 'auto';
}
