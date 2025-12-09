"use client";

import { FC, useState, useEffect } from "react";
import { IYandexMapContainerProps } from "@/components/ui/YandexMapContainer/types";
import Image from "next/image";

const YandexMapPreviewWrapper: FC<{
  children: React.ReactNode;
  preview: React.ReactNode;
  isActive: boolean;
  onActivate: () => void;
  height: string | number;
}> = ({ children, preview, isActive, onActivate, height }) => {
  return (
    <div
      className="relative border-2 border-gray-300 rounded-lg flex items-center justify-center bg-gray-100 overflow-hidden"
      style={{ height }}
      onMouseEnter={isActive ? undefined : onActivate}
      tabIndex={0}
      aria-label="Активировать карту"
    >
      {isActive ? children : preview}
    </div>
  );
};

const YandexMapContainer: FC<IYandexMapContainerProps> = ({
  initialCoordinates = [53.3254, 83.6329],
  onCoordinatesChange,
  height = "250px",
  zoom = 15,
}) => {
  const [coordinates, setCoordinates] =
    useState<[number, number]>(initialCoordinates);
  const [isMapReady, setIsMapReady] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isMapActive, setIsMapActive] = useState(false);
  const [MapComponents, setMapComponents] = useState<any>(null);
  const isStrictMode = process.env.NODE_ENV === "development";

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Динамический импорт компонентов карты только при активации
  useEffect(() => {
    if (isMapActive && !MapComponents) {
      import("react-yandex-maps").then((mod) => {
        setMapComponents({
          YMaps: mod.YMaps,
          Map: mod.Map,
          Placemark: mod.Placemark,
        });
      });
    }
  }, [isMapActive, MapComponents]);

  const handleMapClick = (e: any) => {
    if (!isMapReady) return;
    try {
      const newCoordinates: [number, number] = e.get("coords");
      setCoordinates(newCoordinates);
      if (onCoordinatesChange) {
        onCoordinatesChange(newCoordinates);
      }
    } catch (error) {
      console.error("Error handling map click:", error);
    }
  };

  const handleMapReady = () => {
    if (isMounted) {
      setIsMapReady(true);
    }
  };

  const handlePlacemarkDragEnd = (e: any) => {
    if (!isMapReady) return;
    try {
      const newCoordinates: [number, number] = e
        .get("target")
        .geometry.getCoordinates();
      setCoordinates(newCoordinates);
      if (onCoordinatesChange) {
        onCoordinatesChange(newCoordinates);
      }
    } catch (error) {
      console.error("Error handling placemark drag:", error);
    }
  };

  if (isStrictMode) {
    return (
      <YandexMapPreviewWrapper
        isActive={false}
        onActivate={() => {}}
        height={height}
        preview={<div className="text-gray-500">Map Preview (Dev Mode)</div>}
        children={null}
      />
    );
  }

  const preview = (
    <Image
      src="/map_preview.png"
      alt="Карта"
      fill
      style={{ objectFit: "cover" }}
      sizes="100vw"
      priority={false}
    />
  );

  let mapContent = null;
  if (MapComponents) {
    const { YMaps, Map, Placemark } = MapComponents;
    mapContent = (
      <div className="w-full h-full">
        <YMaps>
          <Map
            defaultState={{
              center: coordinates,
              zoom: zoom,
            }}
            width="100%"
            height="100%"
            onClick={handleMapClick}
            onLoad={handleMapReady}
          >
            {isMapReady && isMounted && (
              <Placemark
                geometry={coordinates}
                options={{ draggable: true }}
                onDragEnd={handlePlacemarkDragEnd}
              />
            )}
          </Map>
        </YMaps>
      </div>
    );
  } else if (isMapActive) {
    mapContent = <div className="text-gray-500">Загрузка карты...</div>;
  }

  return (
    <YandexMapPreviewWrapper
      isActive={isMapActive}
      onActivate={() => setIsMapActive(true)}
      height={height}
      preview={preview}
    >
      {mapContent}
    </YandexMapPreviewWrapper>
  );
};

export default YandexMapContainer;
