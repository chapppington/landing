export interface IYandexMapContainerProps {
  initialCoordinates?: [number, number];
  onCoordinatesChange?: (coordinates: [number, number]) => void;
  height?: string | number;
  zoom?: number;
}
